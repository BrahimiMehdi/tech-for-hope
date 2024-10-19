"use client"
// import Logo from "./Logo";
import { FilePenLine, Home, ShoppingCart, Package, Users2, LineChart, Settings, LucideLogOut, Ambulance, BookUser } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { extractFirstSubpath } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
type Props = {};
type LinkTypes = {
  path: string;
  text: string;
  icon:React.ReactNode
}[];

const NavBar = (props: Props) => {
  const Links: LinkTypes = [
    {
      text:"Dashboard",
      path:"/dashboard",
      icon:<Home className="h-5 w-5" />,
    },
    {
      text:"Users",
      path:"/dashboard/users",
      icon:<Users2 className="h-5 w-5" />,
    },
    {
      text:"blog",
      path:"/dashboard/blog",
      icon:<FilePenLine className="h-5 w-5" />,
    },
    
  ];
  const pathName = usePathname();
  const tempPath = pathName.replace("/dashboard","")
  const current = extractFirstSubpath(tempPath);
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger >
              {/* <Logo size="sm"  /> */}
Logo
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {Links.map((link, index) => {
         const isActive = pathName === link.path || current === link.path;

          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={link.path}
                   className={buttonVariants({variant: isActive ? "secondary" : "ghost" ,size:"icon",className:"w-full dark:hover:text-background text-foreground"})}
                  >
                    {link.icon}
                    <span className="sr-only">{link.text}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.text}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
               onClick={()=>signOut({callbackUrl:"/auth/login"})}
               className={buttonVariants({variant:"ghost",size:"icon",className:"w-full dark:hover:text-background text-foreground"})}

              >
                <LucideLogOut  className="h-5 w-5" />
                <span className="sr-only">LogOut</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">LogOut</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default NavBar;
