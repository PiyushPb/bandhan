"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Occasion } from "@/types/occasion";
import FeatureItem from "./FeatureItem";
import { cardVariants } from "./animations";

export default function OccasionCard({ occasion }: { occasion: Occasion }) {
  const isActive = occasion.status === "active";
  return (
    <motion.div variants={cardVariants} className="group">
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-8 transition-all duration-300
        ${
          isActive
            ? "border-neutral-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/5"
            : "border-neutral-200/60 opacity-80"
        }`}
      >
        {!isActive && (
          <span className="absolute right-6 top-6 z-10 rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
            Coming soon
          </span>
        )}

        <div
          className={`relative mb-6 h-44 w-full overflow-hidden rounded-2xl border border-neutral-200/60 bg-gradient-to-br ${occasion.gradient}`}
        >
          <Image
            src={occasion.image}
            alt={occasion.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={occasion.id === "valentine"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </div>

        <h3 className="mb-3 text-xl font-semibold text-neutral-900">
          {occasion.title}
        </h3>

        <p className="mb-5 text-neutral-600">{occasion.description}</p>

        <ul className="mb-8 space-y-2.5">
          {occasion.features.map((feature) => (
            <FeatureItem key={feature} feature={feature} />
          ))}
        </ul>

        {isActive && occasion.href ? (
          <Link
            href={occasion.href}
            className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/10"
          >
            Create Valentine site
          </Link>
        ) : (
          <button
            disabled
            className="mt-auto w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-3.5 text-sm font-medium text-neutral-400"
          >
            Available soon
          </button>
        )}
      </div>
    </motion.div>
  );
}
