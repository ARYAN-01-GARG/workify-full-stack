import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../types/apiError';
import jwt from 'jsonwebtoken';
import logger from '../global-middlewares/logger';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Auth Middleware Invoked');
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        logger.error('Authentication failed: Token is missing');
        throw new APIError('User is not Authenticated , Token is missing', 401);
    }

     try {
        // Verify the token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userInfo: {
                id: string;
                email: string;
                name: string;
                role: string;
            };
        }
        logger.info('Token successfully verified');
        // Save the decoded user information in req.user
        req.user = decoded.userInfo;
        logger.info(`Authenticated user: ${JSON.stringify(req.user)}`);
        next();
    } catch (error) {
        logger.error('Authentication failed: Token is invalid');
        throw new APIError('User is not Authenticated , Token is invalid', 403);
    }
}

export default authMiddleware;