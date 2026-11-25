import Link from "next/link";
import { redirect } from "next/navigation";
import { Home, CreditCard, BarChart3, Settings, Bell, Shield } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { supabaseServer, getUser, supabaseConfigured } from "@/lib/supabase/server";

export type Profile = { id: string; email: string | null; full_name: string | null; plan: string; credits_total: number; credits_used: number };

export async function requireProfile() {
  if (!supabaseConfigured()) redirect("/login");
  const user = await getUser();
  if (!user) redirect("/login");
  const sb = await supabaseServer();
  const { data } = await sb.from("profiles").select("id,email,full_name,plan,credits_total,credits_used").eq("id", user.id).single();
  const profile: Profile = data ?? { id: user.id, email: user.email ?? null, full_name: null, plan: "free", credits_total: 20, credits_used: 0 };
  return { user, profile, sb };
}

const LINKS = [
  { href: "/dashboard", label: "Projects", icon: Home },
  { href: "/usage", label: "Usage", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const { profile, user, sb } = await requireProfile();
  const { count } = await sb.from("notifications").select("id", { count: "exact", head: true }).eq("read", false);
  const left = Math.max(0, profile.credits_total - profile.credits_used);
  const admins = (process.env.ADMIN_EMAILS ?? "").toLowerCase().split(",").map((s) => s.trim());
  const isAdmin = !!user.email && admins.includes(user.email.toLowerCase());
  return (
    <div className="min-h-screen bg-bg lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-[#faf6f1] p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between lg:block">
          <Logo href="/dashboard" />
          <form action="/auth/signout" method="post" className="lg:hidden"><button className="text-[13px] text-muted">Log out</button></form>
        </div>
        <nav className="mt-4 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col" aria-label="App">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-[14px] text-ink2 hover:bg-white">
              <Icon size={16} /> {label}
              {label === "Notifications" && !!count && <span className="ml-auto rounded-full bg-accent px-1.5 text-[11px] text-white">{count}</span>}
            </Link>
          ))}
          {isAdmin && <Link href="/admin/payments" className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-[14px] text-ink2 hover:bg-white"><Shield size={16} /> Admin</Link>}
        </nav>
        <div className="mt-6 hidden rounded-xl border border-line bg-white p-4 lg:block">
          <p className="text-[12px] uppercase tracking-wider text-muted">{profile.plan} plan</p>
          <p className="mt-1 text-[22px] font-medium tracking-tight">{left} <span className="text-[13px] font-normal text-muted">credits left</span></p>
          <div className="mt-2 h-1.5 rounded-full bg-line"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, (profile.credits_used / Math.max(1, profile.credits_total)) * 100)}%` }} /></div>
          {profile.plan === "free" && <Link href="/billing" className="btn btn-primary mt-3 w-full">Upgrade</Link>}
        </div>
        <form action="/auth/signout" method="post" className="mt-4 hidden lg:block"><button className="px-3 text-[13px] text-muted hover:text-accent">Log out</button></form>
      </aside>
      <div className="min-w-0 p-5 lg:p-10">{children}</div>
    </div>
  );
}
