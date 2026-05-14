"use client";

import * as React from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function ContinuousScrollCarousel() {
  const autoScrollPlugin = React.useRef(
    AutoScroll({
      speed: 1, // 滚动速度，数值越大越快（建议 0.5~2）
      direction: "forward", // "forward" 为从左向右，"backward" 为从右向左
      startDelay: 0, // 延迟开始
      stopOnInteraction: false, // 用户点击/拖拽后是否停止
      stopOnMouseEnter: true, // 鼠标悬停时暂停滚动
    }),
  );

  const images = [
    "002.png",
    "003.png",
    "002.png",
    "003.png",
    "002.png",
    "003.png",
    "002.png",
    "003.png",
    "002.png",
    "003.png",
  ];

  return (
    <Carousel
      plugins={[autoScrollPlugin.current]}
      opts={{
        align: "start",
        loop: true, // 开启无限循环
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {images.map((src, index) => (
          <CarouselItem key={index} className="pl-4 basis-3xs">
            <div className="w-full max-w-40">
              <AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
                <Image
                  src={`/images/${src}`}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover dark:brightness-20"
                  loading="eager"
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* 不包含 <CarouselPrevious /> 和 <CarouselNext />，即可隐藏箭头 */}
    </Carousel>
  );
}
