"use client";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import vector from "../../../../../public/login.svg";

export default function Login() {

  return (
    <div className="w-full min-h-screen px-6 place-items-center capitalize grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <LoginForm />
      <div className="hidden lg:grid place-items-center ">
        <Image src={vector} alt="Image" className="w-96 object-contain dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
