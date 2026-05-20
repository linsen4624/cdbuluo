"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/prod/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { WechatIcon } from "@hugeicons/core-free-icons";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  username: z.email("邮箱格式不正确").max(32, "标题最多32个字符"),
  password: z.string().min(5, "密码至少8个字符"),
  remember: z.boolean(),
});

export default function Page() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { username, password, remember } = data;

    const result = await authClient.signIn.email(
      {
        email: username,
        password: password,
        callbackURL: "/",
        rememberMe: remember,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          window.location.href = "/";
        },
        onError: (ctx) => {
          console.log(ctx.error);
          setLoading(false);
        },
      },
    );

    console.log(result);
  }

  return (
    <div className="w-sm flex flex-col gap-6 sm:max-w-md border rounded-lg p-8 shadow">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-semibold leading-10 tracking-tight text-black">
          登录你的账户
        </h1>
        <span className="text-xs font-normal">
          还没有账户？<Link href="/signup">点击注册</Link>
        </span>
      </div>

      <form id="form-login" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-username">用户名</FieldLabel>
                <Input
                  {...field}
                  id="form-login-username"
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
                <FieldLabel htmlFor="form-login-pwd">密码</FieldLabel>
                <PasswordInput
                  {...field}
                  id="form-login-pwd"
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
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="remember"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-login-rmb"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldLabel htmlFor="form-login-rmb">记住我</FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <span className="text-xs text-right font-medium">
              <Link href="/forgetpassword">忘记密码</Link>
            </span>
          </div>
        </FieldGroup>
      </form>

      <div className="flex flex-col gap-4 w-full">
        <Separator />
        <Button type="submit" size="lg" form="form-login">
          {loading ? "正在登录......" : "使用Email登录"}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => form.reset()}
        >
          <HugeiconsIcon icon={WechatIcon} />
          使用微信登录
        </Button>
      </div>
    </div>
  );
}
