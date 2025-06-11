import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeTranscript(transcript) {
  const prompt = `Summarize the following transcript in 3-5 bullet points:\n\n${transcript}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
    temperature: 0.7
  });
  return response.choices[0].message.content;
}