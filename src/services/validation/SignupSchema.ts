import * as z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const signupDefaultValues: SignupFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
};
