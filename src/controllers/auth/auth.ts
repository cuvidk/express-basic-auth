import express, { NextFunction, Request, Response, Router } from 'express';
import { buildApiResponse } from '../../common/api-response';
import { IUserService } from '../../services/user/types';
import { validateRequest } from '../../middleware/validate-request';
import { createUserSchema, loginUserSchema } from './schema';
import { CreateUserDto, LoginDto } from './types';
import { HttpUnauthorizedError } from '../../common/exceptions/http-unauthorized-error';

export class AuthController {
  private _router = express.Router();

  constructor(private _userService: IUserService) {
    this._router.post('/register', validateRequest(createUserSchema, ['body']), this.createUser);
    this._router.post('/login', validateRequest(loginUserSchema, ['body']), this.loginUser);
  }

  private loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: LoginDto = req.body;
    const user = await this._userService.validateUser(username, password);
    if (!user) return next(new HttpUnauthorizedError('Wrong username or password'));
    const { password: pass, ...userWithoutPassword } = user;
    res.send(buildApiResponse({ user: userWithoutPassword }));
  };

  private createUser = (req: Request, res: Response) => {
    const params: CreateUserDto = req.body;
    console.log('Creating a user');
    res.status(201).send('OKAY, validation is good');
  };

  public get router(): Router {
    return this._router;
  }
}
