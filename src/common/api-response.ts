import { config } from './config';
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
  error?: any;
  [K: string]: any;
};

export const buildApiResponse = (params: BuildApiResponseParams): ApiResponse => {
  const { err, ...paramsWithoutError } = params;
  const error = err?.stack || String(err);

  if (err && Stage.DEVELOPMENT === config.STAGE) {
    return {
      ...paramsWithoutError,
      statusCode: params.statusCode || 500,
      message: params.message || 'Internal Server Error',
      error,
    };
  }

  return {
    ...paramsWithoutError,
    statusCode: params.statusCode || 200,
    message: params.message || 'Ok',
  };
};
