"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import createPost from "./createPostAction";

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

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
