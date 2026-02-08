import React from "react";
import { motion } from "framer-motion";
import TimelineItem from "../components/TimelineItem";
import { Camera, Gift, Heart } from "lucide-react";
import Confetti from "@/components/ui/Confetti";
import { TemplateData } from "@/types/template";
import TicTacToeLove from "@/components/games/TicTacToeLove";

interface Props {
  data: TemplateData;
}

function TimeLine({ data }: Props) {
  return (
    <>
      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-pink-200 via-rose-300 to-red-200 -translate-x-1/2 hidden md:block z-0" />

        {/* Our Story Section */}
        <TimelineItem side="left" index={0} delay={0.2}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our Story
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {data.story}
            </p>
          </div>
        </TimelineItem>

        {/* Reasons Section */}
        <div className="my-16 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 "
          >
            Why I Love You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Let me count the ways...
          </motion.p>
        </div>

        {data.reasons.map((reason, idx) => (
          <TimelineItem
            key={`reason-${idx}`}
            side={idx % 2 === 0 ? "right" : "left"}
            index={idx + 1}
            delay={0.1}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                  className="text-3xl md:text-4xl shrink-0"
                >
                  {["❤️", "💕", "💖", "💝", "💗", "💓", "💞"][idx % 7]}
                </motion.div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed text-lg font-medium">
                    {reason}
                  </p>
                </div>
              </div>
            </motion.div>
          </TimelineItem>
        ))}

        {/* Photos Section */}
        {data.photos && data.photos.length > 0 && (
          <>
            <div className="my-16 text-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
              >
                Our Memories
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 text-gray-600"
              >
                <Camera className="w-5 h-5" />
                <p className="text-lg">Moments we&apos;ll treasure forever</p>
              </motion.div>
            </div>

            {data.photos.map((photo, idx) => (
              <TimelineItem
                key={`photo-${idx}`}
                side={idx % 2 === 0 ? "left" : "right"}
                index={data.reasons.length + idx + 1}
                delay={0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                    <motion.img
                      src={photo.url}
                      alt={photo.caption || `Memory ${idx + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                  {photo.caption && (
                    <div className="p-6">
                      <p className="text-gray-700 text-center italic text-lg">
                        &quot;{photo.caption}&quot;
                      </p>
                    </div>
                  )}
                </motion.div>
              </TimelineItem>
            ))}
          </>
        )}

        {/* Media Section */}
        {data.secretLetter && (
          <TimelineItem
            side="center"
            index={data.reasons.length + data.photos.length + 1}
            delay={0.2}
          >
            <TicTacToeLove letter={data.secretLetter} />
          </TimelineItem>
        )}

        {/* Final Message */}
        <TimelineItem
          side="center"
          index={data.reasons.length + data.photos.length + 2}
          delay={0.3}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-linear-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl shadow-2xl p-8 md:p-12 text-white overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern
                  id="hearts"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <text x="10" y="30" fontSize="30">
                    💕
                  </text>
                </pattern>
                <rect width="100%" height="100%" fill="url(#hearts)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-center mb-6"
              >
                <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto fill-white" />
              </motion.div>

              <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center whitespace-pre-line mb-8">
                {data.finalMessage}
              </p>

              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold">
                  Forever yours,
                </p>
                <p className="text-2xl md:text-3xl font-bold mt-2">
                  {data.basicInfo.fromName} 💕
                </p>
              </div>
            </div>

            {/* Confetti animation */}
            <Confetti />
          </motion.div>
        </TimelineItem>

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </>
  );
}

export default TimeLine;
