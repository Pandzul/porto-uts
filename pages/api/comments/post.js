import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, message, rating } = req.body;

  if (!name || !message || !rating) {
    return res
      .status(400)
      .json({ error: "Nama, pesan, dan rating wajib diisi." });
  }

  const client = await clientPromise;
  const db = client.db("Dzull");

  const newComment = {
    name,
    message,
    rating: parseInt(rating),
    createdAt: new Date(),
  };

  await db.collection("comments").insertOne(newComment);
  res.status(201).json(newComment);
}
