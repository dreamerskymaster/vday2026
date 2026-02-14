"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { chapters } from "@/data/chapters";

interface MemoryGalleryProps {
  responses: Record<number, { answers: { question: string, answer: any }[] }>;
}

export const MemoryGallery = forwardRef<HTMLDivElement, MemoryGalleryProps>(
  ({ responses }, ref) => {
    const answeredChapters = Object.keys(responses)
      .map(Number)
      .sort((a, b) => a - b);

    const photos = [
      "/images/strip1.jpg",
      "/images/strip2.jpg",
      "/images/strip3.jpg",
      "/images/strip4.jpg",
      "/images/strip5.jpg",
      "/images/strip6.jpg",
    ];

    if (answeredChapters.length === 0) return null;

    return (
      <div ref={ref} id="memory-gallery" className="w-full space-y-12 py-12 bg-white rounded-[2rem] p-8 shadow-sm">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 bg-primary/10 rounded-full"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl font-handwritten text-primary">Your Memory Wall</h2>
          <p className="text-charcoal/60">A collection of every moment we just shared.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {answeredChapters.map((chapterId, index) => {
            const chapter = chapters.find(c => c.id === chapterId);
            const data = responses[chapterId];

            if (!chapter) return null;

            return (
              <motion.div
                key={chapterId}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                className="bg-white p-6 pb-12 shadow-xl border border-accent/20 relative"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <div className="space-y-6">
                  <div className="border-b border-accent/10 pb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Chapter {chapterId}</span>
                    <h3 className="text-xl text-charcoal">{chapter.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {data.answers.map((item, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-sm font-medium text-charcoal/40 italic">"{item.question}"</p>
                        <p className="text-lg text-primary font-handwritten">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 right-6">
                  <Heart className="w-6 h-6 text-primary/20 fill-primary/10" />
                </div>

                {/* Polaroid bottom margin */}
                <div className="w-full h-8" />
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-6 px-4">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-handwritten text-primary">Photo Strip</h3>
            <p className="text-charcoal/60 text-sm">Our snapshots, saved with your answers.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg border border-accent/20"
              >
                <Image
                  src={src}
                  alt={`Memory photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Heart className="w-12 h-12 text-primary/30 fill-primary/5" />
          </motion.div>
        </div>

        {/* Signature for the memory strip */}
        <div className="text-center pt-4 border-t border-accent/10 mt-8">
          <p className="font-handwritten text-primary text-xl">With love, Ajith</p>
          <p className="text-[10px] text-charcoal/20 uppercase tracking-[0.2em] mt-1">Valentine's Day 2026 • Memory Strip</p>
        </div>
      </div>
    );
  }
);

MemoryGallery.displayName = "MemoryGallery";
