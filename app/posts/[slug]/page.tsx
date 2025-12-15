type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug } = await params;

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          Wpis: {slug}
        </h1>

        <p className="text-muted-foreground">
          Strona dynamiczna oparta o segment URL.
        </p>
      </header>

      <section>
        <p>
          Slug pobrany z adresu URL:
          <span className="ml-2 rounded bg-muted px-2 py-1 font-mono">
            {slug}
          </span>
        </p>
      </section>
    </article>
  );
}
