import { User } from '../../repository/user/types';

export type CreateUserIn = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export interface IUserService {
  createUser(params: CreateUserIn): Promise<User | undefined>;
  loginUser(username: string, password: string): Promise<User | undefined>;
  // getUser(id: string): User | undefined;
  // getAllUsers(): User[];
}
