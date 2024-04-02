export type CreateUserIn = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export interface IUserService {
  createUser(params: CreateUserIn): Promise<User | undefined>;
  validateUser(username: string, password: string): Promise<User | undefined>;
  // getUser(id: string): User | undefined;
  // getAllUsers(): User[];
}
