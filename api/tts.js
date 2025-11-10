const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { text, gender } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'Text parameter required' });
  }

  const encodedText = encodeURIComponent(text);
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-BR&client=tw-ob&q=${encodedText}&ttsspeed=0.9`;

  try {
    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://translate.google.com/',
      }
    });

    if (!response.ok) {
      throw new Error(`Google TTS returned ${response.status}`);
    }

    const buffer = await response.buffer();

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(buffer);
  } catch (error) {
    console.error('TTS API error:', error);
    res.status(500).json({ error: 'Failed to fetch audio' });
  }
};
