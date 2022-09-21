import express, { Express, Response } from 'express';
import bodyParser from 'body-parser';
import router from './src/api/routes';
import sequelize from './src/db/index';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const BASE_URL = process.env.BACKEND_APP_BASE_URL;
const PORT = 8000;
const FULL_URL = `${BASE_URL}:${PORT}`;
const CURRENT_API = '/api/v1';

export const getApp = () => {
  const app: Express = express();
  const swaggerDoc = YAML.load('./swagger.yml');

  // middleware
  const corsConfig = {
    origin: process.env.FRONTEND_APP_URL,
    credentials: true,
  };
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  // For Render.com to ping: https://stackoverflow.com/questions/72150113/nodejs-app-build-is-successful-render-but-application-error-in-render-at-the-l
  app.get('/', (_, res: Response) => {
    res.sendStatus(200);
  });

  app.use(CURRENT_API + '/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use(CURRENT_API, router);

  return app;
};

export const startApp = () => {
  const app = getApp();

  try {
    app.listen(PORT, () => {
      console.log(`Server running on ${FULL_URL}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

export const startDb = () => {
  try {
    sequelize
      .authenticate()
      .then(() => console.log('Database successfully connected'));
  } catch (error: any) {
    console.log('Error connecting to the database');
  }
};

// Start db and server
export const start = async () => {
  startDb();
  startApp();
};

start();
