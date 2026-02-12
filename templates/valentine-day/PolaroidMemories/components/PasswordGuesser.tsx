"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Key, HelpCircle, AlertCircle } from "lucide-react";

interface PasswordGuesserProps {
  password?: string;
  passwordQuestion?: string;
  hints?: string[];
  onUnlock: () => void;
}

export default function PasswordGuesser({
  password,
  passwordQuestion,
  hints = [],
  onUnlock,
}: PasswordGuesserProps) {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shake, setShake] = useState(0);
  const [visibleHints, setVisibleHints] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  const MAX_ATTEMPTS = 20;

  useEffect(() => {
    // Check if we should reveal hints based on attempts
    const hintsToShow = Math.floor(attempts / 5);
    if (hintsToShow > 0 && hints && hints.length > 0) {
      setVisibleHints(hints.slice(0, hintsToShow));
    }

    // Auto-unlock if max attempts reached
    if (attempts >= MAX_ATTEMPTS && !isUnlocked) {
      setIsUnlocked(true);
      setFeedback("Maximum attempts reached. Opening specifically for you... ❤️");
      setTimeout(() => {
        onUnlock();
      }, 2000);
    }
  }, [attempts, hints, isUnlocked, onUnlock]);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return; // Should not happen if this component is rendered

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedPassword = password.trim().toLowerCase();

    if (normalizedGuess === normalizedPassword) {
      setIsUnlocked(true);
      setFeedback("Correct! You know me so well! 💕");
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setAttempts((prev) => prev + 1);
      setShake((prev) => prev + 1);
      setGuess("");
      setFeedback("Not quite! Try again... 🤔");
      
      // Clear feedback after a moment
      setTimeout(() => {
        setFeedback("");
      }, 2000);
    }
  };

  // If no password is indicated, unlock immediately (safety)
  useEffect(() => {
    if (!password) {
      onUnlock();
    }
  }, [password, onUnlock]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative border-2 border-pink-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white text-center">
          <motion.div
            animate={{ rotate: isUnlocked ? [0, -10, 10, 0] : 0 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm"
          >
            {isUnlocked ? (
              <Unlock className="w-8 h-8 text-white" />
            ) : (
              <Lock className="w-8 h-8 text-white" />
            )}
          </motion.div>
          <h3 className="text-xl font-handwriting font-bold">
            {isUnlocked ? "Unlocked!" : "Secret Password Protected"}
          </h3>
          <p className="text-pink-100 text-sm opacity-90">
            {isUnlocked
              ? "Enjoy your letter! 💌"
              : "Guess the password to open the letter"}
          </p>
        </div>

        {/* Game Area */}
        <div className="p-8 space-y-6">
          {!isUnlocked ? (
            <>
              {/* Question / Initial Hint */}
              {passwordQuestion && (
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center">
                  <p className="text-sm text-pink-500 font-bold uppercase mb-1 tracking-wider">
                    Hint / Question
                  </p>
                  <p className="text-gray-800 font-handwriting text-lg font-medium">
                    {passwordQuestion}
                  </p>
                </div>
              )}

              {/* Attempt Counter */}
              <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                <span>Attempts: {attempts}/{MAX_ATTEMPTS}</span>
                {attempts >= 15 && (
                  <span className="text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Almost out of tries!
                  </span>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleGuess} className="relative">
                <motion.div
                  key={shake}
                  animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Enter password..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder:text-gray-400 font-handwriting text-lg"
                      autoFocus
                    />
                  </div>
                </motion.div>
                <button
                  type="submit"
                  disabled={!guess.trim()}
                  className="w-full mt-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-pink-200"
                >
                  Unlock Letter 🔓
                </button>
              </form>

              {/* Feedback and Hints */}
              <div className="space-y-4 min-h-[100px]">
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-center font-medium ${
                        isUnlocked ? "text-green-500" : "text-rose-500"
                      }`}
                    >
                      {feedback}
                    </motion.div>
                  )}
                </AnimatePresence>

                {visibleHints.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-amber-50 rounded-xl p-4 border border-amber-100"
                  >
                    <div className="flex items-center gap-2 text-amber-600 mb-2 font-medium text-sm">
                      <HelpCircle className="w-4 h-4" />
                      <span>Hints Unlocked:</span>
                    </div>
                    <div className="space-y-2">
                       {visibleHints.map((hint, idx) => (
                         <motion.div
                           key={idx}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           className="flex items-start gap-2 text-sm text-gray-700"
                         >
                           <span className="text-amber-400 font-bold">•</span>
                           <span className="font-handwriting italic">{hint}</span>
                         </motion.div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              >
                <Unlock className="w-10 h-10 text-green-500" />
              </motion.div>
              <h4 className="text-xl font-bold text-gray-800">Available!</h4>
              <p className="text-gray-500">The letter is now yours to read.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
