// Validations for Auth
import z from "zod";

export const signUpValidation = z.object({
  email: z.email({ error: "Please fill in a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});
export interface SignUpValidation extends z.infer<typeof signUpValidation> {}

export const signInValidation = z.object({
  email: z.email({ error: "Please fill in a valid email address" }),
  password: z.string().min(1, "Please enter your password"),
});
export interface SignInValidation extends z.infer<typeof signInValidation> {}
