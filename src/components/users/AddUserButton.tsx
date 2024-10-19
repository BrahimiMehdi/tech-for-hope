"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddUserForm from "./AddUserForm";
const AddUserButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default", className: "gap-x-4 items-center" })}>
        Ajouter un utilisateur <Plus className="size-4 relative top-[1px]" />
      </DialogTrigger>
      <DialogContent>
    
        <AddUserForm />
        <DialogFooter>
          <Button onClick={() => setOpen(false)} form="ts" type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;
