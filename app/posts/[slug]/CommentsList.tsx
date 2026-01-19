import { getSession } from "@/lib/auth";
import { getCommentsByPostId } from "@/lib/comments.repo";
import { deleteCommentAction } from "./comments/actions";
import DeleteButton from "@/components/DeleteCommentButton";

type Props = {
  postId: number;
};

export default async function CommentsList({ postId }: Props) {
  const session = await getSession();
  const comments = await getCommentsByPostId(postId);

  if (comments.length === 0) {
    return <p className="text-sm text-muted-foreground">Brak komentarzy.</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((c) => {
        const canDelete =
          session &&
          (session.user.role === "admin" || session.user.id === c.user_id);

        return (
          <li key={c.id} className="rounded border p-3 space-y-1">
            <p className="text-sm">{c.content}</p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{c.author_email}</span>

              {canDelete && (
                <form
                  action={deleteCommentAction.bind(
                    null,
                    c.id,
                    c.user_id,
                    postId,
                  )}
                >
                  <DeleteButton />
                </form>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
