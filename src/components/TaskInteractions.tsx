"use client";

import { useState } from "react";
import { Button, Input, cn } from "./ui";
import { motion, AnimatePresence } from "framer-motion";
import { SliderInput } from "./ui/SliderInput";
import { RatingInput } from "./ui/RatingInput";
import { RankingInput } from "./ui/RankingInput";
import { ConditionalChoice } from "./ui/ConditionalChoice";

interface TaskProps {
  interaction: any;
  onComplete: (answer: any) => void;
}

export function TextInputTask({ onComplete, minLength = 0, maxLength = 200 }: { onComplete: (answer: string) => void, minLength?: number, maxLength?: number }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim().length < minLength) return;
    onComplete(value);
  };

  const isValid = value.trim().length >= minLength;

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "flex w-full rounded-xl border-2 border-accent bg-white/50 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-primary transition-all min-h-[100px] resize-none",
            !isValid && value.length > 0 && "border-primary/50"
          )}
          placeholder="Type your answer here..."
          maxLength={maxLength}
        />
        <div className="absolute bottom-2 right-2 text-xs text-charcoal/40 font-mono">
          {value.length}/{maxLength}
        </div>
      </motion.div>
      
      {!isValid && value.length > 0 && (
        <p className="text-xs text-primary font-medium">Please write a bit more 💛</p>
      )}

      <Button 
        onClick={handleSubmit} 
        className="w-full py-6 text-lg"
        disabled={!isValid}
      >
        Next 🔓
      </Button>
    </div>
  );
}

export function MultipleChoiceTask({ options, onComplete }: { options: string[], onComplete: (answer: string) => void }) {
  return (
    <div className="grid gap-3">
      {options.map((option, i) => (
        <motion.button
          key={option}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onComplete(option)}
          className="w-full text-left p-4 rounded-xl border-2 border-accent bg-white/50 text-charcoal transition-all font-medium hover:border-primary group flex items-center justify-between"
        >
          <span>{option}</span>
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="text-primary"
          >
            ❤️
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}

export function InteractionHub({ interaction, onComplete }: TaskProps) {
  const [sliderValue, setSliderValue] = useState(50);
  const [rankedItems, setRankedItems] = useState(interaction.options || []);

  return (
    <motion.div
      key={interaction.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-heading text-charcoal leading-snug">
        {interaction.question}
      </h3>

      <div className="mt-4">
        {interaction.type === "text" && (
          <TextInputTask 
            onComplete={onComplete} 
            minLength={interaction.minLength}
            maxLength={interaction.maxLength}
          />
        )}
        {interaction.type === "multiple-choice" && (
          <MultipleChoiceTask 
            options={interaction.options} 
            onComplete={onComplete} 
          />
        )}
        {interaction.type === "slider" && (
          <div className="space-y-6">
            <SliderInput 
              leftLabel={interaction.leftLabel} 
              rightLabel={interaction.rightLabel}
              onChange={(val) => setSliderValue(val)}
            />
            <Button onClick={() => onComplete(`${sliderValue}% (${interaction.leftLabel} to ${interaction.rightLabel})`)} className="w-full py-6 text-lg">
              Confirm 💛
            </Button>
          </div>
        )}
        {interaction.type === "rating" && (
          <RatingInput 
            max={interaction.maxLength} 
            onChange={(val) => onComplete(`${val} hearts`)} 
          />
        )}
        {interaction.type === "ranking" && (
          <div className="space-y-6">
            <RankingInput 
              items={interaction.options || []} 
              onChange={(items) => setRankedItems(items)} 
            />
             <Button onClick={() => onComplete(`Ranked: ${rankedItems.join(' > ')}`)} className="w-full py-6 text-lg">
              Unlock Chapter 🔓
            </Button>
          </div>
        )}
        {interaction.type === "conditional" && (
          <ConditionalChoice 
            question={interaction.question}
            options={interaction.options || []}
            followUps={interaction.followUps || {}}
            onChange={(data) => onComplete(`${data.choice}: ${data.followUp}`)}
          />
        )}
      </div>
    </motion.div>
  );
}

