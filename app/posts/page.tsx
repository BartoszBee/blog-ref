import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getPosts } from "@/lib/posts.repo";

/**
 * WYMUSZENIE RUNTIME (IN-MEMORY CRUD)
 */
export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const session = await getSession();
  const posts = getPosts();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Wpisy</h1>
        <p className="text-muted-foreground">
          Lista wpisów (Server Component, runtime).
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          Brak wpisów.
        </p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded border p-4 space-y-2"
            >
              <h2 className="text-xl font-semibold">
                {post.title}
              </h2>

              <div className="flex gap-4 text-sm">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Czytaj
                </Link>

                {session && (
                  <Link
                    href={`/posts/edit/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edytuj
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
