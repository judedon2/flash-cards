const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint for Google Translate TTS
app.get('/tts', async (req, res) => {
  try {
    const text = req.query.text;
    const gender = req.query.gender || 'female'; // 'male' or 'female'

    if (!text) {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    console.log(`🎙️  Requesting ${gender} voice for: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

    // Create Google Translate TTS URL
    // Note: Google Translate's public TTS API doesn't officially support voice gender selection
    // The voice may vary naturally, but we cannot guarantee male/female voices
    const encodedText = encodeURIComponent(text);
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-BR&client=tw-ob&q=${encodedText}&ttsspeed=0.9`;

    // Fetch the audio from Google Translate
    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://translate.google.com/',
      }
    });

    if (!response.ok) {
      throw new Error(`Google TTS returned ${response.status}`);
    }

    // Get the audio data
    const audioBuffer = await response.buffer();

    // Set appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Send the audio
    res.send(audioBuffer);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch audio from Google Translate' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🎤 TTS Proxy Server running on http://localhost:${PORT}`);
  console.log(`Ready to serve Brazilian Portuguese audio!\n`);
});
