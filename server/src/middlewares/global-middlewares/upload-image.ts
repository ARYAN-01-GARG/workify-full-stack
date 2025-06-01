import multer from 'multer';
import path from 'path';
import fs from 'fs';
import logger from './logger';
import type { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../../uploads/');
        // Ensure the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const filterCheck = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    logger.info("Checking file type:", file.mimetype);
    if (file.mimetype.startsWith('image')) {
        logger.info("File type is valid");
        return cb(null, true);
    } else {
        logger.error("Invalid file type:", file.mimetype);
        const error = new Error("Only image files are allowed.");
        error.name = "MulterFileTypeError";
        cb(error);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filterCheck,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    }
});

export default upload;