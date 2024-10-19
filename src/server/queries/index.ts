import "server-only";
import { db } from "@/server/db";
import { assets, blogs } from "@/server/db/schema";
import { eq } from "drizzle-orm";
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.email, email) });
    return user;
  } catch (error: any) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, id) });
    return user;
  } catch (error) {
    return null;
  }
};

export const insertAsset = async (asset: typeof assets.$inferInsert) => {
  return db
    .insert(assets)
    .values({ ...asset })
    .execute();
};
export const deleteAsset = async (id: string) => {
  return db.delete(assets).where(eq(assets.id, id)).execute();
};
