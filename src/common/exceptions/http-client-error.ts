import { HttpClientErrorCode } from '../types';

export class HttpClientError extends Error {
  constructor(private _statusCode: HttpClientErrorCode, message: string) {
    super(message);
  }

  public get statusCode(): HttpClientErrorCode {
    return this._statusCode;
  }
}
