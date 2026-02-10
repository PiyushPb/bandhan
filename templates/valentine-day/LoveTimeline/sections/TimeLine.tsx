import React, { useState } from "react";
import { motion } from "framer-motion";
import TimelineItem from "../components/TimelineItem";
import { Camera, Heart, Sparkles, Stars, Quote } from "lucide-react";
import Confetti, { FlyingHearts } from "@/components/ui/Confetti";
import LightboxGallery, { useLightbox } from "@/components/ui/LightboxGallery";
import { TemplateData } from "@/types/template";
import TicTacToeLove from "@/components/games/TicTacToeLove";

interface Props {
  data: TemplateData;
}

function TimeLine({ data }: Props) {
  const lightbox = useLightbox();
  const [showFinalHearts, setShowFinalHearts] = useState(false);

  return (
    <>
      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        {/* Vertical timeline line with gradient */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block z-0 overflow-hidden rounded-full">
          <div className="w-full h-full bg-gradient-to-b from-pink-200 via-rose-300 to-pink-200 -translate-x-1/2" />
          {/* Animated glow overlay */}
          <motion.div
            className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-pink-400/50 to-transparent"
            style={{ x: "-50%" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Our Story Section */}
        <TimelineItem side="left" index={0} delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100 hover:shadow-2xl hover:border-pink-200 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-14 h-14 bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200"
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Our Story
                </h2>
                <p className="text-sm text-pink-500 font-medium">The beginning of us</p>
              </div>
            </div>
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-pink-200 opacity-60" />
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line pl-6">
                {data.story}
              </p>
            </div>
          </motion.div>
        </TimelineItem>

        {/* Reasons Section Header */}
        <div className="my-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center"
            >
              <Stars className="w-8 h-8 text-pink-500" />
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
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
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Reasons with enhanced cards */}
        {data.reasons.map((reason, idx) => (
          <TimelineItem
            key={`reason-${idx}`}
            side={idx % 2 === 0 ? "right" : "left"}
            index={idx + 1}
            delay={0.1}
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-2xl p-6 border-2 border-pink-100 shadow-lg hover:shadow-xl hover:border-pink-200 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100/50 to-transparent rounded-bl-full" />
              
              <div className="flex items-start gap-4 relative">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                  className="text-3xl md:text-4xl shrink-0"
                >
                  {["❤️", "💕", "💖", "💝", "💗", "💓", "💞", "🥰", "😍", "💘"][idx % 10]}
                </motion.div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-pink-400 mb-1 block">
                    Reason #{idx + 1}
                  </span>
                  <p className="text-gray-800 leading-relaxed text-lg font-medium">
                    {reason}
                  </p>
                </div>
              </div>
            </motion.div>
          </TimelineItem>
        ))}

        {/* Photos Section Header */}
        {data.photos && data.photos.length > 0 && (
          <>
            <div className="my-16 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-4"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-purple-500" />
                </motion.div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
              >
                Our Memories
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Moments we&apos;ll treasure forever</span>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"
              />
            </div>

            {/* Photo cards with lightbox */}
            {data.photos.map((photo, idx) => (
              <TimelineItem
                key={`photo-${idx}`}
                side={idx % 2 === 0 ? "left" : "right"}
                index={data.reasons.length + idx + 1}
                delay={0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => lightbox.open(idx)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {/* Photo with Ken Burns effect */}
                    <motion.img
                      src={photo.url}
                      alt={photo.caption || `Memory ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <Camera className="w-6 h-6 text-gray-700" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Photo number badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow">
                      📷 {idx + 1} of {data.photos.length}
                    </div>
                  </div>
                  {photo.caption && (
                    <div className="p-6 bg-gradient-to-r from-pink-50/50 to-white">
                      <p className="text-gray-700 text-center italic text-lg">
                        &quot;{photo.caption}&quot;
                      </p>
                    </div>
                  )}
                </motion.div>
              </TimelineItem>
            ))}

            {/* Photo Lightbox */}
            <LightboxGallery
              photos={data.photos}
              isOpen={lightbox.isOpen}
              initialIndex={lightbox.initialIndex}
              onClose={lightbox.close}
            />
          </>
        )}

        {/* Secret Letter / Game Section */}
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
            onViewportEnter={() => setShowFinalHearts(true)}
            className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl shadow-2xl p-8 md:p-12 text-white overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern
                  id="hearts-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <text x="10" y="30" fontSize="24">
                    💕
                  </text>
                </pattern>
                <rect width="100%" height="100%" fill="url(#hearts-pattern)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-center mb-8"
              >
                <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto fill-white drop-shadow-lg" />
              </motion.div>

              <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center whitespace-pre-line mb-8">
                {data.finalMessage}
              </p>

              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold opacity-90">
                  Forever yours,
                </p>
                <motion.p
                  className="text-2xl md:text-3xl font-bold mt-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {data.basicInfo.fromName} 💕
                </motion.p>
              </div>
            </div>

            {/* Confetti with hearts theme */}
            <Confetti theme="hearts" intensity="light" />
            
            {/* Flying hearts on viewport enter */}
            {showFinalHearts && <FlyingHearts count={5} />}
          </motion.div>
        </TimelineItem>

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </>
  );
}

export default TimeLine;
