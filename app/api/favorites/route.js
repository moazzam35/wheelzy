import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: { car: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, favorites: favorites.map(f => f.car) });
  } catch (error) {
    console.error("GET favorites API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { carId } = await req.json();
    if (!carId) {
      return NextResponse.json({ success: false, error: "Car ID is required" }, { status: 400 });
    }

    const favorite = await prisma.favorite.upsert({
      where: {
        userId_carId: {
          userId: session.user.id,
          carId: parseInt(carId, 10),
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        carId: parseInt(carId, 10),
      },
    });

    return NextResponse.json({ success: true, favorite });
  } catch (error) {
    console.error("POST favorite API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const carId = searchParams.get("carId");

    if (!carId) {
      return NextResponse.json({ success: false, error: "Car ID is required" }, { status: 400 });
    }

    await prisma.favorite.delete({
      where: {
        userId_carId: {
          userId: session.user.id,
          carId: parseInt(carId, 10),
        },
      },
    });

    return NextResponse.json({ success: true, message: "Favorite removed" });
  } catch (error) {
    console.error("DELETE favorite API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
