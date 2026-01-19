"use client";

import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-black px-4 py-2 text-white hover:bg-black/80"
    >
      {pending ? "Logowanie..." : "Zaloguj"}
    </button>
  );
}
