// components/templates/ScrapbookElement.tsx

"use client";

import { motion } from "framer-motion";

interface ScrapbookElementProps {
  type: "star" | "heart" | "flower";
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function ScrapbookElement({
  type,
  position,
}: ScrapbookElementProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const elements = {
    star: (
      <svg
        className="w-32 h-32 text-yellow-300 opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    heart: (
      <svg
        className="w-32 h-32 text-pink-300 opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    flower: (
      <svg
        className="w-32 h-32 text-rose-300 opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 22a10 10 0 0 1-10-10C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
      </svg>
    ),
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} -m-16`}
      animate={{
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {elements[type]}
    </motion.div>
  );
}
    