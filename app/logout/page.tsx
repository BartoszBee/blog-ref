import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout(): Promise<void> {
  "use server";

  const cookieStore = await cookies();

  cookieStore.delete("session");

  redirect("/login");
}

export default function LogoutPage(){
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Wylogowanie</h1>

      <form action={logout}>
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:bg-black/80"
        >
          Wyloguj
        </button>
      </form>
    </section>
  );
}
