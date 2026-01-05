"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deletePost } from "@/lib/posts.repo";

export default async function deletePostAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  if (!id) {
    redirect("/posts");
  }

  deletePost(id);

  revalidatePath("/posts");
  redirect("/posts");
}
