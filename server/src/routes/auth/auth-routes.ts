import express, { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser
} from '../../controllers/auth/auth-controllers';
import {
    validateSchema ,
    registerSchema ,
    loginSchema
} from '../../middlewares/global-middlewares/reqSchemaValidation';
import {
    forgotPassword,
    resetPassword
} from '../../controllers/auth/reset-password-controller';
import { asyncHandler } from '../../middlewares/global-middlewares/errorHandler';
import { limiter } from '../../controllers/limiter';

const router: Router = express.Router();

router.post('/register', limiter(2 * 60 * 1000, 6) , validateSchema(registerSchema) , asyncHandler(registerUser));
router.post('/login',validateSchema(loginSchema), asyncHandler(loginUser));
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router;