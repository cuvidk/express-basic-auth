import express, { Request, Response, Router } from 'express';
import { buildApiResponse } from '../../common/api-response';
import { IUserService } from '../../services/user/types';
import { validateRequest } from '../../middleware/validate-request';
import { createUserSchema } from './schema';
import { CreateUserDto } from './types';

export class AuthController {
  private _router = express.Router();

  constructor(private _userService: IUserService) {
    this._router.get('/', this.getUsers);
    this._router.post('/', validateRequest(createUserSchema, ['body']), this.createUser);
  }

  private getUsers = (req: Request, res: Response): void => {
    const users = this._userService.getAllUsers();
    res.send(buildApiResponse({ users }));
  };

  private createUser = (req: Request, res: Response): void => {
    const params: CreateUserDto = req.body;
    console.log('Creating a user');
    res.status(201).send('OKAY, validation is good');
  };

  public get router(): Router {
    return this._router;
  }
}
