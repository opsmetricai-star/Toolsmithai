"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ClaimActions({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function act(action: "approve" | "reject") {
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/admin/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ claimId: id, action }) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setErr(data.error ?? "Failed");
    router.refresh();
  }
  return (
    <div className="flex items-center gap-2">
      {err && <span className="text-red-700">{err}</span>}
      <button disabled={busy} onClick={() => act("approve")} className="btn btn-primary px-3 py-1.5">Approve</button>
      <button disabled={busy} onClick={() => act("reject")} className="btn btn-ghost">Reject</button>
    </div>
  );
}
