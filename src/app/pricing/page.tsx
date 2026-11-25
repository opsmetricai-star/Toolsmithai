import { SiteShell } from "@/components/site/SiteShell";
import { PricingCards } from "@/components/site/PricingCards";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/Home";
import { PRICING_FAQ } from "@/lib/content";
import { getUser } from "@/lib/supabase/server";

export const metadata = { title: "Pricing and Plans" };

export default async function Pricing() {
  const signedIn = !!(await getUser());
  return (
    <SiteShell>
      <section className="bg-bg pb-16 pt-20 text-center">
        <div className="container-x">
          <h1 className="display text-ink2" style={{ fontSize: "clamp(2.4rem,5vw,3.75rem)" }}>Pricing that scales with build volume</h1>
          <p className="mt-3 text-[15px] text-ink2">Pick the capacity your teams need.</p>
          <div className="mt-12 text-left"><PricingCards signedIn={signedIn} /></div>
          <p className="mt-8 text-[12px] text-muted">Prices are in USD, billed monthly, and may be subject to tax depending on your location. ToolSmithAi is powered by large language models, and output should be reviewed before use.</p>
        </div>
      </section>
      <Faq items={PRICING_FAQ} />
      <FinalCta />
    </SiteShell>
  );
}
