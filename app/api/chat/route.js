import { NextResponse } from 'next/server';

export async function POST(req) {
  const { message } = await req.json();

  if (!message || typeof message !== 'string' || !message.trim()) {
    console.error('Invalid message:', message);
    return NextResponse.json({ error: 'Invalid or missing message' }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    console.log('Sending request to Gemini with message:', message);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `System: You are an educational chatbot. Help users with courses, colleges, admissions, and study tips only.\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      console.error('Invalid Gemini response:', data);
      return NextResponse.json({ error: 'Invalid response from Gemini' }, { status: 500 });
    }

    console.log('Gemini response received successfully');
    return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}