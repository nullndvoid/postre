import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { AuthorsTable, PostsTable, ContentTable } from "./db/schema";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({
  client: client,
});

export type Author = InferSelectModel<typeof AuthorsTable>;
export type NewAuthor = InferInsertModel<typeof AuthorsTable>;

export type Post = InferSelectModel<typeof PostsTable>;
export type NewPost = InferSelectModel<typeof PostsTable>;

export type Content = InferSelectModel<typeof ContentTable>;
export type NewContent = InferSelectModel<typeof ContentTable>;

export * from "@/src/db/schema";
