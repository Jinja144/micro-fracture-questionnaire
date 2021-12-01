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
  let client;
  try {
    client = await pool.connect();
    for (var i = 0; i < event?.Records?.length; i++) {
      const record = event?.Records[i]
      const { imageId, modifier, passedTest, sessionId } = JSON.parse(record.body);
      const query = 'INSERT INTO public.responses("imageId", modifier, "passedTest", "sessionId") VALUES($1, $2, $3, $4) RETURNING *';
      const values = [imageId, modifier, passedTest, sessionId];
      await client.query(query, values);
    }
  } catch (err) {
    console.log('Database ' + err);
  } finally {
    client.release();
  }
};
