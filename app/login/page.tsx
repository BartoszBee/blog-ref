"use client";

import { useActionState } from "react";
import { loginAction, LoginState } from "./loginAction";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";

const initialState: LoginState = { ok: true };

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Logowanie</h1>

      <form action={formAction} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Hasło"
          required
          className="w-full rounded border px-3 py-2"
        />

        {state.ok === false && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <LoginButton />
      </form>

      <p className="text-sm text-center text-muted-foreground">
        Nie masz konta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Zarejestruj się
        </Link>
      </p>
    </section>
  );
}
