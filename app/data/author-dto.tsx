import { Author } from "@/src/drizzle";

import "server-only";

export const AuthorRoleEnum = {
  Normal: 1,
  Admin: 2,
} as const;

export type AuthorRole = (typeof AuthorRoleEnum)[keyof typeof AuthorRoleEnum];

export type AuthorDTO = {
  username: string;
  id?: number;
  profile_picture?: string;
  display_name: string;
  role: AuthorRole;
  created_at: number;
};

/** Convert full Author to safe DTO */
export function toAuthorDTO(author: Author): AuthorDTO {
  return {
    id: author.id,
    username: author.username,
    profile_picture: author.profile_picture ?? undefined,
    display_name: author.display_name,
    role: author.role as AuthorRole,
    created_at: author.created_at.getTime(),
  };
}

/** Is an Author an admin? */
export function isAdmin(r: AuthorRole): boolean {
  return (r.valueOf() & AuthorRoleEnum.Admin) === AuthorRoleEnum.Admin;
}
