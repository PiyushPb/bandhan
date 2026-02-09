"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";

interface DynamicListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  minItems?: number;
  maxItems?: number;
  error?: string;
  itemLabel?: string;
}

export default function DynamicList({
  label,
  items,
  onChange,
  placeholder = "Enter item...",
  minItems = 1,
  maxItems = 10,
  error,
  itemLabel = "Item",
}: DynamicListProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, ""]);
    }
  };

  const removeItem = (index: number) => {
    if (items.length > minItems) {
      const newItems = items.filter((_, i) => i !== index);
      onChange(newItems);
    }
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <span className="text-pink-500 ml-1">*</span>
        </label>
        <span className="text-xs text-gray-400">
          {items.length}/{maxItems} items
        </span>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <div
                className={`
                  flex items-center gap-2 p-2 rounded-xl border-2 
                  bg-white/80 backdrop-blur-sm transition-all duration-200
                  ${
                    focusedIndex === index
                      ? "border-pink-400 shadow-lg shadow-pink-100"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                {/* Drag handle (visual only for now) */}
                <div className="text-gray-300 cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Item number */}
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg text-pink-600 font-semibold text-sm">
                  {index + 1}
                </div>

                {/* Input */}
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  placeholder={`${placeholder}`}
                  className="flex-1 px-3 py-2 bg-transparent focus:outline-none placeholder:text-gray-400"
                />

                {/* Delete button */}
                <motion.button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={items.length <= minItems}
                  className={`
                    p-2 rounded-lg transition-all duration-200
                    ${
                      items.length <= minItems
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }
                  `}
                  whileHover={items.length > minItems ? { scale: 1.1 } : {}}
                  whileTap={items.length > minItems ? { scale: 0.9 } : {}}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add button */}
      {items.length < maxItems && (
        <motion.button
          type="button"
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-pink-200 rounded-xl
            text-pink-500 font-medium flex items-center justify-center gap-2
            hover:bg-pink-50 hover:border-pink-300 transition-all duration-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="w-5 h-5" />
          Add {itemLabel}
        </motion.button>
      )}

      {/* Error message */}
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

      {/* Helper text */}
      <p className="text-xs text-gray-400">
        Add at least {minItems} {itemLabel.toLowerCase()}
        {minItems > 1 ? "s" : ""}. Maximum {maxItems}.
      </p>
    </div>
  );
}
