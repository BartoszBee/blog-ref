import Link from "next/link";

type PostListItem = {
  slug: string;
  title: string;
  excerpt: string;
};

const POSTS: PostListItem[] = [
  {
    slug: "hello-next",
    title: "Hello Next.js",
    excerpt: "Pierwszy wpis w projekcie referencyjnym.",
  },
  {
    slug: "routing-basics",
    title: "Routing w App Router",
    excerpt: "Jak foldery zamieniają się w adresy URL.",
  },
];

export default function PostsPage(){
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Wpisy</h1>
        <p className="text-muted-foreground">
          Publiczna lista wpisów blogowych.
        </p>
      </header>

      <ul className="space-y-6">
        {POSTS.map((post) => (
          <li key={post.slug} className="space-y-1">
            <Link
              href={`/posts/${post.slug}`}
              className="text-xl font-semibold hover:underline"
            >
              {post.title}
            </Link>

            <p className="text-muted-foreground">
              {post.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
