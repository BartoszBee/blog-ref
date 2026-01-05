import Link from "next/link";
import { getSession } from "@/lib/auth";

type Post = {
  id: number;
  title: string;
  body?: string;
};

const POSTS: Post[] = [
  { id: 1, title: "Hello Next.js" },
  { id: 2, title: "Routing w App Router" },
];

export default async function PostsPage() {
  const session = await getSession();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Wpisy</h1>
        <p className="text-muted-foreground">
          Lista wpisów (Server Component).
        </p>
      </header>

      <ul className="space-y-6">
        {POSTS.map((post) => (
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
              {"*"}
              {/* Link widoczny tylko dla zalogowanych */}
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
    </section>
  );
}
