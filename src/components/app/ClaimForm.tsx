"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ClaimForm({ defaultPlan }: { defaultPlan?: string }) {
  const router = useRouter();
  const [plan, setPlan] = useState(["core", "pro", "scale"].includes(defaultPlan ?? "") ? defaultPlan! : "core");
  const [reference, setReference] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/payments/claim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, reference }) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ ok: false, text: data.error ?? "Failed" });
    setMsg({ ok: true, text: "Submitted. We will activate your plan once the payment is verified." });
    setReference("");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-wrap gap-2">
      <select value={plan} onChange={(e) => setPlan(e.target.value)} aria-label="Plan" className="rounded-lg border border-line bg-white px-3 py-2 text-[13px]">
        <option value="core">Core</option><option value="pro">Pro</option><option value="scale">Scale</option>
      </select>
      <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Order reference" aria-label="Order reference" required minLength={4} className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2 text-[13px]" />
      <button disabled={busy} className="btn btn-primary px-4 disabled:opacity-60">{busy ? "Sending…" : "Submit"}</button>
      {msg && <p role="status" className={`w-full text-[13px] ${msg.ok ? "text-green-700" : "text-red-700"}`}>{msg.text}</p>}
    </form>
  );
}
