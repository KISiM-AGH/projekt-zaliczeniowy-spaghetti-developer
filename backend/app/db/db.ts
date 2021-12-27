import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_URL, DB_PORT } = process.env;
const database = new Sequelize(
  DB_DATABASE || '',
  DB_USER || '',
  DB_PASSWORD || '',
  {
    host: DB_URL || '',
    port: parseInt(`${DB_PORT}`, 10),
    dialect: 'mysql',
  }
);
database.sync();

export default database;
