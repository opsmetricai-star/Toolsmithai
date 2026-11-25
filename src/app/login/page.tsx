import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Log in" };

export default function Page() {
  return (
    <Suspense>
      <AuthForm mode="login" configured={supabaseConfigured()} />
    </Suspense>
  );
}
