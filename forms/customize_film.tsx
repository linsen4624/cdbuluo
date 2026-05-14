"use client";

import * as React from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const locations = [
  {
    id: "beijing",
    title: "北京",
    description: "仅支持变装拍摄服务",
  },
  {
    id: "shanghai",
    title: "上海",
    description: "支持所有服务，衣服寄存，变装拍摄，外出陪同等",
  },
];

const formSchema = z.object({
  title: z.string().min(5, "标题至少5个字符").max(32, "标题最多32个字符"),
  date: z.date(),
  time: z.string(),
  location: z.string(),
  description: z
    .string()
    .min(20, "描述至少20个字符")
    .max(100, "描述最多100个字符"),
  deposit: z.string().regex(/^[0-9_]+$/, "Deposit can only support numbers."),
  payment: z.string(),
});

export default function CustomizedForm() {
  const [userTimezone, setUserTimezone] = React.useState<string>("");

  React.useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      time: "10:30:00",
      location: "shanghai",
      description: "",
      deposit: "500",
      payment: "wechatpay",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[360px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
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
    <div className="w-full flex flex-col gap-8 items-center">
      <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        定制拍摄预约
      </h1>

      <div className="w-full flex flex-col gap-6 sm:max-w-md border rounded-lg p-8">
        <div>
          <form id="form-customize-film" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-customize-film-title">
                      标题
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-customize-film-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="例：普通男生女装拍摄"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-customize-film-date">
                        日期
                      </FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="form-customize-film-date"
                            className="justify-start font-normal"
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>请选择日期</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            locale={zhCN}
                            timeZone={userTimezone}
                            noonSafe
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="time"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="form-customize-film-time">
                        时间
                      </FieldLabel>
                      <Input
                        {...field}
                        type="time"
                        id="form-customize-film-time"
                        step="1"
                        autoComplete="off"
                        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet>
                    <FieldLegend>地点</FieldLegend>
                    <FieldDescription>
                      当前仅北京，上海有线下服务场所，未来将增加更多服务场所。
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {locations.map((loc) => (
                        <FieldLabel
                          key={loc.id}
                          htmlFor={`form-customize-film-location-${loc.id}`}
                        >
                          <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldContent>
                              <FieldTitle>{loc.title}</FieldTitle>
                              <FieldDescription>
                                {loc.description}
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value={loc.id}
                              id={`form-customize-film-location-${loc.id}`}
                              aria-invalid={fieldState.invalid}
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldSet>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-customize-film-description">
                      详细描述
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-customize-film-description"
                        placeholder="描述你想要的衣服，妆造，配饰等"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/100 字
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      请详细描述你的需求并提供预算和预期服务时间，注意预约后由于您未准时到场，定金将不予退还
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="deposit"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-customize-film-deposit">
                        定金
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-customize-film-deposit"
                        aria-invalid={fieldState.invalid}
                        placeholder="仅支持人民币"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="payment"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>支付方式</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="wechatpay">微信支付</SelectItem>
                          <SelectItem value="alipay">支付宝支付</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Separator />
          <Button type="submit" size="lg" form="form-customize-film">
            提交
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
    </div>
  );
}
