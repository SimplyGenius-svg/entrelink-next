import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { investor, userEmail } = await req.json();

    if (!investor || !userEmail) {
      return NextResponse.json({ error: "Investor and user email are required." }, { status: 400 });
    }

    // Here, you can log the request, store it in a database, or send a notification.
    console.log(`User ${userEmail} requested email access for investor ${investor.name}`);

    // Simulate sending a request notification (You can integrate email APIs like SendGrid)
    return NextResponse.json({ message: "Email access request sent." }, { status: 200 });
  } catch (error) {
    console.error("Error handling email request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}
