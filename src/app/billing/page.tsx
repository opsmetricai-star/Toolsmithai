import { AppShell, requireProfile } from "@/components/app/AppShell";
import { PLANS } from "@/lib/content";
import { ClaimForm } from "@/components/app/ClaimForm";

export const metadata = { title: "Billing" };
export const dynamic = "force-dynamic";

export default async function Billing({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan: wanted } = await searchParams;
  const { sb, profile } = await requireProfile();
  const [{ data: subs }, { data: claims }] = await Promise.all([
    sb.from("subscriptions").select("id,plan,status,started_at,current_period_end,provider_reference").order("started_at", { ascending: false }),
    sb.from("payment_claims").select("id,plan,reference,status,created_at").order("created_at", { ascending: false }),
  ]);
  return (
    <AppShell>
      <h1 className="display h-md text-ink2">Billing</h1>
      <p className="mt-3 text-[14px] text-ink2">Current plan: <b className="capitalize">{profile.plan}</b> · {profile.credits_total} credits / month</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PLANS.filter((p) => p.link).map((p) => (
          <div key={p.id} className={`rounded-2xl border bg-white p-6 ${wanted === p.id ? "border-accent" : "border-line"}`}>
            <h2 className="text-[22px] font-medium tracking-tight">{p.name}</h2>
            <p className="text-[13px] text-muted">${p.price} / month · {p.credits} credits</p>
            <ul className="mt-4 space-y-1.5 text-[13px] text-ink2">{p.features.map((f) => <li key={f}>• {f}</li>)}</ul>
            {profile.plan === p.id ? <p className="mt-5 text-[13px] text-muted">Your current plan</p> : (
              <a href={p.link!} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full py-2.5">Pay for {p.name}</a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-xl rounded-2xl border border-line bg-white p-6">
        <h2 className="text-[17px] font-medium">Already paid?</h2>
        <p className="mt-1 text-[13px] text-ink2">Paying does not unlock your plan automatically. Enter the order reference from your receipt and we will verify it against the payment provider, then activate your plan.</p>
        <ClaimForm defaultPlan={wanted} />
      </div>

      <h2 className="mt-12 text-[17px] font-medium">Payment claims</h2>
      <ul className="mt-3 max-w-xl space-y-2 text-[13px]">
        {(claims ?? []).map((c) => <li key={c.id} className="flex justify-between rounded-lg border border-line bg-white p-3"><span className="capitalize">{c.plan} · {c.reference}</span><span className="capitalize text-muted">{c.status}</span></li>)}
        {!claims?.length && <li className="text-muted">None yet.</li>}
      </ul>
      <h2 className="mt-10 text-[17px] font-medium">Subscription history</h2>
      <ul className="mt-3 max-w-xl space-y-2 text-[13px]">
        {(subs ?? []).map((s) => <li key={s.id} className="flex justify-between rounded-lg border border-line bg-white p-3"><span className="capitalize">{s.plan} · {s.status}</span><span className="text-muted">renews {s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}</span></li>)}
        {!subs?.length && <li className="text-muted">No paid subscriptions.</li>}
      </ul>
    </AppShell>
  );
}
