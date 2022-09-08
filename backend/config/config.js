// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, PROD_DB_URL } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    url: PROD_DB_URL,
  },
};
