"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addCommentAction } from "./comments/actions";

type State = { ok: true } | { ok: false; error: string };

const initialState: State = { ok: true };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-black px-3 py-1.5 text-white
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Dodawanie..." : "Dodaj komentarz"}
    </button>
  );
}

export function AddCommentForm({ postId }: { postId: number }) {
  const [state, formAction] = useActionState(
    addCommentAction.bind(null, postId),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <textarea
        name="content"
        placeholder="Dodaj komentarz..."
        className="w-full rounded border p-2"
        disabled={false}
      />

      {state.ok === false && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
