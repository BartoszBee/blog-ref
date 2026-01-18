// app/login/actions.ts
"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/lib/users.repo";
import { createSession } from "@/lib/sessions.repo";

const SESSION_COOKIE_NAME = "session";

export type LoginState = { ok: true } | { ok: false; error: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { ok: false, error: "Nieprawidłowe dane formularza" };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { ok: false, error: "Nieprawidłowy email lub hasło" };
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return { ok: false, error: "Nieprawidłowy email lub hasło" };
  }

  const session = await createSession(user.id);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  redirect("/posts");
}
