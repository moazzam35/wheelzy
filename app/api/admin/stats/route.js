import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const [carsCount, bookingsCount, usersCount, ordersCount, completedOrders] = await Promise.all([
      prisma.car.count(),
      prisma.booking.count(),
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.findMany({
        where: { status: "COMPLETED" },
        select: { pricePaid: true },
      }),
    ]);

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.pricePaid, 0);

    return NextResponse.json({
      success: true,
      stats: {
        carsCount,
        bookingsCount,
        usersCount,
        ordersCount,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Admin GET stats API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
