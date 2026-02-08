/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HEARTS = ["❤️", "💖", "💗", "💘", "💕"];
const HEART_COUNT = 25;

type HeartConfig = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  heart: string;
};

function createHearts(): HeartConfig[] {
  return Array.from({ length: HEART_COUNT }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 16 + Math.random() * 20,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 8,
    rotate: Math.random() * 360,
    heart: HEARTS[Math.floor(Math.random() * HEARTS.length)],
  }));
}

function HeartDroppingBG() {
  const [hearts, setHearts] = useState<HeartConfig[]>([]);

  useEffect(() => {
    setHearts(createHearts());
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Full parent background */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-50 via-rose-50 to-red-50" />

      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ y: "-10vh", x: "-50%", opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: h.rotate,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
          }}
          className="absolute top-0 select-none will-change-transform"
        >
          {h.heart}
        </motion.span>
      ))}
    </div>
  );
}

export default HeartDroppingBG;
