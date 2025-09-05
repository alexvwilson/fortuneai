import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface FortunePrompt {
  readingType: string;
  userQuestion: string;
}

export async function generateFortuneResponse(
  prompt: FortunePrompt
): Promise<ReadableStream<Uint8Array>> {
  const systemPrompt = `You are a mystical fortune teller with deep wisdom and insight. 
  You specialize in ${prompt.readingType} readings and provide personalized, 
  meaningful guidance that feels authentic and mystical.`;

  const userPrompt = `The user is asking: "${prompt.userQuestion}"
  
  Provide a detailed, mystical fortune reading that:
  - Feels personal and relevant to their question
  - Uses mystical language and imagery
  - Offers practical guidance
  - Maintains a mysterious, wise tone
  - Is 2-3 paragraphs long`;

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    stream: true,
    max_tokens: 500,
    temperature: 0.8,
  });

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
