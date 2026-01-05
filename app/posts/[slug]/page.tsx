import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostById } from "@/lib/posts.repo";

/**
 * WYMUSZENIE RUNTIME (BRAK SSG)
 */
export const dynamic = "force-dynamic";

type Params = {
  id: string;
};

type PostPageProps = {
  params: Promise<Params>;
};

/**
 * Dynamiczne SEO — runtime
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const postId = Number(id);

  if (!postId) {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }

  const post = getPostById(postId);

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
  const { id } = await params;
  const postId = Number(id);

  if (!postId) {
    notFound();
  }

  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p className="text-muted-foreground">
        In-memory post widoczny w runtime.
      </p>
    </article>
  );
}
