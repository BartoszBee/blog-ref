// lib/comments.repo.ts
import "server-only";
import { db } from "@/lib/db";

export type Comment = {
  id: string;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
};

export type CommentWithAuthor = Comment & {
  author_email: string;
};

/**
 * READ — lista komentarzy dla posta
 */
export async function getCommentsByPostId(
  postId: number,
): Promise<CommentWithAuthor[]> {
  const { rows } = await db.query<CommentWithAuthor>(
    `
    select
      c.id,
      c.post_id,
      c.user_id,
      c.content,
      c.created_at,
      u.email as author_email
    from comments c
    join users u on u.id = c.user_id
    where c.post_id = $1
    order by c.created_at asc
    `,
    [postId],
  );

  return rows;
}

/**
 * CREATE — nowy komentarz
 */
export async function createComment(
  postId: number,
  userId: string,
  content: string,
): Promise<Comment> {
  const { rows } = await db.query<Comment>(
    `
    insert into comments (post_id, user_id, content)
    values ($1, $2, $3)
    returning id, post_id, user_id, content, created_at
    `,
    [postId, userId, content],
  );

  return rows[0];
}

/**
 * DELETE — usuń komentarz (autor lub admin)
 */
export async function deleteComment(commentId: string): Promise<void> {
  await db.query(
    `
    delete from comments
    where id = $1
    `,
    [commentId],
  );
}

/**
 * READ — wszystkie komentarze (admin)
 */
export async function getAllComments(): Promise<
  Array<{
    id: string;
    content: string;
    created_at: string;
    post_id: number;
    author_email: string;
  }>
> {
  const { rows } = await db.query(
    `
    select
      c.id,
      c.content,
      c.created_at,
      c.post_id,
      u.email as author_email
    from comments c
    join users u on u.id = c.user_id
    order by c.created_at desc
    `,
  );

  return rows;
}
