import { Dialect, Sequelize } from 'sequelize';

require('dotenv').config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  NODE_ENV,
  PROD_DB_URL,
} = process.env;

let sequelize: Sequelize;

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(`${PROD_DB_URL!}?sslmode=require`, {
    dialect: DB_DIALECT as Dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
    host: DB_HOST!,
    dialect: DB_DIALECT as Dialect,
    logging: false,
  });
}

export default sequelize;
