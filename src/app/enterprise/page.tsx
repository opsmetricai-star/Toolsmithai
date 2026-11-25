import { SiteShell } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata = { title: "Enterprise" };

const POINTS = ["SSO and audit logs (planned)", "Advanced privacy controls", "Centralized security management", "Single-tenant options (planned)", "Dedicated premium support", "Custom agreements and invoicing"];

export default function Enterprise() {
  return (
    <SiteShell>
      <section className="bg-[#faf6f1] py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-muted">Enterprise</p>
            <h1 className="display mt-4 text-ink2" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)" }}>Enterprise-grade security and control</h1>
            <p className="mt-6 max-w-md text-[16px] leading-7 text-ink2">Tell us about your team and requirements. Items marked planned are on our roadmap and not yet available.</p>
            <ul className="mt-8 space-y-3 text-[15px]">{POINTS.map((p) => <li key={p} className="flex gap-3"><span className="text-accent">✓</span>{p}</li>)}</ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
