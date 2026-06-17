import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { updateBookingStatus, deleteBooking } from "@/services/booking";

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    const booking = await updateBookingStatus(id, status);
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("PUT booking API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update booking" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check ownership
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    if (booking.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await deleteBooking(id);
    return NextResponse.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("DELETE booking API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to cancel booking" },
      { status: 400 }
    );
  }
}
