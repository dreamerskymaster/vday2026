"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./index";
import { TextInputTask } from "../TaskInteractions";

interface ConditionalChoiceProps {
  question: string;
  options: string[];
  followUps: Record<string, string>;
  onChange: (data: { choice: string; followUp: string }) => void;
}

export function ConditionalChoice({ options, followUps, onChange }: ConditionalChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [followUpAnswer, setFollowUpAnswer] = useState("");

  const handleSelect = (option: string) => {
    setSelected(option);
    // Don't call onChange yet, wait for follow-up
  };

  const handleFollowUpComplete = (answer: string) => {
    setFollowUpAnswer(answer);
    if (selected) {
      onChange({ choice: selected, followUp: answer });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(option)}
            className={cn(
              "p-4 rounded-xl border-2 font-heading transition-all",
              selected === option
                ? "bg-primary border-primary text-white shadow-lg"
                : "bg-white/50 border-accent text-charcoal"
            )}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <p className="text-lg font-heading text-charcoal">
              {followUps[selected]}
            </p>
            <TextInputTask 
              onComplete={handleFollowUpComplete} 
              minLength={5} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
