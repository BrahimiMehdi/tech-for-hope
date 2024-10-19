import { defineConfig } from "drizzle-kit";
const url = process.env.DATABASE_URL;

if (!url) throw new Error("Credentials go boom");
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/server/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: url,
  },
});
