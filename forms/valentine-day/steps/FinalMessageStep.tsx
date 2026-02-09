"use client";

import { motion } from "framer-motion";
import { FormTextarea } from "@/components/forms";
import { HeartHandshake, Sparkles } from "lucide-react";

interface FinalMessageStepProps {
  message: string;
  toName: string;
  error?: string;
  onUpdate: (value: string) => void;
}

const messageSuggestions = [
  "I can't imagine my life without you. Every day with you is a gift.",
  "You are my calm, my chaos, my home. I choose you. Always.",
  "Thank you for being you. Here's to our love story, today and always.",
];

export default function FinalMessageStep({
  message,
  toName,
  error,
  onUpdate,
}: FinalMessageStepProps) {
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
          <HeartHandshake className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your closing message
        </h2>
        <p className="text-gray-600">
          End with something that comes from the heart
        </p>
      </div>

      {/* Message textarea */}
      <FormTextarea
        label="Final Message"
        placeholder={`Dear ${toName || "my love"},\n\nEvery day with you is a gift...`}
        value={message}
        onChange={(e) => onUpdate(e.target.value)}
        error={error}
        maxLength={800}
        showCount
        required
        hint="This will be displayed as the final section of your page"
      />

      {/* Suggestions */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Need inspiration?
        </p>
        <div className="space-y-2">
          {messageSuggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => onUpdate(suggestion)}
              className={`
                w-full text-left p-4 rounded-xl border-2 
                transition-all duration-200
                ${
                  message === suggestion
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                }
              `}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                &quot;{suggestion}&quot;
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100"
        >
          <p className="text-sm text-gray-500 mb-3">Preview:</p>
          <p className="text-lg font-handwriting text-gray-800 whitespace-pre-line leading-relaxed">
            {message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
