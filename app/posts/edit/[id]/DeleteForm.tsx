"use client";

import DeleteButton from "./DeleteButton";
import deletePost from "./deletePostAction";

export default function DeleteForm({ postId }: { postId: number }) {
  return (
    <form action={deletePost}>
      <input type="hidden" name="id" value={postId} />
      <DeleteButton />
    </form>
  );
}
