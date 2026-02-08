// components/templates/TimelineItem.tsx

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TimelineItemProps {
  children: ReactNode;
  side: "left" | "right" | "center";
  index: number;
  delay?: number;
}

export default function TimelineItem({
  children,
  side,
  index,
  delay = 0,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === "left" ? -50 : side === "right" ? 50 : 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      }}
      className="relative mb-12 md:mb-16"
    >
      {/* Timeline dot (desktop only) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3 }}
        className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 z-10"
      >
        <div className="relative">
          {/* Outer pulse */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="absolute inset-0 bg-pink-400 rounded-full"
          />

          {/* Inner dot */}
          <div className="relative w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-4 border-white shadow-lg" />
        </div>
      </motion.div>

      {/* Content */}
      <div
        className={`
          relative
          ${side === "left" ? "md:pr-[52%]" : ""}
          ${side === "right" ? "md:pl-[52%]" : ""}
          ${side === "center" ? "md:px-[10%]" : ""}
        `}
      >
        {/* Mobile timeline indicator */}
        <div className="md:hidden flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-pink-300 to-transparent" />
        </div>

        {children}
      </div>
    </motion.div>
  );
}
