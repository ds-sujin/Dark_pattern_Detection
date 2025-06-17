// server/db/case.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || process.env.MONGODB_URL;
const dbName = process.env.DB_NAME?.trim();  // web
const collectionName = 'case';

let caseCollection;

async function connectCaseCollection() {
  if (!caseCollection) {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    caseCollection = db.collection(collectionName);
  }
  return caseCollection;
}

module.exports = { connectCaseCollection };