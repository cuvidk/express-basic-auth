type BuildResponseParams = {
  statusCode?: number;
  message?: string;
  [K: string]: string | number | undefined;
};

type ApiResponse = {
  statusCode: number;
  message: string;
  [K: string]: string | number | undefined;
};

export const buildApiResponse = (params: BuildResponseParams): ApiResponse => ({
  ...params,
  statusCode: params.statusCode || 200,
  message: params.message || 'OK',
});
