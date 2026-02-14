"use client";

import { useState, useEffect } from "react";
import { ProgressSchema, type Progress, type ResponseData } from "@/lib/schemas";

const STORAGE_KEY = "lucky_valentines_app";

const defaultState: Progress = {
  gatePassed: false,
  wrongAttempts: 0,
  currentChapter: 1,
  unlockedChapters: [1],
  responses: {},
  completedAt: null,
  dateConfirmed: false
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultState);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const result = ProgressSchema.safeParse(parsed);
        
        if (result.success) {
          setProgress(result.data);
        } else {
          console.error("Progress validation failed", result.error);
          // Fallback to default if data is corrupted
          localStorage.removeItem(STORAGE_KEY);
          setProgress(defaultState);
        }
      } catch (e) {
        console.error("Failed to parse progress", e);
        setProgress(defaultState);
      }
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, loading]);

  const passGate = () => {
    setProgress((prev) => ({ ...prev, gatePassed: true }));
  };

  const incrementWrongAttempts = () => {
    setProgress((prev) => ({ ...prev, wrongAttempts: prev.wrongAttempts + 1 }));
  };

  const unlockChapter = (chapterId: number) => {
    setProgress((prev) => {
      if (prev.unlockedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        unlockedChapters: [...prev.unlockedChapters, chapterId],
      };
    });
  };

  const setChapter = (chapterId: number) => {
    setProgress((prev) => ({ ...prev, currentChapter: chapterId }));
  };

  const syncToGitHub = async (updatedProgress: Progress) => {
    try {
      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProgress),
      });
    } catch (e) {
      console.error("Failed to sync to GitHub", e);
    }
  };

  const saveChapterResponse = (chapterId: number, answers: { question: string, answer: any }[]) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        responses: {
          ...prev.responses,
          [chapterId]: {
            answers,
            timestamp: new Date().toISOString()
          }
        }
      };
      syncToGitHub(next);
      return next;
    });
  };

  const completeApp = () => {
    setProgress((prev) => {
      const next = { 
        ...prev, 
        completedAt: new Date().toISOString(),
        dateConfirmed: true 
      };
      syncToGitHub(next);
      return next;
    });
  };

  const exportAnswers = () => {
    const text = Object.entries(progress.responses)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([chapter, data]) => {
        return `Chapter ${chapter}:\n${data.answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n')}`;
      })
      .join('\n\n---\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deeksha_answers.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    progress,
    loading,
    passGate,
    incrementWrongAttempts,
    unlockChapter,
    setChapter,
    saveChapterResponse,
    completeApp,
    exportAnswers,
    isUnlocked: (id: number) => progress.unlockedChapters.includes(id),
  };
}
