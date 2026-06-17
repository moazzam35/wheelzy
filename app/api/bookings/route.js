import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserBookings, getAllBookings, createBooking } from "@/services/booking";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let bookings;
    if (session.user.role === "ADMIN") {
      bookings = await getAllBookings();
    } else {
      bookings = await getUserBookings(session.user.id);
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("GET bookings API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch bookings" },
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
    const { carId, date, timeSlot } = body;

    const booking = await createBooking({
      userId: session.user.id,
      carId,
      date,
      timeSlot,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("POST booking API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create booking" },
      { status: 400 }
    );
  }
}
