"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/content";

type Key = keyof typeof NAV;

export function Header({ signedIn = false }: { signedIn?: boolean }) {
  const [open, setOpen] = useState<Key | null>(null);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-transparent bg-cream/90 backdrop-blur" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-8 px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {(Object.keys(NAV) as Key[]).map((k) => (
            <div key={k} className="relative">
              <button
                className="flex items-center gap-1 rounded-md px-3 py-2 text-[14px] text-ink2 hover:text-ink"
                onMouseEnter={() => setOpen(k)}
                onClick={() => setOpen(open === k ? null : k)}
                aria-expanded={open === k}
              >
                {NAV[k].label}
                <ChevronDown size={14} className={`transition ${open === k ? "rotate-180" : ""}`} />
              </button>
            </div>
          ))}
          <Link href="/pricing" className="rounded-md px-3 py-2 text-[14px] text-ink2 hover:text-ink">Pricing</Link>
          
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          
          {signedIn ? (
            <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Log in</Link>
              <Link href="/signup" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </div>
        <button className="ml-auto lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Toggle menu">
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-16 hidden border-b border-line bg-cream shadow-xl lg:block" onMouseEnter={() => setOpen(open)}>
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-8 py-8">
            {NAV[open].groups.map((g) => (
              <div key={g.title}>
                <p className="eyebrow mb-3 text-muted">{g.title}</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} onClick={() => setOpen(null)} className="block rounded-lg p-3 hover:bg-white">
                        <span className="block text-[15px] font-medium tracking-tight">{i.label}</span>
                        <span className="block text-[13px] text-muted">{i.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {mobile && (
        <div className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-cream px-5 pb-8 lg:hidden">
          {(Object.keys(NAV) as Key[]).map((k) => (
            <details key={k} className="border-b border-line py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[16px]">{NAV[k].label}<ChevronDown size={16} /></summary>
              <ul className="mt-2 space-y-1 pl-2">
                {NAV[k].groups.flatMap((g) => g.items).map((i) => (
                  <li key={i.href}><Link href={i.href} onClick={() => setMobile(false)} className="block py-1.5 text-[15px] text-ink2">{i.label}</Link></li>
                ))}
              </ul>
            </details>
          ))}
          <Link href="/pricing" onClick={() => setMobile(false)} className="block border-b border-line py-3 text-[16px]">Pricing</Link>
          
          <div className="mt-5 flex gap-3">
            {signedIn ? (
              <Link href="/dashboard" className="btn btn-primary flex-1 py-3">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost flex-1 py-3">Log in</Link>
                <Link href="/signup" className="btn btn-primary flex-1 py-3">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
