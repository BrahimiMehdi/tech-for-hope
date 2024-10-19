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