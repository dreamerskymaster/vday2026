"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui";
import { InteractionHub } from "./TaskInteractions";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface ChapterProps {
  chapter: any;
  onChapterComplete: (answers: { question: string, answer: any }[]) => void;
  onInteractionStep: (step: number) => void;
}

export function Chapter({ chapter, onChapterComplete, onInteractionStep }: ChapterProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ question: string, answer: any }[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleInteractionComplete = (answer: any) => {
    const currentInteraction = chapter.interactions[currentStep];
    const newAnswers = [...answers, { question: currentInteraction.question, answer }];
    setAnswers(newAnswers);

    if (currentStep < chapter.interactions.length - 1) {
      setCurrentStep(currentStep + 1);
      onInteractionStep(currentStep + 1);
    } else {
      // Chapter Fully Complete!
      setIsUnlocked(true);
      triggerCelebration();
      setTimeout(() => onChapterComplete(newAnswers), 2000);
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E63946', '#F4A261', '#FFB4A2']
    });
    if (navigator.vibrate) navigator.vibrate(100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="w-full max-w-2xl mx-auto space-y-8 relative"
    >
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none z-50 bg-white/20 backdrop-blur-[2px] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-32 h-32 fill-primary text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center gap-2"
        >
          <div className="h-px w-8 bg-primary/30" />
          <p className="text-primary font-bold tracking-widest uppercase text-xs">
            Memory {chapter.id}
          </p>
          <div className="h-px w-8 bg-primary/30" />
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-heading text-charcoal min-h-[1.2em]">
          {chapter.title.split('').map((char: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </div>

      <Card className="relative overflow-visible group">
        <div className="absolute -top-4 -right-4 bg-secondary p-3 rounded-2xl shadow-lg -rotate-12 group-hover:rotate-0 transition-transform duration-500">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            {chapter.message.split('. ').map((para: string, i: number) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.3) }}
                className="text-lg text-charcoal/90 leading-relaxed font-body italic border-l-4 border-accent pl-4"
              >
                "{para}{i === chapter.message.split('. ').length - 1 ? "" : "."}"
              </motion.p>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="pt-8 border-t border-accent/20"
          >
            <AnimatePresence mode="wait">
              <InteractionHub
                key={chapter.interactions[currentStep].id}
                interaction={chapter.interactions[currentStep]}
                onComplete={handleInteractionComplete}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </Card>

      {/* Decorative floating icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 opacity-20 pointer-events-none"
      >
        <Heart className="w-20 h-20 text-accent fill-accent" />
      </motion.div>
    </motion.div>
  );
}
