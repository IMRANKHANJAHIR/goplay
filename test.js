require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

console.log(uri);

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("MongoDB Connected ✅");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();