import { getSession } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Admin</h1>
        <p>Brak sesji.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Panel admina</h1>

      <div className="rounded border p-4">
        <p className="font-medium">Zalogowany użytkownik:</p>
        <p className="text-muted-foreground">
          ID: <strong>{session.userId}</strong>
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        To jest strona tylko do odczytu. Służy jako demonstracja
        ról i ochrony dostępu w Next.js (Proxy + Server Components).
      </p>
    </section>
  );
}
