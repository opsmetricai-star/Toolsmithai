"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Plus, RefreshCw, Globe, Smartphone, PenTool, Layers, Play, BarChart3, Box, FileText, Table2, ChevronDown } from "lucide-react";
import { BUILD_MODES, EXAMPLE_PROMPTS } from "@/lib/content";

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  globe: Globe, phone: Smartphone, pen: PenTool, layers: Layers, play: Play, chart: BarChart3, cube: Box, file: FileText, table: Table2,
};

export function PromptBox({ signedIn, compact = false }: { signedIn: boolean; compact?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<string>("website");
  const [text, setText] = useState("");
  const [ex, setEx] = useState(0);
  const [more, setMore] = useState(false);
  const current = BUILD_MODES.find((m) => m.id === mode)!;
  const visible = more ? BUILD_MODES : BUILD_MODES.slice(0, 5);

  function go() {
    const prompt = text.trim();
    if (prompt) sessionStorage.setItem("ts_pending", JSON.stringify({ prompt, mode }));
    router.push(signedIn ? "/dashboard" : "/signup");
  }

  return (
    <div className="mx-auto w-full max-w-[650px]">
      <div className="rounded-[20px] border border-line bg-[#f6f5f4]/90 p-4 shadow-[0_8px_40px_-20px_rgba(255,120,60,.35)] transition focus-within:border-accent/40">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(); } }}
          rows={compact ? 2 : 2}
          placeholder={`Describe your idea, ToolSmithAi will bring it to life…`}
          aria-label="Describe what you want to build"
          className="w-full resize-none bg-transparent text-[15px] text-ink placeholder:text-muted/80 focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[13px] text-muted"><Plus size={16} /> <span className="sr-only">Add</span>{current.label}</span>
          <button onClick={go} aria-label="Start building" className={`grid h-8 w-8 place-items-center rounded-full text-white transition ${text.trim() ? "bg-accent" : "bg-[#ffa98a]"}`}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-4">
        {visible.map((m) => {
          const Icon = ICONS[m.icon];
          const active = m.id === mode;
          return (
            <button key={m.id} onClick={() => { setMode(m.id); setText((t) => t || ""); }} className="group flex w-[76px] flex-col items-center gap-2">
              <span className={`grid h-12 w-12 place-items-center rounded-xl border bg-white/70 transition group-hover:bg-white ${active ? "border-accent text-accent" : "border-line text-ink2"}`}><Icon size={18} /></span>
              <span className={`text-center text-[12px] leading-tight ${active ? "text-ink" : "text-ink2"}`}>{m.label}</span>
            </button>
          );
        })}
        {!more && (
          <button onClick={() => setMore(true)} className="group flex w-[76px] flex-col items-center gap-2" aria-label="Show more build types">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white/70 text-ink2 group-hover:bg-white"><ChevronDown size={18} /></span>
            <span className="text-[12px] text-ink2">More</span>
          </button>
        )}
      </div>

      <button
        onClick={() => { const n = (ex + 1) % EXAMPLE_PROMPTS.length; setEx(n); setText(EXAMPLE_PROMPTS[n]); }}
        className="mx-auto mt-6 flex items-center gap-2 text-[12px] text-muted hover:text-ink"
      >
        Try an example prompt <RefreshCw size={12} />
      </button>
    </div>
  );
}
