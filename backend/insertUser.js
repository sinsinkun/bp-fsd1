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
  
  // check body is correctly formatted
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err:"Something went wrong when uploading the information" })
    };
  }

  const body = JSON.parse(event.body);
  
  if ('name' in body && 'phone' in body && 'email' in body && 'address' in body) {
    let res;
    // updating an existing entry
    if (body.id) {
      res = await client.db().collection("bp-fsd1").updateOne({ _id:ObjectId(body.id) },
      { $set: {name:body.name, phone:body.phone, email:body.email, address:body.address} });
    }
    // add new entry
    else res = await client.db().collection("bp-fsd1").insertOne(body);

    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ err:"Missing information" })
  };

};