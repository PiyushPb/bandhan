import React from "react";
import { motion, MotionValue } from "framer-motion";
import FloatingHearts from "@/components/ui/FloatingHearts";
import { Heart } from "lucide-react";
import { TemplateData } from "@/types/template";

interface Props {
  data: TemplateData;
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
}

function Hero({ data, heroOpacity, heroScale }: Props) {
  return (
    <motion.section
      initial={{ opacity: 1, scale: 1 }}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="min-h-screen flex items-center justify-center px-6 sticky top-0"
    >
      {/* background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-pink-400/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-rose-400/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <Heart className="w-20 h-20 md:w-28 md:h-28 mx-auto text-pink-500 fill-pink-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-gray-800 mb-6"
        >
          To {data.basicInfo.toName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-light mb-4"
        >
          {data.basicInfo.greeting}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-500 italic"
        >
          From {data.basicInfo.fromName}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <svg
              className="w-8 h-8 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
          <p className="text-sm text-gray-500 mt-2">
            Scroll to explore our story
          </p>
        </motion.div>
      </motion.div>

      <FloatingHearts />
    </motion.section>
  );
}

export default Hero;
