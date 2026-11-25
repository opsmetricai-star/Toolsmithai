import Link from "next/link";
import { ArrowRight, Database, KeyRound, Server, Activity, ShieldCheck, Plug, Brain } from "lucide-react";
import { PromptBox } from "./PromptBox";
import { PricingCards } from "./PricingCards";

export function Hero({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="hero-glow relative bg-[#faf6f1] pb-24 pt-24 lg:pt-32">
      <div className="container-x text-center">
        <h1 className="display h-xl fadeup mx-auto max-w-4xl text-ink2" style={{ fontSize: "clamp(2.25rem,5vw,4rem)" }}>The AI that builds, ships and runs your business software</h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-7 text-ink2">ToolSmithAi analyzes your requirement, generates the application, validates it and revises it on command. Teams move from decision to deployed tool in minutes, not quarters.</p>
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
          <p className="eyebrow text-muted">The AI engine</p>
          <h2 className="display h-lg mx-auto mt-4 max-w-3xl text-ink2">One engine that analyzes, decides and automates the build</h2>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#fba98a] p-10 text-ink">
            <p className="eyebrow">Cost control</p>
            <h3 className="display h-md mt-3">Predictable cost per build</h3>
            <p className="mt-3 max-w-xs text-[15px] text-ink/80">Every build and revision is metered in credits, so finance sees exactly what AI delivery costs.</p>
            <div className="mt-10 inline-flex gap-1 rounded-full bg-white/50 p-1">
              <Pill on>Metered</Pill><Pill>Audited</Pill><Pill>Capped</Pill>
            </div>
            <div className="absolute -bottom-6 right-8 hidden h-40 w-72 rounded-2xl bg-white/70 p-4 text-[12px] shadow-xl floaty md:block">
              <p className="font-medium">Operations lead</p>
              <p className="mt-1 text-muted">Route purchase requests by amount and flag overspend.</p>
              <p className="mt-3 font-medium">ToolSmithAi</p>
              <p className="mt-1 text-muted">Approvals tool built. 1 credit used.</p>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#1d2a24] p-10 text-white" style={{ backgroundImage: "radial-gradient(90% 80% at 80% 20%, #3c5a48 0%, #1d2a24 60%)" }}>
            <p className="eyebrow text-white/70">Conversational delivery</p>
            <h3 className="display h-md mt-3">State the outcome. The AI builds the tool.</h3>
            <p className="mt-3 max-w-xs text-[15px] text-white/80">Operators describe the workflow in plain language and the engine returns a working application.</p>
            <div className="absolute bottom-8 right-8 w-64 rounded-2xl bg-white/15 p-4 text-[13px] backdrop-blur floaty">
              Build complete. Preview is live and version 1 is saved.
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-[#efefef] p-10">
            <p className="eyebrow text-muted">Design exploration</p>
            <h3 className="display h-md mt-3 text-ink2">Compare directions before you commit</h3>
            <p className="mt-3 max-w-[240px] text-[14px] text-ink2">Generate alternatives, compare them and keep the strongest version of the interface.</p>
            <div className="absolute right-8 top-6 hidden w-[240px] space-y-3 sm:block">
              <div className="rounded-xl bg-[#17382a] p-4 text-center text-[11px] tracking-[0.2em] text-[#e9d8a6]">DIRECTION A</div>
              <div className="grid h-24 place-items-center rounded-xl border border-dashed border-[#b24df0] bg-[#f3e6fb] font-mono text-[11px] tracking-[0.15em] text-ink2">DIRECTION B</div>
              <div className="rounded-xl bg-[#f0e4dc] p-4 text-[12px] text-ink2">Direction C</div>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] p-10 text-ink" style={{ background: "linear-gradient(120deg,#ff7a4d 0%,#ff8f66 50%,#ffd2c0 100%)" }}>
            <p className="eyebrow">Model routing</p>
            <h3 className="display h-md mt-3 max-w-sm">The right model for every request</h3>
            <p className="mt-4 max-w-sm text-[14px] leading-6 text-ink/85">Routing sends each request to an available Gemini model and falls back automatically when one is saturated, so builds keep completing.</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/signup" className="btn btn-outline">Sign up <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

const TEMPLATES = [
  { n: "Approvals dashboard", c: "#e9e1d8" }, { n: "Pipeline forecast", c: "#dfe7f2" }, { n: "Supplier scorecard", c: "#e4efe3" }, { n: "Board update deck", c: "#f3e3e0" },
  { n: "Churn-risk board", c: "#ece4f3" }, { n: "Budget model", c: "#e6efe9" }, { n: "Partner portal", c: "#f4ead8" }, { n: "Revenue dashboard", c: "#dde8ee" },
];

export function TemplatesSection() {
  const row = [...TEMPLATES, ...TEMPLATES];
  return (
    <section className="bg-bg py-20">
      <div className="container-x"><h2 className="text-[28px] font-[460] tracking-tight text-[#181818]">Business builds teams start with</h2></div>
      <div className="mt-8 overflow-hidden">
        <div className="marquee flex w-max gap-5 pl-6">
          {row.map((t, i) => (
            <Link key={i} href="/signup" className="card-lift w-[280px] shrink-0 rounded-2xl border border-line bg-white p-3">
              <div className="grid h-40 place-items-center rounded-xl text-[13px] text-ink2" style={{ background: t.c }}>{t.n}</div>
              <p className="mt-3 px-1 text-[14px] font-medium">{t.n}</p>
              <p className="px-1 pb-1 text-[12px] text-muted">Describe it and the AI builds it</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlatformSection() {
  const services = [[KeyRound, "Authentication"], [Database, "Database"], [Server, "Hosting-ready"], [Activity, "Usage ledger"]] as const;
  return (
    <section className="bg-bg py-24">
      <div className="container-x">
        <h2 className="display h-xl mx-auto max-w-3xl text-center text-ink2" style={{ fontSize: "clamp(2.2rem,4.4vw,3rem)" }}>The platform behind every build</h2>
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-10 lg:row-span-2">
            <Brain className="text-accent" />
            <p className="eyebrow mt-4 text-muted">AI Agent</p>
            <h3 className="display h-md mt-3">Requirement in.<br />Working software out.</h3>
            <p className="mt-4 max-w-md text-[15px] text-ink2">The Agent plans the structure, writes the code, validates that the result is a complete document and saves it as a version. Failed builds are never charged.</p>
            <div className="mt-8 rounded-2xl border border-line bg-bg p-5 text-[14px] text-ink2">
              Analyze the requirement. Generate the application. Validate the output. Save the version.
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-10">
            <p className="eyebrow text-muted">Data and identity</p>
            <h3 className="display h-md mt-3">Built on Postgres with row-level security</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {services.map(([Icon, l]) => (
                <div key={l} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-bg p-4 text-center text-[12px]"><Icon size={20} />{l}</div>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-ink2">Authentication, storage and access policies are wired in, so every project is isolated from the first build.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] bg-white p-8">
              <Plug className="text-accent" /><p className="eyebrow mt-4 text-muted">Integrations</p>
              <h3 className="h-sm mt-2">Gemini, Supabase and checkout in one stack</h3>
              <p className="mt-3 text-[14px] text-ink2">Generation, storage and billing work together with no glue code.</p>
            </div>
            <div className="rounded-[28px] bg-white p-8">
              <ShieldCheck className="text-accent" /><p className="eyebrow mt-4 text-muted">Security</p>
              <h3 className="h-sm mt-2">Isolation and verified billing</h3>
              <p className="mt-3 text-[14px] text-ink2">Sandboxed previews, server-side secrets and verified plan changes protect every account.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const OUTCOMES = [
  ["Speed", "Cut delivery time", "A requirement becomes a working application in a single request, removing the backlog wait for internal tools."],
  ["Cost", "Lower the cost per tool", "Credit-metered builds replace per-seat software and agency hours for narrow, repeatable workflows."],
  ["Risk", "Reduce rework and risk", "Every revision is versioned and reversible, and every credit spent is recorded in an audit ledger."],
  ["Decisions", "Decide on working software", "Stakeholders review a live build instead of a specification, so approvals come faster and with less ambiguity."],
  ["Control", "Keep ownership of the code", "Projects are private by default and the full source can be exported at any time."],
  ["Throughput", "Scale delivery with demand", "Higher plans raise monthly build volume so more teams ship in parallel."],
];

export function OutcomesSection() {
  return (
    <section className="bg-[#faf6f1] py-24">
      <div className="container-x">
        <p className="eyebrow text-center text-muted">Business outcomes</p>
        <h2 className="display h-lg mx-auto mt-4 max-w-3xl text-center text-ink2">Faster decisions, lower delivery cost, less risk</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map(([k, t, b]) => (
            <div key={t} className="card-lift flex flex-col rounded-2xl border border-line bg-white p-7">
              <span className="eyebrow text-accent">{k}</span>
              <h3 className="mt-3 text-[19px] font-medium tracking-tight">{t}</h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-6 text-ink2">{b}</p>
            </div>
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
        <h2 className="display text-center text-ink2" style={{ fontSize: "clamp(2.2rem,4vw,2.5rem)", letterSpacing: "-0.06em" }}>Pricing that scales with build volume</h2>
        <p className="mx-auto mt-4 max-w-md text-center text-[15px] text-ink2">Start with a free evaluation, then raise capacity as more teams ship with AI.</p>
        <div className="mt-12"><PricingCards signedIn={signedIn} /></div>
        <p className="mt-8 text-center text-[12px] text-muted">Prices are in USD and billed monthly. Taxes may apply depending on location.</p>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-[#faf6f1] py-28 text-center">
      <div className="container-x">
        <h2 className="display mx-auto max-w-2xl text-ink" style={{ fontSize: "clamp(2.2rem,4vw,2.5rem)", letterSpacing: "-0.04em" }}>Put an AI engine behind your next build</h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink2">Create an account and run your first workflow in minutes.</p>
        <Link href="/signup" className="btn btn-primary btn-lg mt-8">Create account</Link>
      </div>
    </section>
  );
}
