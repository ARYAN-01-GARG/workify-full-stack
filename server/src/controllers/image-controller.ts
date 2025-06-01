import type { Request, Response } from 'express';
import Image from '../schema/image-schema';
import { uploadToCloudinary } from '../helpers/cloudinary-helper';

const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "File not found!"
            });
            return;
        }

        console.log("Uploaded file details:", req.file);

        // Upload image to Cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);
        const newUploadedImage = new Image({
            image: url, // Fix: Set the `image` field correctly
            publicId,
            userId: "new-boy",
        });
        await newUploadedImage.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully!",
            data: newUploadedImage
        });
        return;

    } catch (error) {
        console.error("Error during image upload:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
        return;
    }
};

export {
    uploadImage
}