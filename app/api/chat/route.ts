export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages,
      stream: true,
    }),
  });

  if (!response.body) {
    return new Response('No response body from OpenAI', { status: 500 });
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
