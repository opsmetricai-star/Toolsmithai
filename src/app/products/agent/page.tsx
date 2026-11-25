import Link from "next/link";
import { Brain, ShieldCheck, FlaskConical, Workflow, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/Home";
import { AGENT_FAQ } from "@/lib/content";

export const metadata = { title: "AI Agent: Build Apps Through Chat" };

const BLOCKS = [
  { icon: Sparkles, title: "Build & refine your app with the Agent", body: "Tell the Agent what kind of app or site you want. Then keep improving it with feedback. Each revision is applied to the same project and saved as a version." },
  { icon: Brain, title: "Use stronger models for harder tasks", body: "For open-ended work such as design overhauls or restructuring, ToolSmithAi routes to the most capable model available and retries automatically if one is busy." },
  { icon: ShieldCheck, title: "Built-in services, safely connected", body: "Authentication, a Postgres database and row-level security are part of the platform. Keys stay on the server and never reach the browser." },
  { icon: FlaskConical, title: "The Agent validates its own output", body: "Every response is checked to be a complete document before it replaces your project. If it is not, you are not charged." },
  { icon: Workflow, title: "Automations are on the roadmap", body: "Agent-built workflows and Slack or email triggers are planned. We list them here so you know what is not available yet." },
];

const QUOTES = [
  ["I have always hired developers for the simplest things. Now I describe it and it exists.", "Naomi Clarke", "Brand designer"],
  ["I asked for a job board clone to see how far one prompt would go. The prototype was surprisingly usable.", "Rafael Ortiz", "Startup advisor"],
  ["Other builders felt rigid. This goes from zero to one at speed. My developer would have needed a week.", "Tessa Lindgren", "Growth lead"],
];

export default async function AgentPage() {
  return (
    <SiteShell>
      <section className="bg-[#faf6f1] pb-20 pt-24 text-center lg:pt-32">
        <div className="container-x max-w-3xl">
          <h1 className="display h-xl text-ink2" style={{ fontSize: "clamp(2.2rem,5vw,3.75rem)" }}>The best AI agent for production-ready apps</h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-7 text-ink2">Tell the ToolSmithAi Agent your app, website or tool idea and it builds it through chat. It is like having an engineering team on demand, with no coding experience required.</p>
          <Link href="/signup" className="btn btn-primary btn-lg mt-8">Get started</Link>
        </div>
      </section>
      <section className="bg-bg py-20"><div className="container-x grid gap-5 md:grid-cols-2">
        {BLOCKS.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className={`card-lift rounded-[24px] bg-white p-9 ${i === 0 ? "md:col-span-2" : ""}`}>
            <Icon className="text-accent" /><h2 className="h-sm mt-4 text-[24px]">{title}</h2><p className="mt-3 max-w-xl text-[14.5px] leading-6 text-ink2">{body}</p>
          </div>
        ))}
      </div></section>
      <section className="bg-[#faf6f1] py-20"><div className="container-x">
        <h2 className="display h-md text-center text-ink2">Get inspired by our community</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {QUOTES.map(([q, n, r]) => <figure key={n} className="rounded-2xl border border-line bg-white p-7"><blockquote className="text-[14.5px] leading-6 text-ink2">“{q}”</blockquote><figcaption className="mt-5 text-[13px]"><b>{n}</b><br /><span className="text-muted">{r}</span></figcaption></figure>)}
        </div>
      </div></section>
      <section className="bg-[#fba98a] py-20 text-center"><div className="container-x max-w-2xl"><p className="eyebrow">What is the ToolSmithAi Agent?</p><h2 className="display h-md mt-3">Turn your next idea into a working app</h2><p className="mt-4 text-[15px]">Tell the Agent what you want, refine it through conversation, and share it from one workspace.</p><Link href="/signup" className="btn btn-primary btn-lg mt-8">Get started</Link></div></section>
      <Faq items={AGENT_FAQ} title="FAQ" />
      <FinalCta />
    </SiteShell>
  );
}
