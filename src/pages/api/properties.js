import { connectToDatabase } from "@/lib/mongodb/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection("users").find({}).toArray();

  res.json(data);
}
