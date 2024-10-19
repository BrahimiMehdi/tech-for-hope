"use client"
import { BlogType, UserType } from "@/lib/globals";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";
import UsersTableRoleChange from "@/components/ui/UsersTableRoleChange";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import UsersTableDelete from "../ui/UsersTableDelete";
import DateFormat from "@/components/ui/date-format";
import Link from "next/link";
export type User = UserType & { image: { path: string } };
export type Blog = BlogType & { image: { path: string }; user: { email: string } };

export const UserColumns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <Image
          alt={`${row.original.name} Product image`}
          className="aspect-square size-16  rounded-full object-contain"
          height="64"
          src={row?.original?.image.path!}
          width="64"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "type",
    header: "Role",
    cell: ({ row }) => <UsersTableRoleChange id={row?.original?.id!} title={row?.original?.type || "editor"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <UsersTableDelete id={row.original.id} />,
  },
];
export const BlogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <Link className="font-medium" href={`/admin/blog/edit?id=${row.original.id}`}>{row.original.title}</Link>
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <DateFormat date={row.original.createdAt!} />,
  },
  {
    accessorKey: "user.email",
    header: "Posted by",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { toast } = useToast();
  //     const [pending, startTransition] = useTransition();
  //     // return (
  //     //     <ActionDialog
  //     //       message="This action cannot be undone. This will permanently delete this product and remove its data from the
  //     //             server."
  //     //       onClick={() => {
  //     //         startTransition(async () => {
  //     //           if (row.original.id) {
  //     //             const res = await deleteUserAction(row.original.id);
  //     //             if (res.message === "success")
  //     //               toast({
  //     //                 title: "User Deleted ",
  //     //                 description: "User deletion has been succesful",
  //     //                 variant: "success",
  //     //               });
  //     //             else
  //     //               toast({
  //     //                 title: "Something went wrong",
  //     //                 description: res.message,
  //     //                 variant: "destructive",
  //     //               });
  //     //           }
  //     //         });
  //     //       }}
  //     //     >
  //     //       <AlertDialogTrigger>
  //     //         <Trash size={"16px"} className="transition-colors hover:text-destructive" />
  //     //       </AlertDialogTrigger>
  //     //     </ActionDialog>
  //     // );
  //   },
  // },
];
