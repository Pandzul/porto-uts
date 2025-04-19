import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("Dzull");
  const collection = db.collection("comments");

  if (req.method === "POST") {
    const { name, message, rating } = req.body;
    if (!name || !message || !rating) {
      return res.status(400).json({ error: "Missing fields" });
    }
    await collection.insertOne({ name, message, rating });
    return res.status(201).json({ message: "Comment saved" });
  }

  if (req.method === "GET") {
    const comments = await collection.find({}).toArray();
    const totalVoters = comments.length;
    const totalRating = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
    const averageRating = totalVoters ? totalRating / totalVoters : 0;

    return res.status(200).json({
      comments,
      averageRating,
      totalVoters,
    });
  }

  res.status(405).json({ message: "Method not allowed" });
}
