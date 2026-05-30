import { readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  console.error("DATABASE_URL is not configured.");
  process.exit(1);
}

const pool = new Pool({ connectionString });

function splitSqlStatements(schema) {
  return schema
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

try {
  const schema = await readFile("db/schema.sql", "utf8");
  const statements = splitSqlStatements(schema);

  for (const statement of statements) {
    await pool.query(statement);
  }

  const result = await pool.query(
    `SELECT table_name
       FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN (
          'portal_users',
          'login_sessions',
          'login_attempts',
          'portal_notifications',
          'portal_documents'
        )
      ORDER BY table_name`
  );

  console.log(`created_tables=${result.rows.map((row) => row.table_name).join(",")}`);
} catch (error) {
  console.error(`schema_failed=${error instanceof Error ? error.message : "unknown error"}`);
  process.exitCode = 1;
} finally {
  await pool.end();
}
