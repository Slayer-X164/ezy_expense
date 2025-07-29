// import NextAuth, { CredentialsSignin } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import connectDB from "./lib/db";
// import User from "./models/user.model";
// import bcrypt from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: {
//           label: "email",
//           type: "email",
//         },
//         password: {
//           label: "password",
//           type: "password",
//         },
//       },
//       authorize: async (credentials) => {
//         const email = credentials.email as string | undefined;
//         const password = credentials.password as string | undefined;
//         if (!email || !password) {
//           throw new CredentialsSignin("please provide email & password");
//         }
//         await connectDB();
//         try {
//           const user = await User.findOne({ email }); //error in this line saying User is undefiend
//           if (!user) {
//             throw new CredentialsSignin("user does not exist");
//           }
//           const isMatch = await bcrypt.compare(password, user.password);
//           if (!isMatch) {
//             throw new CredentialsSignin("invalid email or password");
//           }
//           const userData = {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//           };
//           return userData;
//         } catch (error) {
//           throw new Error("error while authenticating user");
//         }
//       },
//     }),
//   ],
// });
