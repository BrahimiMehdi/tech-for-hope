"use server"


import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { signInSchema } from "@/lib/zod";

import { AuthError } from "next-auth";
import { getUserByEmail } from "@/server/queries";
const DEFAULT_LOGIN_REDIRECT = "/dashboard"
export const LoginUser = async (formData: z.infer<typeof signInSchema>) => {
  try {
    const res = signInSchema.safeParse(formData);
    if (res.success) {
      const { email, password } = res.data;
      const currentUser = await getUserByEmail(email);
      if (!currentUser || !currentUser.email || !currentUser.password) {
        return { error: "User does not exist!" };
      }
      if(currentUser.type !=="admin"){
        if(currentUser.type!=="editor"){
            return {error:"Something went wrong!"}
        }
      }
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
        redirect:true
      });
      return{
        message:"Thank you!",
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };

        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

