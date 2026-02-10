// components/ui/Confetti.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ConfettiTheme = "hearts" | "party" | "stars" | "romance" | "celebration";
type ConfettiIntensity = "light" | "medium" | "heavy" | "burst";

interface ConfettiProps {
  theme?: ConfettiTheme;
  intensity?: ConfettiIntensity;
  trigger?: boolean; // When true, triggers a burst
  continuous?: boolean; // Keep animating or one-shot
  className?: string;
}

const CONFETTI_THEMES: Record<ConfettiTheme, string[]> = {
  hearts: ["❤️", "💕", "💖", "💗", "💝", "💓", "💞", "💘"],
  party: ["🎉", "🎊", "🎈", "🎁", "🥳", "🎀", "🎇", "🎆"],
  stars: ["✨", "⭐", "🌟", "💫", "⭐", "✨", "🌟", "💫"],
  romance: ["🌹", "💐", "🌸", "🌺", "🌷", "💮", "🏵️", "💝"],
  celebration: ["❤️", "💕", "🎉", "🎊", "✨", "🌟", "🌹", "💖"],
};

const INTENSITY_CONFIG: Record<ConfettiIntensity, { count: number; duration: number; delay: number }> = {
  light: { count: 15, duration: 4, delay: 0.15 },
  medium: { count: 30, duration: 3, delay: 0.1 },
  heavy: { count: 50, duration: 2.5, delay: 0.05 },
  burst: { count: 80, duration: 2, delay: 0.02 },
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
        startX: 50 + (Math.random() - 0.5) * 20, // Start near center
        endX: Math.random() * 100, // End anywhere
        endY: Math.random() * 100,
        rotation: Math.random() * 720 - 360,
        size: Math.random() * 1.5 + 0.8,
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
            scale: [0, 1.5, 1.2, 0.8, 0],
            opacity: [0, 1, 1, 0.8, 0],
            rotate: [0, piece.rotation],
            x: [`-50%`, `${(piece.endX - piece.startX) * 2}%`],
            y: [`-50%`, `${piece.endY - 50}%`],
          }}
          transition={{
            duration: config.duration,
            delay: piece.delay,
            repeat: continuous ? Infinity : 0,
            repeatDelay: continuous ? 2 : 0,
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

// Flying hearts that float upward
export function FlyingHearts({
  count = 20,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const hearts = ["❤️", "💕", "💖", "💗", "💝"];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-10%",
          }}
          animate={{
            y: [0, "-120vh"],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, Math.random() * 360],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: i * 0.2,
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
