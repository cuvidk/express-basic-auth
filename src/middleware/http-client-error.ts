import { NextFunction, Response, Request } from 'express';
import { HttpClientError } from '../common/exceptions/http-client-error';
import { buildApiResponse } from '../common/api-response';

export const httpClientError = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (!(err instanceof HttpClientError)) return next(err);

  res.status(err.statusCode).send(
    buildApiResponse({
      statusCode: err.statusCode,
      message: err.message,
    })
  );
};
