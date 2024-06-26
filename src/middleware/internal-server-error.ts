import { NextFunction, Request, Response } from 'express';
import { buildApiResponse } from '../common/api-response';

export const internalServerError = (errorMessage?: string) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(buildApiResponse({ statusCode: 500, message: errorMessage || 'Internal Server Error', err }));
  };
};
