import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, profilePhoto } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success:false,
        message: "user already exists",
        status: 409,
      });
    }
    const hashedPass = await bcrypt.hash(password,15)
    const newUser = await User.create({ name, email, password:hashedPass, profilePhoto });
    return NextResponse.json({
      success:true,
      message: "Account Created!",
      user: newUser,
      status: 200,
    });
  } catch (error: any) {
    console.log("error creating user ", error.message);
    return NextResponse.json({
      success:false,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const users = await User.find({});
    if (!users) {
      return NextResponse.json({
        message: "no users availabel",
        statue: 500,
      });
    }
    return NextResponse.json({
      users,
    });
  } catch (error: any) {
    console.log("error while fetching users ", error.message);
    return NextResponse.json({
      message: "error while fecthing users",
      status: 500,
    });
  }
}
