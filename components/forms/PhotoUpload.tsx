/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { useRef, useState, useCallback } from "react";

export interface PhotoItem {
  url: string;
  caption?: string;
  file?: File;
}

interface PhotoUploadProps {
  label: string;
  photos: PhotoItem[];
  onChange: (photos: PhotoItem[]) => void;
  maxPhotos?: number;
  error?: string;
  maxCaptionLength?: number;
}

export default function PhotoUpload({
  label,
  photos,
  onChange,
  maxPhotos = 6,
  error,
  maxCaptionLength,
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const remainingSlots = maxPhotos - photos.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      const newPhotos: PhotoItem[] = filesToProcess.map((file) => ({
        url: URL.createObjectURL(file),
        caption: "",
        file,
      }));

      onChange([...photos, ...newPhotos]);
    },
    [photos, maxPhotos, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);
  };

  const updateCaption = (index: number, caption: string) => {
    const newPhotos = [...photos];
    newPhotos[index] = { ...newPhotos[index], caption };
    onChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <span className="text-pink-500 ml-1">*</span>
        </label>
        <span className="text-xs text-gray-400">
          {photos.length}/{maxPhotos} photos
        </span>
      </div>

      {/* Drop zone */}
      {photos.length < maxPhotos && (
        <motion.div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-2xl p-8
            flex flex-col items-center justify-center gap-4
            cursor-pointer transition-all duration-200
            ${
              isDragging
                ? "border-pink-500 bg-pink-50"
                : "border-gray-300 hover:border-pink-400 hover:bg-pink-50/50"
            }
          `}
          animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
        >
          <motion.div
            className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isDragging ? "bg-pink-200" : "bg-gray-100"}
            `}
            animate={isDragging ? { rotate: 10 } : { rotate: 0 }}
          >
            <Upload
              className={`w-8 h-8 ${isDragging ? "text-pink-600" : "text-gray-400"}`}
            />
          </motion.div>

          <div className="text-center">
            <p className="font-medium text-gray-700">
              {isDragging ? "Drop photos here" : "Drag & drop photos"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse (JPG, PNG, max 5MB each)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.url}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                {/* Photo card */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                  <img
                    src={photo.url}
                    alt={photo.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  {/* Delete button */}
                  <motion.button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full 
                      flex items-center justify-center text-gray-600 hover:text-red-500
                      opacity-0 group-hover:opacity-100 transition-all duration-200
                      shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>

                  {/* Photo number badge */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-pink-500 rounded-full 
                    flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <div className="mt-2 relative">
                  <input
                    type="text"
                    value={photo.caption || ""}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    onFocus={() => setEditingCaption(index)}
                    onBlur={() => setEditingCaption(null)}
                    placeholder="Add a caption..."
                    maxLength={maxCaptionLength}
                    className={`
                      w-full px-3 py-2 text-sm rounded-lg border-2 pr-12
                      bg-white/80 backdrop-blur-sm transition-all duration-200
                      placeholder:text-gray-400 focus:outline-none
                      ${
                        editingCaption === index
                          ? "border-pink-400"
                          : "border-gray-200"
                      }
                    `}
                  />
                  {maxCaptionLength && editingCaption === index && (
                      <span className={`
                          absolute right-2 top-1/2 -translate-y-1/2 text-[10px] 
                          ${(photo.caption?.length || 0) >= maxCaptionLength ? "text-red-500" : "text-gray-400"}
                      `}>
                          {(photo.caption?.length || 0)}/{maxCaptionLength}
                      </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Add more button (if not at max) */}
            {photos.length < maxPhotos && (
              <motion.button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300
                  flex flex-col items-center justify-center gap-2
                  text-gray-400 hover:text-pink-500 hover:border-pink-400 hover:bg-pink-50
                  transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">Add more</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.p>
      )}

      {/* Helper text */}
      <p className="text-xs text-gray-400">
        Add memorable photos of your relationship. Each photo can have a caption.
      </p>
    </div>
  );
}
