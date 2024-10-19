import "../../globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {} from "next-auth";
import { Metadata } from "next/types";
import { auth, signOut } from "@/auth";
import SessionProvider from "@/components/auth/SessionProvider";
import NavBar from "@/components/admin-navigation/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { Poppins, Gowun_Batang } from "next/font/google";

import { getUserById } from "@/server/queries";

export const metadata: Metadata = {
  title: "Tech for hope",
  description:
    "un service de pointe spécialisé dans le diagnostic et la prise en charge des cancers.",
};
export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/auth/login");
  if (session.user.type !== "admin" && session.user.type !== "editor") redirect("/");
  const currentUser = await getUserById(session.user.id);
  if (!currentUser) redirect("/");
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("min-h-screen bg-background font-sans antialiased")}
        >
          <NavBar />
          <div className="sm:pl-14">{children}</div>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
