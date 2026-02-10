// components/ui/Confetti.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ConfettiTheme = "hearts" | "party" | "stars" | "romance" | "celebration";
type ConfettiIntensity = "light" | "medium" | "heavy" | "burst";

interface ConfettiProps {
  theme?: ConfettiTheme;
  intensity?: ConfettiIntensity;
  trigger?: boolean;
  continuous?: boolean;
  className?: string;
}

const CONFETTI_THEMES: Record<ConfettiTheme, string[]> = {
  hearts: ["❤️", "💕", "💖", "💗", "💝"],
  party: ["🎉", "🎊", "🎈", "🎁", "🎀"],
  stars: ["✨", "⭐", "🌟", "💫"],
  romance: ["🌹", "🌸", "🌷", "💐"],
  celebration: ["❤️", "💕", "✨", "🌹", "💖"],
};

const INTENSITY_CONFIG: Record<ConfettiIntensity, { count: number; duration: number; delay: number }> = {
  light: { count: 6, duration: 5, delay: 0.3 },
  medium: { count: 10, duration: 4.5, delay: 0.2 },
  heavy: { count: 18, duration: 3.5, delay: 0.1 },
  burst: { count: 30, duration: 3, delay: 0.05 },
};

interface ConfettiPiece {
  id: number;
  emoji: string;
  startX: number;
  endX: number;
  endY: number;
  rotation: number;
  size: number;
  delay: number;
}

export default function Confetti({
  theme = "celebration",
  intensity = "medium",
  trigger = true,
  continuous = true,
  className = "",
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [key, setKey] = useState(0);

  const confettiItems = CONFETTI_THEMES[theme];
  const config = INTENSITY_CONFIG[intensity];

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: config.count }, (_, i) => ({
        id: i,
        emoji: confettiItems[i % confettiItems.length],
        startX: 50 + (Math.random() - 0.5) * 20,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
        rotation: Math.random() * 360 - 180,
        size: Math.random() * 1 + 0.6,
        delay: i * config.delay,
      }));
      setPieces(newPieces);
      setKey((prev) => prev + 1);
    }
  }, [trigger, config.count, config.delay, confettiItems]);

  if (!trigger || pieces.length === 0) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {pieces.map((piece) => (
        <motion.div
          key={`${key}-${piece.id}`}
          className="absolute"
          style={{
            fontSize: `${piece.size}rem`,
            left: `${piece.startX}%`,
            top: "50%",
          }}
          initial={{
            scale: 0,
            opacity: 0,
            rotate: 0,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: [0, 1.2, 1, 0.6, 0],
            opacity: [0, 0.8, 0.7, 0.4, 0],
            rotate: [0, piece.rotation],
            x: [`-50%`, `${(piece.endX - piece.startX) * 2}%`],
            y: [`-50%`, `${piece.endY - 50}%`],
          }}
          transition={{
            duration: config.duration,
            delay: piece.delay,
            repeat: continuous ? Infinity : 0,
            repeatDelay: continuous ? 3 : 0,
            ease: "easeOut",
          }}
        >
          {piece.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// Burst variant - triggers once with dramatic effect
export function ConfettiBurst({
  theme = "celebration",
  onComplete,
}: {
  theme?: ConfettiTheme;
  onComplete?: () => void;
}) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!active) return null;

  return (
    <Confetti
      theme={theme}
      intensity="burst"
      trigger={true}
      continuous={false}
    />
  );
}

// Flying hearts that float upward — reduced count and subtler
export function FlyingHearts({
  count = 8,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const hearts = ["❤️", "💕", "💖"];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-10%",
          }}
          animate={{
            y: [0, "-110vh"],
            x: [0, (Math.random() - 0.5) * 60],
            rotate: [0, Math.random() * 180],
            opacity: [0, 0.6, 0.5, 0],
            scale: [0.4, 0.8, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {hearts[i % hearts.length]}
        </motion.div>
      ))}
    </div>
  );
}
