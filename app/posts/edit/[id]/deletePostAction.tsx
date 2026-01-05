"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function deletePost(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  if (!id) {
    redirect("/posts");
  }

  // symulacja usuwania
  await new Promise((resolve) => setTimeout(resolve, 400));

  revalidatePath("/posts");
  redirect("/posts");
}
