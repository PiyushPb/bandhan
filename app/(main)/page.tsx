/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/* ==========================================================================
   ANIMATION CONFIG
   ========================================================================== */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

/* ==========================================================================
   STATIC DATA
   ========================================================================== */

const OCCASIONS: ReadonlyArray<{
  title: string;
  emoji: string;
  description: string;
  image: string;
  featured?: boolean;
}> = [
  {
    title: "Valentine's Day",
    emoji: "💕",
    description:
      "A digital love letter  photos, music, memories, and words they'll never forget.",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop&q=80",
    featured: true,
  },
  {
    title: "Proposals",
    emoji: "💍",
    description:
      "Build anticipation with a beautiful experience that ends with the biggest question.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Anniversaries",
    emoji: "🥂",
    description:
      "Relive your journey together  from the first date to right now.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Birthdays",
    emoji: "🎂",
    description:
      "More than a wish  a whole world of memories, surprises, and messages.",
    image:
      "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Long-Distance Love",
    emoji: "✈️",
    description:
      "When you can't be there, send them a place on the internet that feels like a hug.",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Friendships",
    emoji: "🤝",
    description:
      "Celebrate the bonds that shape you  inside jokes, memories, and gratitude.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&q=80",
  },
];

const PRICING = [
  {
    name: "Heartfelt",
    price: "₹99",
    tagline: "A simple, beautiful way to say I love you",
    features: [
      "1 romantic template",
      "Up to 10 photos",
      "Custom love message",
      "Shareable private link",
      "Mobile-friendly design",
    ],
    cta: "Start with Heartfelt",
    popular: false,
  },
  {
    name: "Soulmate",
    price: "₹199",
    tagline: "For the love that deserves more than words",
    features: [
      "3 premium templates",
      "Up to 30 photos",
      "Love story timeline",
      "Embed music (YouTube / Spotify)",
      "Custom colors & backgrounds",
      "Animated transitions",
      "Countdown timer",
    ],
    cta: "Create with Soulmate",
    popular: true,
  },
  {
    name: "Forever",
    price: "₹499",
    tagline: "The ultimate digital love experience",
    features: [
      "All premium templates",
      "Unlimited photos",
      "Full love story with chapters",
      "Music & video embeds",
      "Interactive mini-games",
      "Secret message reveal",
      "Custom domain support",
      "Priority support",
    ],
    cta: "Go Forever",
    popular: false,
  },
] as const;

const EXPERIENCE_STEPS = [
  {
    icon: "📸",
    title: "They scroll through your memories",
    body: "Every photo tells a part of your story  carefully placed, beautifully displayed.",
  },
  {
    icon: "💌",
    title: "They read your words",
    body: "Personal messages that feel handwritten, not typed. Words that make them stop and feel.",
  },
  {
    icon: "🎵",
    title: "They hear your song",
    body: "That song from your first dance, your road trip, or your late-night calls  playing softly as they scroll.",
  },
  {
    icon: "🎮",
    title: "They play and discover",
    body: "A mini tic-tac-toe game that reveals a secret love message after 3 wins. Surprise built right in.",
  },
  {
    icon: "❤️",
    title: "They feel something",
    body: "That's the product. Not a website  a feeling. Something that makes them hold their phone a little closer.",
  },
] as const;

const COMPARISONS = [
  { label: "A text message", flaw: "Disappears in a scroll", icon: "💬" },
  { label: "An Instagram story", flaw: "Gone in 24 hours", icon: "📱" },
  {
    label: "Flowers & chocolates",
    flaw: "Beautiful, but temporary",
    icon: "💐",
  },
  { label: "A greeting card", flaw: "Generic & forgettable", icon: "💳" },
] as const;

