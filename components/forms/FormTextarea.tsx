"use client";

import { motion } from "framer-motion";
import { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
  autoResize?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      hint,
      maxLength,
      showCount = true,
      autoResize = true,
      className = "",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value, autoResize, textareaRef]);

    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-pink-500 ml-1">*</span>}
          </label>

          {showCount && maxLength && (
            <span
              className={`text-xs ${
                currentLength > maxLength * 0.9
                  ? currentLength >= maxLength
                    ? "text-red-500"
                    : "text-amber-500"
                  : "text-gray-400"
              }`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <motion.div
          initial={false}
          animate={error ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            className={`
              w-full px-4 py-3 rounded-xl border-2 
              bg-white/80 backdrop-blur-sm
              transition-all duration-200
              placeholder:text-gray-400
              focus:outline-none focus:ring-0
              resize-none min-h-[120px]
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

        {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}

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

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
