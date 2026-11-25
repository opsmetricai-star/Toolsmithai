import { AppShell, requireProfile } from "@/components/app/AppShell";
import { MarkRead } from "@/components/app/MarkRead";

export const metadata = { title: "Notifications" };
export const dynamic = "force-dynamic";

export default async function Notifications() {
  const { sb } = await requireProfile();
  const { data } = await sb.from("notifications").select("id,title,body,read,created_at").order("created_at", { ascending: false }).limit(50);
  return (
    <AppShell>
      <div className="flex items-center justify-between"><h1 className="display h-md text-ink2">Notifications</h1><MarkRead /></div>
      <ul className="mt-8 max-w-2xl space-y-3">
        {(data ?? []).map((n) => (
          <li key={n.id} className={`rounded-xl border p-4 ${n.read ? "border-line bg-white" : "border-accent/40 bg-[#fff6f2]"}`}>
            <p className="text-[14px] font-medium">{n.title}</p>
            {n.body && <p className="mt-1 text-[13px] text-ink2">{n.body}</p>}
            <p className="mt-2 text-[11px] text-muted">{new Date(n.created_at).toLocaleString()}</p>
          </li>
        ))}
        {!data?.length && <li className="text-[14px] text-muted">You&apos;re all caught up.</li>}
      </ul>
    </AppShell>
  );
}
