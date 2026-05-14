import NavBar from "@/components/prod/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Appointment02Icon,
  DashboardSquare02Icon,
  LicenseIcon,
  ProfitIcon,
  UserMultiple02Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function ConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <NavBar />
      <main className="flex gap-6 flex-1 w-full flex-col items-center justify-between py-16 px-16">
        <div className="flex w-full h-full border">
          <div className="w-64 p-4 bg-zinc-100 flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0 items-start">
                <span className="text-basis font-semibold">点十六分</span>
                <span className="text-xs italic text-gray-600">
                  管理员 - 完全访问权限
                </span>
              </div>
            </div>
            <Separator />
            <span className="text-xs text-gray-600">管理面板</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center p-2 bg-gray-50 rounded-sm -ml-2">
                <HugeiconsIcon icon={DashboardSquare02Icon} size="18" />
                <Link href="/console">
                  <span className="text-sm">仪表板</span>
                </Link>
              </div>
              <div className="flex gap-2 items-center py-2">
                <HugeiconsIcon icon={UserMultiple02Icon} size="18" />
                <span className="text-sm">用户管理</span>
              </div>
              <div className="flex gap-2 items-center py-2">
                <HugeiconsIcon icon={ProfitIcon} size="18" />
                <span className="text-sm">收益分析</span>
              </div>
            </div>
            <span className="text-xs text-gray-600">运营管理</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center p-2 rounded-sm -ml-2">
                <HugeiconsIcon icon={Video01Icon} size="18" />
                <Link href="/console/videos">
                  <span className="text-sm">视频管理</span>
                </Link>
              </div>
              <div className="flex gap-2 items-center py-2">
                <HugeiconsIcon icon={LicenseIcon} size="18" />
                <span className="text-sm">文章管理</span>
              </div>
              <div className="flex gap-2 items-center py-2">
                <HugeiconsIcon icon={Appointment02Icon} size="18" />
                <span className="text-sm">预约管理</span>
              </div>
            </div>
          </div>
          <div className="w-full p-4">{children}</div>
        </div>
      </main>
    </section>
  );
}
