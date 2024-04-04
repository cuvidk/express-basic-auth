import { HttpClientErrorCode } from '../../types/types';
import { HttpClientError } from './http-client-error';

export class HttpBadRequestError extends HttpClientError {
  constructor(message: string) {
    super(HttpClientErrorCode.BadRequest, message);
  }
}
