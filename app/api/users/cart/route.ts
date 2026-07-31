import { NextRequest, NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token); // should give you the user id
  if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { cart } = await req.json();

  await connectionToDatabase();
  await User.findByIdAndUpdate(decoded.userId, { cart });

  return NextResponse.json({ message: "Cart synced" }, { status: 200 });
}