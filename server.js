const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, configured: Boolean(process.env.POLLINATIONS_API_KEY) });
});

app.post('/api/generate', async (req, res) => {
  try {
    const key = process.env.POLLINATIONS_API_KEY;
    if (!key) return res.status(503).json({ error: 'Server par POLLINATIONS_API_KEY set nahi hai.' });
    const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
    const model = ['flux', 'zimage'].includes(req.body?.model) ? req.body.model : 'flux';
    const size = [512, 768, 1024].includes(Number(req.body?.size)) ? Number(req.body.size) : 1024;
    if (!prompt) return res.status(400).json({ error: 'Prompt required hai.' });
    if (prompt.length > 1200) return res.status(400).json({ error: 'Prompt bahut lamba hai.' });

    const url = 'https://gen.pollinations.ai/image/' + encodeURIComponent(prompt)
      + '?model=' + encodeURIComponent(model)
      + '&width=' + size + '&height=' + size + '&nologo=true';
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(120000)
    });
    if (!upstream.ok) {
      const detail = (await upstream.text().catch(() => '')).slice(0, 300);
      return res.status(upstream.status).json({ error: `Image provider error (${upstream.status}). ${detail}` });
    }
    const type = upstream.headers.get('content-type') || '';
    if (!type.startsWith('image/')) return res.status(502).json({ error: 'Provider ne image return nahi ki.' });
    res.set('Content-Type', type);
    res.set('Cache-Control', 'no-store');
    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    const timeout = err?.name === 'TimeoutError' || err?.name === 'AbortError';
    res.status(timeout ? 504 : 502).json({ error: timeout ? 'Image request timed out.' : 'Backend/provider request fail hui.' });
  }
});

app.listen(PORT, () => console.log(`Nova AI backend listening on ${PORT}`));
