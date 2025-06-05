import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/auth-middleware';
import { createCandidate, getCandidate, updateCandidate } from '../../controllers/candidate/candidate-controllers';
import { asyncHandler } from '../../middlewares/global-middlewares/errorHandler';

const router = Router();

router.post('/', authMiddleware, asyncHandler(createCandidate));

router.get('/:candidateId', authMiddleware, asyncHandler(getCandidate));

router.put('/', authMiddleware, asyncHandler(updateCandidate));

export default router;