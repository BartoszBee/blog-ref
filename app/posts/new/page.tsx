import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ProtectedForm from "./newPostForm";

export default async function NewPostPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Nowy wpis</h1>

      <ProtectedForm />
    </section>
  );
}
