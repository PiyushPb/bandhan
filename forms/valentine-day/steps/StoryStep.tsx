"use client";

import { motion } from "framer-motion";
import { FormTextarea } from "@/components/forms";
import { BookHeart, Lightbulb } from "lucide-react";

interface StoryStepProps {
  story: string;
  error?: string;
  onUpdate: (value: string) => void;
}

const storyPrompts = [
  "How did you first meet?",
  "What was your first impression of them?",
  "When did you realize they were special?",
  "What's your favorite memory together?",
];

export default function StoryStep({ story, error, onUpdate }: StoryStepProps) {
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
          <BookHeart className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Tell your love story
        </h2>
        <p className="text-gray-600">
          Share how you met and your journey together
        </p>
      </div>

      {/* Story prompts */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800 mb-2">
              Need help getting started? Consider including:
            </p>
            <ul className="text-sm text-amber-700 space-y-1">
              {storyPrompts.map((prompt, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Story textarea */}
      <FormTextarea
        label="Your Story"
        placeholder="We met at a coffee shop in Mumbai in 2023. I was reading a book and you asked if the seat next to me was free..."
        value={story}
        onChange={(e) => onUpdate(e.target.value)}
        error={error}
        maxLength={1500}
        showCount
        required
        hint="Write from the heart! This will be displayed beautifully on your page."
      />

      {/* Character guidance */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Minimum: 50 characters</span>
        <span>Recommended: 200-500 characters</span>
      </div>
    </motion.div>
  );
}
