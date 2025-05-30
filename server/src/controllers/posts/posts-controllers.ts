/// <reference types="../../types/express" />
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { APIError } from '../../types/apiError';
import logger from '../../middlewares/global-middlewares/logger';


// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    logger.info('Fetching all posts');
    const posts = await prisma.post.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    if (!posts || posts.length === 0) {
        logger.warn('No posts found');
        // Throwing an APIError to be handled by the global error handler
        throw new APIError('No posts found', 404);
    }
    logger.info(`Fetched ${posts.length} posts successfully`);
    res.status(200).json({
        success: true,
        message: 'Posts fetched successfully',
        posts
    });
};

// Get post by ID
export const getPostById = async (req: Request, res: Response) => {
    logger.info(`getting post by ID invoked`);
    logger.info(`Request params: ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true }
    });
    if (!post) {
        logger.error(`Post with ID ${id} not found`);
        // Throwing an APIError to be handled by the global error handler
        throw new APIError('Post not found', 404);
    }
    logger.info(`Post with ID ${id} fetched successfully`);
    res.status(200).json({
        success: true,
        message: 'Post fetched successfully',
        post
    });
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    logger.info('Creating a new post');
    logger.info(`Request body: ${JSON.stringify(req.body)}`);
    const userId= req.user?.id ;
    if (!userId) {
        logger.error('User ID is missing in request');
        throw new APIError('User is not authenticated', 401);
    }
    logger.info(`User ID: ${userId}`);
    const {
        title,
        description,
        location,
        remote,
        company,
        skills,
        offer,
        duration,
        experience,
        startDate,
    } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        description,
        image: '',
        location,
        remote,
        company,
        skills,
        offer,
        duration,
        experience,
        startDate,
        userId
      }
    });
    res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post: post
    });
};

// Update a post
// TODO: NEED to make it
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Update post invoked`);
    logger.info(`Request params: ${JSON.stringify(req.params)}`);
    logger.info(`Request body: ${JSON.stringify(req.body)}`);

    const userId = req.user?.id;
    if (!userId) {
        logger.error('User ID is missing in request');
        throw new APIError('User is not authenticated', 401);
    }
    logger.info(`User ID: ${userId}`);
    const { id } = req.params;
    const data = req.body;
    try {
        const post = await prisma.post.update({
            where: { id },
            data
        });
        res.json(post);
    } catch (error) {
        next(new APIError('Failed to update post', 400));
    }
};

// Delete a post
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Delete post invoked`);
    logger.info(`Request params: ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    try {
        const post = await prisma.post.delete({
            where: { id },
        });
        logger.info(`Post with ID ${id} deleted successfully`);
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            post
        });
    } catch (error: any) {
        logger.error(`Failed to delete post with ID ${id}: ${error.message}`);
        // Prisma throws an error if not found
        next(new APIError('Post not found', 404));
    }
};
