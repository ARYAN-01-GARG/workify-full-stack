import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/auth-middleware';

const router = Router();

router.post('/', authMiddleware,);

router.get('/', authMiddleware,);

router.get('/:id', authMiddleware,);

router.get('/all', authMiddleware,);

router.put('/', authMiddleware,);

export default router;