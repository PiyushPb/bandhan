// components/templates/TimelineItem.tsx

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  
  // Interactive hover effects
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: side === "left" ? -60 : side === "right" ? 60 : 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative mb-12 md:mb-16 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Timeline dot (desktop only) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, type: "spring", stiffness: 300 }}
        className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 z-10"
      >
        <div className="relative">
          {/* Outer glow ring */}
          <motion.div
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.15,
            }}
            className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-sm"
          />
          
          {/* Second pulse ring */}
          <motion.div
            animate={{
              scale: [1, 2.2, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.15 + 0.5,
            }}
            className="absolute inset-0 bg-pink-300 rounded-full"
          />

          {/* Inner dot with gradient */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative w-5 h-5 bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 rounded-full border-4 border-white shadow-lg shadow-pink-200"
          />
          
          {/* Sparkle effect on dot */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="absolute -inset-2 pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-sm" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-pink-200 rounded-full" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-pink-200 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content with 3D tilt effect */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`
          relative
          ${side === "left" ? "md:pr-[52%]" : ""}
          ${side === "right" ? "md:pl-[52%]" : ""}
          ${side === "center" ? "md:px-[10%]" : ""}
        `}
      >
        {/* Mobile timeline indicator with glow */}
        <div className="md:hidden flex items-center gap-3 mb-4">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 4px rgba(236, 72, 153, 0.5)",
                "0 0 12px rgba(236, 72, 153, 0.8)",
                "0 0 4px rgba(236, 72, 153, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"
          />
          <div className="flex-1 h-px bg-gradient-to-r from-pink-300 via-pink-200 to-transparent" />
        </div>

        {/* Hover glow effect behind content */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 -z-10"
          style={{
            background: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          }}
          whileHover={{ opacity: 1 }}
        />

        {children}
      </motion.div>
    </motion.div>
  );
}
