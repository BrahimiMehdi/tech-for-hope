"use client"
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { format } from "date-fns";
import React from "react";

type Props = {
  date: string | Date;
  className?:ClassValue
};

const DateFormat = ({ date,className }: Props) => {
    const formatedDate = format(date, "PPP")
  return <div className={cn(className)}>{formatedDate}</div>;
};

export default DateFormat;
