import Link from "next/link";
import { ArrowRight, Database, KeyRound, Server, Activity, ShieldCheck, Plug, Send } from "lucide-react";
import { PromptBox } from "./PromptBox";
import { PricingCards } from "./PricingCards";
import { TESTIMONIALS } from "@/lib/content";

export function Hero({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="hero-glow relative bg-[#faf6f1] pb-24 pt-24 lg:pt-36">
      <div className="container-x text-center">
        <h1 className="display h-xl fadeup text-ink2">What will you build?</h1>
        <p className="mt-6 text-[15px] text-ink2">Turn ideas into apps in minutes — no coding needed</p>
        <div className="mt-10"><PromptBox signedIn={signedIn} /></div>
      </div>
    </section>
  );
}

function Pill({ children, on }: { children: React.ReactNode; on?: boolean }) {
  return <span className={`rounded-full px-3 py-1 text-[12px] ${on ? "bg-white text-ink shadow-sm" : "text-muted"}`}>{children}</span>;
}

export function MeetSection() {
  return (
    <section className="bg-[#faf6f1] pb-24">
      <div className="container-x">
        <div className="text-center">
          <p className="eyebrow text-muted">Meet ToolSmithAi</p>
          <h2 className="display h-lg mt-4 text-ink2">Maximize Making on ToolSmithAi</h2>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Free mode */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#fba98a] p-10 text-ink min-h-[360px]">
            <p className="eyebrow">Free mode</p>
            <h3 className="display h-md mt-3">Create without token costs</h3>
            <p className="mt-3 max-w-xs text-[15px] text-ink/80">Brainstorm and create at no cost.</p>
            <div className="mt-10 inline-flex gap-1 rounded-full bg-white/50 p-1">
              <Pill on>Free</Pill><Pill>Power</Pill><Pill>Max</Pill>
            </div>
            <div className="absolute -bottom-6 right-8 hidden h-40 w-72 rounded-2xl bg-white/70 p-4 text-[12px] shadow-xl floaty md:block">
              <p className="font-medium">Sarah</p>
              <p className="mt-1 text-muted">I have an idea to create a mood board.</p>
              <p className="mt-3 font-medium">ToolSmithAi</p>
              <p className="mt-1 text-muted">Great! Here&apos;s the plan…</p>
            </div>
          </div>
          {/* Chat */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#1d2a24] p-10 text-white min-h-[360px]" style={{ backgroundImage: "radial-gradient(90% 80% at 80% 20%, #3c5a48 0%, #1d2a24 60%)" }}>
            <p className="eyebrow text-white/70">Chat</p>
            <h3 className="display h-md mt-3">Chat that flows</h3>
            <p className="mt-3 max-w-xs text-[15px] text-white/80">Just ask what you need, and ToolSmithAi takes care of the rest.</p>
            <div className="absolute bottom-8 right-8 w-64 rounded-2xl bg-white/15 p-4 text-[13px] backdrop-blur floaty">
              Perfect! Let&apos;s create a project from here!
            </div>
          </div>
          {/* Canvas */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#efefef] p-10 min-h-[320px]">
            <p className="eyebrow text-muted">Infinite canvas</p>
            <h3 className="display h-md mt-3 text-ink2">Design Freely</h3>
            <p className="mt-3 max-w-[240px] text-[14px] text-ink2">A new space to explore and tweak designs visually, then apply them directly to your app.</p>
            <div className="absolute right-8 top-6 hidden w-[240px] space-y-3 sm:block">
              <div className="rounded-xl bg-[#17382a] p-4 text-center text-[11px] tracking-[0.2em] text-[#e9d8a6]">CHROMATICA</div>
              <div className="grid h-24 place-items-center rounded-xl border border-dashed border-[#b24df0] bg-[#f3e6fb] font-mono text-[11px] tracking-[0.15em] text-ink2">EXPLORE A NEW VIBE</div>
              <div className="rounded-xl bg-[#f0e4dc] p-4 text-[12px] text-ink2">Current Exhibition — Beyond Horizons</div>
            </div>
          </div>
          {/* Routing */}
          <div className="relative overflow-hidden rounded-[28px] p-10 min-h-[320px] text-ink" style={{ background: "linear-gradient(120deg,#ff7a4d 0%,#ff8f66 50%,#ffd2c0 100%)" }}>
            <p className="eyebrow">Intelligent model routing</p>
            <h3 className="display h-md mt-3 max-w-sm">The best model for every task</h3>
            <p className="mt-4 max-w-sm text-[14px] leading-6 text-ink/85">Routing sends each request to the model that fits it, so you get the same quality of output at a lower average cost than running the heaviest model every time.</p>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6">
          <Link href="/signup" className="btn btn-outline">Try Free Mode <ArrowRight size={16} /></Link>
          <Link href="/docs" className="text-[14px] text-ink2 hover:text-accent">Read the documentation</Link>
        </div>
      </div>
    </section>
  );
}

const TEMPLATES = [
  { n: "Portfolio", c: "#e9e1d8" }, { n: "SaaS landing", c: "#dfe7f2" }, { n: "Kanban board", c: "#e4efe3" }, { n: "Pitch deck", c: "#f3e3e0" },
  { n: "Mood board", c: "#ece4f3" }, { n: "Budget tracker", c: "#e6efe9" }, { n: "Recipe book", c: "#f4ead8" }, { n: "Sales dashboard", c: "#dde8ee" },
];

export function TemplatesSection() {
  const row = [...TEMPLATES, ...TEMPLATES];
  return (
    <section className="bg-bg py-20">
      <div className="container-x"><h2 className="text-[28px] font-[460] tracking-tight text-[#181818]">Get started with templates</h2></div>
      <div className="mt-8 overflow-hidden">
        <div className="marquee flex w-max gap-5 pl-6">
          {row.map((t, i) => (
            <Link key={i} href="/templates" className="card-lift w-[280px] shrink-0 rounded-2xl border border-line bg-white p-3">
              <div className="grid h-40 place-items-center rounded-xl text-[13px] text-ink2" style={{ background: t.c }}>{t.n}</div>
              <p className="mt-3 px-1 text-[14px] font-medium">{t.n}</p>
              <p className="px-1 pb-1 text-[12px] text-muted">Start from a working base</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlatformSection() {
  const services = [[KeyRound, "Authentication"], [Database, "Database"], [Server, "Hosting"], [Activity, "Monitoring"]] as const;
  return (
    <section className="bg-bg py-24">
      <div className="container-x">
        <h2 className="display h-xl text-center text-ink2" style={{ fontSize: "clamp(2.2rem,4.4vw,3rem)" }}>Powered by the ToolSmithAi platform</h2>
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-10 lg:row-span-2">
            <p className="eyebrow text-muted">Agent</p>
            <h3 className="display h-md mt-3">Describe It.<br />Publish It.</h3>
            <p className="mt-4 max-w-md text-[15px] text-ink2">Describe and publish your project. ToolSmithAi writes production-quality code, evolves it with you, and stays out of your way.</p>
            <div className="mt-8 rounded-2xl border border-line bg-bg p-5">
              <p className="text-[14px]">Make my idea come true</p>
              <div className="mt-6 flex justify-end"><span className="btn btn-primary"><Send size={14} /> Publish</span></div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-10">
            <p className="eyebrow text-muted">Full stack infrastructure</p>
            <h3 className="display h-md mt-3">Build &amp; Scale Your Apps Easily.</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {services.map(([Icon, l]) => (
                <div key={l} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-bg p-4 text-[12px]"><Icon size={20} />{l}</div>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-ink2">Built-in services with zero setup — authentication, database, hosting and monitoring, so your app can scale securely from day one.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] bg-white p-8">
              <Plug className="text-accent" /><p className="eyebrow mt-4 text-muted">Integrations</p>
              <h3 className="h-sm mt-2">Connect To AI &amp; Services.</h3>
              <p className="mt-3 text-[14px] text-ink2">Add AI and 100+ integrations. Connect to Gemini, payment providers, email and more in minutes.</p>
            </div>
            <div className="rounded-[28px] bg-white p-8">
              <ShieldCheck className="text-accent" /><p className="eyebrow mt-4 text-muted">Enterprise control</p>
              <h3 className="h-sm mt-2">Secure Your Apps As They Scale.</h3>
              <p className="mt-3 text-[14px] text-ink2">Row-level security, role-based admin controls and screening keep apps safe as your team grows.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-[#faf6f1] py-24">
      <div className="container-x">
        <p className="eyebrow text-center text-muted">Endorsed by innovators</p>
        <h2 className="display h-lg mt-4 text-center text-ink2">Trusted by builders</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card-lift flex flex-col rounded-2xl border border-line bg-white p-7">
              <span className="text-4xl leading-none text-accent">“</span>
              <blockquote className="mt-2 flex-1 text-[14.5px] leading-6 text-ink2">{t.quote}</blockquote>
              <figcaption className="mt-6 text-[13px]"><span className="font-medium text-ink">{t.name}</span><br /><span className="text-muted">{t.role}, {t.co}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="bg-bg py-24">
      <div className="container-x">
        <h2 className="display text-center text-ink2" style={{ fontSize: "clamp(2.2rem,4vw,2.5rem)", letterSpacing: "-0.06em" }}>Start Small. Scale Fast.</h2>
        <p className="mx-auto mt-4 max-w-md text-center text-[15px] text-ink2">Experience the power of our generous free plan, and upgrade when you&apos;re ready to scale.</p>
        <div className="mt-12"><PricingCards signedIn={signedIn} /></div>
        <p className="mt-8 text-center text-[12px] text-muted">Prices are in USD and billed monthly. Taxes may apply depending on your location.</p>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-[#faf6f1] py-28 text-center">
      <div className="container-x">
        <h2 className="display text-ink" style={{ fontSize: "clamp(2.2rem,4vw,2.5rem)", letterSpacing: "-0.04em" }}>What are you waiting for?</h2>
        <p className="mt-4 text-[15px] text-ink2">Join thousands of builders who use ToolSmithAi to bring their ideas to life.</p>
        <Link href="/signup" className="btn btn-primary btn-lg mt-8">Get started</Link>
      </div>
    </section>
  );
}
