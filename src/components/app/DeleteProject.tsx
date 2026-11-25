"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

export function DeleteProject({ id }: { id: string }) {
  const router = useRouter();
  async function del() {
    if (!confirm("Delete this project permanently? This cannot be undone.")) return;
    const { error } = await supabaseBrowser().from("projects").delete().eq("id", id);
    if (error) return alert("Could not delete the project.");
    router.refresh();
  }
  return <button onClick={del} aria-label="Delete project" className="ml-3 text-muted hover:text-red-600"><Trash2 size={16} /></button>;
}
