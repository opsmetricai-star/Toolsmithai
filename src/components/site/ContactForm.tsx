"use client";

import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    setBusy(true);
    setState(null);
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setState({ ok: false, text: data.error ?? "Something went wrong." });
    setState({ ok: true, text: "Thanks. We will be in touch by email." });
    form.reset();
  }

  const input = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-accent";
  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-white p-7 text-left">
      <label className="block text-[13px] text-ink2">Name<input name="name" required maxLength={100} className={input} /></label>
      <label className="block text-[13px] text-ink2">Work email<input name="email" type="email" required className={input} /></label>
      <label className="block text-[13px] text-ink2">Company (optional)<input name="company" maxLength={120} className={input} /></label>
      <label className="block text-[13px] text-ink2">How can we help?<textarea name="message" required minLength={5} maxLength={3000} rows={5} className={input} /></label>
      {state && <p role="status" className={`text-[13px] ${state.ok ? "text-green-700" : "text-red-700"}`}>{state.text}</p>}
      <button disabled={busy} className="btn btn-primary w-full py-3 disabled:opacity-60">{busy ? "Sending…" : "Send message"}</button>
    </form>
  );
}
