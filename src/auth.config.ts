import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";  
import { signInSchema } from "@/lib/zod";
import { getUserByEmail, getUserById } from "@/server/queries";
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
export default {
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (user.id) {
        const existingUser = await getUserById(user?.id);
        if (!existingUser) {
          return false;
        }
        return true;
      }
      return false;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.type = existingUser.type;
      token.name = existingUser.name;
      token.email = existingUser.email;
     
      return token;
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.type = token.type;
        if(token.name) session.user.name = token.name;
     
      }
      return session;
    },
  },
  
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedData = signInSchema.safeParse(credentials);
          if (parsedData.success) {
            const { email, password } = parsedData.data;
            const user = await getUserByEmail(email);
           
            if (!user || !user.password) {
              throw new InvalidLoginError();
            }
            
            const isCorrect = await bcrypt.compare(password, user.password);
           
            if (isCorrect) return user;

            return null;
          }
          throw new InvalidLoginError();
        } catch (error) {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
