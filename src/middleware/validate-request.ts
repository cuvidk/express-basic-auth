import { NextFunction, Request, Response } from 'express';
import { Schema, Location, checkSchema, validationResult } from 'express-validator';
import { HttpBadRequestError } from '../common/exceptions/bad-request-error';

export const validateRequest = (schema: Schema, defaultLocations?: Location[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await checkSchema(schema, defaultLocations).run(req);
    const result = validationResult(req);

    // validation passed
    if (result.isEmpty()) return next();

    throw new HttpBadRequestError(
      `Validation failed: ${result
        .array()
        .map((e) => e.msg)
        .join(',')}`
    );
  };
};
