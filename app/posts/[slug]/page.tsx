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

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug } = await params;

  const postExists = POSTS.includes(slug);

  if (!postExists) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          Wpis: {slug}
        </h1>

        <p className="text-muted-foreground">
          Wpis istnieje — dlatego widzisz tę stronę.
        </p>
      </header>

      <p>
        To jest poprawnie obsłużony routing dynamiczny
        z walidacją i 404.
      </p>
    </article>
  );
}
