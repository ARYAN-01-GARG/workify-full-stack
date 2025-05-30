import { Router } from 'express';
import { asyncHandler } from '../../middlewares/global-middlewares/errorHandler';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../../controllers/posts/posts-controllers';
import authMiddleware from '../../middlewares/auth/auth-middleware';

const router = Router();

router.get('/', asyncHandler(getAllPosts));

router.get('/:id', asyncHandler(getPostById));

router.post('/', authMiddleware, asyncHandler(createPost));

router.put('/:id', authMiddleware, asyncHandler(updatePost));

router.delete('/:id', authMiddleware, asyncHandler(deletePost));

export default router;