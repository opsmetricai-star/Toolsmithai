import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";

const Body = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(5).max(3000),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  if (!supabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Contact storage is not configured yet." }, { status: 503 });
  }
  const { error } = await supabaseAdmin().from("contact_requests").insert(parsed.data);
  if (error) return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
