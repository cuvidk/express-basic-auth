import 'dotenv/config';
import express, { json } from 'express';
import { requestInfoLogger, log } from './middleware/logger';
import { internalServerError } from './middleware/internal-server-error';
import { config } from './common/config';
import authRouter from './route/auth';

const main = () => {
  const app = express();

  // middleware
  app.use(json());
  app.use(requestInfoLogger);

  // routes
  app.use('/users', authRouter);

  app.use(internalServerError('Bai, ceva a mers prost tare'));

  app.listen(config.PORT);
  log(`Application started on port ${config.PORT}`);
};

main();
