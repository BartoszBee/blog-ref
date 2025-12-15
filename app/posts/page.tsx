// app/posts/page.tsx
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać wpisów");
  }

  return response.json();
}

export default async function PostsPage(){
  const posts = await getPosts();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Wpisy</h1>
        <p className="text-muted-foreground">
          Lista wpisów pobrana na serwerze (Server Component).
        </p>
      </header>

      <ul className="space-y-6">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="space-y-1">
            <Link
              href={`/posts/${post.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {post.title}
            </Link>

            <p className="text-muted-foreground">
              {post.body.slice(0, 80)}…
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
