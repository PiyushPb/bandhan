// components/templates/FloatingStickers.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);
  const [stickerPositions, setStickerPositions] = useState<{top: string, left: string, xOffset: number, duration: number, delay: number}[]>([]);

  useEffect(() => {
    setMounted(true);
    setStickerPositions(STICKERS.map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      xOffset: Math.random() * 20 - 10,
      duration: 10 + Math.random() * 10,
      delay: i * 0.5
    })));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {STICKERS.map((sticker, i) => {
        const pos = stickerPositions[i];
        if (!pos) return null;

        return (
          <motion.div
            key={i}
            className={`absolute ${sticker.size} opacity-20`}
            style={{
              top: pos.top,
              left: pos.left,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, pos.xOffset, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut",
            }}
          >
            {sticker.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
