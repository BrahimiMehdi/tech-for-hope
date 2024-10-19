"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, Lock, ShoppingBag, UsersIcon } from "lucide-react";
import { users } from "@/server/db/schema";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { changeUserRole } from "@/server/actions/users";
type UserRole =  typeof users.$inferSelect.type
export function UsersTableRoleChange({
  title,
  className,
  id
}: {
  className?: string;
  title:UserRole;
  id:string;
}) {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const [open, setopen] = useState(false);
  const  [changeTo,setChangeTo]= useState<UserRole>("editor")
  const handleChange = async(ID:string,role:UserRole)=>{
    const res = await changeUserRole(ID,role)
    if (res.message === "success")
      toast({
        title: "Role changed ",
        description: "role change has been succesful",
        variant: "default",
      });
    else
      toast({
        title: res.message,
        description: "please try again later",
        variant: "destructive",
      });
  }
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <AlertDialog open={open} onOpenChange={setopen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently change this users role</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>   
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>startTransition(async () => await handleChange(id,changeTo))}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent  data-[state=open]:text-black"
          >
            <span>{title}</span>
            {title === "admin" ? (
              <Lock className="ml-2 h-4 w-4" />
            )  :  (
              <EditIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">

          <DropdownMenuSeparator />
          <DropdownMenuItem
           onClick={() =>{
            setopen(true)
            setChangeTo("admin")
          }}
           className="group">
            <Lock className="mr-2 h-3.5 w-3.5 group-hover:text-accent-foreground text-muted-foreground/70" />
            Admin
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={() =>{
            setopen(true)
            setChangeTo("editor")
          }} 
           className="group">
            <EditIcon className="mr-2 group-hover:text-accent-foreground h-3.5 w-3.5 text-muted-foreground/70" />
            Editor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UsersTableRoleChange;
