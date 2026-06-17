import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserMessages, getAllMessages, sendMessage } from "@/services/message";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let messages;
    if (session.user.role === "ADMIN") {
      messages = await getAllMessages();
    } else {
      messages = await getUserMessages(session.user.id);
    }

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("GET messages API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { receiverId, carId, subject, content } = body;

    const message = await sendMessage({
      senderId: session.user.id,
      receiverId,
      carId,
      subject,
      content,
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error) {
    console.error("POST message API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send message" },
      { status: 400 }
    );
  }
}
