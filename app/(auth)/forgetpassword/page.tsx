"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("邮箱格式不正确").max(32, "标题最多32个字符"),
});

export default function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email } = data;

    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: "/",
    });

    console.log(result);
    setIsSubmitted(true);
  }

  return (
    <div className="w-sm flex flex-col gap-6 sm:max-w-md border rounded-lg p-8 shadow">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-semibold leading-10 tracking-tight text-black">
          密码找回页面
        </h1>
        <span className="text-xs font-normal">
          忘记密码？输入你的邮箱接收密码重置链接
        </span>
      </div>

      {isSubmitted && <div>邮件已发送，请检查您的收件箱</div>}
      {!isSubmitted && (
        <>
          <form
            id="form-forget"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-forget-email">邮箱地址</FieldLabel>
                  <Input
                    {...field}
                    id="form-forget-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="例：name@qq.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>请输入你的电子邮箱</FieldDescription>
                </Field>
              )}
            />
          </form>

          <div className="flex flex-col gap-4 w-full">
            <Separator />
            <Button type="submit" size="lg" form="form-forget">
              发送重置请求
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