const IMAGINE_MOMENTS = [
  {
    emoji: "😃",
    title: "They pause mid-scroll",
    body: "That photo from your first trip together. The one they forgot you even took. Now it's there, beautifully placed, with the story behind it.",
  },
  {
    emoji: "😭",
    title: "They read your words",
    body: "Not a caption. Not a text. A real love letter  the kind they'll screenshot, save, and read again at 2 AM when they miss you.",
  },
  {
    emoji: "😍",
    title: "They hear that song",
    body: "Your song starts playing as they scroll. Suddenly they're back in that moment  the car ride, the dance, the call that went on for hours.",
  },
  {
    emoji: "🤭",
    title: "They find the surprise",
    body: "A little tic-tac-toe game hidden inside. They win three times and a secret message appears. They weren't expecting that.",
  },
  {
    emoji: "❤️",
    title: "They call you",
    body: "They don't text. They call. And the first thing they say is  \"How did you make this?\" That's the moment that makes it all worth it.",
  },
] as const;

const PROMISES = [
  { icon: "⚡", text: "Ready in 5 minutes" },
  { icon: "🔒", text: "Private & secure link" },
  { icon: "📱", text: "Beautiful on every device" },
  { icon: "♾️", text: "Yours to keep forever" },
] as const;

/* ==========================================================================
   LAYOUT PRIMITIVES
   ========================================================================== */

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24 md:py-28 lg:py-32 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-rose-500 sm:text-sm">
      {children}
    </span>
  );
}

function SectionTitle({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className={`font-cal text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-5xl ${
        light ? "text-white" : "text-neutral-900"
      }`}
    >
      {children}
    </h2>
  );
}

