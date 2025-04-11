// // app/api/chat/route.js
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   const { message } = await req.json();

//   if (!message || typeof message !== 'string' || !message.trim()) {
//     console.error('Invalid message:', message);
//     return NextResponse.json({ error: 'Invalid or missing message' }, { status: 400 });
//   }

//   if (!process.env.OPENAI_API_KEY) {
//     console.error('OPENAI_API_KEY is not set');
//     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
//   }

//   try {
//     console.log('Sending request to OpenAI with message:', message);
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an educational chatbot. Help users with courses, colleges, admissions, and study tips only.',
//           },
//           {
//             role: 'user',
//             content: message,
//           },
//         ],
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('OpenAI API error:', response.status, errorText);
//       return NextResponse.json({ error: `OpenAI API error: ${errorText}` }, { status: 500 });
//     }

//     const data = await response.json();
//     if (!data.choices || !data.choices[0]?.message?.content) {
//       console.error('Invalid OpenAI response:', data);
//       return NextResponse.json({ error: 'Invalid response from OpenAI' }, { status: 500 });
//     }

//     console.log('OpenAI response received successfully');
//     return NextResponse.json({ reply: data.choices[0].message.content });
//   } catch (error) {
//     console.error('API Error:', error.message);
//     return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
//   }
// }


//deepseek
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { message } = await req.json();

  if (!message || typeof message !== 'string' || !message.trim()) {
    console.error('Invalid message:', message);
    return NextResponse.json({ error: 'Invalid or missing message' }, { status: 400 });
  }

  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('DEEPSEEK_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    console.log('Sending request to DeepSeek with message:', message);
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an educational chatbot. Help users with courses, colleges, admissions, and study tips only.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('Invalid DeepSeek response:', data);
      return NextResponse.json({ error: 'Invalid response from DeepSeek' }, { status: 500 });
    }

    console.log('DeepSeek response received successfully');
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}