import { NextFunction, Request, Response } from 'express';
import { prisma } from "../../config/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ReqBodyRegisterUser , ReqBodyLoginUser } from '../../types/user-types';
import { APIError } from '../../types/apiError';
import { sendOtpEmail } from './otp-controllers';
import logger from '../../middlewares/global-middlewares/logger';

// Register Controller
const registerUser = async (req: Request<{} , {}, ReqBodyRegisterUser>, res: Response , next : NextFunction) => {
    logger.info('Registering new user');
    logger.info(`Request body: ${JSON.stringify({ email: req.body.email, name: req.body.name })}`);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        logger.error('Missing required fields for registration');
        throw new APIError('Please enter all fields', 400);
    }

    const isNewUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (isNewUser && isNewUser.isVerified) {
        logger.error('User already exists with the provided email');
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

    if (!newUser) {
        logger.error('Failed to create new user');
        throw new APIError('Failed to create user', 500);
    }
    logger.info(`New user created with ID: ${newUser.id}`);
    logger.info(`Sending OTP email to: ${newUser.email}`);
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
    logger.info('User login attempt');
    logger.info(`Request body: ${JSON.stringify(req.body)}`);
    // Validate request body
    let { email, password } = req.body;

    if (!email || !password) {
        logger.error('Missing required fields for login');
        throw new APIError('Please enter all fields', 400);
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!foundUser || !foundUser.isVerified) {
        logger.error('User does not exist or is not verified');
        throw new APIError('User does not exist', 400);
    }

    if (!foundUser.password) {
        logger.error('User does not have a password set');
        throw new APIError('Invalid credentials', 400);
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
        logger.error('Invalid credentials provided during login');
        throw new APIError('Invalid credentials', 400);
    }

    // Filter out password and version fields
    const { password: _, version ,createdAt , updatedAt , isVerified, ...filteredUser } = foundUser;

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        logger.error('JWT secret key not found');
        throw new APIError('JWT secret key not found', 500);
    };
    const token = jwt.sign({
        userInfo : {
            id: filteredUser.id,
            email: filteredUser.email,
            name: filteredUser.name,
            role: filteredUser.role
        }
    }, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    });



    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user: filteredUser,
        token : token
    });
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        logger.error('Error during user logout', error);
        res.status(500).json({
            success: 'Error',
            error: 'Internal Server Error'
        });
    }
}

export { registerUser, loginUser , logoutUser };