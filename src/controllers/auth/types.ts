export type CreateUserDto = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type LoginDto = {
  username: string;
  password: string;
};
