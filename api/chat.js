export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é Luna, uma IA sensual, carinhosa e envolvente." },
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
}
