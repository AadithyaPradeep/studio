export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      <p className="text-muted-foreground">Manage your account and application settings.</p>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Profile</h2>
          <div className="mt-4 p-6 rounded-lg border bg-card">
            <p className="text-muted-foreground">Profile settings are coming soon.</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Theme</h2>
          <div className="mt-4 p-6 rounded-lg border bg-card">
            <p className="text-muted-foreground">Theme customization is coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
