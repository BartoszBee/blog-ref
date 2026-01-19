import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();

  // Guard po stronie serwera (NIE UI)
  if (!session || session.user.role !== "admin") {
    redirect("/posts");
  }

  return (
    <section className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Panel admina</h1>
        <p className="text-sm text-muted-foreground">
          Zarządzanie treścią i moderacja aplikacji.
        </p>
      </header>

      {/* Informacje o zalogowanym adminie */}
      <div className="rounded border p-4 space-y-1">
        <p className="font-medium">Zalogowany jako:</p>
        <p className="text-sm text-muted-foreground">
          {session.user.email} • rola: <strong>{session.user.role}</strong>
        </p>
      </div>

      {/* Sekcje admina */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/comments"
          className="rounded border p-4 hover:bg-muted transition"
        >
          <h2 className="font-semibold">Moderacja komentarzy</h2>
          <p className="text-sm text-muted-foreground">
            Przegląd i usuwanie komentarzy użytkowników.
          </p>
        </Link>

        {/* miejsce na przyszłe moduły */}
        <div className="rounded border p-4 opacity-60">
          <h2 className="font-semibold">Użytkownicy</h2>
          <p className="text-sm text-muted-foreground">
            (wkrótce)
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Dostęp ograniczony do roli <strong>admin</strong>. Ochrona
        realizowana po stronie serwera (Server Components + redirect).
      </p>
    </section>
  );
}
