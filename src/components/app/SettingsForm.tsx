"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export function SettingsForm({ fullName, email }: { fullName: string; email: string }) {
  const router = useRouter();
  const [name, setName] = useState(fullName);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const input = "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-accent";

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const sb = supabaseBrowser();
    const { data: u } = await sb.auth.getUser();
    const { error } = await sb.from("profiles").update({ full_name: name }).eq("id", u.user!.id);
    setMsg(error ? { ok: false, text: "Could not save your profile." } : { ok: true, text: "Profile saved." });
    router.refresh();
  }
  async function changePw(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) return setMsg({ ok: false, text: "Use at least 8 characters." });
    const { error } = await supabaseBrowser().auth.updateUser({ password: pw });
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "Password updated." });
    setPw("");
  }

  return (
    <div className="mt-8 max-w-md space-y-8">
      <form onSubmit={saveProfile} className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-[17px] font-medium">Profile</h2>
        <label className="block text-[13px] text-ink2">Email<input className={input + " mt-1.5 bg-bg"} value={email} disabled /></label>
        <label className="block text-[13px] text-ink2">Full name<input className={input + " mt-1.5"} value={name} onChange={(e) => setName(e.target.value)} maxLength={100} /></label>
        <button className="btn btn-primary px-4 py-2.5">Save</button>
      </form>
      <form onSubmit={changePw} className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-[17px] font-medium">Password</h2>
        <label className="block text-[13px] text-ink2">New password<input type="password" className={input + " mt-1.5"} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></label>
        <button className="btn btn-ghost px-4 py-2.5">Update password</button>
      </form>
      {msg && <p role="status" className={`text-[13px] ${msg.ok ? "text-green-700" : "text-red-700"}`}>{msg.text}</p>}
    </div>
  );
}
