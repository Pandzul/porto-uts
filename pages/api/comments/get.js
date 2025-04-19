import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const client = await clientPromise;
  const db = client.db("Dzull");

  const comments = await db
    .collection("comments")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const ratings = comments
    .map((c) => c.rating)
    .filter((r) => typeof r === "number");
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? (ratings.reduce((acc, val) => acc + val, 0) / totalRatings).toFixed(1)
      : "0.0";

  res.json({ comments, averageRating, totalRatings });
}
