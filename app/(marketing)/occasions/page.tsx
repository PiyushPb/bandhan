"use client";

import { motion } from "framer-motion";
import { occasions } from "@/data/occasions";
import PageHeader from "@/components/occasions/PageHeader";
import OccasionCard from "@/components/occasions/OccasionCard";
import { containerVariants } from "@/components/occasions/animations";
import FooterCTA from "@/components/occasions/FooterCTA";

export default function CreatePage() {
  return (
    <section className="min-h-screen w-full bg-linear-to-br from-neutral-50 via-white to-stone-50 px-6 py-16 md:px-10 lg:px-16">
      <PageHeader />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {occasions.map((occasion) => (
          <OccasionCard key={occasion.slug} occasion={occasion} />
        ))}
      </motion.div>

      <FooterCTA />
    </section>
  );
}
