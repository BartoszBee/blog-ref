import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const POSTS = [
  "hello-next",
  "routing-basics",
];

/**
 * Next.js użyje tej funkcji w build time,
 * żeby wiedzieć, jakie strony wygenerować statycznie.
 */
export function generateStaticParams(): {
  slug: string;
}[] {
  return POSTS.map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: PostPageProps){
  const { slug } = await params;

  if (!POSTS.includes(slug)) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          Wpis: {slug}
        </h1>

        <p className="text-muted-foreground">
          Ta strona została wygenerowana statycznie w build time.
        </p>
      </header>

      <p>
        Next.js wiedział o tym slugu wcześniej dzięki
        <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono">
          generateStaticParams
        </code>
        .
      </p>
    </article>
  );
}
