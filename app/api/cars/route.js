import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCars, createCar } from "@/services/car";

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const brand = searchParams.get("brand") || undefined;
    const type = searchParams.get("type") || undefined;
    const priceRange = searchParams.get("priceRange") || undefined;
    const sort = searchParams.get("sort") || undefined;
    const query = searchParams.get("query") || undefined;

    const cars = await getCars({ brand, type, priceRange, sort, query });
    return NextResponse.json({ success: true, cars });
  } catch (error) {
    console.error("GET cars API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const car = await createCar(body);
    return NextResponse.json({ success: true, car }, { status: 201 });
  } catch (error) {
    console.error("POST car API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create car" },
      { status: 400 }
    );
  }
}
