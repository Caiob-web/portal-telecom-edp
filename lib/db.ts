import "server-only";
import { Pool } from "@neondatabase/serverless";
import type {
  PoolClient,
  QueryResult,
  QueryResultRow
} from "@neondatabase/serverless";

let pool: Pool | null = null;

export const databaseConfig = {
  provider: "neon",
  connectionStringEnv: "DATABASE_URL"
} as const;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabasePool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    pool = new Pool({ connectionString });
  }

  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  return getDatabasePool().query<T>(sql, params);
}

export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getDatabasePool().connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function databaseHealthCheck() {
  if (!isDatabaseConfigured()) {
    return {
      configured: false,
      ok: false,
      message: "DATABASE_URL is not configured."
    };
  }

  try {
    await query("SELECT 1");
    return {
      configured: true,
      ok: true,
      message: "Database connection is healthy."
    };
  } catch {
    return {
      configured: true,
      ok: false,
      message: "Database connection failed."
    };
  }
}

export async function getDatabaseStatus() {
  return databaseHealthCheck();
}
