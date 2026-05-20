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
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/prod/password-input";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(5, "密码至少8个字符"),
  comfirm_pwd: z.string().min(5, "确认密码至少8个字符"),
});

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isResetting, setIsResetting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "00000001",
      comfirm_pwd: "00000000",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!token) {
      return <div>无效的重置链接，请重新申请</div>;
    }
    setIsResetting(true);
    const { password } = data;
    const result = await authClient.resetPassword({
      token: token,
      newPassword: password,
    });
    console.log(result);
    setIsResetting(false);
  }

  return (
    <div className="w-sm flex flex-col gap-6 sm:max-w-md border rounded-lg p-8 shadow">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-semibold leading-10 tracking-tight text-black">
          设置新密码
        </h1>
        <span className="text-xs font-normal">
          在下面的密码框内输入你的新密码
        </span>
      </div>

      <form id="form-reset" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-reset-pwd">密码</FieldLabel>
                <PasswordInput
                  {...field}
                  id="form-reset-pwd"
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
                <FieldLabel htmlFor="form-reset-comfirmed">确认密码</FieldLabel>
                <PasswordInput
                  {...field}
                  id="form-reset-confirmed"
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
        <Button
          type="submit"
          size="lg"
          form="form-reset"
          disabled={isResetting}
        >
          设置新密码
        </Button>
      </div>
    </div>
  );
}
