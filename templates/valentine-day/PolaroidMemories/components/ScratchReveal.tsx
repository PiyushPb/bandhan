"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Sparkles, Gift, Mail, Heart } from "lucide-react";

interface SecretLetter {
  title?: string;
  body?: string;
  signature?: string;
}

interface ScratchRevealProps {
  letter: SecretLetter;
  toName?: string;
  fromName?: string;
}

export default function ScratchReveal({ letter, toName, fromName }: ScratchRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scratching on mouse/touch move
  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    
    // Increment scratch progress
    setScratchProgress((prev) => {
      const newProgress = Math.min(prev + 0.8, 100);
      if (newProgress >= 70 && !isRevealed) {
        setIsRevealed(true);
      }
      return newProgress;
    });
  };

  // Alternative: Click to reveal with envelope animation
  const handleEnvelopeClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="break-inside-avoid mb-6"
    >
      <motion.div
        whileHover={{ scale: isRevealed ? 1 : 1.02 }}
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white text-center relative overflow-hidden">
          {/* Sparkle decorations */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-2 left-6 text-2xl opacity-70"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute top-4 right-8 text-xl opacity-60"
          >
            💫
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-2"
          >
            <Gift className="w-12 h-12 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-handwriting">
            {letter.title || "A Secret Just For You"}
          </h3>
        </div>

        {/* Content area */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              /* Unrevealed state - Envelope/Scratch card */
              <motion.div
                key="unrevealed"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 cursor-pointer"
                onClick={handleEnvelopeClick}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseLeave={() => setIsScratching(false)}
                onMouseMove={handleScratch}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={handleScratch}
              >
                {/* Envelope graphic */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative mb-6"
                >
                  {/* Envelope body */}
                  <div className="w-40 h-28 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg relative overflow-hidden">
                    {/* Envelope flap */}
                    <motion.div
                      className="absolute -top-12 left-0 right-0 h-16 bg-gradient-to-br from-amber-200 to-amber-300"
                      style={{
                        clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                      }}
                      animate={{ rotateX: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Heart seal */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </div>
                    </motion.div>

                    {/* Envelope pattern */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-300/50 to-transparent" />

                    {/* To: label */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-xs text-amber-700 font-handwriting">
                        To: {toName || "You"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Scratch progress indicator */}
                {scratchProgress > 0 && scratchProgress < 70 && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scratchProgress}%` }}
                      className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                    />
                  </div>
                )}

                {/* Instructions */}
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-gray-500 text-center font-handwriting text-lg"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Mail className="w-4 h-4" />
                    Tap to open or scratch to reveal
                    <Sparkles className="w-4 h-4" />
                  </span>
                </motion.p>
              </motion.div>
            ) : (
              /* Revealed state - Letter content */
              <motion.div
                key="revealed"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 relative"
              >
                {/* Sparkle burst on reveal */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: "50%",
                        y: "50%",
                        scale: 0,
                        opacity: 1,
                      }}
                      animate={{
                        x: `${50 + (Math.random() - 0.5) * 100}%`,
                        y: `${50 + (Math.random() - 0.5) * 100}%`,
                        scale: [0, 1.5, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className="absolute text-2xl"
                    >
                      {["✨", "💕", "⭐", "💖"][i % 4]}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Letter lines background */}
                <div 
                  className="absolute inset-8 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 30px, #f0f0f0 31px)",
                  }}
                />

                {/* Letter content */}
                <div className="relative space-y-6">
                  {/* Dear line */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-handwriting text-gray-700"
                  >
                    My Dearest {toName || "Love"},
                  </motion.p>

                  {/* Body */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg font-handwriting text-gray-800 leading-relaxed whitespace-pre-line"
                  >
                    {letter.body}
                  </motion.div>

                  {/* Signature */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-right pt-4"
                  >
                    <p className="text-lg font-handwriting text-gray-600">
                      With all my love,
                    </p>
                    <p className="text-2xl font-handwriting text-pink-600 transform -rotate-3">
                      {letter.signature || fromName || "Yours"} 💕
                    </p>
                    
                    {/* Signature underline */}
                    <svg className="w-32 h-3 ml-auto mt-1 text-pink-300" viewBox="0 0 100 10">
                      <motion.path
                        d="M5 5 Q25 0, 50 5 T95 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 text-2xl opacity-40">🌸</div>
                <div className="absolute top-4 right-4 text-2xl opacity-40">🌸</div>
                <div className="absolute bottom-4 left-4 text-2xl opacity-40">💮</div>
                <div className="absolute bottom-4 right-4 text-2xl opacity-40">💮</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
