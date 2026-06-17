import { NextResponse } from "next/server";
import { handleWebhookEvent } from "@/services/stripe";

export async function POST(req) {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    const rawBody = await req.text();
    const result = await handleWebhookEvent(signature, rawBody);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Stripe Webhook API error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}

// Next.js config for raw body reading (in App Router, config export is not needed for raw body, req.text() handles it automatically)
