"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown, Trash, Upload } from "lucide-react";
import { registerSchema } from "@/lib/zod";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserAction } from "@/server/actions/users";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { users } from "@/server/db/schema";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Props = {};

const AddUserForm = ({}: Props) => {
  const { toast } = useToast();
  const [image, setImage] = useState("");
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "onBlur",

    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("email", values.email);
      formData.set("password", values.password);
      formData.set("type", values.type);
      formData.set("image", values.image);
      const res = await createUserAction(formData);
      if (res.message === "success") {
        toast({
          title: "User has been added",
          description: "Thank you!",
          variant: "default",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong here",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const removeImage = () => {
    const vals = form.getValues();
    form.reset({ ...vals, image: undefined });
    setImage("");
  };
  const roleValues = users.type.enumValues;

  return (
    <Form {...form}>
      <form id="ts" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex relative justify-between pt-1 flex-col">
              <FormLabel>Role</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? roleValues.find((stock) => stock === field.value) : "Select role state"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandGroup>
                        {roleValues.map((type) => (
                          <CommandItem
                            value={type}
                            key={type}
                            onSelect={() => {
                              form.setValue("type", type);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", type === field.value ? "opacity-100" : "opacity-0")} />
                            {type}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="">
              <FormLabel className="relative">Photo</FormLabel>
              <div className="relative group border rounded-md flex flex-col gap-y-2 items-center justify-center h-24">
                {(form.getValues("image") || image !== "") && (
                  <Button
                    onClick={() => removeImage()}
                    className="absolute group-hover:opacity-100 size-8 opacity-0 pointer-events-auto aspect-square px-0 z-[4]  top-2 right-2 text-gray-700 hover:bg-destructive hover:text-white"
                    variant={"outline"}
                  >
                    <Trash size={"16px"} />
                  </Button>
                )}
                {image !== "" ? (
                  <Image
                    className="w-full max-h-full aspect-square object-contain"
                    src={image}
                    alt="t"
                    width={400}
                    height={400}
                  />
                ) : (
                  <>
                    <Upload className="pointer-events-none text-primary " size={"28px"} />
                  </>
                )}
                <FormControl>
                  <Input
                    className="absolute opacity-0 cursor-pointer inset-0 h-full w-full"
                    onChange={(event) => {
                      onChange(event.target.files && event.target.files[0]);
                      if (event.target.files && event.target.files[0]) {
                        const file = event?.target?.files?.[0];
                        const reader = new FileReader();
                        reader.onload = () => {
                          setImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    type="file"
                    accept="image/**"
                    placeholder="Secondary Icon"
                    {...fieldProps}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button disabled={form.formState.isSubmitting} type="submit">
          Submit
        </Button> */}
      </form>
    </Form>
  );
};

export default AddUserForm;
