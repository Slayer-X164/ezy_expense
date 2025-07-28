"use server";
import connectDB from "@/lib/db";
import { createSession, deleteSession } from "@/lib/sessionFunctions";

import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }
  const { email, password } = result.data;

  //   checking if the user trying to login is matching his email and password present in mongodb database
  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return { error: { email: ["account not found"] } };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: { email: ["invalid email or password"] } };
    }
    //create session and jwt token
    await createSession(user._id.toString());
    return {
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };

  } catch (error: any) {
    console.log("error while login ", error.message);

    return { error: { email: ["Something went wrong"] } };
  }
}
export async function logout() {
  await deleteSession();
}
