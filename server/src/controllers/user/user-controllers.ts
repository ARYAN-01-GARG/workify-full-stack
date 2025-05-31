import { Request , Response , NextFunction } from 'express';
import logger from '../../middlewares/global-middlewares/logger';
import { APIError } from '../../types/apiError';
import { prisma } from '../../config/prisma';

export const getCurrentUser = (req : Request, res: Response, next: NextFunction) => {
    logger.info('Fetching user details');
    try {
        const user = req.user; // Assuming user is attached to the request object
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            success  : true,
            message  : 'User details fetched successfully',
            user : user
        });
    } catch (error) {
        logger.error('Error fetching user details', error);
        next(error); // Pass the error to the next middleware
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Fetching user by ID');
    logger.info(`Fetching user details for ID: ${req.params.id}`);
    const userId = req.params.id;
    if (!userId) {
        logger.error('User ID is required');
        throw new APIError('User ID is required', 400);
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            candidate: true,
            recruiter: true
        }
    });
    if (!user) {
        logger.error(`User not found for ID: ${userId}`);
        throw new APIError('User not found', 404);
    }
    logger.info(`User details fetched successfully for ID: ${userId}`);

    res.status(200).json({
        success  : true,
        message  : 'User details fetched successfully',
        user : user
    });
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Updating user details');
    logger.info(`Updating user details for ID: ${req.user?.id}`);
    const userId = req.user?.id;
    if (!userId) {
        logger.error('User not authenticated');
        throw new APIError('User not authenticated', 401);
    }
    if (!userId) {
        logger.error('User ID is required for update');
        throw new APIError('User ID is required', 400);
    }
    // TODO: Update The User
    // const updatedUser = await prisma.user.update({
    //     where: { id: userId },
    //     data: req.body
    // });
    res.status(200).json({
        success  : true,
        message  : 'User updated successfully',
    });
};



