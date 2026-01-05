"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPost } from "@/lib/posts.repo";

type FormState = {
  error?: string;
};

export default async function createPostAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title");

  if (typeof title !== "string" || title.trim().length === 0) {
    return {
      error: "Tytuł jest wymagany",
    };
  }

  createPost(title.trim());

  revalidatePath("/posts");
  redirect("/posts");
}
