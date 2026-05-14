"use client";

import { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // 默认音量 100%
  const [prevVolume, setPrevVolume] = useState(1); // 用于恢复静音前的音量
  const [duration, setDuration] = useState(0);

  // 切换播放/暂停
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // 核心逻辑：播放结束归位
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // 进度回到起点
    }
  };

  // 切换静音
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        // 取消静音：恢复到之前的音量，如果之前是0则恢复到0.5
        const restoreVol = prevVolume > 0 ? prevVolume : 0.5;
        videoRef.current.muted = false;
        videoRef.current.volume = restoreVol;
        setVolume(restoreVol);
      } else {
        // 开启静音：记录当前音量以便后续恢复
        setPrevVolume(volume);
        videoRef.current.muted = true;
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  // 调节音量
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;

      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      if (newVolume > 0) setPrevVolume(newVolume);
    }
  };

  // 更新进度条
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  // 拖动进度条
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const time = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  // 全屏逻辑
  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative group bg-black rounded-lg overflow-hidden w-full max-w-4xl mx-auto"
    >
      {/* 视频主体 */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() =>
          setDuration(videoRef.current?.duration || duration)
        }
        onClick={togglePlay}
        onEnded={handleVideoEnd}
        muted={isMuted}
        preload="metadata"
      />

      {/* 控制条 Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        {/* 进度条 (Shadcn Slider) */}
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-4 cursor-pointer"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white"
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-white"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>

            {/* 音量调节滑动条 (Shadcn Slider) */}
            <div className="w-24">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullScreen}
            className="text-white"
          >
            <Maximize />
          </Button>
        </div>
      </div>
    </div>
  );
}
