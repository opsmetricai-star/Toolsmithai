"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export function MarkRead() {
  const router = useRouter();
  return (
    <button
      className="btn btn-ghost"
      onClick={async () => {
        await supabaseBrowser().from("notifications").update({ read: true }).eq("read", false);
        router.refresh();
      }}
    >
      Mark all read
    </button>
  );
}
