// components/templates/FloatingStickers.tsx

"use client";

import { motion } from "framer-motion";

const STICKERS = [
  { emoji: "💕", size: "text-4xl" },
  { emoji: "💖", size: "text-5xl" },
  { emoji: "💗", size: "text-3xl" },
  { emoji: "💝", size: "text-4xl" },
  { emoji: "✨", size: "text-3xl" },
  { emoji: "⭐", size: "text-4xl" },
  { emoji: "🌸", size: "text-5xl" },
  { emoji: "🌺", size: "text-4xl" },
  { emoji: "🦋", size: "text-3xl" },
  { emoji: "🌈", size: "text-4xl" },
];

export default function FloatingStickers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {STICKERS.map((sticker, i) => (
        <motion.div
          key={i}
          className={`absolute ${sticker.size} opacity-20`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </div>
  );
}
