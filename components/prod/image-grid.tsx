"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ImageGridProps {
  images: string[];
  description?: string;
}

const ImageGrid = ({ images, description }: ImageGridProps) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // 限制最多 9 张
  const displayImages = images.slice(0, 9);
  const count = displayImages.length;

  // 根据图片数量动态调整 Grid 列数
  const getGridCols = () => {
    if (count === 1) return "grid-cols-1";
    if (count === 2 || count === 4) return "grid-cols-2";
    return "grid-cols-3"; // 3, 5, 6, 7, 8, 9 张均使用 3 列
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* 图片网格容器 */}
      <div className={`grid gap-2 ${getGridCols()}`}>
        {displayImages.map((src, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div
                className="relative aspect-square cursor-pointer overflow-hidden rounded-md hover:opacity-90 transition"
                onClick={() => setSelectedImg(src)}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </DialogTrigger>

            {/* 弹出对话框 */}
            <DialogContent className="max-w-[90vw] md:max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
              <div className="sr-only">
                <DialogTitle>图片详情查看</DialogTitle>
                <DialogDescription>
                  正在查看第 {index + 1} 张图片，包含文本详细说明。
                </DialogDescription>
              </div>
              <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden h-[80vh] md:h-[600px]">
                {/* 左侧/上方：大图 */}
                <div className="relative flex-1 bg-black flex items-center justify-center">
                  <Image
                    src={src}
                    alt="Zoomed"
                    width={1200}
                    height={1200}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* 右侧/下方：文本说明 */}
                <div className="w-full md:w-80 p-6 bg-white overflow-y-auto">
                  <h3 className="text-lg font-bold mb-4">图片详情</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {description ||
                      "这里是图片的详细描述文本。你可以根据需求在此处添加评论、发布日期或标签等信息。"}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
