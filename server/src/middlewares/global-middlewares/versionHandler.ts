import {
    Request ,
    Response ,
    NextFunction
} from 'express';
import { APIError } from '../../types/apiError';

const versionHandler = (version : string ) => (req : Request, res : Response, next : NextFunction ) => {
    if(req.path.startsWith(`/api/${version}`)) {
        next();
    } else {
        throw new APIError("API version is not supported", 404);
    }
}

export { versionHandler };