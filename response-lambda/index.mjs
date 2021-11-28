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
  const query = 'INSERT INTO public.responses("imageId", modifier, "passedTest", "sessionId") VALUES($1, $2, $3, $4) RETURNING *'
  const values = ['1', 1, true, "abc123"]
  const client = await pool.connect();
  try {
    const res = await client.query(query, values);
    console.log(res);
  } catch (err) {
    console.log('Database ' + err);
  } finally {
    client.release();
  }
}
