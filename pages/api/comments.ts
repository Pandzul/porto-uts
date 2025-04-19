import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, WithId, Document } from "mongodb";
import clientPromise from "@/lib/mongodb";

interface Comment extends Document {
  name: string;
  message: string;
  rating: number;
  createdAt: Date;
  _id?: any; // Tambahkan _id sebagai optional
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  
  try {
    const db = client.db("Dzull");
    const collection = db.collection<Comment>("comments");

    if (req.method === "POST") {
      const { name, message, rating } = req.body as {
        name: string;
        message: string;
        rating: number;
      };

      if (!name || !message || !rating) {
        return res.status(400).json({ error: "Semua field harus diisi" });
      }

      const newComment: Comment = {
        name,
        message,
        rating,
        createdAt: new Date(),
        // _id akan otomatis dibuat oleh MongoDB
      };

      await collection.insertOne(newComment);
      return res.status(201).json({ message: "Komentar berhasil disimpan" });
    }

    // ... kode GET tetap sama
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
