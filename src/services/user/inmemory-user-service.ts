import { CreateUserIn, IUserService, User } from './types';

export class InMemoryUserService implements IUserService {
  private crtId = 0;

  nextId() {
    return this.crtId++;
  }

  private users: User[] = [
    { id: this.nextId(), username: 'john@doe.com', password: 'xxx', firstName: 'john', lastName: 'Doe', age: 20 },
    { id: this.nextId(), username: 'c@google.com', password: '121', firstName: 'corq', lastName: 'Dan', age: 24 },
    { id: this.nextId(), username: 'yo@yahoo.com', password: '123', firstName: 'Danny', lastName: 'Jelly', age: 30 },
  ];

  createUser(params: CreateUserIn): Promise<User | undefined> {
    const idx = this.users.findIndex((user) => user.username === params.username);
    if (idx !== -1) return Promise.resolve(undefined);

    const user = { id: this.nextId(), ...params };
    this.users.push(user);

    return Promise.resolve(user);
  }

  validateUser(username: string, password: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);
    if (!user || user.password !== password) return Promise.resolve(undefined);

    return Promise.resolve(user);
  }
}
