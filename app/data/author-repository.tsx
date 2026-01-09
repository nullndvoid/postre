import "server-only";

import { eq } from "drizzle-orm";
import { AuthorDTO, AuthorRole, toAuthorDTO } from "./author-dto";
import { db, AuthorsTable, Author } from "@/src/drizzle";

export async function getAuthorByUsername(username: string) {
  const res = await db
    .select()
    .from(AuthorsTable)
    .where(eq(AuthorsTable.username, username))
    .limit(1);

  return res[0] ?? null;
}

export async function getAuthorDTOByUsername(
  username: string
): Promise<AuthorDTO | null> {
  const author = await getAuthorByUsername(username);
  if (!author) return null;

  return toAuthorDTO(author);
}

export async function getAuthorById(id: number): Promise<Author | null> {
  try {
    const res = await db
      .select()
      .from(AuthorsTable)
      .where(eq(AuthorsTable.id, id))
      .limit(1);

    return res[0] ?? null;
  } catch (reason) {
    if (reason !== undefined) {
      console.log(`Could not get Author from ID ${id}! Reason: ${reason}`);
    } else {
      console.log(`Could not get Author from ID ${id}!`);
    }

    return null;
  }
}
