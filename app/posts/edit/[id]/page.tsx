import { redirect } from "next/navigation";
import { getPostById } from "@/lib/posts.repo";
import { getSession } from "@/lib/auth";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const postId = Number(id);

  if (!postId) {
    redirect("/posts");
  }

  const post = getPostById(postId);

  if (!post) {
    redirect("/posts");
  }

  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Edytuj wpis</h1>

      <EditForm post={post} />
      <DeleteForm postId={post.id} />
    </section>
  );
}
