"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Card } from "./ui";
import { wrongGuesses, GATE_ANSWER, GATE_HINT } from "@/data/wrongGuesses";
import { Lock, Heart } from "lucide-react";

interface GateProps {
  onSuccess: () => void;
}

const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 15 }), []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: "-10%",
            x: `${Math.random() * 100}%`,
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-primary/20"
        >
          <Heart fill="currentColor" size={Math.random() * 30 + 10} />
        </motion.div>
      ))}
    </div>
  );
};

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
    <div className="relative flex min-h-screen items-center justify-center p-6 romantic-gradient overflow-hidden">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8 z-10"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl"
              >
                <Heart className="w-10 h-10 text-primary fill-primary" />
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-6xl font-handwritten text-primary drop-shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hey Deeksha 👀
              </motion.h1>
              <div className="space-y-2 max-w-sm mx-auto">
                <p className="text-xl font-heading text-charcoal/90">Before we begin...</p>
                <p className="text-lg text-charcoal/70 leading-relaxed italic">Take out your phone and make this Instagram-worthy for your feed</p>
              </div>
            </div>
            <Button 
              onClick={() => setStep("question")} 
              className="text-lg px-12 py-7 shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              I'm ready, let's go
            </Button>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md z-10"
          >
            <Card className="space-y-6 shadow-2xl border-white/40 bg-white/70 backdrop-blur-xl">
              <div className="flex justify-center">
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  className="bg-accent/20 p-4 rounded-full"
                >
                  <Lock className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <div className="text-center space-y-4 px-2">
                <h2 className="text-2xl font-heading text-charcoal">The Gate</h2>
                <p className="text-lg text-charcoal/80 leading-relaxed font-handwritten text-2xl">
                  "What's the name of someone who's always happy to see you,
                  has four legs, and judges your life choices?"
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="The answer is..."
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  autoFocus
                  className="text-center py-6 text-lg"
                />
                
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-center text-primary font-medium text-sm px-4"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <Button 
                  onClick={handleUnlock} 
                  className="w-full text-lg py-7 shadow-md"
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
            className="text-center space-y-6 z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-24 h-24 text-primary mx-auto fill-primary drop-shadow-xl" />
            </motion.div>
            <div className="space-y-3">
              <p className="text-4xl font-handwritten text-primary">There she is. 💛</p>
              <p className="text-2xl font-heading text-charcoal">Welcome to our story, Deeksha.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
