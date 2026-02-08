/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Template } from "@/types/template";
import { Eye, Check } from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative"
    >
      <div
        className={`
          relative rounded-2xl overflow-hidden bg-white shadow-lg transition-all duration-300
          ${isSelected ? "ring-4 ring-pink-500 shadow-2xl" : "hover:shadow-xl"}
        `}
      >
        {/* Price Badge */}
        {template.badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-semibold shadow-lg">
            {template.badge}
          </div>
        )}

        {/* Selected Check */}
        {isSelected && (
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover Overlay */}
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
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {template.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {template.description}
          </p>

          {/* Features */}
          <ul className="space-y-1 mb-4">
            {template.features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <div className="w-1 h-1 bg-pink-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Choose Button */}
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
        </div>
      </div>
    </motion.div>
  );
}
