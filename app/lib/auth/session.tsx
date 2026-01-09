import "server-only";

import { cookies } from "next/headers";
import { getIronSession, IronSession, sealData } from "iron-session";
import { AuthorRole } from "@/app/data/author-dto";
import { cache } from "react";
import { redirect } from "next/navigation";

const secret = process.env.IRON_SESSION_SECRET!;
const cookieName = "__irn_session";

export async function getIronSessionData<obj extends object>(): Promise<
  IronSession<obj>
> {
  const session = await getIronSession<obj>(await cookies(), {
    password: secret,
    cookieName: cookieName,
  });

  return session;
}

export type Session = { userId?: number; role: AuthorRole };

export async function createSession(userId: number, role: AuthorRole) {
  const session = await getIronSessionData<Session>();

  session.userId = userId;
  session.role = role;

  await session.save();
}

export const verifySession = cache(async () => {
  const session = await getIronSessionData<Session>();

  if (session.userId == undefined) {
    redirect("/login");
  }
});
