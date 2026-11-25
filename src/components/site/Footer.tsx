import Link from "next/link";
import { Logo } from "./Logo";
import { FOOTER } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#faf5f0]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[14px] leading-6 text-muted">
              The AI engine that turns business requirements into running software.
            </p>
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
        <p className="mt-12 border-t border-line pt-6 text-[13px] text-muted">All rights reserved. Copyright © 2026 ToolSmithAi.</p>
      </div>
    </footer>
  );
}
