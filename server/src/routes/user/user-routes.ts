import { Router } from "express";
import authMiddleware from "../../middlewares/auth/auth-middleware";
import upload from "../../middlewares/global-middlewares/upload-image";
import { asyncHandler } from "../../middlewares/global-middlewares/errorHandler";
import { uploadUserImage } from "../../controllers/user/user-image-controller";
import { getCurrentUser } from "../../controllers/user/user-controllers";
import { limiter } from "../../controllers/limiter";

const router = Router();

router.get('/', authMiddleware, asyncHandler(getCurrentUser));

router.put('/image', limiter(10 * 60 * 1000, 10), authMiddleware, upload.single('image'), asyncHandler(uploadUserImage));

export default router;