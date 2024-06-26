import { NextFunction, Request, Response } from 'express';
import { Schema, Location, checkSchema, validationResult } from 'express-validator';
import { HttpBadRequestError } from '../common/exceptions/http-bad-request-error';

export const validateRequest = (schema: Schema, defaultLocations?: Location[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await checkSchema(schema, defaultLocations).run(req);
    const error = validationResult(req);

    // validation passed
    if (error.isEmpty()) return next();

    // throwing this will result in express not
    // handling the error because the function is async
    next(
      new HttpBadRequestError(
        `Validation error: ${error
          .array({ onlyFirstError: true })
          .map((e) => e.msg)
          .join(', ')}`
      )
    );
  };
};
