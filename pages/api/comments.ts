// pages/api/comments.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Document } from "mongodb";
import clientPromise from "@/lib/mongodb";

interface Comment extends Document {
  name: string;
  message: string;
  rating: number;
  createdAt: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Tambahkan type assertion dan null check
    const client = await clientPromise;
    
    if (!client) {
      throw new Error("Database connection failed");
    }

    const db = client.db("Dzull");
    const collection = db.collection<Comment>("comments");

    if (req.method === "POST") {
      const { name, message, rating } = req.body as {
        name: string;
        message: string;
        rating: number;
      };

      // Validasi input
      if (!name || !message || !rating) {
        return res.status(400).json({ error: "Semua field harus diisi" });
      }

      const newComment: Comment = {
        name,
        message,
        rating,
        createdAt: new Date(),
      };

      await collection.insertOne(newComment);
      return res.status(201).json({ message: "Komentar berhasil disimpan" });
    }

    if (req.method === "GET") {
      const comments = await collection.find<Comment>({})
        .sort({ createdAt: -1 })
        .toArray();

      const totalVoters = comments.length;
      const totalRating = comments.reduce(
        (sum: number, comment) => sum + comment.rating,
        0
      );
      const averageRating = totalVoters > 0 
        ? Number((totalRating / totalVoters).toFixed(1)) 
        : 0;

      return res.status(200).json({
        comments,
        averageRating,
        totalVoters,
      });
    }

    return res.status(405).json({ error: "Method tidak diizinkan" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
