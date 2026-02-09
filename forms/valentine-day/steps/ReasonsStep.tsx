"use client";

import { motion } from "framer-motion";
import { DynamicList } from "@/components/forms";
import { Heart, Sparkles } from "lucide-react";

interface ReasonsStepProps {
  reasons: string[];
  error?: string;
  onUpdate: (reasons: string[]) => void;
}

const reasonSuggestions = [
  "Your infectious laugh that lights up every room",
  "How you always remember the small things",
  "Your kindness to everyone you meet",
  "The way you support my dreams",
  "Your beautiful smile",
  "How you make ordinary moments extraordinary",
];

export default function ReasonsStep({
  reasons,
  error,
  onUpdate,
}: ReasonsStepProps) {
  const addSuggestion = (suggestion: string) => {
    // Find first empty slot or add new
    const emptyIndex = reasons.findIndex((r) => !r.trim());
    if (emptyIndex !== -1) {
      const newReasons = [...reasons];
      newReasons[emptyIndex] = suggestion;
      onUpdate(newReasons);
    } else if (reasons.length < 10) {
      onUpdate([...reasons, suggestion]);
    }
  };

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
          <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Reasons I love you
        </h2>
        <p className="text-gray-600">
          List all the things that make them special to you
        </p>
      </div>

      {/* Dynamic list */}
      <DynamicList
        label="Your Reasons"
        items={reasons}
        onChange={onUpdate}
        placeholder="I love how you..."
        minItems={3}
        maxItems={10}
        error={error}
        itemLabel="Reason"
      />

      {/* Suggestions */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Need inspiration? Click to add:
        </p>
        <div className="flex flex-wrap gap-2">
          {reasonSuggestions.map((suggestion) => {
            const isAdded = reasons.some(
              (r) => r.toLowerCase() === suggestion.toLowerCase()
            );
            return (
              <motion.button
                key={suggestion}
                type="button"
                onClick={() => !isAdded && addSuggestion(suggestion)}
                disabled={isAdded}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium
                  transition-all duration-200
                  ${
                    isAdded
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-pink-50 text-pink-600 hover:bg-pink-100 cursor-pointer"
                  }
                `}
                whileHover={!isAdded ? { scale: 1.05 } : {}}
                whileTap={!isAdded ? { scale: 0.95 } : {}}
              >
                + {suggestion.substring(0, 30)}...
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
        <p className="text-sm text-pink-700">
          💡 <strong>Tip:</strong> Be specific! Instead of &quot;You&apos;re kind&quot;, try
          &quot;The way you always help strangers with directions.&quot;
        </p>
      </div>
    </motion.div>
  );
}
