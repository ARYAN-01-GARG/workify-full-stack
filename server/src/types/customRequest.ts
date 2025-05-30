import { Request } from 'express';

class CustomRequest extends Request {
    type? : string;
    userInfo? : {
        id: string;
        email: string;
        name: string;
        role : string;
    };
}

export default CustomRequest;