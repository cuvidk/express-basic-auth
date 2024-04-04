import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../common/config';
import { HttpUnauthorizedError } from '../common/exceptions';
import { User } from '../repository/user/types';
import { log } from './logger';

// TODO: move this out of here
export interface AuthenticatedRequest extends Request {
  user: Partial<User>;
}

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authCookie = req.cookies[config.AUTH_COOKIE_NAME];
    const decoded = jwt.verify(authCookie, config.AUTH_SECRET_KEY) as { user: Partial<User> };

    // TODO: Verify issuing time and reject if too old

    // TODO: I don't like this way of circumventing TS. Is there any other way to pass along this data
    (req as AuthenticatedRequest).user = decoded.user;
    next();
  } catch (err) {
    log(String(err));
    throw new HttpUnauthorizedError('Unauthorized');
  }
}