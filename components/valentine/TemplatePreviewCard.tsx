/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Template } from "@/types/template";
import { Eye, Check, Lock, Flame } from "lucide-react";

interface TemplatePreviewCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  delay?: number;
}

export default function TemplatePreviewCard({
  template,
  isSelected,
  onSelect,
  onPreview,
  delay = 0,
}: TemplatePreviewCardProps) {
  const isSoldOut = template.status === "sold-out";
  const hasBestSeller = !!template.tag;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative"
    >
      <div
        className={`
          relative rounded-2xl overflow-hidden bg-white transition-all duration-300
          ${isSoldOut
            ? "opacity-75 shadow-md"
            : isSelected
              ? "ring-4 ring-pink-500 shadow-2xl"
              : "shadow-lg hover:shadow-xl"
          }
        `}
      >
        {/* Best Seller Tag */}
        {hasBestSeller && !isSoldOut && (
          <div className="absolute top-0 right-0 z-20">
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-bl-xl shadow-lg flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                {template.tag}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-bl-xl blur-md opacity-40" />
            </div>
          </div>
        )}

        {/* Price Badge */}
        {template.badge && (
          <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
            isSoldOut
              ? "bg-gray-400 text-white"
              : "bg-pink-500 text-white"
          }`}>
            {isSoldOut ? (
              <span className="line-through opacity-70">{template.badge}</span>
            ) : (
              template.badge
            )}
          </div>
        )}

        {/* Selected Check */}
        {isSelected && !isSoldOut && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Check className="w-6 h-6 text-white" />
          </motion.div>
        )}

        {/* Image Preview */}
        <div className="aspect-6/4 relative overflow-hidden bg-gray-100">
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isSoldOut ? "grayscale" : "group-hover:scale-110"
            }`}
          />

          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 200, delay: delay + 0.2 }}
                className="bg-white/95 backdrop-blur-sm px-8 py-3 rounded-lg shadow-2xl border-2 border-gray-300"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <span className="text-xl font-bold text-gray-700 tracking-wider uppercase">
                    Sold Out
                  </span>
                </div>
              </motion.div>
            </div>
          )}

          {/* Hover Overlay (only for available templates) */}
          {!isSoldOut && (
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview();
                  }}
                  className="w-full py-3 bg-white/90 hover:bg-white text-gray-900 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Preview Template
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {template.name}
          </h3>

          <p className={`text-sm mb-4 line-clamp-2 ${
            isSoldOut ? "text-gray-400" : "text-gray-600"
          }`}>
            {template.description}
          </p>

          {/* Features */}
          <ul className="space-y-1 mb-4">
            {template.features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 text-sm ${
                  isSoldOut ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <div className={`w-1 h-1 rounded-full ${
                  isSoldOut ? "bg-gray-300" : "bg-pink-400"
                }`} />
                {feature}
              </li>
            ))}
          </ul>

          {/* Choose Button */}
          {isSoldOut ? (
            <div className="w-full py-3 rounded-full font-semibold text-center bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Sold Out
            </div>
          ) : (
            <button
              onClick={onSelect}
              className={`
                w-full py-3 rounded-full font-semibold transition-all duration-200
                ${
                  isSelected
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-pink-50 text-pink-600 hover:bg-pink-100"
                }
              `}
            >
              {isSelected ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Selected
                </span>
              ) : (
                `Choose for ₹${template.price}`
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
