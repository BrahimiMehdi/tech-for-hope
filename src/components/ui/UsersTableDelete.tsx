"use client";
import React, { useTransition } from "react";

import ActionDialog from "@/components/ui/ActionDialog";
import { useToast } from "@/hooks/use-toast";
import { AlertDialogTrigger } from "./alert-dialog";
import { Trash } from "lucide-react";
import { deleteUserAction } from "@/server/actions/users";
type Props = {
    id?:string
};

const UsersTableDelete = ({id}: Props) => {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  return (
    <ActionDialog
      message="This action cannot be undone. This will permanently delete this product and remove its data from the
                  server."
      onClick={() => {
        startTransition(async () => {
          if (id) {
            const res = await deleteUserAction(id);
            if (res.message === "success")
              toast({
                title: "User Deleted ",
                description: "User deletion has been succesful",
                variant: "default",
              });
            else
              toast({
                title: "Something went wrong",
                description: res.message,
                variant: "destructive",
              });
          }
        });
      }}
    >
      <AlertDialogTrigger>
        <Trash size={"16px"} className="transition-colors hover:text-destructive" />
      </AlertDialogTrigger>
    </ActionDialog>
  );
};

export default UsersTableDelete;
