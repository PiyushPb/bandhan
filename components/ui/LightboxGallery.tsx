"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Photo {
  url: string;
  caption?: string;
}

interface LightboxGalleryProps {
  photos: Photo[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function LightboxGallery({
  photos,
  initialIndex = 0,
  isOpen,
  onClose,
}: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, onClose]);

  const goToNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsZoomed(false);
    }
  }, [currentIndex, photos.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setIsZoomed(false);
    }
  }, [currentIndex]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const currentPhoto = photos[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 
              rounded-full text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Image counter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/10 
              rounded-full text-white text-sm font-medium"
          >
            {currentIndex + 1} / {photos.length}
          </motion.div>

          {/* Navigation buttons */}
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 
                rounded-full text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>
          )}

          {currentIndex < photos.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 
                rounded-full text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          )}

          {/* Main image container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative max-w-full max-h-full flex flex-col items-center"
              >
                {/* Image */}
                <motion.div
                  className={`relative overflow-hidden rounded-xl shadow-2xl cursor-zoom-in
                    ${isZoomed ? "cursor-zoom-out" : ""}`}
                  animate={{
                    scale: isZoomed ? 1.5 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={toggleZoom}
                >
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.caption || `Photo ${currentIndex + 1}`}
                    className="max-h-[70vh] max-w-[90vw] object-contain"
                    draggable={false}
                  />
                  
                  {/* Zoom indicator */}
                  {!isZoomed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full"
                    >
                      <ZoomIn className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Caption */}
                {currentPhoto.caption && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-center text-white text-lg md:text-xl font-light 
                      max-w-2xl px-4"
                  >
                    "{currentPhoto.caption}"
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail strip (for many photos) */}
          {photos.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 
                bg-black/50 rounded-full"
            >
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all
                    ${idx === currentIndex 
                      ? "border-white scale-110" 
                      : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                >
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy usage
export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const open = useCallback((index: number = 0) => {
    setInitialIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, initialIndex, open, close };
}
