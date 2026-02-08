"use client";

import { motion } from "framer-motion";

export default function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mx-auto mt-20 max-w-2xl text-center"
    >
      <p className="text-neutral-600">
        More occasions coming soon. Have something special in mind?{" "}
        <a
          href="#"
          className="font-medium text-neutral-900 underline underline-offset-4"
        >
          Let us know
        </a>
      </p>
    </motion.div>
  );
}
