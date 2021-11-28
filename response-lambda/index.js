const pg = require('pg')
const pool = new pg.Pool()

async function query(q) {
  const client = await pool.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}
/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context, callback) => {
  try {
    const { rows } = await query("select * from pg_tables")
    console.log(JSON.stringify(rows[0]))
    var response = {
      "statusCode": 200,
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(rows),
      "isBase64Encoded": false
    };
    callback(null, response);
  } catch (err) {
    console.log('Database ' + err)
    callback(null, 'Database ' + err);
  }
};
