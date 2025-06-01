import * as z from 'zod';

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is Required' })
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),
    email: z
        .string()
        .min(1, { message: 'Email is Required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, { message: 'Password is Required' })
        .min(6, { message: 'Password must be at least 8 characters long' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?#&]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        })
})