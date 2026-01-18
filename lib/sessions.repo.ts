// lib/sessions.repo.ts
import "server-only";
import { db } from "@/lib/db";

export type Session = {
  id: string;
  user_id: string;
  expires_at: string;
};

/**
 * CREATE — nowa sesja
 */
export async function createSession(
  userId: string,
  ttlHours = 24,
): Promise<Session> {
  const { rows } = await db.query<Session>(
    `
    insert into sessions (user_id, expires_at)
    values ($1, now() + ($2 || ' hours')::interval)
    returning id, user_id, expires_at
    `,
    [userId, ttlHours],
  );

  return rows[0];
}

/**
 * READ — sesja po ID (cookie)
 */
export async function getSessionById(
  sessionId: string,
): Promise<Session | null> {
  const { rows } = await db.query<Session>(
    `
    select id, user_id, expires_at
    from sessions
    where id = $1
      and expires_at > now()
    limit 1
    `,
    [sessionId],
  );

  return rows[0] ?? null;
}

/**
 * DELETE — logout
 */
export async function deleteSession(sessionId: string): Promise<void> {
  await db.query(
    `
    delete from sessions
    where id = $1
    `,
    [sessionId],
  );
}
