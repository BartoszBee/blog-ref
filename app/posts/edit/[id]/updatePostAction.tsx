"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updatePost } from "@/lib/posts.repo";

type FormState = {
  error?: string;
};

export default async function updatePostAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number(formData.get("id"));
  const title = formData.get("title");

  if (!id || typeof title !== "string" || title.trim().length === 0) {
    return { error: "Nieprawidłowe dane" };
  }

  const success = updatePost(id, title);

  if (!success) {
    return { error: "Wpis nie istnieje" };
  }

  revalidatePath("/posts");

  redirect("/posts");
}
