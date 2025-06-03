import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/auth-middleware';
import { asyncHandler } from '../../middlewares/global-middlewares/errorHandler';
import { createRecruiter, getAllRecruiters, getRecruiter, getRecruiterById, updateRecruiter } from '../../controllers/recruiter/recruiter-controller';
import authRoleMiddleware from '../../middlewares/auth/auth-role-middleware';

const router = Router();

router.post('/', authMiddleware, asyncHandler(createRecruiter));

router.get('/', authMiddleware, authRoleMiddleware, asyncHandler(getRecruiter));

router.get('/:id', authMiddleware, authRoleMiddleware, asyncHandler(getRecruiterById));

router.get('/all', authMiddleware, authRoleMiddleware, asyncHandler(getAllRecruiters));

router.put('/', authMiddleware, authRoleMiddleware, asyncHandler(updateRecruiter));

export default router;