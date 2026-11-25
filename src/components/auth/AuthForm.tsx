"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Logo } from "@/components/site/Logo";

type Mode = "login" | "signup" | "forgot" | "reset";

const COPY: Record<Mode, { title: string; cta: string }> = {
  login: { title: "Welcome back", cta: "Log in" },
  signup: { title: "Create your account", cta: "Sign up" },
  forgot: { title: "Reset your password", cta: "Send reset link" },
  reset: { title: "Choose a new password", cta: "Update password" },
};

export function AuthForm({ mode, configured }: { mode: Mode; configured: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") && params.get("next")!.startsWith("/") ? params.get("next")! : "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!configured) return setError("Supabase is not configured. Add the keys from .env.example.");
    setBusy(true);
    const sb = supabaseBrowser();
    const origin = window.location.origin;
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
        router.refresh();
      } else if (mode === "signup") {
        if (password.length < 8) throw new Error("Use at least 8 characters.");
        const { data, error } = await sb.auth.signUp({
          email,
          password,
          options: { data: { full_name: name }, emailRedirectTo: `${origin}/auth/callback?next=/dashboard` },
        });
        if (error) throw error;
        if (data.session) {
          router.push("/dashboard");
          router.refresh();
        } else setInfo("Check your inbox to confirm your email, then log in.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error;
        setInfo("If an account exists for that email, a reset link is on its way.");
      } else {
        if (password.length < 8) throw new Error("Use at least 8 characters.");
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-accent";
  return (
    <div className="grid min-h-screen place-items-center bg-[#faf6f1] px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h1 className="text-[26px] font-medium tracking-[-0.04em]">{COPY[mode].title}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <label className="block text-[13px] text-ink2">Full name
                <input className={input + " mt-1.5"} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
              </label>
            )}
            {mode !== "reset" && (
              <label className="block text-[13px] text-ink2">Email
                <input type="email" className={input + " mt-1.5"} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              </label>
            )}
            {mode !== "forgot" && (
              <label className="block text-[13px] text-ink2">{mode === "reset" ? "New password" : "Password"}
                <input type="password" className={input + " mt-1.5"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={mode === "login" ? 1 : 8} />
              </label>
            )}
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>}
            {info && <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-[13px] text-green-800">{info}</p>}
            <button disabled={busy} className="btn btn-primary w-full py-3 disabled:opacity-60">{busy ? "Please wait…" : COPY[mode].cta}</button>
          </form>
          <div className="mt-6 space-y-2 text-center text-[13px] text-muted">
            {mode === "login" && (<>
              <p><Link href="/forgot-password" className="hover:text-accent">Forgot your password?</Link></p>
              <p>New here? <Link href="/signup" className="text-accent">Sign up</Link></p>
            </>)}
            {mode === "signup" && <p>Already have an account? <Link href="/login" className="text-accent">Log in</Link></p>}
            {mode === "forgot" && <p><Link href="/login" className="text-accent">Back to log in</Link></p>}
          </div>
        </div>
      </div>
    </div>
  );
}
