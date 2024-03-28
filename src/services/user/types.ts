export type User = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type CreateUserIn = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

// export enum CreateUserStatus {
//   SUCCESS,
//   ALREADY_EXISTS,
// }

// export type CreateUserOut = {
//   user?: User;
//   status: CreateUserStatus;
// };

export interface IUserService {
  createUser(params: CreateUserIn): User | undefined;
  // getUser(id: string): User | undefined;
  getAllUsers(): User[];
}
