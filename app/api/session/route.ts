
import { getSession } from "@/lib/sessionFunctions";
import { NextResponse } from "next/server";


export async function GET() {
  const user = await getSession();
  return NextResponse.json({ user });
}
