import {
  integer,
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";

export const AuthorsTable = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  display_name: varchar({ length: 128 }).notNull(),
  profile_picture: uuid().references(() => ContentTable.id, {
    onDelete: "set null",
  }),
  // ADM is the only supported role at this time.
  role: varchar({ length: 3 }),
  created_at: timestamp().defaultNow().notNull(),
  password_hash: varchar({ length: 255 }),
});

export const ContentTable = pgTable("content", {
  id: uuid().primaryKey(),
  filename: varchar().notNull(),
  mimetype: varchar().notNull(),
});

export const PostsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar(),
  body: text(),
  author_id: integer().references(() => AuthorsTable.id, {
    onDelete: "cascade",
  }),
  status: varchar().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  slug: varchar().notNull(),
  last_updated: timestamp(),
});

export const relations = defineRelations(
  { authors: AuthorsTable, posts: PostsTable, content: ContentTable },
  (r) => ({
    authors: {
      pfp: r.one.content({
        from: r.authors.profile_picture,
        to: r.content.id,
        optional: true,
      }),
    },
    posts: {
      author: r.one.authors({
        from: r.posts.author_id,
        to: r.authors.id,
        optional: false,
      }),
    },
  })
);
