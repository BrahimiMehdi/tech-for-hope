import { z } from "zod";
import { users } from "@/server/db/schema";
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "your password must be at least 5 characters long"),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "your password must be at least 5 characters long"),
  name: z.string(),
  type: z.enum(users.type.enumValues),
  image: typeof window !== "undefined" ? z.custom<File>((v) => v instanceof File, "Please upload an image") : z.any(),
});
