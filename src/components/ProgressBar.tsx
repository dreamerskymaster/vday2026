"use client";

import { motion } from "framer-motion";
import { cn } from "./ui";

interface ProgressBarProps {
  totalChapters: number;
  currentChapter: number;
  totalQuestions: number;
  currentQuestion: number;
  className?: string;
}

export function ProgressBar({ 
  totalChapters, 
  currentChapter, 
  totalQuestions, 
  currentQuestion,
  className 
}: ProgressBarProps) {
  return (
    <div className={cn("w-full space-y-3 px-4", className)}>
      {/* Chapter Dots (Instagram Style) */}
      <div className="flex gap-1.5 w-full">
        {Array.from({ length: totalChapters }).map((_, i) => (
          <div 
            key={i} 
            className="h-1 flex-1 bg-charcoal/10 rounded-full overflow-hidden relative"
          >
            {i < currentChapter - 1 && (
              <div className="absolute inset-0 bg-primary" />
            )}
            {i === currentChapter - 1 && (
              <motion.div
                className="absolute inset-0 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Internal Chapter Progress */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
          Chapter {currentChapter}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ 
                scale: i === currentQuestion ? [1, 1.2, 1] : 1,
                backgroundColor: i < currentQuestion 
                  ? "var(--primary)" 
                  : i === currentQuestion 
                    ? "var(--secondary)" 
                    : "rgba(43, 45, 66, 0.1)"
              }}
              className="w-1.5 h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
