"use client";

import { motion } from "framer-motion";
import { FormInput } from "@/components/forms";
import { Heart, Sparkles } from "lucide-react";

interface BasicInfoStepProps {
  fromName: string;
  toName: string;
  greeting: string;
  errors: {
    fromName?: string;
    toName?: string;
    greeting?: string;
  };
  onUpdate: (field: "fromName" | "toName" | "greeting", value: string) => void;
}

const greetingSuggestions = [
  "To my forever person",
  "My dearest love",
  "To the one who has my heart",
  "My beloved",
  "To my soulmate",
];

export default function BasicInfoStep({
  fromName,
  toName,
  greeting,
  errors,
  onUpdate,
}: BasicInfoStepProps) {
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
          <Heart className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Let&apos;s start with the basics
        </h2>
        <p className="text-gray-600">
          Who is this special message for?
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-6">
        {/* Names row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            label="Your Name"
            placeholder="e.g., Rohan"
            value={fromName}
            onChange={(e) => onUpdate("fromName", e.target.value)}
            error={errors.fromName}
            required
          />
          <FormInput
            label="Their Name"
            placeholder="e.g., Priya"
            value={toName}
            onChange={(e) => onUpdate("toName", e.target.value)}
            error={errors.toName}
            required
          />
        </div>

        {/* Greeting */}
        <FormInput
          label="Opening Greeting"
          placeholder="e.g., To my forever person"
          value={greeting}
          onChange={(e) => onUpdate("greeting", e.target.value)}
          error={errors.greeting}
          hint="This will be displayed as the main greeting on the page"
          required
        />

        {/* Greeting suggestions */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Need inspiration? Try one of these:
          </p>
          <div className="flex flex-wrap gap-2">
            {greetingSuggestions.map((suggestion) => (
              <motion.button
                key={suggestion}
                type="button"
                onClick={() => onUpdate("greeting", suggestion)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${
                    greeting === suggestion
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-pink-50 text-pink-600 hover:bg-pink-100"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview card */}
      {(fromName || toName || greeting) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100"
        >
          <p className="text-sm text-gray-500 mb-3">Preview:</p>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-handwriting text-gray-800">
              {greeting || "Your greeting..."}
            </p>
            <p className="text-3xl sm:text-4xl font-handwriting text-pink-600 mt-2">
              {toName || "Their name"} ❤️ {fromName || "Your name"}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
