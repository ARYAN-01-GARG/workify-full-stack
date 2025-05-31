import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../types/apiError';
import logger from '../global-middlewares/logger';

const authRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Auth Role Middleware Invoked');
    const userRole = req.user?.role;
    logger.info(`User Role : ${userRole}`);

    if(!userRole){
        logger.error('User Not authenticated.')
        throw new APIError('User is Not Authenticated', 403)
    }

    if(userRole != 'RECRUITER'){
        logger.error('User Is Not a Recruiter.')
        throw new APIError('User is not a Recruiter', 401)
    }
    next()
}

export default authRoleMiddleware;