import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env.local
});

export async function POST(req: NextRequest) {
  try {
    const { subject } = await req.json();

    if (!subject) {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 });
    }

    // Generate email using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI email assistant, skilled in writing professional investor outreach emails." },
        { role: "user", content: `Write a concise and compelling investor outreach email. The subject is: ${subject}.` },
      ],
      max_tokens: 300,
    });

    const generatedEmail = completion.choices[0]?.message?.content || "Could not generate email.";

    return NextResponse.json({ generatedEmail }, { status: 200 });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json({ error: "Failed to generate email." }, { status: 500 });
  }
}
