import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { PLANS } from "@/lib/content";

const TINT: Record<string, string> = {
  free: "bg-white border-line",
  core: "bg-[#fbf1ed] border-[#ff6a3d]",
  pro: "bg-[#f1f5fa] border-[#dde6f0]",
  scale: "bg-[#f4f1fa] border-[#e3dcf0]",
};

export function PricingCards({ signedIn, current }: { signedIn: boolean; current?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {PLANS.map((p) => (
        <div key={p.id} className={`flex flex-col rounded-2xl border p-7 ${TINT[p.id]}`}>
          <h3 className="text-[32px] font-medium tracking-[-0.05em]">{p.name}</h3>
          <p className="mt-2 text-[13px] text-muted"><span className="text-[22px] font-medium text-ink">${p.price}</span> / month</p>
          <p className="mt-4 text-[14px] text-ink2">{p.blurb}</p>
          <ul className="mt-6 flex-1 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[13.5px] text-ink2">
                {f.startsWith("Everything") ? <Plus size={15} className="mt-0.5 shrink-0" /> : <Check size={15} className="mt-0.5 shrink-0 text-ink" />}
                <span>{f}</span>
              </li>
            ))}
          </ul>
          {current === p.id ? (
            <span className="btn btn-ghost mt-8 py-3">Current plan</span>
          ) : p.id === "free" ? (
            <Link href={signedIn ? "/dashboard" : "/signup"} className="btn btn-ghost mt-8 py-3">{signedIn ? "Dashboard" : "Sign up"}</Link>
          ) : signedIn ? (
            <Link href={`/billing?plan=${p.id}`} className="btn btn-primary mt-8 py-3">Upgrade</Link>
          ) : (
            <Link href={`/signup?plan=${p.id}`} className="btn btn-primary mt-8 py-3">Sign up</Link>
          )}
        </div>
      ))}
    </div>
  );
}
