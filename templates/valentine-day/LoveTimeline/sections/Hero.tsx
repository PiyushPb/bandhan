import React, { useEffect, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { Heart } from "lucide-react";
import { TemplateData } from "@/types/template";

interface Props {
  data: TemplateData;
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
}

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 80, delay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayText, isComplete };
}

function Hero({ data, heroOpacity, heroScale }: Props) {
  const { displayText: nameText, isComplete: nameComplete } = useTypewriter(
    data.basicInfo.toName,
    100,
    500
  );
  const { displayText: greetingText, isComplete: greetingComplete } = useTypewriter(
    data.basicInfo.greeting,
    60,
    nameComplete ? 0 : data.basicInfo.toName.length * 100 + 800
  );

  return (
    <motion.section
      initial={{ opacity: 1, scale: 1 }}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="min-h-screen flex items-center justify-center px-6 sticky top-0 relative overflow-hidden"
    >
      {/* Soft gradient blobs — simplified to 2 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-300/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [60, 0, 60] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-rose-300/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl relative"
      >
        {/* Single elegant animated heart */}
        <div className="relative mb-10 inline-block">
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Heart className="w-20 h-20 md:w-28 md:h-28 mx-auto text-pink-500 fill-pink-500 drop-shadow-lg" />
          </motion.div>
          {/* Soft glow behind */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center -z-10"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-pink-400/20 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* To Name with Typewriter Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-gray-800 mb-6 min-h-[1.2em]"
        >
          To {nameText}
          {!nameComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-[0.9em] bg-pink-500 ml-1 align-middle"
            />
          )}
        </motion.h1>

        {/* Greeting with Typewriter Effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: nameComplete ? 1 : 0.3, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-light mb-4 min-h-[1.5em]"
        >
          {greetingText}
          {nameComplete && !greetingComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-[0.9em] bg-gray-400 ml-1 align-middle"
            />
          )}
        </motion.p>

        {/* From Name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: greetingComplete ? 1 : 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-500 italic"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: greetingComplete ? 1 : 0, x: greetingComplete ? 0 : -20 }}
            transition={{ duration: 0.6 }}
          >
            From{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: greetingComplete ? 1 : 0, 
              scale: greetingComplete ? 1 : 0.8 
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-semibold text-pink-600"
          >
            {data.basicInfo.fromName}
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="inline-block ml-2"
          >
            💕
          </motion.span>
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: greetingComplete ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-12 rounded-full border-2 border-pink-300 flex justify-center pt-2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-3 bg-pink-400 rounded-full"
                />
              </motion.div>
              <p className="text-sm text-gray-500 mt-2">
                Scroll to explore our story
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
