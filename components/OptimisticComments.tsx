"use client";

import { useOptimisticComments } from "@/context/OptimisticCommentsContext";

export default function OptimisticComments() {
  const { comments } = useOptimisticComments();

  if (comments.length === 0) return null;

  return (
    <ul className="space-y-4 opacity-60">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded border p-3 space-y-1 italic"
        >
          <p className="text-sm">{c.content}</p>
          <span className="text-xs text-muted-foreground">
            Dodawanie…
          </span>
        </li>
      ))}
    </ul>
  );
}
