"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { Heart, Download } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface FinalScreenProps {
  onFinish: () => void;
}

export function FinalScreen({ onFinish }: FinalScreenProps) {
  const { exportAnswers, completeApp } = useProgress();
  const [taps, setTaps] = useState(0);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    completeApp();
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleTap = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);
    if (newTaps >= 5) setShowExport(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg space-y-12"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart className="w-24 h-24 text-primary mx-auto fill-primary shadow-2xl shadow-primary/20" />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-xl text-charcoal/80"
          >
            You made it through all 12 chapters.
          </motion.p>
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
              className="text-3xl md:text-4xl font-heading text-charcoal"
            >
              "Our story isn't perfect. But it's ours."
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
              className="text-3xl font-handwritten text-primary italic"
            >
              "And it's not over."
            </motion.p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
          className="space-y-8 pt-4"
        >
          <div className="space-y-3">
            <p className="text-xl text-charcoal/90">February 14th. If you're feeling well...</p>
            <p className="text-2xl font-bold text-primary tracking-wide">I'd like to take you out.</p>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-heading text-charcoal">Happy Valentine's Day, Deeksha.</p>
            <p className="text-2xl font-handwritten text-secondary">Happy Almost-One-Year.</p>
            <p className="text-xl font-medium pt-4 text-charcoal/60">— Ajith</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="space-y-6 flex flex-col items-center"
        >
          <Button 
            onClick={onFinish}
            className="text-xl px-16 py-8 rounded-2xl bg-primary hover:bg-primary/90 transition-all shadow-2xl hover:shadow-primary/40 active:scale-95"
          >
            I'll be ready ❤️
          </Button>

          <button 
            onClick={handleTap}
            className="text-charcoal/40 font-handwritten text-lg hover:text-primary transition-opacity"
          >
            See you soon, babu.
          </button>

          <AnimatePresence>
            {showExport && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={exportAnswers}
                className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-full text-sm shadow-lg hover:bg-charcoal/80"
              >
                <Download className="w-4 h-4" />
                Export Memories
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
