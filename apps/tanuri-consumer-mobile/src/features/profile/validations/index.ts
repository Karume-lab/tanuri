// Validations for Profile
import z from "zod";

export const addressValidation = z.object({
  label: z.string().min(1, "Label is required"),
  city: z.string().min(1, "City is required"),
  isDefault: z.boolean(),
});

export type Address = z.infer<typeof addressValidation>;
