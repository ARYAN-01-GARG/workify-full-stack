import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export const reqLogger = ( req: Request, res: Response, next: NextFunction) => {
    // check folder exists
    const logFolder = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder);
    }

    // create log file
    const logFile = path.join(logFolder, 'request.log');
    const customLogMessage = `Method: ${req.method} | URL: ${req.url} | Time: ${new Date().toISOString()} | ${req.hostname} \n`;

    // write log
    fs.appendFile(logFile, customLogMessage, (err) => {
        if (err) {
            console.log(err);
        }
    });

    next();
}