import { NextFunction, Request, Response } from 'express';

export const log = (message: string) => console.log(`[${new Date().toISOString()}]: ${message}`);

export const requestInfoLogger = (req: Request, res: Response, next: NextFunction) => {
  log(`${req.method} on ${req.route} from ${req.ip}`);
  next();
};
