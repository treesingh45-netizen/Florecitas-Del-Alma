import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

/**
 * AI Floral Card Sentiment Assistant
 * Uses gemini-4-argon with thinkingLevel: HIGH to craft deeply emotional,
 * personalized card messages and explain floral symbolism.
 */
app.post('/api/card-sentiment', async (req, res) => {
  try {
    const { occasion, recipient, tone, feelings, flowerType, language } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback if API key is not yet set up
    if (!apiKey) {
      return res.json({
        message: `Dearest ${recipient || 'Loved One'},\n\nMay these flowers bring warmth to your heart and remind you how deeply treasured and loved you are today and always.\n\nWith all my love,`,
        spanishAlternative: `Para mi querido/a ${recipient || 'amor'},\n\nQue estas hermosas flores llenen tu día de alegría y te recuerden lo especial e importante que eres en mi vida.\n\nCon todo mi cariño,`,
        meaning: `Flowers for ${occasion || 'this occasion'} symbolize affection, enduring grace, and heartfelt celebration.`,
        botanicalTip: 'Keep fresh water in the vase and trim stem ends at a 45-degree angle every two days for longest bloom life.',
        thinkingUsed: false,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are the master floral poet and sentiment advisor for "Florecitas Del Alma", a premier boutique florist in Tolleson, Arizona whose motto is "Más que flores, un sentimiento" (More than flowers, a feeling).

Compose a touching, heartfelt card message and explain the floral meaning behind the arrangement.

Context:
- Occasion: ${occasion || 'Special Celebration'}
- Recipient: ${recipient || 'Beloved Recipient'}
- Emotional Tone: ${tone || 'Heartfelt, poetic, romantic and warm'}
- Personal notes/feelings to weave in: ${feelings || 'General warm wishes'}
- Selected Floral Arrangement: ${flowerType || 'Ecuadorian Roses & Mixed Garden Blooms'}
- Preferred Primary Language: ${language || 'English'}

Provide a strictly valid JSON response with keys:
{
  "message": "The heartfelt card message in the primary language (around 30-55 words, deeply touching, beautifully phrased without clichés)",
  "spanishAlternative": "A lovely Spanish rendition with warmth and genuine Latin phrasing suitable for Arizona families",
  "meaning": "1-2 sentences on what this arrangement expresses (e.g. roses for passion, eucalyptus for healing, lilies for serenity)",
  "botanicalTip": "A 1-sentence tip on flower enjoyment"
}`;

    let response;
    try {
      // First attempt with gemini-4-argon with ThinkingLevel.HIGH
      response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          responseMimeType: 'application/json',
        },
      });
    } catch (modelError: any) {
      console.warn('Attempt with gemini-4-argon failed, falling back to gemini-3.8-flash:', modelError.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const outputText = response.text?.trim() || '{}';
    const parsed = JSON.parse(outputText);
    return res.json({ ...parsed, thinkingUsed: true });
  } catch (error: any) {
    console.error('Error generating card sentiment:', error);
    return res.status(200).json({
      message: `Dearest loved one,\n\nEvery bloom in this arrangement was chosen with love and warmth for you. May your day be as beautiful as your spirit.\n\nWith heartfelt love,`,
      spanishAlternative: `Con todo mi amor,\n\nCada flor de este arreglo lleva un pedacito de mi corazón para ti. Que tengas un día maravilloso.\n\nSiempre contigo,`,
      meaning: `Roses and garden botanicals embody heartfelt celebration and true affection.`,
      botanicalTip: 'Keep flowers away from direct afternoon desert heat and change water regularly.',
      errorFallback: true,
    });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    store: 'Florecitas Del Alma',
    location: 'Tolleson, Arizona',
    phone: '+1 602-725-8055',
    time: new Date().toISOString(),
  });
});

async function startServer() {
  app.use(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Florecitas Del Alma boutique server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
