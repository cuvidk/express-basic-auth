import express, { NextFunction, Request, Response, Router } from 'express';
import { buildApiResponse } from '../../common/api-response';
import { IUserService } from '../../services/user/types';
import { validateRequest } from '../../middleware/validate-request';
import { createUserSchema, loginUserSchema } from './schema';
import { LoginDto, RegisterDto } from './types';
import { HttpUnauthorizedError, HttpConflictError } from '../../common/exceptions';
import { HttpSuccessCode } from '../../types/types';
import { verifyAuth } from '../../middleware/verify-auth';

export class AuthController {
  private _router = express.Router();

  constructor(private _userService: IUserService) {
    this._router.post('/register', validateRequest(createUserSchema, ['body']), this.register);
    this._router.post('/login', validateRequest(loginUserSchema, ['body']), this.login);
    this._router.get('/onlyloggedin', verifyAuth, this.authenticatedRoute);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: LoginDto = req.body;

    const token = await this._userService.loginUser(username, password);
    if (!token) return next(new HttpUnauthorizedError('Wrong username or password'));

    res.send(buildApiResponse({ token }));
  };

  private register = async (req: Request, res: Response, next: NextFunction) => {
    const params: RegisterDto = req.body;

    const user = await this._userService.createUser(params);
    if (!user) return next(new HttpConflictError(`username taken`));

    const { password: pass, ...userWithoutPassword } = user;
    res.send(buildApiResponse({ statusCode: HttpSuccessCode.Created, user: userWithoutPassword }));
  };

  private authenticatedRoute = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: `You successfully accessed an auth protected route as ${req.user?.username}` });
  };

  public get router(): Router {
    return this._router;
  }
}
