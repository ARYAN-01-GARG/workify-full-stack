import { Request , Response , NextFunction } from 'express';
import logger from '../../middlewares/global-middlewares/logger';
import { APIError } from '../../types/apiError';
import { prisma } from '../../config/prisma';

export const getCurrentUser = async (req : Request, res: Response, next: NextFunction) => {
    logger.info('Fetching user details');
    const userId = req.user?.id;
    if (!userId) {
        logger.error('User ID is missing in the request');
        throw new APIError('User ID is required', 400);
    }
    logger.info('Fetching user details for user ID:', userId);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            candidate: {
                include: {
                    projects: true,
                    education: true,
                },
            },
            pastEmployer: true,
            recruiter: true,
            posts: true,
        },
    })
    if (!user) {
        logger.error('User not found');
        throw new APIError('User not found', 404);
    }

    const { password, version , isVerified , ...userWithoutPassword } = user || {};

    logger.info('User details fetched successfully');
    res.status(200).json({
        success: true,
        user: userWithoutPassword
    });
}