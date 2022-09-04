import { Dialect, Sequelize } from "sequelize";
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT as Dialect;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
});

export default sequelizeConnection;
