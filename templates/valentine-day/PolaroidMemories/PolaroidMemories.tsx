/* eslint-disable react-hooks/purity */
// components/templates/PolaroidMemories.tsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TemplateData } from "@/types/template";
import { useRef, useMemo } from "react";
import PolaroidCard from "./components/PolaroidCard";
import ScrapbookElement from "./components/ScrapbookElement";
import FloatingStickers from "./components/FloatingStickers";
import ScratchReveal from "./components/ScratchReveal";
import ParticleBackground from "@/components/ui/ParticleBackground";
import LightboxGallery, { useLightbox } from "@/components/ui/LightboxGallery";
import Confetti, { FlyingHearts } from "@/components/ui/Confetti";
import { Heart, Sparkles, Camera, Star } from "lucide-react";

interface PolaroidMemoriesProps {
  data: TemplateData;
}

export default function PolaroidMemories({ data }: PolaroidMemoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lightbox = useLightbox();

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Combine photos and reasons into items for masonry grid with stable order
  type MasonryItem = 
    | { type: "story"; content: string }
    | { type: "photo"; content: TemplateData["photos"][0]; index: number }
    | { type: "reason"; content: string; index: number };

  const masonryItems = useMemo<MasonryItem[]>(() => {
    // Story card first
    const items: MasonryItem[] = [
      { type: "story", content: data.story },
    ];
    
    // Interleave photos and reasons for visual variety
    const maxLength = Math.max(data.photos.length, data.reasons.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < data.photos.length) {
        items.push({
          type: "photo",
          content: data.photos[i],
          index: i,
        });
      }
      if (i < data.reasons.length) {
        items.push({
          type: "reason",
          content: data.reasons[i],
          index: i,
        });
      }
    }
    
    return items;
  }, [data.photos, data.reasons, data.story]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground
        particleCount={25}
        shapes={["heart", "sparkle"]}
        colorTheme="pastel"
        blur={true}
      />

      {/* Textured background overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative elements */}
      <FloatingStickers />

      {/* Hero Section */}
      <motion.section
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Handwritten title with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 relative"
        >
          {/* Paper texture background with shadow */}
          <motion.div 
            animate={{ rotate: [1, 2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 -m-10 bg-white/70 backdrop-blur-sm rounded-3xl transform rotate-1 shadow-2xl" 
          />
          <motion.div 
            animate={{ rotate: [-2, -1, -2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 -m-10 bg-white/50 backdrop-blur-sm rounded-3xl transform -rotate-2 shadow-xl" 
          />

          <div className="relative z-10 p-10">
            {/* Decorative hearts with glow */}
            <motion.div
              animate={{
                rotate: [0, 15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -left-8 text-5xl drop-shadow-lg"
            >
              💕
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-8 -right-8 text-5xl drop-shadow-lg"
            >
              💖
            </motion.div>

            {/* Names with handwriting font */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
              <motion.span 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-handwriting text-gray-800"
              >
                {data.basicInfo.toName}
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-pink-500 text-4xl sm:text-5xl"
              >
                ❤️
              </motion.span>
              <motion.span 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-handwriting text-gray-800"
              >
                {data.basicInfo.fromName}
              </motion.span>
            </div>

            {/* Greeting with animated underline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-gray-600 relative inline-block"
            >
              <span className="inline-block transform -rotate-1">
                {data.basicInfo.greeting}
              </span>

              {/* Animated underline */}
              <svg
                className="absolute -bottom-2 left-0 right-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 7C50 3 100 3 150 7C170 9 190 10 198 8"
                  stroke="#f472b6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.2 }}
                />
              </svg>
            </motion.p>
          </div>

          {/* Wax seal decoration */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
            className="absolute -bottom-10 right-4 sm:right-12 w-20 h-20 bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 rounded-full shadow-xl flex items-center justify-center border-4 border-white"
          >
            <Heart className="w-10 h-10 text-white fill-white" />
          </motion.div>

          {/* Star decorations */}
          <motion.div
            animate={{ rotate: 360, scale: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-6 -left-4"
          >
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-gray-500" />
              <p className="text-sm font-handwriting text-gray-600">
                Scroll to see our memories
              </p>
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <svg
              className="w-6 h-6 text-pink-400"
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
        </motion.div>
      </motion.section>

      {/* Masonry Grid Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section decorations */}
        <ScrapbookElement type="star" position="top-left" />
        <ScrapbookElement type="heart" position="top-right" />

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-8 h-8 text-pink-500" />
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-handwriting text-gray-800 mb-2">
            Our Beautiful Memories
          </h2>
          <p className="text-gray-600 font-handwriting text-lg">
            ✨ Every moment with you is precious ✨
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-0">
          {masonryItems.map((item, idx) => {
            if (item.type === "story") {
              return (
                <StoryCard
                  key="story"
                  story={item.content as string}
                  delay={idx * 0.1}
                />
              );
            }

            if (item.type === "photo") {
              const photo = item.content as TemplateData["photos"][0];
              const photoIndex = item.index as number;
              return (
                <PolaroidCard
                  key={`photo-${photoIndex}`}
                  type="photo"
                  photo={photo}
                  index={idx}
                  delay={idx * 0.08}
                  onPhotoClick={() => lightbox.open(photoIndex)}
                />
              );
            }

            if (item.type === "reason") {
              return (
                <PolaroidCard
                  key={`reason-${item.index}`}
                  type="reason"
                  reason={item.content as string}
                  index={idx}
                  delay={idx * 0.08}
                />
              );
            }

            return null;
          })}
        </div>

        {/* Photo Lightbox */}
        <LightboxGallery
          photos={data.photos}
          isOpen={lightbox.isOpen}
          initialIndex={lightbox.initialIndex}
          onClose={lightbox.close}
        />
      </section>

      {/* Secret Letter Section */}
      {data.secretLetter && data.secretLetter.body && (
        <section className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-handwriting text-gray-800">
              🎁 A Special Surprise 🎁
            </h2>
          </motion.div>
          <ScratchReveal 
            letter={data.secretLetter} 
            toName={data.basicInfo.toName}
            fromName={data.basicInfo.fromName}
          />
        </section>
      )}

      {/* Final Message Section */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Layered paper effect */}
          <motion.div 
            animate={{ rotate: [2, 3, 2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-white rounded-3xl transform rotate-2 shadow-2xl" 
          />
          <motion.div 
            animate={{ rotate: [-1, -2, -1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 bg-white rounded-3xl transform -rotate-1 shadow-xl" 
          />

          {/* Main card */}
          <div className="relative bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-3xl p-8 md:p-12 lg:p-16 border-4 border-white shadow-2xl overflow-hidden">
            {/* Decorative tape strips */}
            <div className="absolute -top-3 left-1/4 w-28 h-7 bg-yellow-200/70 transform -rotate-12 shadow-sm" />
            <div className="absolute -top-3 right-1/4 w-24 h-6 bg-pink-200/70 transform rotate-12 shadow-sm" />
            <div className="absolute -bottom-3 left-1/3 w-32 h-6 bg-blue-200/60 transform rotate-6 shadow-sm" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center relative"
            >
              {/* Decorative flourish */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-8"
              >
                <Sparkles className="w-16 h-16 md:w-20 md:h-20 mx-auto text-pink-400" />
              </motion.div>

              {/* Message */}
              <p className="text-2xl md:text-3xl lg:text-4xl font-handwriting text-gray-800 leading-relaxed whitespace-pre-line mb-10">
                {data.finalMessage}
              </p>

              {/* Signature */}
              <div className="inline-block">
                <p className="text-xl md:text-2xl font-handwriting text-gray-600 mb-2">
                  Forever yours,
                </p>
                <motion.p 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl md:text-4xl font-handwriting text-pink-600 transform -rotate-3"
                >
                  {data.basicInfo.fromName} 💕
                </motion.p>

                {/* Signature underline */}
                <svg
                  className="w-full mt-2"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <motion.path
                    d="M5 4C60 2 140 2 195 4"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-6 left-6 text-3xl opacity-50">🌸</div>
            <div className="absolute top-6 right-6 text-3xl opacity-50">🌸</div>
            <div className="absolute bottom-6 left-6 text-3xl opacity-50">🌺</div>
            <div className="absolute bottom-6 right-6 text-3xl opacity-50">🌺</div>

            {/* Confetti */}
            <Confetti theme="romance" intensity="light" />
          </div>

          {/* Scattered hearts around */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl pointer-events-none"
              style={{
                top: `${15 + (i * 12)}%`,
                left: i % 2 === 0 ? "-8%" : "auto",
                right: i % 2 === 1 ? "-8%" : "auto",
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 360],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              {["💕", "💖", "💗", "✨"][i % 4]}
            </motion.div>
          ))}
        </motion.div>

        {/* Flying hearts */}
        <FlyingHearts count={12} />
      </section>

      {/* Bottom spacing */}
      <div className="h-24" />
    </div>
  );
}

// Story Card Component
function StoryCard({ story, delay }: { story: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6 }}
      className="break-inside-avoid mb-6"
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          rotate: 0,
          zIndex: 10,
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl transform rotate-1 cursor-pointer group"
      >
        {/* Decorative tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-yellow-200/70 transform -rotate-12 shadow-sm" />

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-handwriting text-gray-800">
                Our Story
              </h3>
              <p className="text-sm text-pink-500 font-handwriting">How it all began...</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed font-handwriting text-lg whitespace-pre-line">
            {story}
          </p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
}
