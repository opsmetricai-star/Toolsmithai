import Link from "next/link";
import { Logo } from "./Logo";
import { FOOTER } from "@/lib/content";

const SOCIAL = ["X", "YouTube", "LinkedIn", "Instagram", "Facebook", "TikTok"];

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#faf5f0]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-6 text-muted">
              ToolSmithAi is the AI platform for turning ideas into real outcomes. Describe what you want in plain language, then build, launch and grow apps, sites and tools in one place.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink2">
              {SOCIAL.map((s) => (
                <li key={s}><a href="#" aria-label={`ToolSmithAi on ${s}`} className="hover:text-accent">{s}</a></li>
              ))}
            </ul>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <h2 className="text-[14px] font-semibold text-[#111827]">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="text-[14px] text-ink2 hover:text-accent">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 border-t border-line pt-6 text-[13px] text-muted">All rights reserved. Copyright © 2026 ToolSmithAi.</p>
      </div>
    </footer>
  );
}
