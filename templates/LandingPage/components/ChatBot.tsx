"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMsg = input;
    setMessages((prev) => [...prev, { userMessage: userMsg }]);
    setInput("");

    try {
      const res = await fetch("/api/chat-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMsg }), // ✅ nama properti disamakan
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { userMessage: userMsg, botReply: data.reply }, // ✅ ambil data.reply, bukan data.botReply
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          userMessage: userMsg,
          botReply: "Maaf, terjadi kesalahan saat mengirim pesan.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50">
      <div className="h-64 overflow-y-auto flex flex-col gap-2 mb-2 text-sm">
        {messages.map((msg, i) => (
          <div key={i}>
            <p className="text-blue-600">👤 {msg.userMessage}</p>
            {msg.botReply && (
              <p className="text-green-600">🤖 {msg.botReply}</p>
            )}
          </div>
        ))}
        {loading && <p className="text-gray-400">🤖 Sedang mengetik...</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-2 py-1 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
        />
        <button
          className="bg-blue-600 text-white px-3 rounded"
          onClick={handleSend}
          disabled={loading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
