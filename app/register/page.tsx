"use client";

import { useActionState } from "react";
import { registerAction, RegisterState } from "./registerAction";
import RegisterButton from "@/components/RegisterButton";
import FormError from "@/components/FormError";

const initialState: RegisterState = { ok: true };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Rejestracja</h1>

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
          placeholder="Hasło (min. 6 znaków)"
          required
          className="w-full rounded border px-3 py-2"
        />

       

        {state.ok === false && <FormError message={state.error} />}

        <RegisterButton />
      </form>
    </section>
  );
}
