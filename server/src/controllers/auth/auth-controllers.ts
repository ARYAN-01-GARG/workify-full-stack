import { NextFunction, Request, Response } from 'express';
import { prisma } from "../../config/prisma";
import bcrypt from 'bcryptjs';
import { ReqBodyRegisterUser , ReqBodyLoginUser } from '../../types/user-types';
import { APIError } from '../../types/apiError';
import { sendOtpEmail } from './otp-controllers';

// Register Controller
const registerUser = async (req: Request<{} , {}, ReqBodyRegisterUser>, res: Response , next : NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new APIError('Please enter all fields', 400);
    }

    const isNewUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (isNewUser && isNewUser.isVerified) {
        throw new APIError('User already exists', 400);
    } else if (isNewUser && !isNewUser.isVerified) {
        await prisma.user.delete({
            where: {
                email: email
            }
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    await sendOtpEmail(req, res , next)

    res.status(201).json({
        success: true,
        message: 'OTP has been sent successfully',
        user : {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            profileImage: newUser.profileImage,
        }
    });
}

// Login User Controller
const loginUser = async (req: Request<{}, {}, ReqBodyLoginUser>, res: Response ) => {
    let { email, password } = req.body;

    if (!email || !password) {
        throw new APIError('Please enter all fields', 400);
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!foundUser || !foundUser.isVerified) {
        throw new APIError('User does not exist', 400);
    }

    if (!foundUser.password) {
        throw new APIError('Invalid credentials', 400);
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
        throw new APIError('Invalid credentials', 400);
    }

    // Filter out password and version fields
    const { password: _, version ,createdAt , updatedAt , isVerified, ...filteredUser } = foundUser;

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user: filteredUser,
        token : 'ggdyjgshjdghsjdghsghdjgshdghsgd'
    });
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: 'Error',
            error: 'Internal Server Error'
        });
    }
}

export { registerUser, loginUser , logoutUser };