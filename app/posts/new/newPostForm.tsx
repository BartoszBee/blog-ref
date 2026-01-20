"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import createPost from "./createPostAction";
import FormError from "@/components/FormError";

export default function ProtectedForm() {
  const [state, formAction] = useActionState(createPost, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <input
          name="title"
          placeholder="Tytuł wpisu"
          className="w-full rounded border px-3 py-2"
        />

        
        {state.error && <FormError message={state.error} />}
      </div>

      <SubmitButton />
    </form>
  );
}
