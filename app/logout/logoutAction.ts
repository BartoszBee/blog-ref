// app/logout/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/sessions.repo";

const SESSION_COOKIE_NAME = "session";

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (sessionCookie) {
    await deleteSession(sessionCookie.value);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect("/login");
}
