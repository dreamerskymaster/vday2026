"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

import { useProgress } from "@/hooks/useProgress";

export function MusicPlayer() {
  const { progress } = useProgress();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (progress.gatePassed && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction");
      });
    }
  }, [progress.gatePassed]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <audio
        ref={audioRef}
        src="/audio/romantic-background.mp3"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-primary/20"
          >
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowControls(!showControls)}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border-2",
          isPlaying 
            ? "bg-primary text-white border-primary" 
            : "bg-white text-primary border-primary/20"
        )}
      >
        <Music className={cn("w-6 h-6", isPlaying && "animate-pulse")} />
      </motion.button>
    </div>
  );
}
