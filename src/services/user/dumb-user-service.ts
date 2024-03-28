import { CreateUserIn, IUserService, User } from './types';

export class DumbUserService implements IUserService {
  private crtId = 0;

  nextId() {
    return this.crtId++;
  }

  private users: User[] = [
    { id: this.nextId(), username: 'john@doe.com', password: 'xxx', firstName: 'john', lastName: 'Doe', age: 20 },
    { id: this.nextId(), username: 'c@google.com', password: '121', firstName: 'corq', lastName: 'Dan', age: 24 },
    { id: this.nextId(), username: 'yo@yahoo.com', password: '123', firstName: 'Danny', lastName: 'Jelly', age: 30 },
  ];

  createUser(params: CreateUserIn): User | undefined {
    const idx = this.users.findIndex((user) => user.username === params.username);
    if (idx === -1) return;
    const user = { id: this.nextId(), ...params };
    this.users.push(user);
    return user;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  // export const updateUser = (updateUserParams: UpdateUserParams): User | undefined => {
  //   const user = users.find((user) => user.id === updateUserParams.id);
  //   if (!user) return;
  //   user.name = updateUserParams.name || user.name;
  //   user.age = updateUserParams.age || user.age;
  //   return user;
  // };

  deleteUser(userId: number): User | undefined {
    const idx = this.users.findIndex((user) => user.id === userId);
    if (-1 === idx) return;
    const user = this.users.splice(idx, 1);
    return user[0];
  }
}
