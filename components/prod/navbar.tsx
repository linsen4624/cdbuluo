"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "化妆服务",
    href: "/docs/primitives/alert-dialog",
    description:
      "俱乐部为您提供一对一的化妆服务，将根据您的身形，脸型推荐适合您的妆造。",
  },
  {
    title: "外出陪同",
    href: "/docs/primitives/hover-card",
    description:
      "如您有变装外出需求，我们提供工作人员在既定的路线，约定的时间内专门陪同外出。",
  },
  {
    title: "寄存服务",
    href: "/docs/primitives/progress",
    description:
      "俱乐部提供储存空间，专门为那些家里不方便放置变装衣物的同好提供便利。",
  },
  {
    title: "定制拍摄",
    href: "/services/customize_film",
    description: "在线申请定制拍摄场景和脚本，并预付定金",
  },
  {
    title: "摄影服务",
    href: "/docs/primitives/tabs",
    description:
      "爱美是人的天性，俱乐部拥有专业的摄影团队，为您留下生活中的美好瞬间",
  },
  {
    title: "绳艺拍摄",
    href: "/docs/primitives/tooltip",
    description:
      "我们有专业的绳师，擅长欧式，中式及日式紧缚等，为您提供安全舒适的体验",
  },
];

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>开始探索</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="变装故事">
                查看同好的变装故事，寻找相同的生活经历
              </ListItem>
              <ListItem href="/docs/installation" title="变装视频">
                查看变装视频，直观感受端到端的变装过程
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="变装学习">
                学习专业课程，自己一步步完成华丽蜕变
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">作品展示</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>产品服务</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">聚会活动</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">招贤纳士</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">关于明仪</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavBar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="w-full flex items-center justify-between h-16 px-16">
      <div className="relative size-16 flex">
        <Link className="relative size-16" href="/">
          <Image
            className="dark:invert object-cover"
            src="/logo.png"
            alt="CD buluo"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div>
        <Navigation />
      </div>
      {!session && (
        <div className="text-xs">
          <Link href="/login">登录</Link> {" | "}{" "}
          <Button size="lg" asChild>
            <Link href="/signup">注册</Link>
          </Button>
        </div>
      )}
      {session && (
        <div className="text-xs">
          <span className="text-xs">欢迎 {session.user.name}</span> {" | "}{" "}
          <Button
            size="lg"
            onClick={async () => {
              await authClient.signOut();
              router.push("/");
            }}
          >
            退出
          </Button>
        </div>
      )}
    </div>
  );
}