function SectionSub({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mt-4 text-base leading-relaxed sm:mt-5 sm:text-lg ${
        light ? "text-white/60" : "text-neutral-500"
      }`}
    >
      {children}
    </p>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
  center = true,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease }}
      className={`mb-12 max-w-3xl sm:mb-16 ${
        center ? "mx-auto text-center" : "text-left"
      }`}
    >
      {label && <SectionLabel>{label}</SectionLabel>}
      <SectionTitle light={light}>{title}</SectionTitle>
      {subtitle && <SectionSub light={light}>{subtitle}</SectionSub>}
    </motion.div>
  );
}

function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mt-0.5 h-4 w-4 shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

/* ==========================================================================
   1 · HERO
   ========================================================================== */

function Hero() {
  const router = useRouter();

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920&h=1080&fit=crop&q=80"
          alt="Romantic rose petals scattered on a warm surface"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/60 via-rose-950/40 to-rose-950/70" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-5 pt-20 text-center sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Campaign pill */}
          <motion.div variants={fadeIn} transition={{ duration: 0.5 }}>
            <Pill className="mb-6 border border-white/10 bg-white/15 text-white/90 backdrop-blur-sm sm:mb-8">
              <span className="text-rose-300">♥</span> Valentine&apos;s Day
              Collection Live
            </Pill>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9, ease }}
            className="font-cal text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Turn your feelings
            <br />
            <span className="text-rose-200">into a website</span>
          </motion.h1>

          {/* Handwriting accent */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mt-5 font-handwriting text-xl text-white/65 sm:mt-6 sm:text-2xl md:text-3xl"
          >
            not just a message an experience
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg"
          >
            Create a personal, beautiful website for someone you love. Share
            your memories, photos, music, and love notes all wrapped in a link
            they&apos;ll never forget.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/occasions")} // ← uncomment in Next.js
              className="w-full rounded-full bg-white px-8 py-4 text-base font-semibold text-rose-900 shadow-2xl shadow-rose-950/30 transition-all duration-300 hover:bg-rose-50 sm:w-auto"
            >
              Create yours ₹99
            </motion.button>

            <a
              href="#experience"
              className="w-full rounded-full border-2 border-white/30 px-8 py-4 text-center text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              See how it feels
            </a>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-9 text-sm text-white/35"
          >
            No coding · No design skills · Just your feelings and 5 minutes
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <a href="#what" aria-label="Scroll down">
          <div className="flex w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5 h-10">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-white/50"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

/* ==========================================================================
   2 · WHAT IS BANDHAN
   ========================================================================== */

function WhatSection() {
  return (
    <Section id="what" className="bg-warm-50">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel>What is Bandhan?</SectionLabel>

          <h2 className="font-cal text-3xl font-semibold leading-[1.12] tracking-tight text-neutral-900 sm:text-4xl md:text-[2.75rem]">
            Not a website builder.
            <br />
            <span className="text-rose-600">An emotion builder.</span>
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-[17px]">
            <p>
              People struggle to express how they truly feel. A text feels
              temporary. A social media post feels public and generic. A
              greeting card feels impersonal.
            </p>
            <p>
              Bandhan lets you create something{" "}
              <span className="font-semibold text-neutral-800">
                deeply personal
              </span>{" "}
              a scrolling, immersive digital experience built entirely around
              your relationship. Photos, stories, songs, games, and love notes,
              all in one beautiful place.
            </p>
            <p className="font-handwriting text-xl text-rose-600/80">
              &ldquo;Someone built this just for me.&rdquo;
            </p>
            <p className="text-neutral-500">
              That feeling of exclusivity is what makes Bandhan different from
              everything else.
            </p>
          </div>
        </motion.div>

        {/* Image + floating card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={scaleIn}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-rose-900/10">
            <img
              src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=700&h=875&fit=crop&q=80"
              alt="Couple holding hands while walking through golden light"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6, ease }}
            className="absolute -bottom-4 -right-4 max-w-[220px] rounded-2xl border border-neutral-100 bg-white p-5 shadow-xl sm:-right-6 sm:bottom-8"
          >
            <p className="mb-2 font-handwriting text-lg leading-snug text-neutral-700">
              &ldquo;This made me cry happy tears 😭&rdquo;
            </p>
            <p className="text-xs text-neutral-400"> A real reaction</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ==========================================================================
   3 · THE EXPERIENCE (what the recipient sees)
   ========================================================================== */

function ExperienceSection() {
  return (
    <Section id="experience" className="bg-neutral-900 text-white">
      <SectionHeader
        label="The experience"
        title="What happens when they open your link"
        subtitle="It's not just a page. It's a moment. Here's what they'll feel."
        light
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="mx-auto max-w-3xl"
      >
        {EXPERIENCE_STEPS.map((step, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-8 flex gap-5 last:mb-0 sm:gap-6"
          >
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/15 text-xl">
                {step.icon}
              </div>
              {i < EXPERIENCE_STEPS.length - 1 && (
                <div className="mt-3 w-px flex-1 bg-gradient-to-b from-rose-500/20 to-transparent" />
              )}
            </div>
            <div className="pb-8 last:pb-0">
              <h3 className="mb-2 font-heading text-lg font-semibold text-white sm:text-xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                {step.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ==========================================================================
   4 · WHY NOT JUST…
   ========================================================================== */

function WhyNotSection() {
  return (
    <Section className="bg-rose-25">
      <SectionHeader
        label="Why Bandhan?"
        title="Because they deserve more than the usual"
        subtitle="Flowers fade. Texts disappear. But a Bandhan? That's forever."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="mx-auto mb-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {COMPARISONS.map((c, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-neutral-100 bg-white p-6 text-center"
          >
            <div className="mb-3 text-3xl">{c.icon}</div>
            <p className="mb-1 text-sm font-semibold text-neutral-800">
              {c.label}
            </p>
            <p className="text-xs text-neutral-400">{c.flaw}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, ease }}
        className="text-center"
      >
        <div className="inline-block rounded-2xl bg-rose-600 px-8 py-6 text-white shadow-lg shadow-rose-600/20">
          <p className="font-cal text-xl font-semibold sm:text-2xl">
            A Bandhan is different.
          </p>
          <p className="mt-1 text-sm text-rose-200 sm:text-base">
            A full scrolling, immersive experience that says{" "}
            <span className="font-handwriting text-lg text-white">
              &ldquo;I put my heart into this.&rdquo;
            </span>
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

/* ==========================================================================
   5 · HOW IT WORKS
   ========================================================================== */

const HOW_STEPS = [
  {
    num: "01",
    title: "Pick a template",
    body: "Choose from romantic, elegant, or playful designs  each crafted to set the perfect mood.",
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&h=350&fit=crop&q=80",
    alt: "Beautifully designed template options on a screen",
  },
  {
    num: "02",
    title: "Add your heart",
    body: "Upload photos, write love notes, embed your song, add a timeline of your story. Our guided flow makes it effortless.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=350&fit=crop&q=80",
    alt: "Person writing a heartfelt letter",
  },
  {
    num: "03",
    title: "Share the link",
    body: "Hit publish and get a private URL. Send it via WhatsApp, text, or wherever feels right. Watch their reaction.",
    image:
      "https://images.unsplash.com/photo-1534131707746-25d604851a1f?w=500&h=350&fit=crop&q=80",
    alt: "Person smiling at their phone screen",
  },
] as const;

function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeader
        label="How it works"
        title="Three steps. Five minutes. One unforgettable link."
        subtitle="If you can send a text, you can create a Bandhan."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10"
      >
        {HOW_STEPS.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={s.image}
                alt={s.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-rose-600 backdrop-blur-sm font-heading">
                {s.num}
              </div>
            </div>
            <h3 className="mb-2 font-heading text-xl font-semibold text-neutral-900 sm:text-2xl">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ==========================================================================
   6 · OCCASIONS
   ========================================================================== */

function OccasionsGrid() {
  return (
    <Section id="occasions" className="bg-warm-50">
      <SectionHeader
        label="Beyond Valentine's"
        title="Every emotion deserves its own space"
        subtitle="Bandhan isn't just for Valentine's Day. It's for every moment that makes your heart swell."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {OCCASIONS.map((item, i) => (
          <motion.article
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className={`group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/[0.06] ${
              item.featured
                ? "border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100/50 ring-1 ring-rose-100"
                : "border border-neutral-200/70 bg-white hover:border-neutral-300"
            }`}
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {item.featured && (
                <div className="absolute right-3 top-3">
                  <Pill className="bg-rose-600 text-white shadow-lg shadow-rose-600/30">
                    ♥ Live Now
                  </Pill>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <h3 className="font-heading text-lg font-semibold text-neutral-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

/* ==========================================================================
   7 · PRICING
   ========================================================================== */

function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHeader
        label="Valentine's Day Pricing"
        title="Choose how deeply you want to express yourself"
        subtitle="Every plan creates something beautiful. Pick the one that matches your love language."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3 lg:gap-6"
      >
        {PRICING.map((plan, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className={`relative rounded-3xl p-7 transition-all duration-300 sm:p-8 ${
              plan.popular
                ? "z-10 scale-[1.02] border-2 border-rose-400/30 bg-gradient-to-b from-rose-600 to-rose-700 text-white shadow-2xl shadow-rose-600/25 md:scale-105"
                : "border border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:shadow-lg"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Pill className="bg-white text-rose-600 shadow-md">
                  ♥ Most Popular
                </Pill>
              </div>
            )}

            {/* Plan header */}
            <div className="mb-6">
              <h3
                className={`mb-1 font-heading text-lg font-semibold ${
                  plan.popular ? "text-white" : "text-neutral-900"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`mb-4 text-sm ${
                  plan.popular ? "text-rose-200" : "text-neutral-500"
                }`}
              >
                {plan.tagline}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className={`font-cal text-4xl font-bold sm:text-5xl ${
                    plan.popular ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.popular ? "text-rose-200" : "text-neutral-400"
                  }`}
                >
                  one-time
                </span>
              </div>
            </div>

            {/* Feature list */}
            <ul className="mb-8 space-y-3">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <CheckIcon
                    className={plan.popular ? "text-rose-200" : "text-rose-500"}
                  />
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-white/90" : "text-neutral-600"
                    }`}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-300 ${
                plan.popular
                  ? "bg-white text-rose-700 shadow-lg shadow-rose-900/20 hover:bg-rose-50"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              {plan.cta}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-center text-sm text-neutral-400"
      >
        No subscriptions. No hidden fees. Create once, keep it forever.
      </motion.p>
    </Section>
  );
}

