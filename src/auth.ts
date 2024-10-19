import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType & DefaultSession["user"];
  }
}
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends UserType {}
}

import { UserType } from "@/lib/globals";
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    newUser:"/dashboard",
    signIn:"/auth/login",
  },
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  jwt: { maxAge: 7 * 24 * 60 * 60 },
  ...authConfig,
});
