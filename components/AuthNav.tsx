// components/AuthNav.tsx
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export async function AuthNav() {
  const session = await getSession();

  if (!session) {
    return (
      <Link href="/login" className="text-sm text-blue-600 hover:underline">
        Zaloguj
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="text-muted-foreground">{session.user.email}</span>
      <LogoutButton />
    </div>
  );
}
