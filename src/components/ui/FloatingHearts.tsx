"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function FloatingHearts() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15,
      opacity: Math.random() * 0.2 + 0.1
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, x: `${heart.left}vw` }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, heart.opacity, heart.opacity, 0],
            x: [`${heart.left}vw`, `${heart.left + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart 
            className="text-primary fill-primary" 
            style={{ width: heart.size, height: heart.size }} 
          />
        </motion.div>
      ))}
    </div>
  );
}
