import { Request, Response } from 'express';


const healthCheckController = (req: Request, res: Response) => {
    res.send('Server is up and running');
}

export { healthCheckController }