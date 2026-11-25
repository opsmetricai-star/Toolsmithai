import { SiteShell } from "@/components/site/SiteShell";
import { Hero, MeetSection, TemplatesSection, PlatformSection, OutcomesSection, PricingSection, FinalCta } from "@/components/site/Home";
import { getUser } from "@/lib/supabase/server";

export default async function Home() {
  const signedIn = !!(await getUser());
  return (
    <SiteShell>
      <Hero signedIn={signedIn} />
      <MeetSection />
      <TemplatesSection />
      <PlatformSection />
      <OutcomesSection />
      <PricingSection signedIn={signedIn} />
      <FinalCta />
    </SiteShell>
  );
}
