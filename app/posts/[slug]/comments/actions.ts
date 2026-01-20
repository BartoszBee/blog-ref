"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import {
  createComment,
  deleteComment,
} from "@/lib/comments.repo";

type CommentActionResult =
  | { ok: true }
  | { ok: false; error: string };

const FORCE_ERROR = false; // tylko do testów rollback optimistic update

export async function addCommentAction(
  postId: number,
  _prevState: CommentActionResult,
  formData: FormData,
): Promise<CommentActionResult> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "Musisz być zalogowany" };
  }

  await new Promise(res => setTimeout(res, 1000)); // zobaczenie optimistic update

  if (FORCE_ERROR) {
    return {
      ok: false,
      error: "Testowy rollback – komentarz nie zapisany",
    };
  }

  const content = formData.get("content");
  if (typeof content !== "string" || content.trim().length < 3) {
    return { ok: false, error: "Komentarz musi mieć co najmniej 3 znaki" };
  }

  await createComment(postId, session.user.id, content.trim());

  revalidatePath(`/posts/${postId}`);
  return { ok: true };
}

export async function deleteCommentAction(
  commentId: string,
  authorId: string,
  postId: number,
): Promise<void> {
  const session = await getSession();
  if (!session) return;

  const isAuthor = session.user.id === authorId;
  const isAdmin = session.user.role === "admin";

  if (!isAuthor && !isAdmin) return;

  await deleteComment(commentId);
  revalidatePath(`/posts/${postId}`);
}
