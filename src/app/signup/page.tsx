import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Sign up" };

export default function Page() {
  return (
    <Suspense>
      <AuthForm mode="signup" configured={supabaseConfigured()} />
    </Suspense>
  );
}
