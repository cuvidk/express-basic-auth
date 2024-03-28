import { HttpStatusCode } from '../types';

export class HttpError extends Error {
  constructor(private _statusCode: HttpStatusCode, message: string) {
    super(message);
  }

  public get statusCode(): HttpStatusCode {
    return this._statusCode;
  }
}
