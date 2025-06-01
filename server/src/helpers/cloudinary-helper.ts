import cloudinary from "../config/cloudinary";
import logger from "../middlewares/global-middlewares/logger";
import { APIError } from "../types/apiError";
import fs from "fs";

const uploadToCloudinary = async ( filepath : string ) => {
    logger.info("Starting image upload to Cloudinary");
    try {
        const result = await cloudinary.uploader.upload(filepath);
        logger.info("Image Upload successful");
        logger.info("Image Upload result:", result.url, result.public_id);

        return {
            url : result.url,
            publicId : result.public_id,
        }

    } catch ( error ) {
        logger.error("Image Upload unsuccessful");
        logger.error("Cloudinary error details:", error);
        throw new APIError("Image Upload unsuccessful", 500);
    }
};

export {
    uploadToCloudinary
}