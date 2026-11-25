"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { BUILD_MODES } from "@/lib/content";

export function NewProject() {
  const router = useRouter();
  const [mode, setMode] = useState("website");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("ts_pending");
    if (raw) {
      try {
        const p = JSON.parse(raw);
        setPrompt(p.prompt ?? "");
        setMode(p.mode ?? "website");
      } catch {}
      sessionStorage.removeItem("ts_pending");
    }
  }, []);

  async function build() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, prompt }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      router.push(`/project/${data.projectId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
      setBusy(false);
    }
  }

  const placeholder = BUILD_MODES.find((m) => m.id === mode)?.placeholder;
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project type">
        {BUILD_MODES.map((m) => (
          <button key={m.id} role="tab" aria-selected={mode === m.id} onClick={() => setMode(m.id)} className={`rounded-full border px-3 py-1 text-[12.5px] ${mode === m.id ? "border-accent bg-[#fff1ec] text-accent" : "border-line text-ink2 hover:bg-bg"}`}>{m.label}</button>
        ))}
      </div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} maxLength={4000} placeholder={placeholder} aria-label="Describe your project" disabled={busy}
        className="mt-4 w-full resize-none rounded-xl bg-bg p-4 text-[15px] outline-none focus:ring-1 focus:ring-accent/50" />
      {error && <p role="alert" className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[12px] text-muted">Uses 1 credit. Generation can take up to a minute.</p>
        <button onClick={build} disabled={busy || prompt.trim().length < 3} className="btn btn-primary px-5 py-2.5 disabled:opacity-50">
          {busy ? <><Loader2 size={15} className="animate-spin" /> Building…</> : <>Build it <ArrowRight size={15} /></>}
        </button>
      </div>
    </div>
  );
}
