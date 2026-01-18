// app/register/actions.ts
"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getUserByEmail, createUser } from "@/lib/users.repo";
import { createSession } from "@/lib/sessions.repo";

const SESSION_COOKIE_NAME = "session";

export async function registerAction(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Nieprawidłowe dane");
  }

  if (password.length < 6) {
    throw new Error("Hasło musi mieć co najmniej 6 znaków");
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Użytkownik z tym emailem już istnieje");
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
