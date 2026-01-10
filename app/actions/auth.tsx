"use server";

import { LoginUserSchema, LoginFormState } from "@/app/lib/auth/definitions";
import { getAuthorByUsername } from "@/app/data/author-repository";
import { createSession } from "@/app/lib/auth/session";
import { AuthorRole } from "@/app/data/author-dto";
import { redirect } from "next/navigation";

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

    // TODO: Write some utility function to perform this mapping.
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
  const author = await getAuthorByUsername(validatedFields.data.email);

  if (author == null) {
    // Return an error message that the user does not exist!
    return {
      message: "User does not exist or password was incorrect.",
    };
  }

  // Hash password with Argon2i.
  try {
    const passwordValid = await Bun.password.verify(
      validatedFields.data.password,
      author.password_hash
    );

    if (!passwordValid) {
      return {
        message: "User does not exist or password was incorrect.",
      };
    }
  } catch {
    return {
      message: "User does not exist or password was incorrect.",
    };
  }

  // Now just return a session and redirect to /.
  await createSession(author.id, author.role as AuthorRole);

  redirect("/");
}
