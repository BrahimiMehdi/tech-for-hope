import {blogs, users} from "@/server/db/schema"

export type UserType = typeof users.$inferSelect
export type BlogType = typeof blogs.$inferSelect