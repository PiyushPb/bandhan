"use client";

import { motion } from "framer-motion";
import { FormInput, FormTextarea } from "@/components/forms";
import { Mail, Sparkles } from "lucide-react";

interface SecretLetterStepProps {
  letter?: {
    title: string;
    body: string;
    signature?: string;
    password?: string;
    passwordQuestion?: string;
    hints?: string[];
  };
  toName: string;
  fromName: string;
  errors?: {
    title?: string;
    body?: string;
  };
  onUpdate: (field: "title" | "body" | "signature" | "password" | "passwordQuestion" | "hints", value: string | string[]) => void;
}

export default function SecretLetterStep({
  letter,
  toName,
  fromName,
  errors,
  onUpdate,
}: SecretLetterStepProps) {
  const hints = letter?.hints || ["", "", ""];

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...hints];
    newHints[index] = value;
    onUpdate("hints", newHints);
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
          <Mail className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          A secret letter 💌
        </h2>
        <p className="text-gray-600">
          This will be revealed as a special surprise
        </p>
      </div>

      {/* Optional badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Optional Step
        </span>
      </div>

      {/* Form fields */}
      <div className="space-y-6">
        <FormInput
          label="Letter Title"
          placeholder="e.g., One Last Thing… 💌"
          value={letter?.title || ""}
          onChange={(e) => onUpdate("title", e.target.value)}
          error={errors?.title}
          hint="This appears as the heading for your secret letter"
        />

        <FormTextarea
          label="Letter Content"
          placeholder={`Dear ${toName || "my love"},\n\nIf you've reached here, it means...\n\nYou are my calm, my chaos, my home.\nNo game, no distance, no time could ever change that.\n\nI choose you. Always.`}
          value={letter?.body || ""}
          onChange={(e) => onUpdate("body", e.target.value)}
          error={errors?.body}
          maxLength={1000}
          showCount
          hint="Write something special that they'll discover at the end"
        />

        <FormInput
          label="Signature"
          placeholder={`— ${fromName || "Your name"}`}
          value={letter?.signature || ""}
          onChange={(e) => onUpdate("signature", e.target.value)}
          hint="How you want to sign off"
        />

        {/* Password Protection Section */}
        <div className="pt-6 border-t border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              🔒 Password Protection Game
            </h3>
            <p className="text-sm text-gray-500">
              Make them guess a password to unlock the letter! They get 20 tries.
            </p>
          </div>

          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <FormInput
              label="Secret Password"
              placeholder="e.g., our anniversary date, my nickname"
              value={letter?.password || ""}
              onChange={(e) => onUpdate("password", e.target.value)}
              hint="Leave empty to disable the game"
            />

            {letter?.password && (
              <div className="space-y-4">
                <FormInput
                  label="Password Question / Initial Hint"
                  placeholder="e.g., What is our special date? or My nickname for you..."
                  value={letter?.passwordQuestion || ""}
                  onChange={(e) => onUpdate("passwordQuestion", e.target.value)}
                  hint="This will be shown to help them guess correctly"
                />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Hints (revealed every 5 failed attempts)
                  </label>
                  {[0, 1, 2].map((i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Hint ${i + 1} (optional)`}
                      value={hints[i] || ""}
                      onChange={(e) => handleHintChange(i, e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      {(letter?.title || letter?.body) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <p className="text-sm text-gray-500 mb-3">Preview:</p>
          
          {/* Letter card */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-pink-100 overflow-hidden">
            {/* Decorative seal */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">💌</span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {letter?.title && (
                <h3 className="text-xl sm:text-2xl font-handwriting text-gray-800">
                  {letter.title}
                </h3>
              )}

              {letter?.body && (
                <p className="text-gray-700 font-handwriting text-lg whitespace-pre-line leading-relaxed">
                  {letter.body}
                </p>
              )}

              {letter?.signature && (
                <p className="text-pink-600 font-handwriting text-lg">
                  {letter.signature}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Info */}
      <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
        <p className="text-sm text-pink-700">
          💡 <strong>Tip:</strong> This secret letter will be revealed after
          they complete a mini-game or scroll to the end. Make it special!
        </p>
      </div>
    </motion.div>
  );
}
