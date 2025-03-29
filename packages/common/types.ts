import {z} from "zod"

export const CreateUserSchema = z.object( {
    username: z.string(),
    email: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(12, "Password is too long max 12 digit excepted").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
})

export const SigninSchema = z.object({
    email: z.string().toLowerCase().email().min(4).max(20),
    password: z.string().min(8, "Password must be at least 8 characters long").max(12, "Password is too long max 12 digit excepted").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
})

export const CreateRoomSchema = z.object({
    slug: z.string().min(4).max(20),
})