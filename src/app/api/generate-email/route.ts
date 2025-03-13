import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, senderName, investorDetails } = body;

    if (!subject || !senderName || !investorDetails?.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional email writer helping entrepreneurs craft personalized outreach emails to investors.
            Generate a concise, professional email using the provided context. The email should be personalized, 
            reference the investor's specific background and portfolio when relevant, and clearly communicate 
            the value proposition. Keep the tone professional but conversational.`
        },
        {
          role: "user",
          content: `Write a professional email from ${senderName} to an investor named ${investorDetails.name}${
            investorDetails.company ? ` from ${investorDetails.company}` : ""
          }${
            investorDetails.industry ? ` who focuses on the ${investorDetails.industry} industry` : ""
          }${
            investorDetails.investmentFocus && investorDetails.investmentFocus.length > 0 
              ? ` and invests in ${investorDetails.investmentFocus.join(", ")}` 
              : ""
          }${
            investorDetails.portfolio && investorDetails.portfolio.length > 0
              ? `. They have previously invested in ${investorDetails.portfolio.slice(0, 3).join(", ")}`
              : ""
          }. The email subject is "${subject}". Make the email approximately 150-200 words.`
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const generatedEmail = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ generatedEmail });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}