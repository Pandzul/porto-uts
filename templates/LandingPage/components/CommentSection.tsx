"use client";
import { useState, useEffect } from "react";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", message: "", rating: 0 });
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch("/api/comments/get");
    const data = await res.json();

    // Perbaikan di sini
    if (Array.isArray(data.comments)) {
      setComments(data.comments);

      setAverageRating({
        value: data.averageRating,
        total: data.totalRatings,
      });
    } else {
      console.error("Expected comments array from API, got:", data);
      setComments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/comments/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", message: "", rating: 0 });
    setLoading(false);
    fetchComments();
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Komentar Pengunjung</h2>

      {averageRating && (
        <p className="mb-4 text-lg font-semibold text-yellow-500">
          Rating ⭐{averageRating.value} (from {averageRating.total} voters)
        </p>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nama Anda"
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Tulis komentar..."
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        ></textarea>

        <label className="block mb-2 font-medium">Beri Rating:</label>
        <select
          className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700"
          value={form.rating}
          onChange={(e) =>
            setForm({ ...form, rating: parseInt(e.target.value) })
          }
          required
        >
          <option value={0}>Pilih rating...</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Bintang
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim Komentar"}
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="p-4 border rounded-lg dark:bg-gray-800"
          >
            <p className="font-semibold">{comment.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            {comment.rating && (
              <p className="text-yellow-500">⭐ {comment.rating} / 5</p>
            )}
            <p>{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
