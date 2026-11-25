import { notFound } from "next/navigation";
import { requireProfile } from "@/components/app/AppShell";
import { Workspace } from "@/components/app/Workspace";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { sb, user } = await requireProfile();
  const { data: project } = await sb.from("projects").select("id,name,html,is_public").eq("id", id).eq("user_id", user.id).single();
  if (!project) notFound();
  const [{ data: messages }, { data: versions }] = await Promise.all([
    sb.from("messages").select("id,role,content").eq("project_id", id).order("created_at"),
    sb.from("project_versions").select("id,prompt,created_at").eq("project_id", id).order("created_at", { ascending: false }).limit(30),
  ]);
  return <Workspace id={project.id} name={project.name} initialHtml={project.html} isPublic={project.is_public} messages={(messages ?? []) as never} versions={versions ?? []} />;
}
