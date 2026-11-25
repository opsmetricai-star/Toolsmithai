import { SiteShell } from "@/components/site/SiteShell";
import { Hero, MeetSection, TemplatesSection, PlatformSection, TestimonialsSection, PricingSection, FinalCta } from "@/components/site/Home";
import { getUser } from "@/lib/supabase/server";

export default async function Home() {
  const user = await getUser();
  const signedIn = !!user;
  return (
    <SiteShell>
      <Hero signedIn={signedIn} />
      <MeetSection />
      <TemplatesSection />
      <PlatformSection />
      <TestimonialsSection />
      <PricingSection signedIn={signedIn} />
      <FinalCta />
    </SiteShell>
  );
}
