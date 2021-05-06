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
  let cursor, data;
  
  // find user with id
  if (event.queryStringParameters && event.queryStringParameters.id) {
    const id = event.queryStringParameters.id;
    data = await client.db().collection("bp-fsd1").findOne({_id:ObjectId(id)});
  }
  else {
    // find all users
    cursor = client.db().collection("bp-fsd1").find();
    data = [];
    await cursor.forEach(doc => data.push(doc));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };

};