import { HttpStatusCode } from '../types';
import { HttpError } from './http-error';

export class HttpBadRequestError extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.BadRequest, message);
  }
}
