import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './src/api/routes';
import sequelize from './src/db/index';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import injection_container from './src/db/indices/config';
import { NeighbouringToiletsIndex } from './src/db/indices';
import TYPES from './src/db/indices/types';

const port = 8000; // Can replace with input from .env file
const current_api = '/api/v1';

export const getApp = () => {
  const app: Express = express();
  const swaggerDoc = YAML.load('./swagger.yml');

  // middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // endpoints
  app.get('/', (_, res: Response) => {
    res.redirect('http://localhost:8000/api/v1/docs/');
  });

  app.use(current_api + '/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use(current_api, router);

  return app;
};

export const startApp = () => {
  const app = getApp();

  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

export const initialiseIndices = async () => {
  const neighbouringToiletsIndex =
    injection_container.get<NeighbouringToiletsIndex>(
      TYPES.NeighbouringToiletsIndex
    );
  await neighbouringToiletsIndex.generateIndices();
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
  await initialiseIndices();
  startApp();
};

start();
