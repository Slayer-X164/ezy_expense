import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret:process.env.AUTH_SECRET,
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new CustomError("User does not exist");
        }
        const isValidPass = await bcrypt.compare(
          (credentials.password as string) ?? "",
          user.password
        );
        if (!isValidPass) {
          throw new CustomError("Invalid email or password");
        }

        // return user object with their profile data

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // your existing logic here
      try {
        if (account?.provider === "google") {
          await connectDB();
          const existingUser = await User.findOne({ email: profile?.email });

          if (!existingUser) {
            const newUser = await User.create({
              name: profile?.name,
              email: profile?.email,
              image: profile?.picture,
            });
            user.id = newUser._id.toString();
          } else {
            user.id = existingUser._id.toString();
          }
        }
        return true;
      } catch (err: any) {
        console.log("SignIn callback error:", err.message);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id.toString();
      }
      return session;
    },
  },
});
