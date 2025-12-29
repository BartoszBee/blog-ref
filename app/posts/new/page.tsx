import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SubmitButton from "./SubmitButton";


type CreatePostInput = {
  title: string;
};

const POSTS: CreatePostInput[] = [];

/**
 * Server Action
 */
async function createPost(formData: FormData): Promise<void> {
  "use server";

  const title = formData.get("title");

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Tytuł jest wymagany");
  }

  POSTS.push({ title });

  revalidatePath("/posts");
  redirect("/posts");
}




export default function NewPostPage() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Nowy wpis</h1>

      <form action={createPost} className="space-y-4">
        <input
          name="title"
          placeholder="Tytuł wpisu"
          className="w-full rounded border px-3 py-2"
        />

        <SubmitButton />
      </form>
    </section>
  );
}
