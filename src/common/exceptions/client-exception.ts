import { HttpStatusCode } from '../types';

export class ClientException extends Error {
  constructor(private statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
