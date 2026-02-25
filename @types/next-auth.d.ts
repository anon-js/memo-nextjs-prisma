import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      bio?: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    bio?: string;
  }
  
  interface JWT {
    username: string;
    bio?: string;
  }
}