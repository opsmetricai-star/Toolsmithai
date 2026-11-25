-- Table privileges (needed when the project has default grants disabled) -------
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant insert on public.contact_requests to anon;
-- plan/credits must stay server-controlled: re-apply the column-level restriction
revoke update on public.profiles from authenticated;
grant update (full_name, avatar_url) on public.profiles to authenticated;
