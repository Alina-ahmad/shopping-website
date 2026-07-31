import { NextRequest, NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token); // should give you the user id
  if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { liked } = await req.json();

  await connectionToDatabase();
  await User.findByIdAndUpdate(decoded.userId, { liked });

  return NextResponse.json({ message: "liked items synced" }, { status: 200 });
}