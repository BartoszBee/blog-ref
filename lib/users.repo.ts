// lib/users.repo.ts
import "server-only";
import { db } from "@/lib/db";

export type User = {
  id: string;
  email: string;
  password_hash: string;
  role: "author" | "admin";
};

/**
 * READ — po emailu (login)
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await db.query<User>(
    `
    select id, email, password_hash, role
    from users
    where email = $1
    limit 1
    `,
    [email.toLowerCase()],
  );

  return rows[0] ?? null;
}

/**
 * READ — po ID (sesja)
 */
export async function getUserById(
  id: string,
): Promise<Omit<User, "password_hash"> | null> {
  const { rows } = await db.query<Omit<User, "password_hash">>(
    `
    select id, email, role
    from users
    where id = $1
    limit 1
    `,
    [id],
  );

  return rows[0] ?? null;
}
