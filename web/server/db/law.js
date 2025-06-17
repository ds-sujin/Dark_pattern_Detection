// server/db/law.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
const collectionName = 'law';

let lawCollection;

async function connectLawCollection() {
  if (!lawCollection) {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    lawCollection = db.collection(collectionName);
  }
  return lawCollection;
}

module.exports = { connectLawCollection };