import { NextResponse } from "next/server";
import { z } from "zod";
import { getUser, supabaseAdmin } from "@/lib/supabase/server";
import { PLAN_CREDITS } from "@/lib/content";

const Body = z.object({ claimId: z.string().uuid(), action: z.enum(["approve", "reject"]) });

export async function POST(req: Request) {
  const user = await getUser();
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!user?.email || !admins.includes(user.email.toLowerCase())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const admin = supabaseAdmin();
  const { data: claim } = await admin.from("payment_claims").select("*").eq("id", parsed.data.claimId).single();
  if (!claim || claim.status !== "pending") return NextResponse.json({ error: "Claim not pending" }, { status: 409 });

  if (parsed.data.action === "reject") {
    await admin.from("payment_claims").update({ status: "rejected" }).eq("id", claim.id);
    return NextResponse.json({ ok: true });
  }

  const end = new Date();
  end.setMonth(end.getMonth() + 1);
  const { error } = await admin.from("subscriptions").insert({
    user_id: claim.user_id,
    plan: claim.plan,
    provider: "selar",
    provider_reference: claim.reference,
    current_period_end: end.toISOString(),
  });
  if (error) return NextResponse.json({ error: "This reference was already used." }, { status: 409 });
  await admin.from("profiles").update({ plan: claim.plan, credits_total: PLAN_CREDITS[claim.plan], credits_used: 0 }).eq("id", claim.user_id);
  await admin.from("payment_claims").update({ status: "approved" }).eq("id", claim.id);
  await admin.from("notifications").insert({ user_id: claim.user_id, title: "Plan upgraded", body: `Your ${claim.plan} plan is now active.` });
  return NextResponse.json({ ok: true });
}
