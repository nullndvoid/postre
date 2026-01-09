import "server-only";

/**
 * The role of the author. This will be a bitfield.
 */
export const AuthorRoleEnum = {
  Normal: 1,
  Admin: 2,
} as const;

/**
 * The role of the author. This will be a bitfield.
 */
export type AuthorRole = (typeof AuthorRoleEnum)[keyof typeof AuthorRoleEnum];

/** Just converts an integer to our bitfield type. */
export function toAuthorRole(r: number): AuthorRole | undefined {
  if (r > 2 || r < 0) return undefined;

  return r as AuthorRole;
}

/** Is an Author an admin? */
function isAdmin(r: AuthorRole): boolean {
  return (r.valueOf() & AuthorRoleEnum.Admin) === AuthorRoleEnum.Admin;
}

/** Used to expose only some fields to public API consumers. */
export type AuthorDTO = {
  id?: number;
  username: string;
  /** The ID of the author's profile picture. If undefined this is considered
   *  to be blank. */
  profile_picture?: string;
  /** e.g. Jacob Hinchliffe */
  display_name: string;
  role: AuthorRole;
  /** Timestamp since Unix epoch. */
  created_at: number;
};
