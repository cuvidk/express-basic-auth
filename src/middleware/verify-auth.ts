import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../common/config';
import { HttpUnauthorizedError } from '../common/exceptions';
import { log } from './logger';

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authCookie = req.cookies[config.AUTH_COOKIE_NAME];

    // TODO: Verify issuing time and reject if too old
    const decoded = jwt.verify(authCookie, config.AUTH_SECRET_KEY, { complete: true }).payload as JwtPayload;

    // enchance Request obj w/ user
    req.user = decoded.user;
    next();
  } catch (err) {
    log(String(err));
    throw new HttpUnauthorizedError('Unauthorized');
  }
}
