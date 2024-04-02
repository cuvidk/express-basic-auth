import { CreateUserIn, IUserService } from './types';
import { IUserRepository, User } from '../../repository/user/types';

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async createUser(params: CreateUserIn): Promise<User | undefined> {
    return Promise.resolve(undefined);
    // const { username, password, firstName, lastName, age } = params;
    // const existsStmt = await this._database.prepare('SELECT username FROM Users where username = :username');
    // await existsStmt.bind({ ':username': username });
    // const exisingUser = await existsStmt.get<User>();
    // if (exisingUser) return undefined;
    // const createStmt = await this._database.prepare(
    //   'INSERT INTO Users (username, password, firstName, lastName, age) VALUES (?,?,?,?,?) RETURNING *'
    // );
    // await createStmt.bind({
    //   1: username,
    //   2: password,
    //   3: firstName,
    //   4: lastName,
    //   5: age,
    // });
    // const user = await createStmt.get<User>();
    // return user;
  }

  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this._repo.getUser<User>({ filter: { username } });
    // use a comparison that's not vulnerable to timing attacks w/ bcrypt or smthing + store hashed instead
    if (!user || user.password !== password) return;
    return user;
  }
}
