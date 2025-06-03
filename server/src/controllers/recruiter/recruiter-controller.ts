import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma";
import logger from "../../middlewares/global-middlewares/logger";
import { RecruiterRequestBody } from "../../types/recruiter-reqBody-types";
import { APIError } from "../../types/apiError";


const createRecruiter = async (req: Request<{}, {}, RecruiterRequestBody>, res: Response, next : NextFunction) => {
    logger.info("Creating recruiter");
    logger.info("Request body:", req.body);

    const { companyName, jobTitle, jobDescription, jobLocation } = req.body;

    logger.info("User Id from token:", req.user?.id);
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }
    if (userRole === "RECRUITER") {
        logger.error("User is already a recruiter");
        throw new APIError("User is already a recruiter", 400);
    }

    if (!companyName || !jobTitle || !jobDescription || !jobLocation) {
        logger.error("Missing required fields in request body");
        throw new APIError("All fields are required", 400);
    }
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            role : "RECRUITER"
         }
    });
    if (!user) {
        logger.error("User not found or update failed");
        throw new APIError("User not found", 404);
    }
    logger.info("User updated to recruiter role:", user);
    const searchRecruiter = await prisma.recruiter.findUnique({
        where: {
            userId: userId
        }
    });
    if (searchRecruiter) {
        logger.error("Recruiter already exists for user ID:", userId);
        throw new APIError("Recruiter already exists", 400);
    }
    try {
        const recruiter = await prisma.recruiter.create({
            data: {
                userId,
                companyName,
                jobTitle,
                jobDescription,
                jobLocation,
            }
        });
        logger.info("Recruiter created successfully:", recruiter);
        res.status(201).json({
            success: true,
            message: "Recruiter created successfully",
            user: user,
            recruiter: recruiter
        });
    } catch (error) {
        logger.error("Error creating recruiter:", error);
        next(error);
    }
}

const getRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Fetching user details for recruiter");
    logger.info("Fetching recruiter details for user ID:", req.user?.id);
    const userId = req.user?.id;

    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                recruiter: true
            }
        });

        if (!user) {
            logger.error("Recruiter not found for user ID:", userId);
            throw new APIError("Recruiter not found", 404);
        }

        logger.info("Recruiter details fetched successfully:", user);
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        logger.error("Error fetching recruiter details:", error);
        next(error);
    }
}

const getRecruiterById = async (req: Request<{ id : string}>, res: Response, next: NextFunction) => {
    logger.info("Fetching recruiter details by ID");
    const recruiterId = req.params.id;

    if (!recruiterId) {
        logger.error("Recruiter ID is missing in the request");
        throw new APIError("Recruiter ID is required", 400);
    }

    try {
        const recruiter = await prisma.recruiter.findUnique({
            where: {
                id: recruiterId
            }
        });

        if (!recruiter) {
            logger.error("Recruiter not found for ID:", recruiterId);
            throw new APIError("Recruiter not found", 404);
        }

        logger.info("Recruiter details fetched successfully:", recruiter);
        res.status(200).json({
            success: true,
            recruiter: recruiter,
        });
    } catch (error) {
        logger.error("Error fetching recruiter details by ID:", error);
        next(error);
    }
}

const getAllRecruiters = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Fetching all recruiters");
    const allRecruiters = await prisma.recruiter.findMany({});

    if (!allRecruiters || allRecruiters.length === 0) {
        logger.warn("No recruiters found");
        throw new APIError("No recruiters found", 404);
    }

    logger.info("All recruiters fetched successfully:", allRecruiters);
    res.status(200).json({
        success: true,
        recruiters: allRecruiters
    });
}

const updateRecruiter = async (req: Request<{}, {}, RecruiterRequestBody>, res: Response, next: NextFunction) => {
    logger.info("Updating recruiter details");
    const { companyName, jobTitle, jobDescription, jobLocation } = req.body;

    if (!companyName || !jobTitle || !jobDescription || !jobLocation) {
        logger.error("Missing required fields in request body");
        throw new APIError("All fields are required", 400);
    }
    logger.info("User Id from token:", req.user?.id);
    const userId = req.user?.id;
    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }

    try {
        const updatedRecruiter = await prisma.recruiter.update({
            where: {
                userId,
            },
            data: {
                companyName,
                jobTitle,
                jobDescription,
                jobLocation,
            }
        });

        logger.info("Recruiter updated successfully:", updatedRecruiter);
        res.status(200).json({
            success: true,
            message: "Recruiter updated successfully",
            recruiter: updatedRecruiter
        });
    } catch (error) {
        logger.error("Error updating recruiter:", error);
        next(error);
    }
};

export {
    createRecruiter,
    getRecruiter,
    getRecruiterById,
    getAllRecruiters,
    updateRecruiter
}