const { MongoClient, ObjectId } = require('mongodb');
const URI = process.env.MONGODB_URI;

if (!URI) {
  throw new Error(
    'The MONGODB_URI environment variable must be configured with the connection string to the database.'
  );
}

let cachedPromise = null;

exports.handler = async (event) => {

  if (!cachedPromise) {
    cachedPromise = MongoClient.connect(URI, { useNewUrlParser: true,  useUnifiedTopology: true });
  }
  const client = await cachedPromise;
  
  if (!event.queryStringParameters || !event.queryStringParameters.hasOwnProperty("id")) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err:"improper request" })
    };
  }
  
  const id = event.queryStringParameters.id;
  const res = await client.db().collection("bp-fsd1").deleteOne({_id:ObjectId(id)});

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  };

};