import { CreateUserIn, IUserService } from './types';
import { IUserRepository, User } from '../../repository/user/types';

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async createUser(params: CreateUserIn): Promise<User | undefined> {
    return this._repo.addUser(params);
  }

  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this._repo.getUser<User>({ filter: { username } });
    // use a comparison that's not vulnerable to timing attacks w/ bcrypt or smthing + store hashed instead
    if (!user || user.password !== password) return;
    return user;
  }
}
