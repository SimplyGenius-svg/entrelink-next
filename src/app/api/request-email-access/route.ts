import { NextRequest, NextResponse } from "next/server";
import { db, collection, addDoc, serverTimestamp } from "@/firebase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      investorId, 
      investorName, 
      investorEmail, 
      investorCompany, 
      senderId, 
      senderName,
      senderEmail,
      senderLinkedIn,
      subject, 
      emailBody 
    } = body;

    if (!investorId || !senderId || !senderName || !senderEmail || !subject || !emailBody) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add to Firestore
    const docRef = await addDoc(collection(db, "emailRequests"), {
      investorId,
      investorName,
      investorEmail,
      investorCompany,
      senderId,
      senderName,
      senderEmail,
      senderLinkedIn: senderLinkedIn || "",
      subject,
      emailBody,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      message: "Email request submitted successfully",
      id: docRef.id
    });
  } catch (error) {
    console.error("Error handling email request:", error);
    return NextResponse.json(
      { message: "Failed to process email request" },
      { status: 500 }
    );
  }
}
