import connectionToDatabase from "../../../../../lib/mongoose";
import User from "../../../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(request: NextRequest){
    try {
        await connectionToDatabase()
        const {username, password} = await request.json()

        const existingUser = await User.findOne({username})

        if(!existingUser){
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
        }

        const passwordMatches = await bcrypt.compare(password, existingUser.password)

         if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = signToken({ 
      userId: existingUser._id.toString(), 
      email: existingUser.email 
    })

    const response = NextResponse.json(
      { id: existingUser._id, email: existingUser.email, username: existingUser.username },
      { status: 200 }
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })

    }
}