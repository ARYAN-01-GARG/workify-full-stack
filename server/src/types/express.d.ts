import "express";

declare global {
    namespace Express {
        interface Request {
            file? : Express.Multer.File;
            files? : Express.Multer.File[];
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
            };
        }
    }
}