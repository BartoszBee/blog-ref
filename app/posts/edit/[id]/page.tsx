import { redirect } from "next/navigation";
import DeleteForm from "./DeleteForm";
import { getSession } from "@/lib/auth";
import EditForm from "./EditForm";

type Post = {
  id: number;
  title: string;
};

const POSTS: Post[] = [
  { id: 1, title: "Hello Next.js" },
  { id: 2, title: "Routing w App Router" },
];

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const postId = Number(id);
  const post = POSTS.find((p) => p.id === postId);

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
