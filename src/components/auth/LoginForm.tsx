"use client";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { LoginUser } from "@/server/actions/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSuccess from "@/components/ui/FormSuccess";
import FormError from "@/components/ui/FormError";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
type Props = {
  isModal?:boolean
};

const LoginForm = ({isModal}: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const form = useForm<z.infer<typeof signInSchema>>({
    mode:"onBlur",
    resolver: zodResolver(signInSchema),
  });
  async function onSubmit(data: z.infer<typeof signInSchema>) {
    try {
      const parsedData = signInSchema.safeParse(data);
      if (parsedData.success) {
        const res = await LoginUser(parsedData.data);
        setError(res?.error);
        setSuccess(res?.message);
      }
      else{
        setError("Invalid credentials");
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <Card className={cn("flex  w-full max-w-lg md:h-fit gap-y-6 flex-col justify-center",isModal && "border-none shadow-none")}>
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-8 grid  w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <div className="relative h-fit  w-full">
                      <div className="relative">
                        {showPass ? (
                          <EyeOff
                            className="absolute hover:cursor-pointer hover:text-foreground/70 text-foreground right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPass(false)}
                            size={"18px"}
                          />
                        ) : (
                          <Eye
                            className="absolute hover:cursor-pointer hover:text-foreground/70 text-foreground right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPass(true)}
                            size={"18px"}
                          />
                        )}
                        <Input type={showPass ? "text" : "password"} placeholder="*****" {...field} />
                      </div>
                      {/* <Button  className="relative font-normal text-card-foreground top-2 px-0" asChild variant={"link"}>
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!success && error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            <Button disabled={form.formState.isSubmitting} type="submit">Login</Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
