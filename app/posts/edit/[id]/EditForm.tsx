"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import updatePost from "./updatePostAction";
import FormError from "@/components/FormError";

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

       
        {state.error && <FormError message={state.error} />}
      </div>

      <SubmitButton />
    </form>
  );
}