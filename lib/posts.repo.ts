// lib/posts.repo.ts
import "server-only";
import { db } from "@/lib/db";

export type Post = {
  id: number;
  title: string;
  created_at: string;
};

/**
 * READ — lista
 */
export async function getPosts(): Promise<Post[]> {
  const { rows } = await db.query<Post>(
    `select id, title, created_at
     from posts
     order by created_at desc`,
  );

  return rows;
}

/**
 * READ — jeden wpis
 */
export async function getPostById(id: number): Promise<Post | undefined> {
  const { rows } = await db.query<Post>(
    `select id, title, created_at
     from posts
     where id = $1
     limit 1`,
    [id],
  );

  return rows[0];
}

/**
 * CREATE
 */
export async function createPost(title: string): Promise<Post> {
  const { rows } = await db.query<Post>(
    `insert into posts (title)
     values ($1)
     returning id, title, created_at`,
    [title],
  );

  return rows[0];
}

/**
 * UPDATE
 */
export async function updatePost(id: number, title: string): Promise<boolean> {
  const result = await db.query(
    `update posts
     set title = $1
     where id = $2`,
    [title, id],
  );

  return result.rowCount === 1;
}

/**
 * DELETE
 */
export async function deletePost(id: number): Promise<void> {
  await db.query(
    `delete from posts
     where id = $1`,
    [id],
  );
}
