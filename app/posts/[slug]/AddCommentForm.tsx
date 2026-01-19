"use client";

import { useActionState } from "react";
import { addCommentAction } from "./comments/actions";

type State =
  | { ok: true }
  | { ok: false; error: string };

const initialState: State = { ok: true };

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
      />

      {state.ok === false && (
        <p className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        className="rounded bg-black px-3 py-1.5 text-white hover:bg-black/80"
      >
        Dodaj komentarz
      </button>
    </form>
  );
}
