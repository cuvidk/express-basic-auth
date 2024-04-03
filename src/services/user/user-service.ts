import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthToken, CreateUserIn, IUserService } from './types';
import { IUserRepository, User } from '../../repository/user/types';
import { config } from '../../common/config';

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async createUser(params: CreateUserIn): Promise<User | undefined> {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    return this._repo.addUser({
      ...params,
      password: hashedPassword,
    });
  }

  async loginUser(username: string, password: string): Promise<AuthToken | undefined> {
    const user = await this._repo.getUser<User>({ filter: { username } });

    if (!user) return;
    if (!bcrypt.compareSync(password, user.password)) return;

    const { password: pw, ...userNoPassword } = user;
    const payload = { user: { ...userNoPassword } };
    const token = jwt.sign(payload, config.AUTH_SECRET_KEY);

    return token;
  }
}
