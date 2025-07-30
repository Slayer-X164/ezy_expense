"use server";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./session";
import User from "@/models/user.model";
import connectDB from "./db";

//session functions

export const createSession = async (userId: string) => {
  
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  //store session in cookie
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
};

export const getSession = async () => {
  await connectDB()
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  let session;
  try {
    session = await decrypt(token);
  } catch (e) {
    return null;
  }

  const user = await User.findById(session?.userId).lean();
  if (!user) return null;

  return user;
};

export const deleteSession = async () => {

  const cookieStore = await cookies();
  cookieStore.delete("session");
};
