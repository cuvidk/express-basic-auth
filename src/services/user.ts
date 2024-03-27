type User = {
  id: number;
  name: string;
  age: number;
};

type CreateUserParams = {
  name: string;
  age: number;
};

type UpdateUserParams = {
  id: number;
  name?: string;
  age?: number;
};

let crtId = 0;
const nextId = () => crtId++;

const users: User[] = [
  { id: nextId(), name: 'Johnny', age: 20 },
  { id: nextId(), name: 'Doe', age: 24 },
  { id: nextId(), name: 'Daniel', age: 36 },
];

export const createUser = (createUserParams: CreateUserParams): User => {
  const user = { id: nextId(), ...createUserParams };
  users.push(user);
  return user;
};

export const getAllUsers = (): User[] => {
  return users;
};

export const updateUser = (updateUserParams: UpdateUserParams): User | undefined => {
  const user = users.find((user) => user.id === updateUserParams.id);
  if (!user) return;
  user.name = updateUserParams.name || user.name;
  user.age = updateUserParams.age || user.age;
  return user;
};

export const deleteUser = (userId: number): User | undefined => {
  const idx = users.findIndex((user) => user.id === userId);
  if (-1 === idx) return;
  const user = users.splice(idx, 1);
  return user[0];
};
