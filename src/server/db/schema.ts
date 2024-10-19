import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";
export const blogs = pgTable("blogs", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => uuid()),
  title: text("title").notNull(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  imageId: varchar("image_id", { length: 255 })
    .notNull()
    .references(() => assets.id),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  category: text("category", { enum: ["trending", "health","pink october"] }).default("health"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});
export const users = pgTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => uuid()),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  imageId: varchar("image_id", { length: 255 }).references(() => assets.id),
  password: text("password").notNull(),
  type: text("type", { enum: ["admin", "editor"] })
    .default("editor")
    .notNull(),
});
export const assets = pgTable("assets", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => uuid()),
  path: varchar("path", { length: 255 }),
});