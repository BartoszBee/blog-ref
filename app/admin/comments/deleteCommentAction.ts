"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { deleteComment } from "@/lib/comments.repo";

export async function adminDeleteCommentAction(
  commentId: string,
): Promise<void> {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    return;
  }

  await deleteComment(commentId);

  revalidatePath("/admin/comments");
}
