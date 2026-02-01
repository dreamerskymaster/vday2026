"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "./index";

interface RatingInputProps {
  max?: number;
  onChange: (value: number) => void;
  icon?: "heart" | "star"; // though user specified heart labels
}

const LABELS = ["Barely", "Sometimes", "Often", "A lot", "Unbearable"];

export function RatingInput({ max = 5, onChange }: RatingInputProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSelect = (val: number) => {
    setRating(val);
    onChange(val);
  };

  return (
    <div className="space-y-6 flex flex-col items-center py-4">
      <div className="flex gap-2">
        {Array.from({ length: max }).map((_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelect(i + 1)}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Heart
              className={cn(
                "w-10 h-10 transition-colors",
                (hover || rating) > i 
                  ? "fill-primary text-primary" 
                  : "text-accent fill-transparent"
              )}
            />
          </motion.button>
        ))}
      </div>
      
      <div className="h-6">
        <motion.p 
          key={hover || rating}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-heading font-medium"
        >
          {LABELS[(hover || rating) - 1] || "Select a heart"}
        </motion.p>
      </div>
    </div>
  );
}
