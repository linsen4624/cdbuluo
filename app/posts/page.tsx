import NavBar from "@/components/prod/navbar";
import { VideoPlayer } from "@/components/prod/videoplayer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Page() {
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
          <VideoPlayer src="https://video.699pic.com/videos/47/12/96/a_678fb5403976f1737471296237.mp4" />
        </div>
      </main>
    </div>
  );
}
