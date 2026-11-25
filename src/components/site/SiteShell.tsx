import { Header } from "./Header";
import { Footer } from "./Footer";
import { getUser } from "@/lib/supabase/server";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <>
      <Header signedIn={!!user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
