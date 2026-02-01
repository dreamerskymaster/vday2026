"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { Gate } from "@/components/Gate";
import { Chapter } from "@/components/Chapter";
import { ProgressBar } from "@/components/ProgressBar";
import { FinalScreen } from "@/components/FinalScreen";
import { chapters } from "@/data/chapters";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { progress, loading, passGate, unlockChapter, setChapter, saveChapterResponse } = useProgress();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  // Sync state on load
  useEffect(() => {
    if (!loading && progress.completedAt) {
      setShowFinal(true);
    }
  }, [loading, progress.completedAt]);

  const handleChapterComplete = (answers: { question: string, answer: any }[]) => {
    const currentChapterId = progress.currentChapter;
    saveChapterResponse(currentChapterId, answers);
    
    if (currentChapterId < chapters.length) {
      unlockChapter(currentChapterId + 1);
      setTimeout(() => {
        setChapter(currentChapterId + 1);
        setActiveQuestionIndex(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    } else {
      setTimeout(() => setShowFinal(true), 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center romantic-gradient">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-primary text-4xl"
        >
          💛
        </motion.div>
      </div>
    );
  }

  if (!progress.gatePassed) {
    return <Gate onSuccess={passGate} />;
  }

  if (showFinal) {
    return (
      <div className="romantic-gradient min-h-screen">
        <FinalScreen onFinish={() => window.location.reload()} />
      </div>
    );
  }

  const currentChapter = chapters.find(c => c.id === progress.currentChapter) || chapters[0];

  return (
    <div className="min-h-screen pb-20 romantic-gradient selection:bg-primary/20">
      <div className="sticky top-0 z-40 bg-white/40 backdrop-blur-md border-b border-white/20 py-6">
        <ProgressBar 
          totalChapters={chapters.length} 
          currentChapter={progress.currentChapter}
          totalQuestions={currentChapter.interactions.length}
          currentQuestion={activeQuestionIndex}
        />
      </div>

      <div className="px-6 pt-12">
        <AnimatePresence mode="wait">
          <Chapter
            key={currentChapter.id}
            chapter={currentChapter}
            onInteractionStep={(step) => setActiveQuestionIndex(step)}
            onChapterComplete={handleChapterComplete}
          />
        </AnimatePresence>

        {/* Navigation for unlocked chapters */}
        <div className="max-w-2xl mx-auto mt-16 flex justify-between items-center px-4">
          <button
            onClick={() => progress.currentChapter > 1 && setChapter(progress.currentChapter - 1)}
            disabled={progress.currentChapter === 1}
            className="flex items-center gap-2 text-charcoal/40 hover:text-primary transition-colors disabled:opacity-0 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translateX-1 transition-transform" />
            <span className="text-sm font-medium">Revisit Memory</span>
          </button>

          {progress.unlockedChapters.includes(progress.currentChapter + 1) && (
            <button
              onClick={() => setChapter(progress.currentChapter + 1)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold group"
            >
              <span className="text-sm">Next Chapter</span>
              <ChevronRight className="w-4 h-4 group-hover:translateX-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
