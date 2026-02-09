"use client";

import { motion } from "framer-motion";
import { PhotoUpload, PhotoItem } from "@/components/forms";
import { Camera, Sparkles } from "lucide-react";

interface PhotosStepProps {
  photos: { url: string; caption?: string }[];
  error?: string;
  onUpdate: (photos: PhotoItem[]) => void;
}

export default function PhotosStep({
  photos,
  error,
  onUpdate,
}: PhotosStepProps) {
  // Convert to PhotoItem format
  const photoItems: PhotoItem[] = photos.map((p) => ({
    url: p.url,
    caption: p.caption,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mb-4"
        >
          <Camera className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your memories together
        </h2>
        <p className="text-gray-600">
          Upload photos that capture your special moments
        </p>
      </div>

      {/* Photo upload */}
      <PhotoUpload
        label="Photos"
        photos={photoItems}
        onChange={onUpdate}
        maxPhotos={6}
        error={error}
      />

      {/* Tips */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-pink-800">
                Photo tips for the best experience:
              </p>
              <ul className="text-sm text-pink-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Choose photos with good lighting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Include candid moments, not just posed shots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Add meaningful captions for each photo
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Mix different moments: first date, trips, everyday life
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
