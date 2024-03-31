// connectToDatabase.ts
import { MongoClient } from "mongodb";

declare global {
  var mongoClient: MongoClient | null;
}

export const connectToDatabase = async () => {
  if (global.mongoClient) {
    console.log("Reusing existing connection");
    return global.mongoClient.db("etherpixels"); // Use the db method here
  }

  const mongoUrl = process.env.MONGO_URL || "";

  const client = new MongoClient(mongoUrl);

  await client.connect();
  global.mongoClient = client; // Assign the MongoClient instance

  console.log("New MongoDB connection established");
  return client.db("etherpixels"); // Return the Db instance from the MongoClient
};
