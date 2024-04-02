export type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type Filter<T> = Partial<T>;
export type Selector<T> = {
  [K in keyof T]?: boolean;
};

export type GetUserParams = {
  select?: Selector<User>;
  filter: Filter<User>;
};

export type AddUserParams = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export interface IUserRepository {
  getUser<U extends Partial<User>>(params: GetUserParams): Promise<U | undefined>;
  addUser(params: AddUserParams): Promise<User | undefined>;
}
