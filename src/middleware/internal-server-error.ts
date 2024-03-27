import { Request, Response } from 'express';
import { buildApiResponse } from '../common/api-response';

export const internalServerError = (errorMessage?: string) => {
  return (req: Request, res: Response) => {
    res.status(500).send(buildApiResponse({ statusCode: 500, message: errorMessage || 'Internal Server Error' }));
  };
};
