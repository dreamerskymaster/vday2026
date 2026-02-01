"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Card } from "./ui";
import { wrongGuesses, GATE_ANSWER, GATE_HINT } from "@/data/wrongGuesses";
import { Lock, Heart } from "lucide-react";

interface GateProps {
  onSuccess: () => void;
}

export function Gate({ onSuccess }: GateProps) {
  const [step, setStep] = useState<"landing" | "question" | "success">("landing");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleUnlock = () => {
    if (answer.toLowerCase().trim() === GATE_ANSWER.toLowerCase()) {
      setStep("success");
      setTimeout(onSuccess, 2000);
    } else {
      const randomError = wrongGuesses[Math.floor(Math.random() * wrongGuesses.length)];
      setError(attempts >= 4 ? GATE_HINT : randomError);
      setAttempts(attempts + 1);
      setAnswer("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 romantic-gradient">
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-5xl font-handwritten text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hey you 👀
              </motion.h1>
              <div className="space-y-2">
                <p className="text-xl font-heading text-charcoal">Before we begin...</p>
                <p className="text-lg text-charcoal/70">Take out your phone and make this Instagram-worthy for your feed</p>
              </div>
            </div>
            <Button onClick={() => setStep("question")} className="text-lg px-10 py-6">
              I'm ready, let's go
            </Button>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md"
          >
            <Card className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-accent/20 p-4 rounded-full">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-heading text-charcoal">The Gate</h2>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  "What's the name of someone who's always happy to see you,
                  has four legs, and judges your life choices?"
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type here..."
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  autoFocus
                />
                
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-center text-primary font-medium text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <Button 
                  onClick={handleUnlock} 
                  className="w-full text-lg py-6"
                  disabled={!answer.trim()}
                >
                  Unlock 🔓
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-24 h-24 text-primary mx-auto fill-primary" />
            </motion.div>
            <div className="space-y-2">
              <p className="text-3xl font-handwritten text-primary">There she is. 💛</p>
              <p className="text-2xl font-heading text-charcoal">Welcome to our story, Deeksha.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
