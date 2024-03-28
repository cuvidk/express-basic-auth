import { HttpClientErrorCode } from '../types';
import { HttpClientError } from './http-client-error';

export class HttpUnauthorizedError extends HttpClientError {
  constructor(message: string) {
    super(HttpClientErrorCode.Unauthorized, message);
  }
}
