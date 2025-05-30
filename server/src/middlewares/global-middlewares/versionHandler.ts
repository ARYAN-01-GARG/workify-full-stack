import {
    Request ,
    Response ,
    NextFunction
} from 'express';
import { APIError } from '../../types/apiError';
import logger from './logger';

const versionHandler = (version : string ) => (req : Request, res : Response, next : NextFunction ) => {
    if(req.path.startsWith(`/api/${version}`)) {
        next();
    } else {
        logger.error(`API version ${version} is not supported for path: ${req.path}`);
        throw new APIError("API version is not supported", 404);
    }
}

export { versionHandler };