// pages/api/chat.ts
export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const botMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botMessage) {
      res.status(200).json({ reply: botMessage });
    } else {
      res.status(200).json({ reply: "Maaf, saya tidak bisa membalas." });
    }
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ reply: "Maaf, terjadi kesalahan pada server." });
  }
}
