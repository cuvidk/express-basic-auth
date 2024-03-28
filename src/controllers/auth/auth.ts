import express, { NextFunction, Request, Response, Router } from 'express';
import { buildApiResponse } from '../../common/api-response';
import { IUserService } from '../../services/user/types';
import { validateRequest } from '../../middleware/validate-request';
import { createUserSchema, loginUserSchema } from './schema';
import { LoginDto, RegisterDto } from './types';
import { HttpUnauthorizedError, HttpConflictError } from '../../common/exceptions';
import { HttpSuccessCode } from '../../common/types';

export class AuthController {
  private _router = express.Router();

  constructor(private _userService: IUserService) {
    this._router.post('/register', validateRequest(createUserSchema, ['body']), this.register);
    this._router.post('/login', validateRequest(loginUserSchema, ['body']), this.login);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: LoginDto = req.body;

    const user = await this._userService.validateUser(username, password);
    if (!user) return next(new HttpUnauthorizedError('Wrong username or password'));

    const { password: pass, ...userWithoutPassword } = user;
    res.send(buildApiResponse({ user: userWithoutPassword }));
  };

  private register = async (req: Request, res: Response, next: NextFunction) => {
    const params: RegisterDto = req.body;

    const user = await this._userService.createUser(params);
    if (!user) return next(new HttpConflictError(`username taken`));

    const { password: pass, ...userWithoutPassword } = user;
    res.send(buildApiResponse({ statusCode: HttpSuccessCode.Created, user: userWithoutPassword }));
  };

  public get router(): Router {
    return this._router;
  }
}
