
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();
const dbPool = mysql.createPool({
  connectionLimit : 20, //important
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});
global.dbPool = dbPool;
