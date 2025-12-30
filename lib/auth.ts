import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session";

export type Session = {
  userId: string;
};

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }


  return {
    userId: sessionCookie.value,
  };
}
