// lib/db.ts
import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri!, options); // menggunakan non-null assertion karena sudah dicek di atas
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise as Promise<MongoClient>; // Type assertion agar TypeScript tahu tipenya

export default clientPromise;
