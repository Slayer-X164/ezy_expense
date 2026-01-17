import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import User from "@/models/user.model";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type sessionPayload = {
  userId: string;
  expiresAt: Date;
};

export const encrypt = async (payload: sessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    console.log("Failed to verify session ", error.message);
  }
};
