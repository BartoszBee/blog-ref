import "server-only";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL");
}

/**
 * Pula połączeń do Postgresa
 * - server-only
 * - bez SDK Supabase
 */
export const db = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
