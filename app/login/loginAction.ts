// app/login/actions.ts
"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/users.repo";
import { createSession } from "@/lib/sessions.repo";

const SESSION_COOKIE_NAME = "session";

export async function loginAction(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Nieprawidłowe dane logowania");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Nieprawidłowy email lub hasło");
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    throw new Error("Nieprawidłowy email lub hasło");
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
