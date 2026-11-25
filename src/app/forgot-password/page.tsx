import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Forgot password" };

export default function Page() {
  return (
    <Suspense>
      <AuthForm mode="forgot" configured={supabaseConfigured()} />
    </Suspense>
  );
}
