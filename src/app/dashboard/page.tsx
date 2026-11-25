import Link from "next/link";
import { AppShell, requireProfile } from "@/components/app/AppShell";
import { NewProject } from "@/components/app/NewProject";
import { DeleteProject } from "@/components/app/DeleteProject";

export const metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { sb, profile } = await requireProfile();
  const { data: projects } = await sb.from("projects").select("id,name,mode,updated_at").order("updated_at", { ascending: false });
  return (
    <AppShell>
      <h1 className="display h-md text-ink2">Describe the outcome. The AI builds it.</h1>
      <div className="mt-8 max-w-3xl"><NewProject /></div>
      <h2 className="mt-14 text-[18px] font-medium tracking-tight">Your projects</h2>
      {!projects?.length ? (
        <p className="mt-4 rounded-xl border border-dashed border-line p-8 text-center text-[14px] text-muted">No projects yet. Describe one above to create your first.</p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id} className="card-lift flex items-start justify-between rounded-xl border border-line bg-white p-5">
              <Link href={`/project/${p.id}`} className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium">{p.name}</p>
                <p className="mt-1 text-[12px] capitalize text-muted">{p.mode} · {new Date(p.updated_at).toLocaleDateString()}</p>
              </Link>
              <DeleteProject id={p.id} />
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
