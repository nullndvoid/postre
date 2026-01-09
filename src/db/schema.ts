import {
  integer,
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";

export const authors = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  profile_picture: uuid().references(() => content.id),
  // ADM is the only supported role at this time.
  role: varchar({ length: 3 }),
  created_at: timestamp().defaultNow().notNull(),
  password_hash: varchar({ length: 255 }),
});

export const content = pgTable("content", {
  id: uuid().primaryKey(),
  filename: varchar().notNull(),
  mimetype: varchar().notNull(),
});

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar(),
  body: text(),
  author_id: integer().references(() => authors.id),
  status: varchar().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  slug: varchar().notNull(),
  last_updated: timestamp(),
});

export const relations = defineRelations({ authors, posts, content }, (r) => ({
  authors: {
    profile_picture: r.one.content({
      from: r.authors.profile_picture,
      to: r.content.id,
      optional: true,
      alias: "pfp",
    }),
  },
  posts: {
    author: r.one.authors({
      from: r.posts.author_id,
      to: r.authors.id,
      optional: false,
    }),
  },
}));
