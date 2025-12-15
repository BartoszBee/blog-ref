import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = {
  slug: string;
};

type PostPageProps = {
  params: Promise<Params>;
};

const POSTS = [
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

/**
 * SSG — lista stron do wygenerowania w build time
 */
export function generateStaticParams(): Params[] {
  return POSTS.map(({ slug }) => ({ slug }));
}

/**
 * Dynamiczne SEO — PER STRONA
 * (zgodne z najnowszą dokumentacją)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "Nie znaleziono wpisu.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: PostPageProps){
  const { slug } = await params;

  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>

        <p className="text-muted-foreground">
          {post.excerpt}
        </p>
      </header>

      <p>
        Ta strona ma <strong>własne SEO</strong>, wygenerowane
        dynamicznie na podstawie sluga.
      </p>
    </article>
  );
}
