-- ToolSmithAi schema. Run in the Supabase SQL editor (or `supabase db push`).

create extension if not exists "pgcrypto";

-- Profiles (one per auth user) ------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free','core','pro','scale')),
  credits_total int not null default 20,
  credits_used int not null default 0,
  credits_reset_at timestamptz not null default (date_trunc('month', now()) + interval '1 month'),
  created_at timestamptz not null default now()
);

-- Projects --------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  mode text not null default 'website',
  html text not null default '',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_user_idx on public.projects(user_id, updated_at desc);

-- Chat messages ---------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_project_idx on public.messages(project_id, created_at);

-- Versions (rollback) ---------------------------------------------------------
create table if not exists public.project_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  html text not null,
  prompt text,
  created_at timestamptz not null default now()
);
create index if not exists versions_project_idx on public.project_versions(project_id, created_at desc);

-- Usage ledger ----------------------------------------------------------------
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  kind text not null default 'generation',
  credits int not null default 1,
  model text,
  created_at timestamptz not null default now()
);
create index if not exists usage_user_idx on public.usage_events(user_id, created_at desc);

-- Subscriptions / payment records (written only by trusted admin or webhook) ---
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('core','pro','scale')),
  status text not null default 'active' check (status in ('active','canceled','expired')),
  provider text not null default 'selar',
  provider_reference text,
  started_at timestamptz not null default now(),
  current_period_end timestamptz
);
create unique index if not exists subscriptions_ref_idx on public.subscriptions(provider, provider_reference) where provider_reference is not null;

-- Pending payment claims (user says "I paid"; admin verifies) -------------------
create table if not exists public.payment_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('core','pro','scale')),
  reference text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

-- Notifications ---------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Contact form ----------------------------------------------------------------
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security ----------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.project_versions enable row level security;
alter table public.usage_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_claims enable row level security;
alter table public.notifications enable row level security;
alter table public.contact_requests enable row level security;

-- profiles: read own; update only harmless columns (plan/credits are server-managed)
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.profiles from authenticated;
grant update (full_name, avatar_url) on public.profiles to authenticated;

-- projects
create policy "projects_select_own_or_public" on public.projects for select using (auth.uid() = user_id or is_public);
create policy "projects_insert_own" on public.projects for insert with check (auth.uid() = user_id);
create policy "projects_update_own" on public.projects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "projects_delete_own" on public.projects for delete using (auth.uid() = user_id);

-- messages / versions: own only
create policy "messages_own" on public.messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "versions_own" on public.project_versions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- usage / subscriptions: read own; writes happen with the service role only
create policy "usage_select_own" on public.usage_events for select using (auth.uid() = user_id);
create policy "subs_select_own" on public.subscriptions for select using (auth.uid() = user_id);

-- payment claims: user may create and read own; approval is service-role only
create policy "claims_select_own" on public.payment_claims for select using (auth.uid() = user_id);
create policy "claims_insert_own" on public.payment_claims for insert with check (auth.uid() = user_id and status = 'pending');

-- notifications
create policy "notif_select_own" on public.notifications for select using (auth.uid() = user_id);
create policy "notif_update_own" on public.notifications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- contact requests: anonymous insert only (service role reads)
create policy "contact_insert_any" on public.contact_requests for insert with check (true);

-- New-user trigger ------------------------------------------------------------
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)));
  insert into public.notifications (user_id, title, body)
  values (new.id, 'Welcome to ToolSmithAi', 'You have 20 free credits. Describe something to build.');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Atomic credit spend (service role only) -------------------------------------
create or replace function public.spend_credit(p_user uuid, p_amount int default 1) returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  -- monthly reset
  update public.profiles set credits_used = 0, credits_reset_at = date_trunc('month', now()) + interval '1 month'
  where id = p_user and credits_reset_at <= now();
  update public.profiles set credits_used = credits_used + p_amount
  where id = p_user and credits_used + p_amount <= credits_total;
  get diagnostics n = row_count;
  return n > 0;
end $$;
revoke all on function public.spend_credit(uuid, int) from public, anon, authenticated;
grant execute on function public.spend_credit(uuid, int) to service_role;
