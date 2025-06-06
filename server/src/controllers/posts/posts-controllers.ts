/// <reference types="../../types/express" />
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { APIError } from '../../types/apiError';
import logger from '../../middlewares/global-middlewares/logger';


// Get all posts
export const getAllPosts = async (req: Request<{}, {}, {}, { page?: number; pageSize?: number }>, res: Response) => {
    logger.info('Fetching all posts');
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            include: {
                user: true,
                applications: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take
        }),
        prisma.post.count()
    ]);
    if (!posts || posts.length === 0) {
        logger.warn('No posts found');
        // Throwing an APIError to be handled by the global error handler
        throw new APIError('No posts found', 404);
    }
    logger.info(`Fetched ${posts.length} posts successfully`);
    res.status(200).json({
        success: true,
        message: 'Posts fetched successfully',
        posts,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
    });
};

// Get post by ID
export const getPostById = async (req: Request, res: Response) => {
    logger.info(`getting post by ID invoked`);
    logger.info(`Request params: ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true ,  applications: true }
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
export const createPost = async (req: Request<{}, {}, {
    title: string;
    description: string;
    location: string;
    remote: boolean;
    company: string;
    skills: string[];
    offerMin: number;
    offerMax: number;
    duration: number;
    experience: number;
    startDate: string;
}>, res: Response) => {
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
        offerMin,
        offerMax,
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
        offerMin,
        offerMax,
        duration,
        experience,
        startDate,
        userId
      },
        include: {
            applications: true
        }
    });
    res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post: post
    });
};

export const updatePost = async (req: Request<{ id : string }, {}, {
    title: string;
    description?: string;
    location?: string;
    remote?: boolean;
    company?: string;
    skills?: string[];
    offerMin?: number;
    offerMax?: number;
    duration?: number;
    experience?: number;
    startDate?: string;
}>, res: Response, next: NextFunction) => {
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
    if (!id) {
        logger.error('Post ID is required for update');
        throw new APIError('Post ID is required', 400);
    }
    const post = await prisma.post.findUnique({
        where: { id , userId },
    });

    if (!post) {
        logger.error(`Post with ID ${id} not found or does not belong to user ${userId}`);
        throw new APIError('Post not found', 404);
    }
    logger.info(`Post with ID ${id} found, proceeding to update`);
    const data = req.body;
    const updatedPost = await prisma.post.update({
        where: { id },
        data : {
            ...data
        } ,
        include: {
            user: true,
            applications: true
        }
    });
    if( !updatedPost ) {
        logger.error(`Failed to update post with ID ${id}`);
        throw new APIError('Failed to update post', 500);
    }
    logger.info(`Post with ID ${id} updated successfully by user ${userId}`);
    res.status(200).json({
        success: true,
        message: 'Post updated successfully',
        post: updatedPost
    });
};

// Delete a post
export const deletePost = async (req: Request<{ id : string }>, res: Response, next: NextFunction) => {
    logger.info(`Delete post invoked`);
    logger.info(`Request params: ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    logger.info(`Post ID to delete: ${id}`);
    const userId = req.user?.id;
    if (!userId) {
        logger.error('User ID is missing in request');
        throw new APIError('User is not authenticated', 401);
    }
    logger.info(`User ID: ${userId}`);
    const post = await prisma.post.delete({
        where: { id , userId  },
    });
    if (!post) {
        logger.error(`Post with ID ${id} not found or does not belong to user ${userId}`);
        throw new APIError('Post not found', 404);
    }
    logger.info(`Post with ID ${id} deleted successfully by user ${userId}`);
    res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
        post
    });
};

export const searchPosts = async (req: Request<{}, {}, {}, { search?: string; offerMin?: number; offerMax?: number; location?: string; remote?: boolean | string; skills?: string[]; experience?: number; page?: number; pageSize?: number }>, res: Response) => {
    logger.info(`Search posts invoked`);
    logger.info(`Request query: ${JSON.stringify(req.query)}`);

    const { search, offerMin, offerMax, location, remote, skills, experience } = req.query;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Parse numeric query params
    const parsedOfferMin = offerMin !== undefined ? Number(offerMin) : undefined;
    const parsedOfferMax = offerMax !== undefined ? Number(offerMax) : undefined;
    const parsedExperience = experience !== undefined ? Number(experience) : undefined;

    // Parse remote to boolean if it's a string
    let remoteBool: boolean | undefined = undefined;
    if (typeof remote === 'string') {
      if (remote === 'true') remoteBool = true;
      else if (remote === 'false') remoteBool = false;
    } else if (typeof remote === 'boolean') {
      remoteBool = remote;
    }

    // Use Prisma's QueryMode enum for case-insensitive search
    const queryMode = 'insensitive' as const;

    // Handle skills: if it's a string (e.g., '["React"]'), parse it to an array
    let skillsArray = skills;
    if (typeof skills === 'string') {
        try {
            skillsArray = JSON.parse(skills);
        } catch {
            skillsArray = [skills]; // fallback if not a JSON array string
        }
    }

    const where: any = {
        ...(search
            ? {
                OR: [
                    { title: { contains: search, mode: queryMode } },
                    { company: { contains: search, mode: queryMode } }
                ]
            }
            : {}),
        ...(parsedOfferMin !== undefined ? { offerMin: { gte: parsedOfferMin } } : {}),
        ...(parsedOfferMax !== undefined ? { offerMax: { lte: parsedOfferMax } } : {}),
        ...(location ? { location: { contains: location, mode: queryMode } } : {}),
        ...(remoteBool !== undefined ? { remote: remoteBool } : {}),
        ...(skillsArray && skillsArray.length ? { skills: { hasSome: skillsArray } } : {}),
        ...(parsedExperience !== undefined ? { experience: { gte: parsedExperience } } : {}),
    };

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.post.count({ where })
    ]);


    logger.info(posts)

    res.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        posts,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
    });
};
