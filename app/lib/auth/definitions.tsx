import z from "zod";

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const LoginUserSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string(),
});
