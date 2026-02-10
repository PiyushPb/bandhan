// components/templates/PolaroidCard.tsx

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TemplateData } from "@/types/template";
import { Heart, Star, Sparkles } from "lucide-react";

interface PolaroidCardProps {
  type: "photo" | "reason";
  photo?: TemplateData["photos"][0];
  reason?: string;
  index: number;
  delay?: number;
  onPhotoClick?: () => void;
}

const REASON_GRADIENTS = [
  "from-pink-100 via-pink-50 to-rose-100",
  "from-purple-100 via-lavender-50 to-pink-100",
  "from-rose-100 via-orange-50 to-amber-100",
  "from-yellow-100 via-amber-50 to-pink-100",
  "from-blue-100 via-indigo-50 to-purple-100",
  "from-teal-100 via-cyan-50 to-blue-100",
];

const REASON_EMOJIS = ["💕", "💖", "💗", "💝", "💓", "💞", "💘", "❤️", "🥰", "😍"];

// Different tape colors for variety
const TAPE_COLORS = [
  "bg-yellow-200/70",
  "bg-pink-200/70",
  "bg-blue-200/70",
  "bg-green-200/70",
  "bg-purple-200/70",
  "bg-rose-200/70",
];

// Decorative stamps
const STAMPS = ["🌸", "⭐", "🦋", "🌹", "💫", "🎀", "🌻", "🍀"];

// Corner decorations
const CORNER_DECORATIONS = [
  { type: "heart", color: "text-pink-400" },
  { type: "star", color: "text-yellow-400" },
  { type: "sparkle", color: "text-purple-400" },
];

function PaperClip({ position, color }: { position: "left" | "right" | "top"; color: string }) {
  const positionClasses = {
    left: "absolute -left-3 top-8 rotate-12",
    right: "absolute -right-3 top-8 -rotate-12",
    top: "absolute left-1/2 -translate-x-1/2 -top-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className={positionClasses[position]}
    >
      <svg width="24" height="40" viewBox="0 0 24 40" className={color}>
        <path
          d="M12 0C6 0 4 4 4 8V32C4 36 8 40 12 40C16 40 20 36 20 32V12C20 8 16 4 12 4C8 4 6 6 6 10V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  );
}

function WashiTape({ 
  position, 
  color, 
  pattern = "plain" 
}: { 
  position: string; 
  color: string;
  pattern?: "plain" | "dots" | "stripes";
}) {
  const patternStyle = pattern === "dots" 
    ? { backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)`, backgroundSize: "6px 6px" }
    : pattern === "stripes"
    ? { backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)` }
    : {};

  return (
    <div
      className={`absolute ${color} shadow-sm ${position}`}
      style={patternStyle}
    />
  );
}

function StampDecoration({ stamp, position, delay }: { stamp: string; position: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.2, opacity: 1 }}
      className={`absolute ${position} text-2xl pointer-events-none`}
    >
      {stamp}
    </motion.div>
  );
}

