import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

declare global {
  var _dbPool: Pool | undefined;
}

function getPool() {
  if (process.env.NODE_ENV === "production") {
    return new Pool({
      connectionString: process.env.DATABASE_URL!,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  if (!globalThis._dbPool) {
    globalThis._dbPool = new Pool({
      connectionString: process.env.DATABASE_URL!,
      max: 10,
    });
  }
  return globalThis._dbPool;
}

export const db = drizzle({ client: getPool() });
