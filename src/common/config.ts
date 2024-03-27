import { Stage } from './types';

export const config = {
  PORT: process.env.PORT || 3124,
  STAGE: <Stage>process.env.STAGE || Stage.DEVELOPMENT,
};
