// app/register/actions.ts
"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserByEmail, createUser } from "@/lib/users.repo";
import { createSession } from "@/lib/sessions.repo";

const SESSION_COOKIE_NAME = "session";

export type RegisterState = { ok: true } | { ok: false; error: string };

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { ok: false, error: "Nieprawidłowe dane formularza" };
  }

  if (password.length < 6) {
    return { ok: false, error: "Hasło musi mieć co najmniej 6 znaków" };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { ok: false, error: "Użytkownik z tym emailem już istnieje" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash);
  const session = await createSession(user.id);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  redirect("/posts");
}
