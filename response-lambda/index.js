require('dotenv').config()
const pg = require('pg')

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

exports.handler = async (event) => {
  try {
    const client = await pool.connect()
    const res = await client.query(q)
    console.log(res)
  } catch (err) {
    console.log('Database ' + err)
  } finally {
    client.release()
  }
};
