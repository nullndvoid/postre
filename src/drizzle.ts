import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql";
import { AuthorsTable, PostsTable, ContentTable } from "./db/schema";

export const db = drizzle(process.env.DATABASE_URL!);

export type Author = InferSelectModel<typeof AuthorsTable>;
export type NewAuthor = InferInsertModel<typeof AuthorsTable>;

export type Post = InferSelectModel<typeof PostsTable>;
export type NewPost = InferSelectModel<typeof PostsTable>;

export type Content = InferSelectModel<typeof ContentTable>;
export type NewContent = InferSelectModel<typeof ContentTable>;

export * from "@/src/db/schema";
