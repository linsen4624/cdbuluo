import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ConsoleCharts from "@/components/prod/charts-console";
import UserTable from "@/components/prod/user-table";

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

      <ConsoleCharts />
      <div className="p-4">
        <UserTable />
      </div>
    </div>
  );
}
