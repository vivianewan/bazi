export default async function handler(req, res) {
  console.log('API route called:', req.method, req.url);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context } = req.body;
    console.log('Received message:', message);
    console.log('API Key available:', !!process.env.OPENAI_API_KEY);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: context
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({ response: data.choices[0].message.content });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}
