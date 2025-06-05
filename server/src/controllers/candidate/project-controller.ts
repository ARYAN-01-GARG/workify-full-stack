import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma";
import logger from "../../middlewares/global-middlewares/logger";
import { APIError } from "../../types/apiError";

const createProject = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Creating project for user ID:", req.user?.id);
    const userId = req.user?.id;
    logger.info("Request body:", req.body);
    const { title , description, link, technologies } = req.body;
    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }
    if (!title || !description || !link || !technologies) {
        logger.error("Missing required fields in request body");
        throw new APIError("All fields are required", 400);
    }
    const candidate = await prisma.candidate.findUnique({
        where: {
            userId: userId
        }
    });
    if (!candidate) {
        logger.error("Candidate not found for user ID:", userId);
        throw new APIError("Candidate not found", 404);
    }
    const project = await prisma.project.create({
        data: {
            title,
            description,
            link,
            technologies,
            userId
        }
    });
    if (!project) {
        logger.error("Project creation failed for user ID:", userId);
        throw new APIError("Project creation failed", 500);
    }
    logger.info("Project created successfully:", project);
    res.status(201).json({
        success: true,
        message: "Project created successfully",
        project
    });
}

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Fetching projects for user ID:", req.user?.id);

    const userId = req.user?.id;

    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }

    const projects = await prisma.project.findMany({
        where: {
            userId: userId
        }
    });

    logger.info("Projects fetched successfully:", projects);
    res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        projects
    });
}

const updateProject = async (req: Request<{ projectId: string }>, res: Response, next: NextFunction) => {
    logger.info("Updating project for user ID:", req.user?.id);
    const userId = req.user?.id;
    logger.info("Request body:", req.body);
    const { title, description, link, technologies } = req.body;
    const projectId = req.params.projectId;
    if (!projectId) {
        logger.error("Project ID is missing in the request");
        throw new APIError("Project ID is required", 400);
    }
    if (!userId) {
        logger.error("User ID is missing in the request");
        throw new APIError("User ID is required", 400);
    }
    if (!projectId || !title || !description || !link || !technologies) {
        logger.error("Missing required fields in request body");
        throw new APIError("All fields are required", 400);
    }
    const project = await prisma.project.update({
        where: {
            id: projectId,
            userId: userId
        },
        data: {
            title,
            description,
            link,
            technologies
        }
    });
    if (!project) {
        logger.error("Project update failed for project ID:", projectId);
        throw new APIError("Project update failed", 500);
    }
    logger.info("Project updated successfully:", project);
    res.status(200).json({
        success: true,
        message: "Project updated successfully",
        project
    });
}

export {
    createProject,
    getAllProjects,
    updateProject
};