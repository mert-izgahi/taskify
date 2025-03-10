import { z, TypeOf } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1, "Name is required"),
});

export type SignInSchema = TypeOf<typeof signInSchema>;
export type SignUpSchema = TypeOf<typeof signUpSchema>;
