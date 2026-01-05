"use client";

import {  useFormStatus } from "react-dom";

export default function DeleteButton(){
  "use client";
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded border border-destructive px-4 py-2 text-destructive hover:bg-destructive/10 disabled:opacity-50"
    >
      {pending ? "Usuwanie…" : "Usuń wpis"}
    </button>
  );
}