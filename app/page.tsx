import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strona główna"
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Blog Reference
      </h1>

      <p className="text-gray-900">
        To jest projekt referencyjny, w którym uczymy się Next.js
        dokładnie według dokumentacji — temat po temacie.
      </p>

      <Link
        href="/posts"
        className="inline-block rounded-md bg-black px-4 py-2 text-white hover:bg-black/80"
      >
        Przejdź do listy wpisów
      </Link>
    </main>
  );
}
