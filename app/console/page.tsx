"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const description = "An interactive bar chart";
const chartData = [
  { month: "一月", desktop: 186 },
  { month: "二月", desktop: 305 },
  { month: "三月", desktop: 237 },
  { month: "四月", desktop: 73 },
  { month: "五月", desktop: 209 },
  { month: "六月", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Users",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "#8ec5ff" },
  { browser: "safari", visitors: 200, fill: "#2b7fff" },
  { browser: "firefox", visitors: 187, fill: "#155dfc" },
  { browser: "edge", visitors: 173, fill: "#1447e6" },
  { browser: "other", visitors: 90, fill: "#193cb8" },
];
const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "会员服务",
    color: "var(--chart-1)",
  },
  safari: {
    label: "定制拍摄",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "外出陪同",
    color: "var(--chart-3)",
  },
  edge: {
    label: "课程教学",
    color: "var(--chart-4)",
  },
  other: {
    label: "其他",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const users = [
  {
    id: "001",
    nickname: "帅呆了",
    email: "ssd001@outlook.com",
    age: "24",
    gender: "男",
    so: "异性恋",
    type: "CD",
  },
  {
    id: "002",
    nickname: "从v吧",
    email: "llkkss@163.com",
    age: "35",
    gender: "男",
    so: "同性恋",
    type: "TS",
  },
  {
    id: "003",
    nickname: "撒旦发射点",
    email: "momomo@sina.com",
    age: "23",
    gender: "女",
    so: "异性恋",
    type: "直女",
  },
  {
    id: "004",
    nickname: "看见了梵蒂冈",
    email: "sdssd@sina.com",
    age: "25",
    gender: "男",
    so: "同性恋",
    type: "CD",
  },
  {
    id: "005",
    nickname: "史蒂夫",
    email: "stv@outlook.com",
    age: "28",
    gender: "男",
    so: "双性恋",
    type: "CD",
  },
  {
    id: "006",
    nickname: "空间里0938",
    email: "sdlkjl@outlook.com",
    age: "28",
    gender: "男",
    so: "异性恋",
    type: "直男",
  },
  {
    id: "007",
    nickname: "扣税的佛",
    email: "lkjl8888@163.com",
    age: "23",
    gender: "女",
    so: "同性恋",
    type: "直女",
  },
  {
    id: "008",
    nickname: "二类卡",
    email: "lkkk@qq.com",
    age: "38",
    gender: "男",
    so: "双性恋",
    type: "CD",
  },
  {
    id: "009",
    nickname: "会计师",
    email: "ddss99@163.com",
    age: "31",
    gender: "男",
    so: "双性恋",
    type: "CD",
  },
  {
    id: "010",
    nickname: "撒旦克里夫",
    email: "kkddmo00@outlook.com",
    age: "27",
    gender: "男",
    so: "同性恋",
    type: "TS",
  },
];

export default function Console() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="py-4 sm:py-0">
        <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
            <CardTitle>用户分析</CardTitle>
            <CardDescription>显示最近3个月的用户增长趋势</CardDescription>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">注册用户</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                120339
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">日活</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                138
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">月活</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                4599
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-row gap-0">
        <ChartContainer className="h-64" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
        <ChartContainer
          config={pieChartConfig}
          className="mx-auto aspect-square h-64 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={pieChartData} dataKey="visitors" label nameKey="browser">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) =>
                  pieChartConfig[value as keyof typeof pieChartConfig]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="border p-4">
        <Table>
          <TableCaption>点击查看更多</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">编号</TableHead>
              <TableHead>网名</TableHead>
              <TableHead>年龄</TableHead>
              <TableHead>性别</TableHead>
              <TableHead>性向</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>用户名</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.id}</TableCell>
                <TableCell>{u.nickname}</TableCell>
                <TableCell>{u.age}</TableCell>
                <TableCell>{u.gender}</TableCell>
                <TableCell>{u.so}</TableCell>
                <TableCell>{u.type}</TableCell>
                <TableCell>{u.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
