import { supabaseServer } from "@/lib/supabase/server";

// Serves a public project as a sandboxed document (CSP sandbox blocks access to our origin).
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response("Not found", { status: 404 });
  const sb = await supabaseServer();
  const { data } = await sb.from("projects").select("html,is_public").eq("id", id).eq("is_public", true).single();
  if (!data) return new Response("Not found", { status: 404 });
  return new Response(data.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "sandbox allow-scripts allow-forms allow-modals allow-popups",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
