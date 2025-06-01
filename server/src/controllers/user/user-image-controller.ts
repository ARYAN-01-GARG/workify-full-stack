import { Request , Response } from 'express';
import { prisma } from '../../config/prisma';
import logger from '../../middlewares/global-middlewares/logger';
import { APIError } from '../../types/apiError';
import { uploadToCloudinary } from '../../helpers/cloudinary-helper';

export const uploadUserImage = async (req: Request, res: Response) => {
    logger.info("User image upload request received");
    const userId = req.user?.id;
    if (!userId) {
        logger.error("User ID not found in request");
        throw new APIError("User ID not found in request", 400);
    }
    if (!req.file) {
        logger.error("No file uploaded in request");
        throw new APIError("No file uploaded in request", 400);
    }
    logger.info("File details:", req.file);

    const { url , publicId } = await uploadToCloudinary(req.file.path);
    logger.info("Image uploaded to Cloudinary:", url);

    const image = await prisma.image.create({
        data: {
            url,
            publicId,
            userId,
        }
    });
    if(!image) {
        logger.error("Failed to save image to database");
        throw new APIError("Failed to save image to database", 500);
    }
    logger.info("Image saved to database:", image);

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            profileImage : url
        }
    });

    if (!user) {
        logger.error("Failed to update user with image");
        throw new APIError("Failed to update user with image", 500);
    }
    logger.info("User updated with image:", user);

    res.status(201).json({
        success: true,
        message: "User image uploaded successfully!",
        user
    });
}