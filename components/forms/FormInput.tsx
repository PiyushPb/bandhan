"use client";

import { motion } from "framer-motion";
import { forwardRef, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-pink-500 ml-1">*</span>}
        </label>

        <motion.div
          initial={false}
          animate={error ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl border-2 
              bg-white/80 backdrop-blur-sm
              transition-all duration-200
              placeholder:text-gray-400
              focus:outline-none focus:ring-0
              ${
                error
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-400"
              }
              ${className}
            `}
            {...props}
          />
        </motion.div>

        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}

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
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
