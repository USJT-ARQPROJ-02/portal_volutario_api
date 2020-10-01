import './bootstrap';
import Youch from 'youch';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import AppError from './errors/AppError';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ) {
        const errors = await new Youch(err, req).toJSON();

        if (err instanceof AppError) {
          return res.status(err.statusCode).json(err.message);

          // eslint-disable-next-line no-else-return
        } else {
          return res.status(500).json(errors);
        }
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
