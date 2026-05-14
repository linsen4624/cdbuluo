"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/prod/password-input";
import Link from "next/link";

const formSchema = z.object({
  username: z.email("邮箱格式不正确").max(32, "标题最多32个字符"),
  password: z.string().min(5, "密码至少8个字符"),
  comfirm_pwd: z.string().min(5, "确认密码至少8个字符"),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      comfirm_pwd: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-90 overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <div className="w-sm flex flex-col gap-6 sm:max-w-md border rounded-lg p-8 shadow">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-semibold leading-10 tracking-tight text-black">
          加入明仪，只需一个账户
        </h1>
        <span className="text-xs font-normal">
          已有账户？<Link href="/login">点击登录</Link>
        </span>
      </div>

      <form id="form-signup" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-signup-username">用户名</FieldLabel>
                <Input
                  {...field}
                  id="form-signup-username"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="例：name@qq.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>请输入有效的电子邮箱</FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-signup-pwd">密码</FieldLabel>
                <PasswordInput
                  {...field}
                  id="form-signup-pwd"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="请输入密码"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>密码最少8位字符</FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="comfirm_pwd"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-signup-comfirmed">
                  确认密码
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="form-signup-confirmed"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="请输入密码"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>确认密码与密码必须保持一致</FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <div className="flex flex-col gap-4 w-full">
        <Separator />
        <Button type="submit" size="lg" form="form-signup">
          注册
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => form.reset()}
        >
          重置
        </Button>
      </div>
    </div>
  );
}
