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
  email: z
    .email({ error: "Please enter a valid email." })
    .max(255, { error: "Please only enter emails of length 255 or less." })
    .trim(),
  password: z.string(),
});

export type AddAuthorState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        displayName?: string[];
        profilePicture?: string[];
      };
      message?: string;
    }
  | undefined;

// TODO: Is this enough fields?
export const AddAuthorSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email." })
    .max(255, { error: "Please only enter emails of length 255 or less." })
    .trim(),
  password: z
    .string()
    .min(10, { error: "Password should contain at least 10 characters." }),
  displayName: z
    .string()
    .max(128, { error: "Display names should not exceed 128 characters." }),
  profilePicture: z
    .uuid({ error: "Profile picture should be a valid content UUID." })
    .optional(),
  // UPDATE AS REQUIRED. See app/data/author-dto.tsx for more info.
  role: z
    .number({ error: "Invalid role, should be an integer." })
    .gte(0)
    .lte(1),
});
