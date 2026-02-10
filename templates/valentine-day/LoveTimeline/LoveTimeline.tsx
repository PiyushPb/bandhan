"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "./sections/Hero";
import { TemplateData } from "@/types/template";
import { useScroll, useMotionValue } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";

const TimeLine = dynamic(() => import("./sections/TimeLine"), {
  ssr: false,
});

interface LoveTimelineProps {
  data: TemplateData;
}

function LoveTimeline({ data }: LoveTimelineProps) {
  const { scrollYProgress } = useScroll();

  const heroOpacity = useMotionValue(1);
  const heroScale = useMotionValue(1);

  useEffect(() => {
    // Update values only when scroll is valid
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (!Number.isFinite(v)) return;

      const opacity = v <= 0.2 ? 1 - v / 0.2 : 0;
      const scale = v <= 0.2 ? 1 - (v / 0.2) * 0.2 : 0.8;

      heroOpacity.set(opacity);
      heroScale.set(scale);
    });

    // Force scroll calculation on mount
    window.dispatchEvent(new Event("scroll"));

    return unsubscribe;
  }, [scrollYProgress, heroOpacity, heroScale]);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-pink-50 via-rose-50 to-red-50 relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground
          particleCount={15}
          shapes={["heart", "sparkle"]}
          colorTheme="romantic"
          blur={true}
        />
      </div>
      <Hero data={data} heroOpacity={heroOpacity} heroScale={heroScale} />
      <TimeLine data={data} />
    </section>
  );
}

export default LoveTimeline;
