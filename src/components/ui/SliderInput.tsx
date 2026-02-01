"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SliderInputProps {
  leftLabel: string;
  rightLabel: string;
  onChange: (value: number) => void;
  defaultValue?: number;
}

export function SliderInput({ leftLabel, rightLabel, onChange, defaultValue = 50 }: SliderInputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setValue(val);
    onChange(val);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="relative h-2 w-full bg-accent/20 rounded-full">
        <motion.div 
          className="absolute h-full bg-primary rounded-full"
          style={{ width: `${value}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-10"
        />
        <motion.div
          className="absolute h-6 w-6 bg-white border-2 border-primary rounded-full shadow-lg pointer-events-none z-20"
          style={{ 
            left: `${value}%`, 
            top: '50%', 
            translateX: '-50%', 
            translateY: '-50%' 
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
      <div className="flex justify-between items-center text-sm font-medium text-charcoal/60 px-1">
        <span className="font-heading">{leftLabel}</span>
        <span className="font-heading">{rightLabel}</span>
      </div>
    </div>
  );
}
