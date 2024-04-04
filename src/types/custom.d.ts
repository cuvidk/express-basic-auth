import { User } from '../repository/user/types';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }

  interface JwtPayload {
    user?: Partial<User>;
  }
}