export default function PolaroidCard({
  type,
  photo,
  reason,
  index,
  delay = 0,
  onPhotoClick,
}: PolaroidCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Random rotation for organic feel
  const rotations = [-4, 2, -2, 3, -1, 1.5, -3, 2.5];
  const baseRotation = rotations[index % rotations.length];

  // Random tape color
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];
  const tapePattern = index % 3 === 0 ? "dots" : index % 3 === 1 ? "stripes" : "plain";

  // Random stamp
  const stamp = STAMPS[index % STAMPS.length];
  const showStamp = index % 2 === 0;
  const showClip = index % 3 === 0;

  if (type === "photo" && photo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: baseRotation }}
        whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        className="break-inside-avoid mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{
            scale: 1.06,
            rotate: 0,
            zIndex: 20,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative cursor-pointer group"
          onClick={onPhotoClick}
        >
          {/* Paper clip decoration */}
          {showClip && (
            <PaperClip 
              position={index % 2 === 0 ? "left" : "right"} 
              color="text-gray-400" 
            />
          )}

          {/* Polaroid card */}
          <div className="bg-white p-4 pb-16 shadow-2xl relative">
            {/* Washi tape with patterns */}
            <WashiTape
              position={
                index % 4 === 0
                  ? "w-24 h-7 -top-3 left-1/4 -rotate-12"
                  : index % 4 === 1
                    ? "w-20 h-6 -top-3 right-1/4 rotate-12"
                    : index % 4 === 2
                      ? "w-28 h-6 top-2 left-1/2 -translate-x-1/2 -rotate-3"
                      : "w-20 h-7 -top-3 left-1/3 rotate-6"
              }
              color={tapeColor}
              pattern={tapePattern}
            />

            {/* Stamp decoration */}
            {showStamp && (
              <StampDecoration
                stamp={stamp}
                position={index % 2 === 0 ? "-top-4 -right-2" : "-top-4 -left-2"}
                delay={delay + 0.3}
              />
            )}

            {/* Photo */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 shadow-inner">
              <motion.img
                src={photo.url}
                alt={photo.caption || "Memory"}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Vintage overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/15 via-transparent to-pink-200/15 mix-blend-overlay" />

              {/* Film grain effect */}
              <div 
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Corner fold effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-white/70 to-white/30 transform origin-top-right rotate-45 translate-x-4 -translate-y-4 shadow-lg" />

              {/* Click to view indicator on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isHovered ? 1 : 0.8 }}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </motion.div>
              </motion.div>
            </div>

            {/* Caption with handwritten style */}
            <div className="mt-4 min-h-[60px] flex items-center justify-center relative">
              {/* Handwritten underline */}
              <svg
                className="absolute bottom-0 left-4 right-4 h-2 text-pink-200"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0 4 Q50 0, 100 4 T200 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.5, duration: 1 }}
                />
              </svg>
              
              {photo.caption ? (
                <p className="text-center font-handwriting text-gray-700 text-lg px-2 leading-relaxed transform -rotate-1">
                  {photo.caption}
                </p>
              ) : (
                <p className="text-center font-handwriting text-gray-400 text-base italic">
                  A precious memory ✨
                </p>
              )}
            </div>

            {/* Decorative corner emoji */}
            <motion.div
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="absolute -bottom-3 -right-3 text-3xl opacity-70"
            >
              {REASON_EMOJIS[index % REASON_EMOJIS.length]}
            </motion.div>

            {/* Date badge (decorative) */}
            <div className="absolute bottom-16 right-4 px-2 py-1 bg-pink-50 rounded text-xs font-handwriting text-pink-600 transform rotate-3 shadow-sm">
              ♥ Memory #{index + 1}
            </div>
          </div>

          {/* Hover glow */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-rose-200/60 transition-opacity duration-300 rounded-sm -z-10 blur-2xl" 
          />
        </motion.div>
      </motion.div>
    );
  }

  if (type === "reason" && reason) {
    const gradientClass = REASON_GRADIENTS[index % REASON_GRADIENTS.length];
    const emoji = REASON_EMOJIS[index % REASON_EMOJIS.length];
    const cornerDeco = CORNER_DECORATIONS[index % CORNER_DECORATIONS.length];

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: baseRotation }}
        whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        className="break-inside-avoid mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{
            scale: 1.06,
            rotate: 0,
            zIndex: 20,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative cursor-pointer group"
        >
          {/* Paper clip for some cards */}
          {showClip && (
            <PaperClip 
              position="top" 
              color="text-rose-400" 
            />
          )}

          {/* Reason card - sticky note style */}
          <div className="bg-white p-4 shadow-2xl relative min-h-[280px] flex flex-col">
            {/* Washi tape */}
            <WashiTape
              position={
                index % 3 === 0
                  ? "w-20 h-6 -top-3 left-8 -rotate-6"
                  : index % 3 === 1
                    ? "w-18 h-6 -top-3 right-8 rotate-12"
                    : "w-24 h-6 top-2 left-1/2 -translate-x-1/2 rotate-3"
              }
              color={tapeColor}
              pattern={tapePattern}
            />

            {/* Corner decoration icon */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute top-6 right-6 ${cornerDeco.color}`}
            >
              {cornerDeco.type === "heart" && <Heart className="w-5 h-5 fill-current" />}
              {cornerDeco.type === "star" && <Star className="w-5 h-5 fill-current" />}
              {cornerDeco.type === "sparkle" && <Sparkles className="w-5 h-5" />}
            </motion.div>

            {/* Gradient background with pattern */}
            <div
              className={`flex-1 bg-gradient-to-br ${gradientClass} rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner`}
            >
              {/* Decorative pattern */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f472b6' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Reason number badge */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-pink-500">#{index + 1}</span>
              </div>

              {/* Animated emoji */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="text-5xl mb-5 relative z-10"
              >
                {emoji}
              </motion.div>

              {/* Reason text with quotes */}
              <p className="text-xl font-handwriting text-gray-800 text-center leading-relaxed relative z-10">
                <span className="text-pink-400 text-3xl">"</span>
                {reason}
                <span className="text-pink-400 text-3xl">"</span>
              </p>

              {/* Decorative circles */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-2 right-2 w-16 h-16 border-2 border-pink-300 rounded-full"
              />
              <div className="absolute bottom-2 left-2 w-20 h-20 border-2 border-rose-300 rounded-full opacity-20" />
            </div>

            {/* Sparkle sticker */}
            <motion.div
              animate={{
                rotate: [0, -8, 8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: index * 0.4,
              }}
              className="absolute -top-4 -right-4 text-4xl"
            >
              ✨
            </motion.div>

            {/* Heart sticker on some cards */}
            {index % 3 === 1 && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-3 -left-3 text-3xl"
              >
                💕
              </motion.div>
            )}
          </div>

          {/* Hover glow */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-purple-200/60 transition-opacity duration-300 rounded-sm -z-10 blur-2xl" 
          />
        </motion.div>
      </motion.div>
    );
  }

  return null;
}
