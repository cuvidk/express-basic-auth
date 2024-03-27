import { Stage } from './types';

export const PORT = process.env.PORT || 3124;
export const STAGE: Stage = <Stage>process.env.STAGE || Stage.DEVELOPMENT;
