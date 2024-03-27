import 'dotenv/config';
import express, { json } from 'express';
import { requestInfoLogger, log } from './middleware/logger';
import { internalServerError } from './middleware/internal-server-error';
import { PORT } from './common/environment';
import userRouter from './route/user';

const main = () => {
  const app = express();

  // middleware
  app.use(json());
  app.use(requestInfoLogger);

  // routes
  app.use('/users', userRouter);

  app.use(internalServerError('Bai, ceva a mers prost tare'));

  app.listen(PORT);
  log(`Application started on port ${PORT}`);
};

main();
