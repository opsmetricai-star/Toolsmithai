import { notFound } from "next/navigation";
import { AppShell, requireProfile } from "@/components/app/AppShell";
import { supabaseAdmin } from "@/lib/supabase/server";
import { ClaimActions } from "@/components/app/ClaimActions";

export const metadata = { title: "Admin · Payments" };
export const dynamic = "force-dynamic";

export default async function AdminPayments() {
  const { user } = await requireProfile();
  const admins = (process.env.ADMIN_EMAILS ?? "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
  if (!user.email || !admins.includes(user.email.toLowerCase())) notFound();
  const { data: claims } = await supabaseAdmin().from("payment_claims").select("id,user_id,plan,reference,status,created_at").order("created_at", { ascending: false }).limit(100);
  return (
    <AppShell>
      <h1 className="display h-md text-ink2">Payment claims</h1>
      <p className="mt-3 max-w-xl text-[13px] text-ink2">Verify each reference in your Selar dashboard before approving. Approving activates the plan and resets credits.</p>
      <ul className="mt-8 max-w-3xl space-y-3">
        {(claims ?? []).map((c) => (
          <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white p-4 text-[13px]">
            <div><p className="font-medium capitalize">{c.plan} · {c.reference}</p><p className="text-muted">{c.user_id} · {new Date(c.created_at).toLocaleString()}</p></div>
            {c.status === "pending" ? <ClaimActions id={c.id} /> : <span className="capitalize text-muted">{c.status}</span>}
          </li>
        ))}
        {!claims?.length && <li className="text-muted">No claims.</li>}
      </ul>
    </AppShell>
  );
}
