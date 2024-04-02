export type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type PartialUser = Partial<User>;

export type GetUserSelect = {
  [K in keyof User]?: boolean;
};

export type GetUserFilter = PartialUser;

export type GetUserParams = {
  select?: GetUserSelect;
  filter: GetUserFilter;
};

export type AddUserParams = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export interface IUserRepository {
  getUser<U extends PartialUser>(params: GetUserParams): Promise<U | undefined>;
  addUser(params: AddUserParams): Promise<User | undefined>;
}
