import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCarById, updateCar, deleteCar } from "@/services/car";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const car = await getCarById(id);
    if (!car) {
      return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, car });
  } catch (error) {
    console.error("GET car by ID API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch car details" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const car = await updateCar(id, body);
    return NextResponse.json({ success: true, car });
  } catch (error) {
    console.error("PUT car API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update car" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await deleteCar(id);
    return NextResponse.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("DELETE car API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete car" },
      { status: 400 }
    );
  }
}
