/* eslint-disable react-hooks/purity */
// components/templates/PolaroidMemories.tsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TemplateData } from "@/types/template";
import { useRef, useState } from "react";
import PolaroidCard from "./components/PolaroidCard";
import ScrapbookElement from "./components/ScrapbookElement";
import FloatingStickers from "./components/FloatingStickers";
import { Heart, Music, Video, Sparkles } from "lucide-react";

interface PolaroidMemoriesProps {
  data: TemplateData;
}

export default function PolaroidMemories({ data }: PolaroidMemoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Combine photos and reasons into items for masonry grid
  const masonryItems = [
    // Story card first
    { type: "story" as const, content: data.story },
    // Then mix photos and reasons
    ...data.photos.map((p, i) => ({
      type: "photo" as const,
      content: p,
      index: i,
    })),
    ...data.reasons.map((r, i) => ({
      type: "reason" as const,
      content: r,
      index: i,
    })),
  ];

  // Shuffle for organic feel (keeping story first)
  const story = masonryItems[0];
  const shuffled = masonryItems.slice(1).sort(() => Math.random() - 0.5);
  const finalItems = [story, ...shuffled];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden"
    >
      {/* Textured background overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative elements */}
      <FloatingStickers />

      {/* Hero Section */}
      <motion.section
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Handwritten title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 relative"
        >
          {/* Paper texture background */}
          <div className="absolute inset-0 -m-8 bg-white/60 backdrop-blur-sm rounded-3xl transform rotate-1 shadow-xl" />
          <div className="absolute inset-0 -m-8 bg-white/40 backdrop-blur-sm rounded-3xl transform -rotate-2 shadow-lg" />

          <div className="relative z-10 p-8">
            {/* Decorative hearts */}
            <motion.div
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6 text-5xl"
            >
              💕
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-6 -right-6 text-5xl"
            >
              💖
            </motion.div>

            {/* Names in handwriting font */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-handwriting text-gray-800 mb-4 leading-tight">
              {data.basicInfo.toName}
              <span className="text-pink-500 mx-4">❤️</span>
              {data.basicInfo.fromName}
            </h1>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-gray-600 relative"
            >
              <span className="inline-block transform -rotate-1">
                {data.basicInfo.greeting}
              </span>

              {/* Underline decoration */}
              <svg
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 7C50 3 100 3 150 7C170 9 190 10 198 8"
                  stroke="#f472b6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </svg>
            </motion.p>
          </div>

          {/* Wax seal decoration */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="absolute -bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-lg flex items-center justify-center border-4 border-white"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm font-handwriting text-gray-600">
              Scroll to see our memories
            </p>
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

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {finalItems.map((item, idx) => {
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
              return (
                <PolaroidCard
                  key={`photo-${item.index}`}
                  type="photo"
                  photo={photo}
                  index={idx}
                  delay={idx * 0.1}
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
                  delay={idx * 0.1}
                />
              );
            }

            return null;
          })}

          {/* Media card if exists */}
          {/* {data.media && (
            <MediaCard media={data.media} delay={finalItems.length * 0.1} />
          )} */}
        </div>
      </section>

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
          <div className="absolute inset-0 bg-white rounded-3xl transform rotate-2 shadow-2xl" />
          <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-1 shadow-xl" />

          {/* Main card */}
          <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 md:p-12 lg:p-16 border-4 border-white shadow-2xl">
            {/* Decorative tape strips */}
            <div className="absolute -top-3 left-1/4 w-24 h-6 bg-yellow-200/60 transform -rotate-12 shadow-sm" />
            <div className="absolute -top-3 right-1/4 w-24 h-6 bg-yellow-200/60 transform rotate-12 shadow-sm" />
            <div className="absolute -bottom-3 left-1/3 w-32 h-6 bg-yellow-200/60 transform rotate-6 shadow-sm" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              {/* Decorative flourish */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
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
              <p className="text-2xl md:text-3xl lg:text-4xl font-handwriting text-gray-800 leading-relaxed whitespace-pre-line mb-8">
                {data.finalMessage}
              </p>

              {/* Signature */}
              <div className="inline-block">
                <p className="text-xl md:text-2xl font-handwriting text-gray-600 mb-2">
                  Forever yours,
                </p>
                <p className="text-3xl md:text-4xl font-handwriting text-pink-600 transform -rotate-2">
                  {data.basicInfo.fromName} 💕
                </p>

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
            <div className="absolute top-4 left-4 text-3xl opacity-40">🌸</div>
            <div className="absolute top-4 right-4 text-3xl opacity-40">🌸</div>
            <div className="absolute bottom-4 left-4 text-3xl opacity-40">
              🌺
            </div>
            <div className="absolute bottom-4 right-4 text-3xl opacity-40">
              🌺
            </div>
          </div>

          {/* Scattered hearts around */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: i % 2 === 0 ? "-10%" : "auto",
                right: i % 2 === 1 ? "-10%" : "auto",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {["💕", "💖", "💗"][i % 3]}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
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
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200/70 transform -rotate-12 shadow-sm" />

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h3 className="text-2xl font-handwriting text-gray-800">
              Our Story
            </h3>
          </div>

          <p className="text-gray-700 leading-relaxed font-handwriting text-lg whitespace-pre-line">
            {story}
          </p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
}

// Media Card Component
// function MediaCard({
//   media,
//   delay,
// }: {
//   media: NonNullable<TemplateData["media"]>;
//   delay: number;
// }) {
//   const getYouTubeId = (url: string) => {
//     const match = url.match(
//       /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
//     );
//     return match ? match[1] : "";
//   };

//   const getSpotifyId = (url: string) => {
//     const match = url.match(/track\/([a-zA-Z0-9]+)/);
//     return match ? match[1] : "";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30, rotate: 2 }}
//       whileInView={{ opacity: 1, y: 0, rotate: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ delay, duration: 0.6 }}
//       className="break-inside-avoid mb-6"
//     >
//       <motion.div
//         whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
//         transition={{ type: "spring", stiffness: 300 }}
//         className="relative bg-white p-4 md:p-6 rounded-2xl shadow-xl transform -rotate-1"
//       >
//         {/* Tape decoration */}
//         <div className="absolute -top-3 right-8 w-16 h-6 bg-yellow-200/70 transform rotate-12 shadow-sm" />

//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
//             {media.type === "youtube" ? (
//               <Video className="w-5 h-5 text-white" />
//             ) : (
//               <Music className="w-5 h-5 text-white" />
//             )}
//           </div>
//           <h3 className="text-xl font-handwriting text-gray-800">
//             {media.type === "youtube" ? "A Special Video" : "Our Song"}
//           </h3>
//         </div>

//         <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-inner">
//           {media.type === "youtube" ? (
//             <iframe
//               src={`https://www.youtube.com/embed/${getYouTubeId(media.url)}`}
//               className="w-full h-full"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           ) : (
//             <iframe
//               src={`https://open.spotify.com/embed/track/${getSpotifyId(media.url)}`}
//               className="w-full h-full"
//               allow="encrypted-media"
//             />
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// Helper function to get YouTube ID
function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}

// Helper function to get Spotify ID
function getSpotifyId(url: string): string {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
}
