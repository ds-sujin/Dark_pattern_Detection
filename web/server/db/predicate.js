const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || process.env.MONGODB_URL;
const dbName = process.env.DB_NAME || 'web';

const client = new MongoClient(uri);
let predicateCollection;

async function connectPredicateCollection() {
  if (!predicateCollection) {
    await client.connect();
    const db = client.db(dbName);
    predicateCollection = db.collection('predicate');
  }
  return predicateCollection;
}

module.exports = { connectPredicateCollection };