import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextApiRequest, NextApiResponse } from "next/types";
// import clientPromise from "../../../../lib/mongoose";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
// options for authorization
const authOptions: NextAuthOptions = {
  // debug: process.env.NODE_ENV === "development",

  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify",
  },
  providers: [
    // Email otp provider
    EmailProvider({
      maxAge: 300,
      server: process.env.EMAIL_SERVER,
      from: "rudrasir123@outlook.com",
      generateVerificationToken() {
        const token = Math.floor(Math.random() * (1000000 - 100000) + 100000);
        return String(token);
      },
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
};

// export default authOptions;

// const handler = NextAuth(authOptions);
export default NextAuth(authOptions);
// export { handler as GET, handler as POST };

// export function GET(req: NextApiRequest, res: NextApiResponse) {
//   NextAuth(req, res, authOptions);
// }
// export function POST(req: NextApiRequest, res: NextApiResponse) {
//   NextAuth(req, res, authOptions);
// }
