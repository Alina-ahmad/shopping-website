import connectionToDatabase from "../../../lib/mongoose";
import User from "../../../models/User";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    try {
        await connectionToDatabase()
        const {email, username, password} = await request.json()

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, username, password: hashedPassword})
        await newUser.save()
       return NextResponse.json(
       { id: newUser._id, email: newUser.email, username: newUser.username },
       { status: 201 }
       ) //we did not send the whole newUser bcz it had hashed password for security
        
    } catch (error:any) {
        if (error.code === 11000) {
        return NextResponse.json({ error: "Username or email already taken" }, { status: 409 })
        } //this code 11000 is what mongodb gives if two users have same name. so we translared it in human language here
     console.log(error)   
     return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const decoded = verifyToken(token)

        if (!decoded) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
        }

        await connectionToDatabase()
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ id: user._id, email: user.email, username: user.username, cart: user.cart, liked: user.liked })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}