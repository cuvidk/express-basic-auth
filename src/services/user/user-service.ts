import { CreateUserIn, IUserService } from './types';
import { IUserRepository, User } from '../../repository/user/types';
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async createUser(params: CreateUserIn): Promise<User | undefined> {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    return this._repo.addUser({
      ...params,
      password: hashedPassword,
    });
  }

  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this._repo.getUser<User>({ filter: { username } });

    if (!user) return;
    if (!bcrypt.compareSync(password, user.password)) return;

    return user;
  }
}
