// components/templates/Confetti.tsx

"use client";

import { motion } from "framer-motion";

export default function Confetti() {
  const confettiItems = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "💝",
    "💓",
    "💞",
    "💘",
    "✨",
    "⭐",
    "🌟",
    "💫",
    "🎉",
    "🎊",
    "🌹",
    "🌺",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-2xl"
          initial={{
            top: "50%",
            left: "50%",
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: [0, 1.5, 1, 0],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut",
          }}
        >
          {confettiItems[i % confettiItems.length]}
        </motion.div>
      ))}
    </div>
  );
}
