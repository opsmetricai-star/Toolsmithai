import Link from "next/link";

export function LogoMark({ size = 22 }: { size?: number }) {
  // Original mark: an anvil-like stack of three blocks.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="3" width="13" height="6" rx="1.5" fill="#ff3c00" />
      <rect x="9" y="9" width="6" height="6" fill="#ff3c00" />
      <rect x="9" y="15" width="13" height="6" rx="1.5" fill="#ff3c00" />
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-[22px] font-medium tracking-[-0.05em] text-ink" aria-label="ToolSmithAi home">
      <LogoMark />
      <span>ToolSmith<span className="text-accent">Ai</span></span>
    </Link>
  );
}
