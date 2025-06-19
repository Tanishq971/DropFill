import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bycrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      id:"Cedentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any , req):Promise<any>{
            await prisma;
           
            
            try{
             const user =  await prisma.user.findUnique(
                {
                    where:{
                        id:credentials.email,
                    }
                }
              )

              if(!user){
                 throw new Error("User Not Found");
              }

              const isValid = await bycrypt.compare(credentials.password , user.password);

              if(!isValid){
                throw new Error("Invalid Credentials");
              }


            }catch(e:any){
                throw new Error();
            }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages:{
  //   signIn:"/signin"
  // }
};


