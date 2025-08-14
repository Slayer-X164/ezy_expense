"use server";

import connectDB from "@/lib/db";
import { registerSchema } from "@/lib/zod";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";


export const register = async (prevState: any, formdata: FormData) => {
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPassword = formdata.get("confirmPassword") as string;
  //   data object to validate via zod
  const data = {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  await connectDB();
  // check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { errors: { email: ["user already exists"] }, success: false };
  }

  //hashing user password
  const hashedPass = await bcrypt.hash(password, 10);

  //creating new user in database
  await User.create({ name, email, password: hashedPass });
  return { errors:{},success: true };

};
