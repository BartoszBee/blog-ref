import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPostById } from "@/lib/posts.repo";
import CommentsList from "./CommentsList";
import { AddCommentForm } from "./AddCommentForm";
import { getSession } from "@/lib/auth";

/**
 * WYMUSZENIE RUNTIME
 * (bo mamy komentarze + revalidatePath)
 */
export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

type PostPageProps = {
  params: Promise<Params>;
};

/**
 * Dynamiczne SEO (runtime)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postId = Number(slug);

  if (!Number.isInteger(postId)) {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }

  const post = await getPostById(postId);

  if (!post) {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postId = Number(slug);

  if (!Number.isInteger(postId)) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  const session = await getSession();

  return (
    <article className="space-y-10">
      {/* POST */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>

        <p className="text-muted-foreground text-sm">
          Post widoczny w runtime.
        </p>
      </header>

      {/* KOMENTARZE */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Komentarze</h2>

        {session ? (
          <AddCommentForm postId={postId} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Zaloguj się, aby dodać komentarz.
          </p>
        )}

        <CommentsList postId={postId} />
      </section>
    </article>
  );
}
