import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAllComments } from "@/lib/comments.repo";
import { adminDeleteCommentAction } from "./deleteCommentAction";
import DeleteButton from "@/components/DeleteCommentButton";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/posts");
  }

  const comments = await getAllComments();

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Moderacja komentarzy</h1>

      {comments.length === 0 ? (
        <p className="text-muted-foreground">Brak komentarzy.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded border p-4 space-y-2">
              <p className="text-sm">{c.content}</p>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {c.author_email} • post #{c.post_id}
                </span>

                <form action={adminDeleteCommentAction.bind(null, c.id)}>
                  <DeleteButton />
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
