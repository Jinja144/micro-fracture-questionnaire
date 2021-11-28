import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

export async function handler(event) {
  const client = await pool.connect();
  try {
    const res = await client.query(q);
    console.log(res);
  } catch (err) {
    console.log('Database ' + err);
  } finally {
    client.release();
  }
}
