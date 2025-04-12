import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { APIError } from '../../types/apiError';
import { sendOtpEmail } from './otp-controllers';

export const forgotPassword = async (req: Request, res: Response , next : NextFunction) => {
    let { email } = req.body;

    email = email.toLowerCase().trim();

    const foundUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!foundUser) {
        throw new APIError('User not found', 404);
    } else if(foundUser && !foundUser.isVerified){
        throw new APIError('User is not verified', 400);
    }

    sendOtpEmail(req, res, next);

    res.status(200).json({
        success: true,
        message: 'OTP sent to your email'
    });
};


export const resetPassword = async (req: Request, res: Response) => {
    try{
        // code here
        console.log('forgotPassword');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};