import 'dotenv/config';
import express, { json } from 'express';
import { requestInfoLogger, log } from './middleware/logger';
import { internalServerError } from './middleware/internal-server-error';
import { PORT } from './common/environment';

const main = () => {
  const app = express();

  // middleware
  app.use(json());
  app.use(requestInfoLogger);
  app.use(internalServerError());

  app.listen(PORT);
  log(`Application started on port ${PORT}`);
};

main();
