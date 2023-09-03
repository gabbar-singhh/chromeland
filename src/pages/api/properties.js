export default async function handler(req, res) {
  // const { db } = await connectToDatabase();

  // const data = await db.collection("users").find({}).toArray();

  // res.json(data);
  // console.log("⛽⛽",data);

  res.json({ hello: "world" });
}