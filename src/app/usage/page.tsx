import { AppShell, requireProfile } from "@/components/app/AppShell";

export const metadata = { title: "Usage" };
export const dynamic = "force-dynamic";

export default async function Usage() {
  const { sb, profile } = await requireProfile();
  const { data: events } = await sb.from("usage_events").select("id,kind,credits,model,created_at,project_id").order("created_at", { ascending: false }).limit(100);
  const left = Math.max(0, profile.credits_total - profile.credits_used);
  const pct = Math.min(100, (profile.credits_used / Math.max(1, profile.credits_total)) * 100);

  // last 14 days bar chart (deterministic aggregation)
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });
  const perDay = Object.fromEntries(days.map((d) => [d, 0]));
  (events ?? []).forEach((e) => { const k = e.created_at.slice(0, 10); if (k in perDay) perDay[k] += e.credits; });
  const max = Math.max(1, ...Object.values(perDay));

  return (
    <AppShell>
      <h1 className="display h-md text-ink2">Usage</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[["Plan", profile.plan], ["Credits used", `${profile.credits_used} / ${profile.credits_total}`], ["Credits left", String(left)]].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-white p-5"><p className="text-[12px] uppercase tracking-wider text-muted">{k}</p><p className="mt-1 text-[26px] font-medium capitalize tracking-tight">{v}</p></div>
        ))}
      </div>
      <div className="mt-5 h-2 max-w-3xl rounded-full bg-line"><div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>

      <h2 className="mt-12 text-[18px] font-medium">Last 14 days</h2>
      <div className="mt-4 flex h-40 max-w-3xl items-end gap-2 rounded-xl border border-line bg-white p-4" role="img" aria-label="Credits used per day over the last 14 days">
        {days.map((d) => (
          <div key={d} className="flex flex-1 flex-col items-center justify-end gap-1" title={`${d}: ${perDay[d]}`}>
            <div className="w-full rounded-t bg-accent/80" style={{ height: `${(perDay[d] / max) * 100}%`, minHeight: perDay[d] ? 4 : 1 }} />
            <span className="text-[9px] text-muted">{d.slice(8)}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-[18px] font-medium">Recent activity</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-line text-muted"><tr><th className="p-3 font-normal">When</th><th className="p-3 font-normal">Type</th><th className="p-3 font-normal">Model</th><th className="p-3 font-normal">Credits</th></tr></thead>
          <tbody>
            {(events ?? []).map((e) => (
              <tr key={e.id} className="border-b border-line last:border-0"><td className="p-3">{new Date(e.created_at).toLocaleString()}</td><td className="p-3 capitalize">{e.kind}</td><td className="p-3">{e.model}</td><td className="p-3">{e.credits}</td></tr>
            ))}
            {!events?.length && <tr><td colSpan={4} className="p-6 text-center text-muted">No usage yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
