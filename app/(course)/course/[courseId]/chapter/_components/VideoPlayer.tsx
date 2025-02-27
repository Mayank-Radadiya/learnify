"use client";

import { useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  title: string;
  playbackId: string;
  isLocked: boolean;
}

const VideoPlayer = ({ title, playbackId, isLocked }: VideoPlayerProps) => {
  const [isReady, setReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // ✅ Ensures MuxPlayer only renders on the client
  }, []);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute flex items-center inset-0 justify-center bg-slate-700">
          <Loader2 className="text-white animate-spin" size={64} />
        </div>
      )}
      {isLocked && (
        <div className="absolute flex items-center inset-0 justify-center bg-slate-700 flex-col gap-y-2">
          <Lock className="text-secondary" size={64} />
          <p className="text-sm text-slate-400">This chapter is locked.</p>
        </div>
      )}
      {!isLocked && isMounted && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
          onError={(event) => {
            console.error("MuxPlayer Error:", event);
            toast.error("Failed to load video.");
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
