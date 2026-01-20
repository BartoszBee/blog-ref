"use client";

import {  useState } from "react";
import { addCommentAction } from "./comments/actions";
import FormError from "@/components/FormError";
import { useOptimisticComments } from "@/context/OptimisticCommentsContext";
import { useTransition } from "react";

type State = { ok: true } | { ok: false; error: string };

const initialState: State = { ok: true };

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="rounded bg-black px-3 py-1.5 text-white
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Dodawanie..." : "Dodaj komentarz"}
    </button>
  );
}

export function AddCommentForm({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { add, clear} = useOptimisticComments();

    return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const content = formData.get("content");

        if (typeof content !== "string" || content.trim().length < 3) {
          setError("Komentarz musi mieć co najmniej 3 znaki");
          return;
        }

        // PRAWDZIWY OPTIMISTIC
        add(content.trim());
        form.reset();
        setError(null);

        startTransition(async () => {
          const result = await addCommentAction(
            postId,
            initialState,
            formData,
          );

          if (result.ok !== true) {
            setError(result.error);
            clear(); // rollback
          } else {
            clear();
          }
        });
      }}
      className="space-y-2"
    >
      <textarea
        name="content"
        placeholder="Dodaj komentarz..."
        className="w-full rounded border p-2"
        disabled={isPending}
      />


      {error && <FormError message={error} />}

      <SubmitButton isPending={isPending} />
    </form>
  );
}
