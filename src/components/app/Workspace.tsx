"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowLeft, Download, ExternalLink, Loader2, Send, Code2, Eye, Globe, Lock } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

type Msg = { id: string; role: "user" | "assistant"; content: string };
type Version = { id: string; prompt: string | null; created_at: string };

export function Workspace(props: { id: string; name: string; initialHtml: string; isPublic: boolean; messages: Msg[]; versions: Version[] }) {
  const router = useRouter();
  const [html, setHtml] = useState(props.initialHtml);
  const [msgs, setMsgs] = useState<Msg[]>(props.messages);
  const [versions, setVersions] = useState(props.versions);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [isPublic, setIsPublic] = useState(props.isPublic);
  const endRef = useRef<HTMLDivElement>(null);

  async function send() {
    const prompt = input.trim();
    if (!prompt || busy) return;
    setBusy(true);
    setError(null);
    setMsgs((m) => [...m, { id: "tmp-u", role: "user", content: prompt }]);
    setInput("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId: props.id, mode: "website", prompt }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setHtml(data.html);
      setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: data.summary }]);
      setVersions((v) => [{ id: crypto.randomUUID(), prompt, created_at: new Date().toISOString() }, ...v]);
      router.refresh();
    } catch (e) {
      setMsgs((m) => m.filter((x) => x.id !== "tmp-u"));
      setInput(prompt);
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusy(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  async function restore(versionId: string) {
    const sb = supabaseBrowser();
    const { data } = await sb.from("project_versions").select("html").eq("id", versionId).single();
    if (!data) return setError("Could not load that version.");
    await sb.from("projects").update({ html: data.html, updated_at: new Date().toISOString() }).eq("id", props.id);
    setHtml(data.html);
  }

  async function togglePublic() {
    const next = !isPublic;
    const { error } = await supabaseBrowser().from("projects").update({ is_public: next }).eq("id", props.id);
    if (error) return setError("Could not change visibility.");
    setIsPublic(next);
  }

  function download() {
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "project"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-screen flex-col bg-bg lg:flex-row">
      <section className="flex max-h-[45vh] min-h-0 flex-col border-b border-line bg-[#faf6f1] lg:max-h-none lg:w-[400px] lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Link href="/dashboard" aria-label="Back to projects"><ArrowLeft size={18} /></Link>
          <h1 className="truncate text-[14px] font-medium">{props.name}</h1>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4 text-[14px]" aria-live="polite">
          {msgs.length === 0 && <p className="text-muted">Ask for changes to refine this project.</p>}
          {msgs.map((m, i) => (
            <div key={m.id + i} className={m.role === "user" ? "ml-8 rounded-xl bg-white p-3" : "mr-8 rounded-xl bg-[#fff1ec] p-3 text-ink2"}>{m.content}</div>
          ))}
          {busy && <div className="flex items-center gap-2 text-muted"><Loader2 size={14} className="animate-spin" /> Working on it…</div>}
          <div ref={endRef} />
        </div>
        {error && <p role="alert" className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>}
        <div className="border-t border-line p-3">
          <div className="flex items-end gap-2 rounded-xl border border-line bg-white p-2">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} rows={2} placeholder="Describe a change… (1 credit)" aria-label="Request a change" className="flex-1 resize-none bg-transparent px-2 text-[14px] outline-none" />
            <button onClick={send} disabled={busy || !input.trim()} aria-label="Send" className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white disabled:opacity-40"><Send size={15} /></button>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-4 py-2 text-[13px]">
          <div className="flex rounded-lg border border-line p-0.5">
            <button onClick={() => setTab("preview")} className={`flex items-center gap-1.5 rounded-md px-3 py-1 ${tab === "preview" ? "bg-bg" : ""}`}><Eye size={14} /> Preview</button>
            <button onClick={() => setTab("code")} className={`flex items-center gap-1.5 rounded-md px-3 py-1 ${tab === "code" ? "bg-bg" : ""}`}><Code2 size={14} /> Code</button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <select aria-label="Restore version" className="rounded-lg border border-line bg-white px-2 py-1.5" defaultValue="" onChange={(e) => { if (e.target.value) restore(e.target.value); e.target.value = ""; }}>
              <option value="">History ({versions.length})</option>
              {versions.map((v) => <option key={v.id} value={v.id}>{new Date(v.created_at).toLocaleString()} — {(v.prompt ?? "").slice(0, 30)}</option>)}
            </select>
            <button onClick={togglePublic} className="btn btn-ghost">{isPublic ? <Globe size={14} /> : <Lock size={14} />}{isPublic ? "Public" : "Private"}</button>
            {isPublic && <a href={`/p/${props.id}`} target="_blank" rel="noreferrer" className="btn btn-ghost"><ExternalLink size={14} /> Open</a>}
            <button onClick={download} className="btn btn-ghost"><Download size={14} /> Download</button>
          </div>
        </div>
        {tab === "preview" ? (
          html ? <iframe title="Project preview" sandbox="allow-scripts allow-forms allow-modals allow-popups" srcDoc={html} className="min-h-0 w-full flex-1 bg-white" /> : <p className="p-8 text-muted">Nothing generated yet.</p>
        ) : (
          <pre className="min-h-0 flex-1 overflow-auto bg-[#17181a] p-5 font-mono text-[12px] leading-5 text-[#e6e6e6]"><code>{html}</code></pre>
        )}
      </section>
    </div>
  );
}
