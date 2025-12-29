"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type CreatePostInput = {
  title: string;
};

type FormState = {
  error?: string;
};

const POSTS: CreatePostInput[] = [];

export default async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  

  const title = formData.get("title");

  if (typeof title !== "string" || title.trim().length === 0) {
    return {
      error: "Tytuł jest wymagany",
    };
  }

  POSTS.push({ title });

  revalidatePath("/posts");
  redirect("/posts");
}