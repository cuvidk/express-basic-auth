import { STAGE } from './environment';
import { Stage } from './types';

type BuildApiResponseParams = {
  statusCode?: number;
  message?: string;
  err?: any;
  [K: string]: any;
};

type ApiResponse = {
  statusCode: number;
  message: string;
  [K: string]: any;
};

export const buildApiResponse = (params: BuildApiResponseParams): ApiResponse => {
  const { err, ...paramsWithoutError } = params;
  const e = <Error>err;
  console.log(e);
  return {
    ...paramsWithoutError,
    statusCode: params.statusCode || 200,
    message: params.message || 'OK',
    error: STAGE === Stage.DEVELOPMENT ? e.stack : undefined,
  };
};
