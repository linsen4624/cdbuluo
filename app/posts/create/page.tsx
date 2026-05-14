"use client";
import { CDEditor, type MyEditorRef } from "@/components/prod/cdbuluo-editor";
import type { Value } from "platejs";
import NavBar from "@/components/prod/navbar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";

export default function Page() {
  const editorRef = useRef<MyEditorRef>(null);

  const handleSave = () => {
    if (typeof window === "undefined") return; // 防止 SSR 误调用
    const content = editorRef.current?.getValue();
    if (content) {
      localStorage.setItem("my-doc", JSON.stringify(content));
      console.log("保存的内容", content);
    }
  };

  // 辅助函数：从 localStorage 读取初始值（没有则返回空数组）
  function getInitialValue(): Value {
    if (typeof window === "undefined") return []; // 防止 SSR 误调用
    const saved = localStorage.getItem("my-doc");
    return saved ? JSON.parse(saved) : [];
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      <NavBar />
      <main className="flex gap-6 flex-1 w-full flex-col items-center justify-between py-16 px-32 bg-white">
        <div className="w-3xl flex flex-col gap-4">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl">短剧：民国女人的一天</h1>
            <Badge variant="secondary">明仪出品</Badge>
          </div>
          <div className="flex gap-2">
            <span className="text-xs text-gray-500">拍摄地点：上海</span>
            <Separator orientation="vertical" />
            <span className="text-xs text-gray-500">
              拍摄时间：2026年4月25日
            </span>
          </div>
          <CDEditor ref={editorRef} initialValue={getInitialValue()} />
          <button onClick={handleSave}>保存草稿</button>
        </div>
      </main>
    </div>
  );
}
