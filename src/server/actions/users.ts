"use server";

import { users } from "@/server/db/schema";
import { auth, signOut } from "@/auth";
import {v4 as uuid} from "uuid"
// import { updateUserRole } from "@/server/queries/users";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getUserByEmail, getUserById, insertAsset } from "../queries";
import { registerSchema } from "@/lib/zod";
import { uploadFile } from "@/server/utils";
import { createUser, deleteUser, updateUserRole } from "@/server/queries/users";

export const changeUserRole = async (id: string, role: typeof users.$inferSelect.type) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    return {
      message: "Something went wrong",
    };
  if (session.user.type !== "admin")
    return {
      message: "You dont have permission to change that",
    };
  if (!id || !role)
    return {
      message: "Missing  data",
    };
  try {
    const currentUser = await getUserById(session.user.id);
    if(!currentUser) {
      return{
        message:"something went wrong"
      }
    }
    const targetUser = await getUserById(id);
    
    if (targetUser?.type === role) return { message: "User already has that role" };
    if (targetUser?.id === currentUser.id) return { message: "You can't change your own role" };
    if (targetUser?.type === currentUser.type) return { message: "No permission to change that" };
    await updateUserRole(id, role);
    revalidatePath("/admin/users");
    return {
      message: "success",
    };
  } catch (error) {
    return {
      message: "something went wrong",
    };
  }
};
export const createUserAction = async (formData: FormData) => {
  const session = await auth();

  if (!session || !session.user)
    return {
      message: "Something went wrong",
    };
  if (session.user.type !== "admin")
    return {
      message: "You dont have permission to create users",
    };

  try {
    const parsedData = registerSchema.safeParse({
      name: formData.get("name"),
      image: formData.get("image"),
      email: formData.get("email"),
      password: formData.get("password"),
      type: formData.get("type"),
    });
    if (parsedData.success) {
      const currentUser = await getUserByEmail(parsedData.data.email);
      if(currentUser) return{
        message:"Utilisateur existe deja!"
      }
      const {data} = parsedData

      const {imagePath} = await uploadFile(data.image,"users")
      const imageID = uuid()
      const userID = uuid()
      const hashedPass = await bcrypt.hash(data.password,12)

      await insertAsset({
        id:imageID,
        path:imagePath
      })
      await createUser({
        id:userID,
        password:hashedPass,
        email:data.email,
        imageId:imageID,
        name:data.name,
        type:data.type
      })
      revalidatePath("/admin/users");
      return {
        message: "success",
      };
    }
    return {
      message: "Something went wrong",
    };
  } catch (error) {
    return {
      message: "something went wrong",
    };
  }
};
export const deleteUserAction = async (targetID: string) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    return {
      message: "Something went wrong",
    };
  if (session.user.type !== "admin")
    return {
      message: "You dont have permission to change that",
    };
  if (!targetID )
    return {
      message: "Missing  data",
    };
  try {
    const currentUser = await getUserById(session.user.id);
    const targetUser = await getUserById(targetID);
    if(!targetUser) return {message:"No user found!"}
    if (currentUser?.type !== "admin" || !currentUser) return { message: "you don't have permission to do that" };
    if (currentUser.id === targetID) return {message:"You can't' delete your own account"}
    if (currentUser.type === targetUser.type) return {message:"You can't' delete an account with the same permissions"}
    await deleteUser(targetID)
    revalidatePath("/admin/users");
    return {
      message: "success",
    };
  } catch (error) {
    return {
      message: "something went wrong",
    };
  }
};


