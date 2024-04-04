import { Stage } from '../types/types';

export const config = {
  PORT: process.env.PORT || 3124,
  STAGE: <Stage>process.env.STAGE || Stage.DEVELOPMENT,
  DATABASE_FILE: process.env.DATABASE_FILE || process.cwd() + 'sqlite-database.db',
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || 'auth_id',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY as string,
};

if (!config.AUTH_SECRET_KEY) throw new Error('Missing AUTH_SECRET_KEY env');
