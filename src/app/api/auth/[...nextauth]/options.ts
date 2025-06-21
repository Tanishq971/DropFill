import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"; // Added missing import
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Fixed typo
import { JWTPayload, SignJWT, importJWK } from 'jose';


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Username",
      id: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            throw new Error("User not found or invalid credentials");
          }

          // const isValid = await bcrypt.compare(
          //   credentials.password,
          //   user.password
          // );

          // if (!isValid) {
          //   throw new Error("Invalid credentials");
          // }

          return { id: user.id, email: user.email, name: user.name };
        } catch (e: any) {
          throw new Error(e.message || "Authentication failed");
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin", // Enable custom sign-in page
  },
};

// GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID || "",
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//   }),

//  GithubProvider({
//     clientId: process.env.GITHUB_CLIENT_ID || "",
//     clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//   }),


// const generateJwt =  (payload:JWTPayload) =>{
      
// }