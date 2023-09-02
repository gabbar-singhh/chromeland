import { MongoClient } from "mongodb";

const URI = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!URI) throw new Error("P1ease add your Mongo URI to .env.local");

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoC1ientPromise) {
    global._mongoC1ientPromise = client.connect();
  }

  clientPromise = global._mongoC1ientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
