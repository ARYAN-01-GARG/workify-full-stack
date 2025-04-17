import { z , ZodError, ZodSchema } from 'zod';
import { Request , Response , NextFunction } from 'express';


const ReqSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3 , {
            message: 'Name must be atleast 3 characters long'
        })
        .max(200 , {
            message: 'Name must not exceed 200 characters'
        })
        .optional(),
    email: z
        .string()
        .min(5 ,{
            message: 'Email must be atleast 5 characters long'
        })
        .trim()
        .email({
            message: 'Invalid Email Address'
        })
        .optional(),
    password: z
        .string()
        .min(6 , {
            message: 'Password must be atleast 6 characters long'
        })
        .regex(/[A-Z]/,{
            message : "Password must contain at least one uppercase letter."
        })
        .regex(/[a-z]/,{
            message : "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/,{
            message : "Password must contain at least one digit." })
        .regex(/[!@#$%^&*(),.?":{}|<>]/,{
            message : "Password must contain at least one special character."})
        .max(1024 , {
            message: 'Password must not exceed 1024 characters'
        })
        .optional(),
    otp: z
        .string()
        .length(6)
}).strict();

export const registerSchema = ReqSchema.pick({
        name: true,
        email: true,
        password: true
})

export const loginSchema = ReqSchema.pick({
    email: true,
    password: true
})

export const otpVerifySchema = ReqSchema.pick({
    email: true,
    otp: true
})

export const validateSchema = ( schema : ZodSchema )=> {
    return ( req: Request , res: Response , next: NextFunction ) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if( error instanceof ZodError){
                const errorMessage = error.errors.map((e) => e.message).join(", ");
                res.status(400).json({
                    success: false,
                    error: errorMessage
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error'
                });
            }
        }
    }
}