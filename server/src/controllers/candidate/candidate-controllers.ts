import logger from "../../middlewares/global-middlewares/logger";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { APIError } from "../../types/apiError";

const createCandidate = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Creating candidate");
    logger.info("Request body:", req.body);
    const { github, location, skills, experience, domain } = req.body;
    logger.info("User Id from token:", req.user?.id);
    const userId = req.user?.id;
    const userRole = req.user?.role;
    if( userRole !== "CANDIDATE") {
        logger.error("User is not a candidate");
        throw new APIError("User is not a candidate", 403);
    }

    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }
    console.log(req.body);
    if (!domain || !github || !location || !skills || !experience) {
        logger.error("Missing required fields in request body");
        throw new APIError("All fields are required", 400);
    }
    const existingCandidate = await prisma.candidate.findUnique({
        where: {
            userId: userId
        }
    });
    if (existingCandidate) {
        logger.error("Candidate already exists for user ID:", userId);
        res.status(400).json({
            success: false,
            message: "Candidate already exists for this user",
            candidate: existingCandidate
        });
        return;
    }
    logger.info("Creating new candidate for user ID:", userId);
    // Create a new candidate
    const candidate = await prisma.candidate.create({
        data: {
            userId,
            domain,
            github,
            location,
            skills,
            experience
        }
    });

    logger.info("Candidate created successfully:", candidate);
    if( !candidate) {
        logger.error("Candidate creation failed");
        throw new APIError("Candidate creation failed", 500);
    }
    res.status(201).json({
        success: true,
        message: "Candidate created successfully",
        candidate
    });
}

const getCandidate = async (req: Request<{candidateId : string}>, res: Response, next: NextFunction) => {
    const { candidateId } = req.params;
    logger.info("Fetching candidate for user ID:", candidateId);

    if (!candidateId) {
        logger.error("Candidate ID is missing in the request");
        throw new APIError("Candidate ID is required", 400);
    }

    const candidate = await prisma.candidate.findUnique({
        where: {
            id: candidateId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    });

    if (!candidate) {
        logger.error("Candidate not found for user ID:", candidateId);
        throw new APIError("Candidate not found", 404);
    }

    logger.info("Candidate fetched successfully:", candidate);
    res.status(200).json({
        success: true,
        message: "Candidate fetched successfully",
        candidate
    });
}

const updateCandidate = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Updating candidate for user ID:", req.user?.id);
    const userId = req.user?.id;
    const userRole = req.user?.role;
    if (userRole !== "CANDIDATE") {
        logger.error("User is not a candidate");
        throw new APIError("User is not a candidate", 403);
    }
    logger.info("Request body:", req.body);
    const { resume, portfolio, github, location, skills, experience, certificates } = req.body;

    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }

    if (!resume || !portfolio || !github || !location || !skills || !experience || !certificates) {
        logger.error("Missing required fields in request body");
        throw new APIError("All fields are required", 400);
    }

    const candidate = await prisma.candidate.update({
        where: {
            userId: userId
        },
        data: {
            resume,
            portfolio,
            github,
            location,
            skills,
            experience,
            certificates
        }
    });

    if (!candidate) {
        logger.error("Candidate update failed for user ID:", userId);
        throw new APIError("Candidate update failed", 500);
    }

    logger.info("Candidate updated successfully:", candidate);
    res.status(200).json({
        success: true,
        message: "Candidate updated successfully",
        candidate
    });
}



export {
    createCandidate,
    getCandidate,
    updateCandidate,
};

