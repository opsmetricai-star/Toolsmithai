import { SiteShell } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata = { title: "Contact us" };

export default function Contact() {
  return (
    <SiteShell>
      <section className="bg-[#faf6f1] py-24">
        <div className="container-x max-w-xl">
          <h1 className="display h-lg text-center text-ink2">Contact us</h1>
          <p className="mb-10 mt-4 text-center text-[15px] text-ink2">Questions, support or partnership ideas. We read every message.</p>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
