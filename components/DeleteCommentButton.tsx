"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-red-600 hover:underline
                 disabled:opacity-50"
    >
      {pending ? "Usuwanie..." : "Usuń"}
    </button>
  );
}
