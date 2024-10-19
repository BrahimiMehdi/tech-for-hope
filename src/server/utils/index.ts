import "server-only"
import {v4 as uuid} from "uuid"
import fs, { writeFile } from "fs";
import path, { join } from "path";
import { auth } from "@/auth"
import { z } from "zod";
export const uploadFile = async (file: File, folder: string) => {
  const allowedExtensions = [".png",".jpg",".webp",".svg",".JPG",".jpeg",".PNG"]
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const session = await auth();
  if (!session) {
    throw new Error("Something went wrong");
  }
  if (session.user.type !== "admin") {
    if (session.user.type !== "editor") throw new Error("Something went wrong");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit of 5MB');
  }
  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(Buffer.from(bytes));
  const extensionName = path.extname(file.name);
  if(!allowedExtensions.includes(extensionName)) throw new Error("File not supported")
  const fileID = uuid();

  const Path = join(`public/${folder}`, `${fileID}${extensionName}`);
  const imagePath = join(folder, `${fileID}${extensionName}`);
  writeFile(Path, buffer, (err) => {
    if (err) return { message: "something went wrong" };
  });
 
  const imgPath = imagePath.replace("\\", "/");
  return { imagePath: `/${imgPath}` };
};
export const uploadBulk = async (files: FileList, folder: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("Something went wrong");
  }
  if (session.user.type !== "admin") {
    if (session.user.type !== "editor") throw new Error("Something went wrong");
  }
  
  let pathRes = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i];
      const { imagePath } = await uploadFile(currentFile, folder);
      pathRes.push({ path: imagePath });
    }
    return pathRes;
  } catch (error) {
    throw new Error("Uploading bulk went wrong" + error);
  }
};