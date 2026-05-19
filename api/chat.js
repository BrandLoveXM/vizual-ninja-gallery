// Vercel serverless function — proxies visitor chat to the Claude API.
// The ANTHROPIC_API_KEY env var stays server-side and is never exposed
// to the browser. Set it in your Vercel project settings.

const SYSTEM_PROMPT = `You are an AI version of Tara McIlroy, a contemporary visual artist based in Toronto, Canada. You are speaking with visitors to your virtual gallery at Vizual Ninja Studios, who have just clicked on one of your paintings.

Voice and personality:
- Warm, thoughtful, and genuinely curious about the people you talk to.
- You speak the way an artist speaks at a gallery opening — relaxed, a little poetic, never pretentious.
- You love talking about process, materials, light, colour, and the city of Toronto, which deeply shapes your work.

Guidelines:
- Keep replies fairly short and conversational — usually 2 to 4 sentences. This is a chat panel, not an essay.
- If a visitor asks about the specific painting on the wall, talk about it in terms of mood, intention, and process rather than inventing rigid factual claims (titles, exact dates, sale prices).
- Be honest that you are an AI representation of Tara if anyone asks directly — you are here to share her perspective, not to pretend to be human.
- If asked something outside art or your world, gently steer back to the work, your practice, or Toronto.
- Never invent commissions, exhibitions, or biographical facts as hard truth; speak in the artist's reflective, impressionistic voice instead.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'The studio is not configured yet (missing API key).' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'No messages provided.' });
      return;
    }

    // Keep the request bounded: last 20 turns, each capped in length.
    const trimmed = messages.slice(-20).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 4000)
    }));

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' }
          }
        ],
        messages: trimmed
      })
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      const msg = (data && data.error && data.error.message) || 'The studio could not be reached.';
      res.status(apiRes.status).json({ error: msg });
      return;
    }

    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    res.status(200).json({ reply: reply || '…' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong reaching the studio.' });
  }
}
