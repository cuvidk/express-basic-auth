import 'dotenv/config';
import express, { json } from 'express';
import { requestInfoLogger, log } from './middleware/logger';
import { internalServerError } from './middleware/internal-server-error';
import { httpClientError } from './middleware/http-client-error';
import { config } from './common/config';
import { AuthController } from './controllers/auth/auth';
import { DumbUserService } from './services/user/dumb-user-service';

const main = () => {
  const userService = new DumbUserService();
  const authController = new AuthController(userService);

  const app = express();

  // middleware
  app.use(json());
  app.use(requestInfoLogger);

  // routes
  app.use('/auth', authController.router);

  app.use(httpClientError);
  app.use(internalServerError('Custom Internal Server Error'));

  app.listen(config.PORT);
  log(`Application started on port ${config.PORT}`);
};

main();
