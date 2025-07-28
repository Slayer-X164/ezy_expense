
import { getSession } from "@/lib/sessionFunctions";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const user = await getSession();

    // Return null if no session or user found
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/session route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}