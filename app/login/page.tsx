// app/login/page.tsx
import { loginAction } from "./loginAction";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Logowanie</h1>

      <form action={loginAction} className="space-y-4">
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

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:bg-black/80"
        >
          Zaloguj
        </button>
      </form>
    </section>
  );
}
