"use client";

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

export default function ConsoleCharts() {
  return (
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
  );
}
