"use client";

import { motion } from "framer-motion";

export default function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-16 max-w-4xl text-center"
    >
      <h1 className="font-cal text-4xl font-semibold text-neutral-900 md:text-5xl">
        Choose an occasion
      </h1>
      <p className="mt-5 text-lg text-neutral-600 md:text-xl">
        Bandhan helps you create beautiful, personal websites for life’s most
        meaningful moments.
      </p>
    </motion.div>
  );
}
