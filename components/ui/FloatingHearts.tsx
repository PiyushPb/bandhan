/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HEARTS = ["💕", "💖", "💗", "💝"];

type Heart = {
  left: string;
  x: number[];
  duration: number;
  emoji: string;
};

function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
      duration: 8 + Math.random() * 4,
      emoji: HEARTS[i % HEARTS.length],
    }));

    setHearts(generated);
  }, []);

  if (!hearts.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl"
          initial={{
            bottom: "-10%",
            left: heart.left,
            opacity: 0.7,
          }}
          animate={{
            bottom: "110%",
            opacity: [0.7, 1, 0],
            x: heart.x,
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingHearts;