/* ==========================================================================
   8 · PROMISE STRIP
   ========================================================================== */

function PromiseStrip() {
  return (
    <section className="border-y border-rose-100 bg-rose-25 py-12 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10"
        >
          {PROMISES.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-2 text-2xl">{p.icon}</div>
              <div className="text-sm font-medium text-neutral-700 sm:text-base">
                {p.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   9 · IMAGINE THEIR REACTION
   ========================================================================== */

function ImagineSection() {
  return (
    <Section className="bg-warm-50">
      <SectionHeader
        label="Imagine this"
        title="Picture the moment they open your link"
        subtitle="This is what you're really creating  not a website, but a reaction."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="mx-auto max-w-4xl space-y-4 sm:space-y-5"
      >
        {IMAGINE_MOMENTS.map((m, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:gap-5 sm:p-7"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-2xl sm:h-14 sm:w-14">
              {m.emoji}
            </div>
            <div>
              <h3 className="mb-1.5 font-heading text-base font-semibold text-neutral-900 sm:text-lg">
                {m.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
                {m.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ==========================================================================
   10 · FINAL CTA
   ========================================================================== */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 md:py-40">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529636798458-92182e662485?w=1920&h=900&fit=crop&q=80"
          alt="Golden sunset silhouette of a couple"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/70 via-rose-950/55 to-rose-950/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-handwriting text-xl text-rose-300/80 sm:text-2xl">
            this Valentine&apos;s Day…
          </p>

          <h2 className="font-cal text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Don&apos;t just say it.
            <br />
            <span className="text-rose-200">Make them feel it.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Create a personal website for someone you love in minutes. Share
            something they&apos;ll remember forever.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={"/occasions"}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-white px-9 py-4 text-base font-semibold text-rose-800 shadow-2xl shadow-rose-950/30 transition-all duration-300 hover:bg-rose-50 sm:w-auto"
              >
                Create your Bandhan ₹99
              </motion.div>
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-md text-sm text-white/35">
            Takes 5 minutes · No sign-up required · No tech skills needed
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   11 · FOOTER
   ========================================================================== */

// const FOOTER_LINKS = {
//   Product: ["Templates", "Pricing", "Examples", "Features"],
//   Occasions: ["Valentine's Day", "Anniversaries", "Birthdays", "Proposals"],
//   Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
// } as const;

// function Footer() {
//   return (
//     <footer className="bg-neutral-950 text-neutral-400">
//       <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
//         <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-10">
//           {/* Brand */}
//           <div className="col-span-2 md:col-span-5">
//             <h3 className="font-cal text-2xl font-semibold text-white">
//               Bandhan
//             </h3>
//             <p className="mt-3 max-w-xs text-sm leading-relaxed">
//               Turn your feelings into a website. Made for people who love deeply
//               and want to show it beautifully.
//             </p>
//             <p className="mt-4 font-handwriting text-base text-rose-400/70">
//               Every emotion deserves its own space. ♥
//             </p>
//           </div>

//           {/* Link columns */}
//           {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
//             <nav
//               key={heading}
//               className="md:col-span-2"
//               aria-label={`${heading} links`}
//             >
//               <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-300">
//                 {heading}
//               </h4>
//               <ul className="space-y-2.5">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <a
//                       href="#"
//                       className="text-sm transition-colors duration-200 hover:text-white"
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           ))}
//         </div>

//         {/* Bottom bar */}
//         <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-800/80 pt-8 sm:flex-row">
//           <p className="text-xs text-neutral-500">
//             © {new Date().getFullYear()} Bandhan. Made with ♥ for your moments.
//           </p>

//           <div className="flex items-center gap-4">
//             {/* Instagram */}
//             <a
//               href="#"
//               className="text-neutral-500 transition-colors duration-200 hover:text-rose-400"
//               aria-label="Instagram"
//             >
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path
//                   fillRule="evenodd"
//                   d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </a>

//             {/* Twitter / X */}
//             <a
//               href="#"
//               className="text-neutral-500 transition-colors duration-200 hover:text-rose-400"
//               aria-label="Twitter"
//             >
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//               </svg>
//             </a>

//             {/* YouTube */}
//             <a
//               href="#"
//               className="text-neutral-500 transition-colors duration-200 hover:text-rose-400"
//               aria-label="YouTube"
//             >
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path
//                   fillRule="evenodd"
//                   d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ==========================================================================
   PAGE  default export for Next.js App Router
   ========================================================================== */

export default function Home() {
  return (
    <div className="bg-white antialiased">
      <Hero />
      <WhatSection />
      <ExperienceSection />
      <WhyNotSection />
      <HowItWorks />
      <OccasionsGrid />
      <PricingSection />
      <PromiseStrip />
      <ImagineSection />
      <FinalCTA />
      {/* <Footer /> */}
    </div>
  );
}
