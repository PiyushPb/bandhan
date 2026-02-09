"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface StepInfo {
  id: string;
  title: string;
  description?: string;
}

interface FormProgressProps {
  steps: StepInfo[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepIndex: number) => void;
}

export default function FormProgress({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: FormProgressProps) {
  return (
    <div className="py-6">
      {/* Mobile: Simple progress bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-pink-600 font-medium">
            {steps[currentStep]?.title}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = index === currentStep;
            const isClickable = isCompleted || index <= currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step circle */}
                <motion.button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-full
                    font-semibold text-sm transition-all duration-200
                    ${
                      isCompleted
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200"
                        : isCurrent
                        ? "bg-white border-2 border-pink-500 text-pink-600 shadow-lg"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                    }
                    ${isClickable ? "cursor-pointer hover:scale-110" : "cursor-not-allowed"}
                  `}
                  whileHover={isClickable ? { scale: 1.1 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}

                  {/* Pulse animation for current step */}
                  {isCurrent && (
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-pink-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Step title (below circle) */}
                <div className="hidden lg:block absolute mt-14 w-24 text-center -ml-7">
                  <p
                    className={`text-xs font-medium truncate ${
                      isCurrent ? "text-pink-600" : isCompleted ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-200 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-400 to-rose-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? "100%" : isCurrent ? "50%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current step title for medium screens */}
        <div className="lg:hidden mt-4 text-center">
          <p className="text-sm font-medium text-pink-600">
            {steps[currentStep]?.title}
          </p>
          {steps[currentStep]?.description && (
            <p className="text-xs text-gray-500 mt-1">
              {steps[currentStep].description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
