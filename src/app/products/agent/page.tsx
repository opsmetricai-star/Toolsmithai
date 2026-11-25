import Link from "next/link";
import { Brain, ShieldCheck, FlaskConical, Layers, Gauge } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/Home";
import { AGENT_FAQ } from "@/lib/content";

export const metadata = { title: "AI Agent: from business requirement to running software" };

const BLOCKS = [
  { icon: Brain, title: "Analyzes the requirement and builds the application", body: "State the outcome in plain language. The Agent plans the structure, writes the code and returns a live preview. Each revision is applied to the same project and stored as a version." },
  { icon: Gauge, title: "Routes every request to an available model", body: "Requests go to Gemini models in order of preference. If a model is saturated or rate-limited, the Agent moves to the next one so the build still completes." },
  { icon: ShieldCheck, title: "Runs on isolated data with enforced access", body: "Authentication, Postgres storage and row-level security are part of the platform. Service keys stay on the server and never reach the browser." },
  { icon: FlaskConical, title: "Validates its output before charging", body: "Each response is checked to be a complete document before it replaces your project. If validation fails, the credit is refunded automatically." },
  { icon: Layers, title: "Keeps a version for every decision", body: "Every build and revision is saved with the instruction that produced it, so teams compare approaches and restore any earlier state." },
];

export default function AgentPage() {
  return (
    <SiteShell>
      <section className="bg-[#faf6f1] pb-20 pt-24 text-center lg:pt-32">
        <div className="container-x max-w-3xl">
          <h1 className="display h-xl text-ink2" style={{ fontSize: "clamp(2.2rem,5vw,3.75rem)" }}>The AI agent that turns business requirements into production-ready software</h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-7 text-ink2">Describe the workflow. The ToolSmithAi Agent analyzes it, generates the application, validates the result and revises it on command, replacing weeks of delivery with minutes.</p>
          <Link href="/signup" className="btn btn-primary btn-lg mt-8">Sign up</Link>
        </div>
      </section>
      <section className="bg-bg py-20"><div className="container-x grid gap-5 md:grid-cols-2">
        {BLOCKS.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className={`card-lift rounded-[24px] bg-white p-9 ${i === 0 ? "md:col-span-2" : ""}`}>
            <Icon className="text-accent" /><h2 className="h-sm mt-4 text-[24px]">{title}</h2><p className="mt-3 max-w-xl text-[14.5px] leading-6 text-ink2">{body}</p>
          </div>
        ))}
      </div></section>
      <section className="bg-[#fba98a] py-20 text-center"><div className="container-x max-w-2xl"><p className="eyebrow">Outcome</p><h2 className="display h-md mt-3">From decision to deployed tool in one request</h2><p className="mt-4 text-[15px]">Teams spend their time on the decision. The Agent handles the build.</p><Link href="/signup" className="btn btn-primary btn-lg mt-8">Create account</Link></div></section>
      <Faq items={AGENT_FAQ} title="Frequently asked questions" />
      <FinalCta />
    </SiteShell>
  );
}
