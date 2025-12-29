"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import createPost from "./createPostAction"


export default function NewPostPage() { 

  const [state, formAction] = useActionState(createPost, {});

  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Nowy wpis</h1>

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
    </section>
  );
}
