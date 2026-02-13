"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Home, ArrowLeft } from "lucide-react";
import HeartDroppingBG from "@/components/bg/HeartDroppingBG";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Valentine-themed Background */}
      <HeartDroppingBG />

      <div className="relative z-10 px-6 py-12 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Icon */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500/10" />
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-4xl font-bold text-rose-600 font-cal">?</span>
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold font-cal bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 font-cal">
            This bond seems to be missing...
          </h2>
          
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Even in the journey of love, sometimes we take a wrong turn. 
            The page you are looking for has wandered off.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 bg-rose-600 text-white rounded-full font-semibold shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Handwriting Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 font-handwriting text-2xl text-rose-400 rotate-[-5deg] whitespace-nowrap"
        >
          lost in the details, found in the heart
        </motion.p>
      </div>

      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-rose-300 rounded-full animate-bounce" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-pink-300 rounded-full animate-pulse " style={{ animationDelay: '1s' }} />
        <div className="absolute top-10 right-1/4 w-3 h-3 bg-rose-200 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}
