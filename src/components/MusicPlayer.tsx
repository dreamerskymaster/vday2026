"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useProgress } from "@/hooks/useProgress";

export function MusicPlayer() {
  const { progress } = useProgress();
  const [unavailable, setUnavailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playInitiated = useRef(false);

  const attemptPlay = useCallback(async () => {
    if (!audioRef.current || unavailable || playInitiated.current) return;
    try {
      await audioRef.current.play();
      playInitiated.current = true;
    } catch (e) {
      console.warn("Autoplay still blocked, waiting for interaction...");
    }
  }, [unavailable]);

  useEffect(() => {
    if (!progress.gatePassed || unavailable) return;

    // 1. Attempt immediately on mount (user has likely already interacted with the Gate)
    attemptPlay();

    // 2. Listen for any future interaction as fallback
    const handleInteraction = () => {
      attemptPlay();
      if (playInitiated.current) {
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return removeListeners;
  }, [progress.gatePassed, unavailable, attemptPlay]);

  return (
    <audio
      ref={audioRef}
      src="/audio/romantic-background.mp3"
      loop
      onError={() => setUnavailable(true)}
      className="hidden"
      preload="auto"
    />
  );
}
