import { Schema } from 'express-validator';

export const loginUserSchema: Schema = {
  username: {
    notEmpty: true,
    isString: true,
    errorMessage: 'username cannot be empty',
  },
  password: {
    notEmpty: true,
    isString: true,
    errorMessage: 'password cannot be empty',
  },
};

export const createUserSchema: Schema = {
  username: {
    isEmail: true,
    errorMessage: 'username needs to be an email',
  },
  password: {
    isStrongPassword: {
      options: {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage: 'password to weak: length >= 8, 1 uppercase, 1 lowercase, 1 number and 1 symbol',
    },
  },
  firstName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: `firstName length has to be > 2`,
    },
  },
  lastName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: `lastName length has to be > 2`,
    },
  },
  age: {
    isNumeric: true,
    errorMessage: 'age has to be a number',
  },
};
