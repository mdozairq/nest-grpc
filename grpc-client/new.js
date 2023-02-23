const { MongoClient } = require('mongodb');

async function main() {
  // Connection URI and options
  const uri = 'mongodb://flamyoyodev:flamyoyodev123@yoyo-dev.cluster-cjvyhcwj0vdh.ap-south-1.docdb.amazonaws.com:27017/thanos?replicaSet=rs0&readPreference=secondaryPreferred&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&retryWrites=false&retryReads=false';
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(uri, options);

  // Specify the database and collection
  const db = client.db('thanos');
  const collection = db.collection('default_avatars');

  // Find the documents to copy
  const documentsToCopy = await collection.find({}).toArray();

  // Loop through the documents and make copies
  for (let i = 0; i < documentsToCopy.length; i++) {
    const documentCopy = Object.assign({}, documentsToCopy[i]); // create a new copy of the document
    delete documentCopy._id; // remove the _id field from the copy
    // documentCopy._id = ''; // modify the copy if needed
    await collection.insertOne(documentCopy); // insert the copy into the collection with a new _id
  }

  // Close the connection to the MongoDB cluster
  client.close();
}

main().catch(console.error);
