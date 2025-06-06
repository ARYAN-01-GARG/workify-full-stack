import { Router } from 'express';
import { asyncHandler } from '../../middlewares/global-middlewares/errorHandler';
import { createPost, deletePost, getAllPosts, getPostById, updatePost, searchPosts } from '../../controllers/posts/posts-controllers';
import authMiddleware from '../../middlewares/auth/auth-middleware';
import authRoleMiddleware from '../../middlewares/auth/auth-role-middleware';
import { acceptJobApplication, applyForJob } from '../../controllers/posts/job-apply-controller';
import upload from '../../middlewares/global-middlewares/upload-image';
import { uploadPostImage } from '../../controllers/posts/post-image-controller';

const router = Router();

router.get('/', asyncHandler(getAllPosts));

router.get('/search', asyncHandler(searchPosts));

router.get('/:id', asyncHandler(getPostById));

router.post('/', authMiddleware, authRoleMiddleware, asyncHandler(createPost));

router.put('/:id', authMiddleware, authRoleMiddleware, asyncHandler(updatePost));

router.delete('/:id', authMiddleware, authRoleMiddleware, asyncHandler(deletePost));

router.post('/:jobId/accept', authMiddleware, authRoleMiddleware, asyncHandler(acceptJobApplication));

router.post('/:jobId/apply', authMiddleware, asyncHandler(applyForJob));

router.put('/:jobId/image' , authMiddleware, upload.single('image'), asyncHandler(uploadPostImage));

export default router;