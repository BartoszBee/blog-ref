"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  error?: string;
};

export default async function updatePost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number(formData.get("id"));
  const title = formData.get("title");

  if (!id || typeof title !== "string" || title.trim().length === 0) {
    return { error: "Nieprawidłowe dane" };
  }

  // symulacja zapisu
  await new Promise((resolve) => setTimeout(resolve, 500));

  revalidatePath("/posts");

  redirect("/posts");
}
