import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin, supabaseServer, getUser } from "@/lib/supabase/server";
import { generateProject } from "@/lib/gemini";

export const maxDuration = 120;

const Body = z.object({
  projectId: z.string().uuid().optional(),
  mode: z.string().max(30).default("website"),
  prompt: z.string().trim().min(3).max(4000),
});

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Describe what you want in at least a few words." }, { status: 400 });
  const { projectId, mode, prompt } = parsed.data;

  const sb = await supabaseServer(); // RLS-scoped
  const admin = supabaseAdmin();

  // Load existing project (RLS guarantees ownership)
  let project: { id: string; html: string; mode: string } | null = null;
  let history: { role: "user" | "assistant"; content: string }[] = [];
  if (projectId) {
    const { data } = await sb.from("projects").select("id, html, mode").eq("id", projectId).eq("user_id", user.id).single();
    if (!data) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    project = data;
    const { data: msgs } = await sb.from("messages").select("role, content").eq("project_id", projectId).order("created_at", { ascending: false }).limit(6);
    history = (msgs ?? []).reverse() as typeof history;
  } else {
    const { count } = await sb.from("projects").select("id", { count: "exact", head: true }).eq("user_id", user.id);
    const { data: prof } = await sb.from("profiles").select("plan").eq("id", user.id).single();
    const limit = prof?.plan === "free" ? 3 : 60;
    if ((count ?? 0) >= limit) {
      return NextResponse.json({ error: `Your plan allows ${limit} projects. Delete one or upgrade.` }, { status: 403 });
    }
  }

  // Spend one credit atomically
  const { data: spent, error: spendErr } = await admin.rpc("spend_credit", { p_user: user.id, p_amount: 1 });
  if (spendErr) return NextResponse.json({ error: "Could not check your credits." }, { status: 500 });
  if (!spent) return NextResponse.json({ error: "You are out of credits. Upgrade your plan to keep building.", code: "NO_CREDITS" }, { status: 402 });

  const refund = async () => {
    const { data: p } = await admin.from("profiles").select("credits_used").eq("id", user.id).single();
    if (p) await admin.from("profiles").update({ credits_used: Math.max(0, p.credits_used - 1) }).eq("id", user.id);
  };

  let result;
  try {
    result = await generateProject({ mode: project?.mode ?? mode, prompt, currentHtml: project?.html || undefined, history });
  } catch (e) {
    await refund();
    return NextResponse.json({ error: e instanceof Error ? e.message : "Generation failed." }, { status: 502 });
  }

  let id = project?.id;
  if (!id) {
    const name = prompt.length > 48 ? prompt.slice(0, 45).trim() + "…" : prompt;
    const { data, error } = await sb.from("projects").insert({ user_id: user.id, name, mode, html: result.html }).select("id").single();
    if (error || !data) {
      await refund();
      return NextResponse.json({ error: "Could not save the project." }, { status: 500 });
    }
    id = data.id;
  } else {
    await sb.from("projects").update({ html: result.html, updated_at: new Date().toISOString() }).eq("id", id);
  }

  await Promise.all([
    sb.from("messages").insert([
      { project_id: id, user_id: user.id, role: "user", content: prompt },
      { project_id: id, user_id: user.id, role: "assistant", content: result.summary },
    ]),
    sb.from("project_versions").insert({ project_id: id, user_id: user.id, html: result.html, prompt }),
    admin.from("usage_events").insert({ user_id: user.id, project_id: id, kind: project ? "revision" : "generation", credits: 1, model: result.model }),
  ]);

  return NextResponse.json({ projectId: id, summary: result.summary, html: result.html });
}
