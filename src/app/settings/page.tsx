import { AppShell, requireProfile } from "@/components/app/AppShell";
import { SettingsForm } from "@/components/app/SettingsForm";

export const metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function Settings() {
  const { profile } = await requireProfile();
  return (
    <AppShell>
      <h1 className="display h-md text-ink2">Settings</h1>
      <SettingsForm fullName={profile.full_name ?? ""} email={profile.email ?? ""} />
    </AppShell>
  );
}
