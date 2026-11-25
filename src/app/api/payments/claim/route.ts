import { NextResponse } from "next/server";
import { z } from "zod";
import { getUser, supabaseServer } from "@/lib/supabase/server";

const Body = z.object({ plan: z.enum(["core", "pro", "scale"]), reference: z.string().trim().min(4).max(120) });

// A user reports a completed payment. This does NOT grant access: an admin verifies the
// reference in the payment provider dashboard and approves it at /admin/payments.
export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter the order reference from your receipt." }, { status: 400 });
  const sb = await supabaseServer();
  const { error } = await sb.from("payment_claims").insert({ user_id: user.id, ...parsed.data });
  if (error) return NextResponse.json({ error: "Could not record your claim." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
