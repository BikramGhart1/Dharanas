import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be atleast of 6 characters")
})

export const signUpSchema = z.object({
    username: z.string().min(1, "Username can't be empty").max(18, "Username can't be more than 18 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be atleast of 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password must match the confirm password",
    path: ["confirmPassword"],
})

export const profileUpdateSchema = z.object({
    username: z.string().min(1, "Username can't be empty").max(18, "Username can't be more than 18 characters"),
    bio: z.string().max(500, "Bio can't be more than 500 characters"),
})