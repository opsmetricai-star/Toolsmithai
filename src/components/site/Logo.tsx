import Link from "next/link";

export function LogoMark({ size = 26 }: { size?: number }) {
  // TS monogram, matches app/icon.svg
  return (
    <svg width={size * 1.3} height={size} viewBox="4 6 170 124" aria-hidden>
      <g fill="#ff3c00">
        <path d="M12 6H126V30H71V80H42V30H12Z" />
        <path d="M92 46H136L171 63L154 72H122L169 102V130H54V114L62 106H134L92 78Z" />
      </g>
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-[22px] font-medium tracking-[-0.05em] text-ink" aria-label="ToolSmithAi home">
      <LogoMark />
      <span>ToolSmith<span className="text-accent">Ai</span></span>
    </Link>
  );
}
