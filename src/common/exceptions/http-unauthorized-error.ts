import { HttpClientErrorCode } from '../../types/types';
import { HttpClientError } from './http-client-error';

export class HttpUnauthorizedError extends HttpClientError {
  constructor(message: string) {
    super(HttpClientErrorCode.Unauthorized, message);
  }
}
