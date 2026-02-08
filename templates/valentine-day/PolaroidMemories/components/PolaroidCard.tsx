// components/templates/PolaroidCard.tsx

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TemplateData } from "@/types/template";

interface PolaroidCardProps {
  type: "photo" | "reason";
  photo?: TemplateData["photos"][0];
  reason?: string;
  index: number;
  delay?: number;
}

const REASON_GRADIENTS = [
  "from-pink-100 to-rose-100",
  "from-purple-100 to-pink-100",
  "from-rose-100 to-orange-100",
  "from-yellow-100 to-pink-100",
  "from-blue-100 to-purple-100",
];

const REASON_EMOJIS = ["💕", "💖", "💗", "💝", "💓", "💞", "💘", "❤️"];

export default function PolaroidCard({
  type,
  photo,
  reason,
  index,
  delay = 0,
}: PolaroidCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Random rotation for organic feel
  const baseRotation = index % 3 === 0 ? -3 : index % 3 === 1 ? 2 : -1.5;
  const hoverRotation = 0;

  if (type === "photo" && photo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: baseRotation }}
        whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        className="break-inside-avoid mb-6"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: hoverRotation,
            zIndex: 20,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative cursor-pointer group"
        >
          {/* Polaroid card */}
          <div className="bg-white p-4 pb-16 shadow-2xl relative">
            {/* Tape effect - randomized position */}
            <div
              className={`absolute w-20 h-6 bg-yellow-200/60 shadow-sm ${
                index % 4 === 0
                  ? "-top-3 left-1/4 -rotate-12"
                  : index % 4 === 1
                    ? "-top-3 right-1/4 rotate-12"
                    : index % 4 === 2
                      ? "top-2 left-1/2 -translate-x-1/2 -rotate-6"
                      : "-top-3 left-1/3 rotate-6"
              }`}
            />

            {/* Photo */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 shadow-inner">
              <motion.img
                src={photo.url}
                alt={photo.caption || "Memory"}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Vintage overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-transparent to-pink-200/20 mix-blend-overlay" />

              {/* Corner fold effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-white/50 transform origin-top-right rotate-45 translate-x-4 -translate-y-4 shadow-lg" />
            </div>

            {/* Caption */}
            <div className="mt-4 min-h-[60px] flex items-center justify-center">
              {photo.caption ? (
                <p className="text-center font-handwriting text-gray-700 text-lg px-2 leading-relaxed">
                  {photo.caption}
                </p>
              ) : (
                <p className="text-center font-handwriting text-gray-400 text-base italic">
                  A precious memory
                </p>
              )}
            </div>

            {/* Decorative corner */}
            <motion.div
              animate={{
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="absolute -bottom-2 -right-2 text-3xl opacity-60"
            >
              {REASON_EMOJIS[index % REASON_EMOJIS.length]}
            </motion.div>

            {/* Shadow layers for depth */}
            <div className="absolute inset-0 shadow-xl pointer-events-none" />
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-rose-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm -z-10 blur-xl" />
        </motion.div>
      </motion.div>
    );
  }

  if (type === "reason" && reason) {
    const gradientClass = REASON_GRADIENTS[index % REASON_GRADIENTS.length];
    const emoji = REASON_EMOJIS[index % REASON_EMOJIS.length];

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: baseRotation }}
        whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        className="break-inside-avoid mb-6"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: hoverRotation,
            zIndex: 20,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative cursor-pointer group"
        >
          {/* Reason card */}
          <div className="bg-white p-4 shadow-2xl relative min-h-[280px] flex flex-col">
            {/* Tape effect */}
            <div
              className={`absolute w-16 h-6 bg-yellow-200/60 shadow-sm ${
                index % 3 === 0
                  ? "-top-3 left-8 -rotate-6"
                  : index % 3 === 1
                    ? "-top-3 right-8 rotate-12"
                    : "top-2 left-1/2 -translate-x-1/2 rotate-3"
              }`}
            />

            {/* Gradient background */}
            <div
              className={`flex-1 bg-gradient-to-br ${gradientClass} rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner`}
            >
              {/* Decorative pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f472b6' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Emoji */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="text-5xl mb-4 relative z-10"
              >
                {emoji}
              </motion.div>

              {/* Text */}
              <p className="text-xl font-handwriting text-gray-800 text-center leading-relaxed relative z-10">
                "{reason}"
              </p>

              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-12 h-12 border-2 border-pink-300 rounded-full opacity-30" />
              <div className="absolute bottom-2 left-2 w-16 h-16 border-2 border-rose-300 rounded-full opacity-20" />
            </div>

            {/* Decorative corner sticker */}
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: index * 0.4,
              }}
              className="absolute -top-3 -right-3 text-4xl"
            >
              ✨
            </motion.div>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm -z-10 blur-xl" />
        </motion.div>
      </motion.div>
    );
  }

  return null;
}
