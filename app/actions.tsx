"use server";

import { z } from "zod";

const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(10),
});

export async function loginUser(_initialState: any, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    // Use issues array directly for simpler extraction.
    const errors = validatedFields.error.issues.map((issue) => {
      const path = issue.path.join(".");
      return path ? `${path}: ${issue.message}` : issue.message;
    });

    return {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      errors,
      message: "Validation failed",
    };
  }

  return {
    email: validatedFields.data.email,
    password: "",
    errors: [],
    message: "",
  };
}
