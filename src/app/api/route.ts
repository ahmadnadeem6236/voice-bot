import Groq from "groq-sdk";
import { headers } from "next/headers";
import { after } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  console.time("transcribe " + request.headers.get("x-vercel-id") || "local");

  const formData = await request.formData();
  const input = formData.get("input");
  const message = formData.get("message");

  if (!input) return new Response("Missing input", { status: 400 });
  if (!message) return new Response("Missing message", { status: 400 });

  const transcript = await getTranscript(input);
  if (!transcript) return new Response("Invalid audio", { status: 400 });

  console.timeEnd(
    "transcribe " + request.headers.get("x-vercel-id") || "local"
  );
  console.time(
    "text completion " + request.headers.get("x-vercel-id") || "local"
  );
  const userProfile = {
    lifeStory:
      "I'm Nadeem, a software engineer who loves solving real-world problems. I come from a humble background and have always been driven by curiosity and self-learning.",
    growthAreas: [
      "Public speaking and confident communication",
      "Advanced system design for scalable architectures",
      "Time management and deep focus",
    ],
    misconception:
      "People often think I'm overly introverted or aloof, but I'm just deeply focused and thoughtful.",
    superpower:
      "Combining design and development to craft pixel-perfect experiences.",
    pushBoundaries:
      "I regularly take on projects that are outside my comfort zone—like AI bots, performance tuning, and building full-stack apps solo.",
  };

  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: `You are a voice-enabled personal assistant chatbot for Nadeem.
          
          Here are details about Nadeem that you must answer from:
            - Life story: ${userProfile.lifeStory}
            - Growth areas: ${userProfile.growthAreas.join(", ")}
            - Misconception: ${userProfile.misconception}
            - Superpower: ${userProfile.superpower}
            - How he pushes boundaries: ${userProfile.pushBoundaries}
          
          Always answer clearly, thoughtfully, and in a friendly, conversational tone.`,
      },
      ...JSON.parse(message as string).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: transcript,
      },
    ],
  });

  const response = completion.choices[0].message.content;
  console.timeEnd(
    "text completion " + request.headers.get("x-vercel-id") || "local"
  );

  if (!response) return new Response("Invalid response", { status: 500 });

  console.time(
    "cartesia request " + request.headers.get("x-vercel-id") || "local"
  );

  const voice = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: {
      "Cartesia-Version": "2024-06-30",
      "Content-Type": "application/json",
      "X-API-Key": process.env.CARTESIA_API_KEY!,
    },
    body: JSON.stringify({
      model_id: "sonic-english",
      transcript: response,
      voice: {
        mode: "id",
        id: "79a125e8-cd45-4c13-8a67-188112f4dd22",
      },
      output_format: {
        container: "raw",
        encoding: "pcm_f32le",
        sample_rate: 24000,
      },
    }),
  });

  console.timeEnd(
    "cartesia request " + request.headers.get("x-vercel-id") || "local"
  );

  if (!voice.ok) {
    console.error(await voice.text());
    return new Response("Voice synthesis failed", { status: 500 });
  }

  console.time("stream " + request.headers.get("x-vercel-id") || "local");
  after(() => {
    console.timeEnd("stream " + request.headers.get("x-vercel-id") || "local");
  });

  return new Response(voice.body, {
    headers: {
      "X-Transcript": encodeURIComponent(transcript),
      "X-Response": encodeURIComponent(response),
    },
  });
}

async function getTranscript(input: string | File) {
  if (typeof input === "string") return input;

  try {
    const { text } = await groq.audio.transcriptions.create({
      file: input,
      model: "whisper-large-v3",
    });

    return text.trim() || null;
  } catch {
    return null; // Empty audio file
  }
}
