import { NextResponse } from "next/server";
import { registerUser } from "@/services/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // ── Input validation ──────────────────────────────────────────────
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name is required and must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // ── Register user ─────────────────────────────────────────────────
    const user = await registerUser({ name, email, password });

    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);

    // Return specific error messages for known errors
    if (error.message === "Email already registered") {
      return NextResponse.json(
        { success: false, error: "This email is already registered. Please sign in instead." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Registration failed. Please try again." },
      { status: 400 }
    );
  }
}
