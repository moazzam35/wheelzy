import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserOrders, getAllOrders } from "@/services/order";
import { createCheckoutSession } from "@/services/stripe";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let orders;
    if (session.user.role === "ADMIN") {
      orders = await getAllOrders();
    } else {
      orders = await getUserOrders(session.user.id);
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET orders API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
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
    const { carId } = body;
    if (!carId) {
      return NextResponse.json({ success: false, error: "Car ID is required" }, { status: 400 });
    }

    // Get origin headers for Stripe redirects
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const checkoutUrl = await createCheckoutSession({
      userId: session.user.id,
      carId,
      origin,
    });

    return NextResponse.json({ success: true, url: checkoutUrl });
  } catch (error) {
    console.error("POST orders API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to initiate order" },
      { status: 400 }
    );
  }
}
