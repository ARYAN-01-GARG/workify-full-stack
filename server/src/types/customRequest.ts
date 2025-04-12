import { Request } from 'express';

class CustomRequest extends Request {
    type? : string;
}

export default CustomRequest;