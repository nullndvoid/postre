"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { LoginUserSchema, LoginFormState } from "@/app/lib/auth/definitions";
import z from "zod";

async function getIronSessionData() {
  const session = await getIronSession(await cookies(), {
    password: process.env.IRON_SESSION_SECRET!,
    cookieName: "__irn_session",
  });

  return session;
}

export async function loginUser(
  _: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const fieldErrors: { email?: string[]; password?: string[] } = {};

    validatedFields.error.issues.forEach((issue) => {
      const field = issue.path[0] as "email" | "password";
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field]!.push(issue.message);
    });

    return {
      errors: fieldErrors,
    };
  }

  // TODO: Check the login and return a session!
  return {};
}
