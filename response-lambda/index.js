require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

exports.handler = async (event) => {
  const { imageId, modifier, passedTest, sessionId } = event.body;
  const query = 'INSERT INTO public.responses("imageId", modifier, "passedTest", "sessionId") VALUES($1, $2, $3, $4) RETURNING *';
  const values = [imageId, modifier, passedTest, sessionId];
  const client = await pool.connect();
  try {
    const res = await client.query(query, values);
    console.log(res);
  } catch (err) {
    console.log('Database ' + err);
  } finally {
    client.release();
  }
};
