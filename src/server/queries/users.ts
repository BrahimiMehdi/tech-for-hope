import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { UserType } from "@/lib/globals";
import { eq } from "drizzle-orm";
export const updateUserRole = async (id: string, type: typeof users.$inferSelect.type) => {
  return db.update(users).set({ type: type }).where(eq(users.id, id)).execute();
};
export const createUser = async (user: UserType) => {
  return db
    .insert(users)
    .values({ ...user })
    .execute();
};
export const deleteUser = async (id: string) => {
  return db.delete(users).where(eq(users.id, id)).execute();
};
