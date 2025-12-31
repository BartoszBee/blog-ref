import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function login(formData: FormData): Promise<void> {
  "use server";

  const username = formData.get("username");

  if (typeof username !== "string" || username.length === 0) {
    throw new Error("Username jest wymagany");
  }

  const cookieStore = await cookies();

  cookieStore.set("session", username, {
    httpOnly: true,
    path: "/",
  });

  redirect("/posts");
}

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Logowanie</h1>

      <form action={login} className="space-y-4">
        <input
          name="username"
          placeholder="Nazwa użytkownika"
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
