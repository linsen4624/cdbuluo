"use client";
import Image from "next/image";
import NavBar from "@/components/prod/navbar";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContinuousScrollCarousel } from "@/components/prod/carousel";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddToListIcon,
  Agreement02Icon,
  FileEditIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import ImageGrid from "@/components/prod/image-grid";

const images = [
  "/images/001.png",
  "/images/002.png",
  "/images/003.png",
  "/images/004.png",
  "/images/001.png",
  // ... 最多9张
];

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/services/customize_film");
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center dark:bg-black">
      <NavBar />
      <main className="flex gap-6 flex-1 w-full flex-col items-center justify-between py-32 px-16 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            开始探索，发现另一个自己
          </h1>
          <p className="max-w-md text-md leading-8 text-zinc-600 dark:text-zinc-400">
            精致男人不会只有一副面孔， 明仪变装俱乐部帮您发现另一面的美
          </p>
        </div>
        <div className="w-64">
          <Separator />
        </div>
        <div className="flex w-full justify-around mt-12">
          <div className="flex flex-col gap-4 text-center">
            <span className="text-4xl font-bold">15+年</span>
            <span>持续运营超</span>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <span className="text-4xl font-bold">8K+</span>
            <span>服务用户超</span>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <span className="text-4xl font-bold">10K+次</span>
            <span>定制拍摄超</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between w-full mt-12">
          <div className="flex gap-4">
            <span className="text-2xl font-heading">作品</span>
          </div>
          <div className="flex gap-4 items-start">
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/004.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/001.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/004.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/001.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
          </div>
          {/* Secondary Row */}
          <div className="flex gap-4 items-start">
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/004.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/001.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/004.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
            <Card className="max-w-xs w-full pt-0">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src="/images/001.png"
                  alt="users"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardFooter>
                <Badge variant="secondary">变装故事</Badge>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 mt-6 items-center justify-center p-16">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            我们提供您需要的专业服务
          </h1>

          <div className="flex gap-4">
            <span className="text-xs">变装化妆</span>
            <Separator orientation="vertical" />
            <span className="text-xs">外出陪同</span>
            <Separator orientation="vertical" />
            <span className="text-xs">定制拍摄</span>
          </div>
          <p>
            <Button size="lg">开始探索</Button>
          </p>
        </div>

        <ContinuousScrollCarousel />

        <div className="w-full flex border mt-16 xs:flex-col">
          <div className="w-1/3 bg-gray-100 p-16 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              按您的要求定制拍摄
            </h1>
            <p className="max-w-md text-md leading-8 text-zinc-600 dark:text-zinc-400">
              满足不同人士的个性拍摄需求，明仪注重客户隐私，成片后底片全送
            </p>
            <p>
              <Button size="lg" onClick={handleClick}>
                我要定制
              </Button>
            </p>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col gap-4 items-center py-16">
              <div className="flex flex-col items-center gap-4">
                <HugeiconsIcon icon={FileEditIcon} className="w-8 h-8" />
                <span className="text-basis">
                  1、填写申请单，详细描述你的需求
                </span>
              </div>
              <div className="flex h-16">
                <Separator orientation="vertical" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <HugeiconsIcon icon={AddToListIcon} className="w-8 h-8" />
                <span className="text-basis">2、确认需求，收取定金</span>
              </div>
              <div className="flex h-16">
                <Separator orientation="vertical" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <HugeiconsIcon icon={Agreement02Icon} className="w-8 h-8" />
                <span className="text-basis">3、执行需求，按要求交付服务</span>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="relative overflow-hidden">
              <Image
                src="/images/002.png"
                alt="customization"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 mt-6 items-center justify-center p-16">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            我们的客户这么说
          </h1>

          <p>明仪自创办以来，已服务超8000名客户</p>
          <div className="flex w-full justify-center">
            <Button size="lg">查看更多</Button>
          </div>
          <div className="flex gap-4 w-full">
            <div className="w-1/3 flex flex-col gap-6 items-start border py-8 px-8 rounded-md">
              <div className="flex gap-4 justify-between items-center">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xl">世世地点</span>
              </div>
              <div className="bg-gray-50">
                <span className="text-sm italic">
                  首都基辅罗斯积分士大夫删掉，飞机喀什的上岛咖啡，的计算方式灯笼裤飞机开始发，就开始了附件是肯定方式
                </span>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-6 items-start border py-8 px-8 rounded-md">
              <div className="flex gap-4 justify-between items-center">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xl">撒旦发射点</span>
              </div>
              <div className="bg-gray-50">
                <span className="text-sm italic">
                  首都基辅罗斯积分士大夫删掉，飞机喀什的上岛咖啡，的计算方式灯笼裤飞机开始发，就开始了附件是肯定方式，士大夫精神的理解方式，收到附件是扩大解放，是的封建士大夫胜多负少。
                </span>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-6 items-start border py-8 px-8 rounded-md">
              <div className="flex gap-4 justify-between items-center">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xl">士大夫</span>
              </div>
              <div className="bg-gray-50">
                <span className="text-sm italic">
                  首都基辅罗斯积分士大夫删掉，飞机喀什的上岛咖啡，的计算方式灯笼裤飞机开始发，就开始了附件是肯定方式，是的开发建设劳动纠纷。
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 mt-6 items-center justify-center p-16">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            我们需要志趣相投的你
          </h1>
          <div className="flex gap-4">
            <span className="text-xs">女装上班</span>
            <Separator orientation="vertical" />
            <span className="text-xs">远程办公</span>
            <Separator orientation="vertical" />
            <span className="text-xs">LGBT友好</span>
          </div>
          <p>
            <Button size="lg" variant="outline">
              招贤纳士
            </Button>
          </p>
        </div>
      </main>
      {/* Bottom */}
      <div className="w-96 flex flex-col gap-4">
        <ImageGrid images={images} description="这是一组精选的摄影照片。" />
      </div>
      <Separator />
      <div className="flex w-full justify-between px-16 py-4">
        <div>
          <span className="text-gray-600 text-sm font-light">
            © 2026 变装部落版权所有
          </span>
        </div>
        <div className="flex gap-4 text-gray-600 text-sm font-light">
          <span>网站协议</span>
          <span>隐私政策</span>
          <span>Cookie</span>
        </div>
      </div>
    </div>
  );
}
