import { Pool } from "pg";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
const url = process.env.DATABASE_URL;
if (!url) throw new Error("Undefined credentials");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool,{schema:schema});




