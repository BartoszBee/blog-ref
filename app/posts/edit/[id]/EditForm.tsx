"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import updatePost from "./updatePostAction";

type Post = {
  id: number;
  title: string;
};

export default function EditForm({ post }: { post: Post }){
  

  const [state, formAction] = useActionState(
    updatePost,
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={post.id} />

      <div className="space-y-1">
        <input
          name="title"
          defaultValue={post.title}
          className="w-full rounded border px-3 py-2"
        />

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}