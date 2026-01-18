// lib/auth.ts
import "server-only";
import { cookies } from "next/headers";
import { getSessionById } from "@/lib/sessions.repo";
import { getUserById } from "@/lib/users.repo";

const SESSION_COOKIE_NAME = "session";

export type Session = {
  user: {
    id: string;
    email: string;
    role: "author" | "admin";
  };
};

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  const session = await getSessionById(sessionCookie.value);

  if (!session) {
    return null;
  }

  const user = await getUserById(session.user_id);

  if (!user) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}
