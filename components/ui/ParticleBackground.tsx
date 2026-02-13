"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo, memo } from "react";

type ParticleShape = "heart" | "circle" | "star" | "sparkle";
type ColorTheme = "romantic" | "pink" | "gold" | "pastel";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: ParticleShape;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  shapes?: ParticleShape[];
  colorTheme?: ColorTheme;
  className?: string;
  blur?: boolean;
}

const COLOR_THEMES: Record<ColorTheme, string[]> = {
  romantic: ["#ff6b9d", "#c44569", "#ff8a8a", "#ffc4d6", "#e84a5f"],
  pink: ["#ff69b4", "#ff1493", "#db7093", "#ffb6c1", "#ffc0cb"],
  gold: ["#ffd700", "#ffb347", "#ff8c00", "#ffa500", "#ffcc33"],
  pastel: ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"],
};

function getShapeSVG(shape: ParticleShape, color: string): React.ReactNode {
  switch (shape) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "circle":
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      );
    default:
      return <></>;
  }
}

function ParticleBackground({
  particleCount = 30,
  shapes = ["heart", "circle", "sparkle"],
  colorTheme = "romantic",
  className = "",
  blur = true,
}: ParticleBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    if (!mounted) return [];
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 8,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, [mounted, particleCount, shapes]);

  const colors = COLOR_THEMES[colorTheme];

  if (!mounted) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => {
        // Generate color deterministically based on particle ID to allow memoization validity
        // checking against 'colors' array length.
        const color = colors[particle.id % colors.length];

        return (
          <motion.div
            key={particle.id}
            className={`absolute ${blur ? "blur-[1px]" : ""}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -30, 0, 20, 0],
              x: [0, 15, -15, 10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {getShapeSVG(particle.shape, color)}
          </motion.div>
        );
      })}
    </div>
  );
}

export default memo(ParticleBackground);
