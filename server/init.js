
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql';

const dbPool = mysql.createPool({
  connectionLimit : 20, //important
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

global.dbPool = dbPool;
