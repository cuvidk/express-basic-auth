import { HttpClientErrorCode } from '../../types/types';
import { HttpClientError } from './http-client-error';

export class HttpConflictError extends HttpClientError {
  constructor(message: string) {
    super(HttpClientErrorCode.Conflict, message);
  }
}
