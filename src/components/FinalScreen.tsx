"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui";
import { Heart, Download } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { MemoryGallery } from "./MemoryGallery";
import { toPng } from "html-to-image";

interface FinalScreenProps {
  onFinish: () => void;
  responses: Record<number, { answers: { question: string, answer: any }[] }>;
}

export function FinalScreen({ onFinish, responses }: FinalScreenProps) {
  const [taps, setTaps] = useState(0);
  const [showExport, setShowExport] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { exportAnswers } = useProgress();
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleTap = () => {
    setTaps(prev => {
      const next = prev + 1;
      if (next >= 5) setShowExport(true);
      return next;
    });
  };

  const handleDownloadImage = useCallback(async () => {
    if (!galleryRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(galleryRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        style: {
          borderRadius: '0',
          transform: 'scale(1)',
        }
      });

      const link = document.createElement('a');
      link.download = `Memories-Valentines-2026.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <div className="min-h-screen py-20 px-6 overflow-y-auto bg-pink-50/30">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Memory Gallery Section */}
        <div className="space-y-6">
          <MemoryGallery ref={galleryRef} responses={responses} />

          <div className="flex justify-center">
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-md group disabled:opacity-50"
            >
              <Download className={isDownloading ? "animate-bounce" : "group-hover:translate-y-0.5 transition-transform"} size={20} />
              {isDownloading ? "Creating Memory..." : "Save Memory Strip"}
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-12 bg-white/30 backdrop-blur-xl p-12 rounded-[2rem] border border-white/20 relative z-10"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-full"
            />
            <Heart className="w-20 h-20 text-primary fill-primary" />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-handwritten text-primary">I'll be ready.</h1>
            <p className="text-2xl font-heading text-charcoal leading-relaxed max-w-lg mx-auto">
              Whatever you decide, I'm just happy you're here with me.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="space-y-8 pt-4 border-t border-accent/20"
          >
            <div className="space-y-3">
              <p className="text-xl text-charcoal/90">February 14th. If you're feeling well...</p>
              <p className="text-2xl font-bold text-primary tracking-wide italic">"Lets go Out today!"</p>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-heading text-charcoal">Happy Valentine's Day, Deeksha.</p>
              <p className="text-2xl font-handwritten text-secondary">Happy Almost-One-Year.</p>

              <button
                onClick={handleTap}
                className="text-xl font-medium pt-8 text-charcoal/30 hover:text-primary transition-colors cursor-default"
              >
                Ajith
              </button>
            </div>
          </motion.div>

          <AnimatePresence>
            {showExport && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={exportAnswers}
                className="mt-8 px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto"
              >
                Export Memories 💾
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
