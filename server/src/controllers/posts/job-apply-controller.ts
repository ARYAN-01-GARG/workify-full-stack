import { Request, Response } from 'express';
import logger from '../../middlewares/global-middlewares/logger';
import { prisma } from '../../config/prisma';
import { APIError } from '../../types/apiError';


export const applyForJob = async (req: Request<{ jobId: string }>, res: Response) => {
    logger.info('Applying for job');
    logger.info(`Applying for job with ID: ${req.user?.id} for job ID: ${req.params.jobId}`);
    const jobId = req.params.jobId;
    if (!jobId) {
        logger.error('Job ID is required');
        throw new APIError('Job ID is required', 400);
    }
    const userId = req.user?.id;
    const role = req.user?.role;
    if (!userId) {
        logger.error('User not authenticated');
        throw new APIError('User not authenticated', 401);
    }

    if (role !== 'CANDIDATE') {
        logger.error('User is not a candidate,Cannot apply for jobs');
        throw new APIError('User is not a candidate,Cannot apply for jobs', 403);
    }
    const jobPost = await prisma.post.findUnique({
        where: {
            id: jobId,
        },
    });
    if (!jobPost) {
        logger.error(`Job post with ID ${jobId} not found`);
        throw new APIError(`Job post with ID ${jobId} not found`, 404);
    }
    const existingApplication = await prisma.application.findFirst({
        where: {
            postId: jobId,
            candidateId: userId,
        },
    });
    if (existingApplication) {
        logger.error(`User with ID ${userId} has already applied for job ID ${jobId}`);
        throw new APIError(`You have already applied for this job`, 400);
    }
    const AppliedJob = await prisma.application.create({
        data: {
            postId: jobId,
            candidateId: userId,
        },
    });
    if(!AppliedJob) {
        logger.error('Error applying for job');
        throw new APIError('Error applying for job', 500);
    }
    logger.info(`Job application successful for job ID: ${jobId} by user ID: ${userId}`);
    res.status(200).json({
        success: true,
        message: 'Job application successful',
        application: AppliedJob,
    });
};

export const getAppliedJobs = async (req: Request, res: Response) => {
    logger.info('Fetching applied jobs');
    logger.info(`Fetching applied jobs for user ID: ${req.user?.id}`);
    const userId = req.user?.id;
    if (!userId) {
        logger.error('User not authenticated');
        throw new APIError('User not authenticated', 401);
    }

    const appliedJobs = await prisma.application.findMany({
        where: {
            candidateId: userId,
        },
        include: {
            post: true,
        },
    });

    if (!appliedJobs || appliedJobs.length === 0) {
        logger.info('No applied jobs found for user');
        return res.status(404).json({
            success: false,
            message: 'No applied jobs found',
        });
    }

    logger.info(`Applied jobs fetched successfully for user ID: ${userId}`);
    res.status(200).json({
        success: true,
        message: 'Applied jobs fetched successfully',
        applications: appliedJobs,
    });
};

export const acceptJobApplication = async (req: Request<{}, {}, { jobId : string , candidateId : string }>, res: Response) => {
    logger.info('Accepting job application');
    logger.info(`Request Body: ${req.body}`);
    const { jobId : postId , candidateId } = req.body;
    const userId = req.user?.id;
    if (!postId || !candidateId) {
        logger.error('Job ID and Candidate ID are required');
        throw new APIError('Job ID and Candidate ID are required', 400);
    }
    if (!userId) {
        logger.error('User not authenticated');
        throw new APIError('User not authenticated', 401);
    }

    const application = await prisma.application.findFirst({
        where: {
            postId,
            candidateId,
        },
    });

    if (!application) {
        logger.error(`Job application with ID ${postId} not found`);
        throw new APIError(`Job application with ID ${postId} not found`, 404);
    }

    if( application.status !== 'PENDING') {
        logger.error(`Job application is already accepted`);
        throw new APIError(`Job application is already accepted`, 400);
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
            userId, // Ensure the user is the owner of the job post
        },
        data: {
            applications: {
                update: {
                    where: {
                        candidateId_postId: { candidateId, postId }
                    },
                    data: {
                        status: 'ACCEPTED',
                    },
                },
            },
        },
    });

    if (!updatedPost) {
        logger.error('Job doesnt exist or you are not the owner of the job post');
        throw new APIError('Error accepting job application', 500);
    }
    logger.info(`Job application accepted successfully for job ID: ${postId} by candidate ID: ${candidateId}`);
    res.status(200).json({
        success: true,
        message: 'Job application accepted successfully',
        post: updatedPost,
    });
}