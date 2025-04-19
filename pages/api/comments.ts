// pages/api/comments.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, WithId, Document } from "mongodb";
import clientPromise from "@/lib/mongodb";

interface Comment extends WithId<Document> {
  name: string;
  message: string;
  rating: number;
  createdAt: Date;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  message: string;
}

interface GetResponse {
  comments: Comment[];
  averageRating: number;
  totalVoters: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse | GetResponse>
) {
  try {
    const client = await clientPromise;
    if (!client) {
      return res.status(500).json({ error: "Gagal terhubung ke database" });
    }

    const db = client.db("Dzull");
    const collection = db.collection<Comment>("comments");

    if (req.method === "POST") {
      const { name, message, rating }: Partial<Omit<Comment, '_id' | 'createdAt'>> = req.body;

      if (!name || !message || !rating) {
        return res.status(400).json({ error: "Semua field harus diisi" });
      }

      if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating tidak valid" });
      }

      const newComment = {
        name,
        message,
        rating,
        createdAt: new Date(),
      };

      await collection.insertOne(newComment as Omit<Comment, '_id'>);
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
    console.error("Database error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
