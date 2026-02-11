/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// ============================================================================
// TYPES
// ============================================================================

interface Occasion {
  slug: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  features: string[];
  status: "active" | "coming_soon";
  href?: string;
  badge?: string;
  price?: string;
}

// ============================================================================
// DATA
// ============================================================================

const occasions: Occasion[] = [
  {
    slug: "valentine",
    title: "Valentine's Day",
    description:
      "Create a romantic digital experience for your special someone. Share your love story, memories, and heartfelt messages.",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    gradient: "from-rose-100 to-pink-50",
    features: [
      "Beautiful romantic templates",
      "Add photos & memories",
      "Embed your song",
      "Secret love message game",
      "Shareable private link",
    ],
    status: "active",
    href: "/occasion/valentine-day",
    badge: "♥ Live Now",
    price: "Starting at ₹99",
  },
  {
    slug: "anniversary",
    title: "Anniversary",
    description:
      "Celebrate years of love with a timeline of your journey together. Perfect for surprising your partner.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    gradient: "from-amber-50 to-orange-50",
    features: [
      "Relationship timeline",
      "Milestone moments",
      "Photo galleries",
      "Love letters section",
    ],
    status: "coming_soon",
  },
  {
    slug: "birthday",
    title: "Birthday Surprise",
    description:
      "Make their birthday unforgettable with a personalized website full of wishes, photos, and memories.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    gradient: "from-violet-50 to-purple-50",
    features: [
      "Birthday countdown",
      "Wish collection wall",
      "Memory slideshow",
      "Surprise reveal",
    ],
    status: "coming_soon",
  },
  {
    slug: "proposal",
    title: "Proposal",
    description:
      "Pop the question in the most memorable way. Build anticipation with a story that leads to your proposal.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    gradient: "from-rose-50 to-red-50",
    features: [
      "Story-driven journey",
      "The big question reveal",
      "Response capture",
      "Celebration page",
    ],
    status: "coming_soon",
  },
  {
    slug: "friendship",
    title: "Friendship",
    description:
      "Honor the bonds that matter. Create a tribute to your best friend with inside jokes and shared memories.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    gradient: "from-sky-50 to-blue-50",
    features: [
      "Friendship timeline",
      "Inside jokes section",
      "Photo memories",
      "Appreciation wall",
    ],
    status: "coming_soon",
  },
  {
    slug: "long-distance",
    title: "Long Distance",
    description:
      "Bridge the miles with a digital space that keeps you connected. Perfect for couples or friends apart.",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
    gradient: "from-indigo-50 to-blue-50",
    features: [
      "Distance countdown",
      "Virtual date ideas",
      "Shared memories",
      "Next visit countdown",
    ],
    status: "coming_soon",
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ============================================================================
// COMPONENTS
// ============================================================================

function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      {/* Handwriting accent */}
      <span className="mb-4 inline-block font-handwriting text-xl text-rose-500">
        What are we celebrating?
      </span>

      <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
        Choose your moment
      </h1>

      <p className="mt-6 text-lg text-neutral-600 md:text-xl">
        Every emotion deserves its own space. Pick an occasion and create
        something beautiful in minutes.
      </p>
    </motion.div>
  );
}

function FeatureItem({ feature }: { feature: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-neutral-600">
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>{feature}</span>
    </li>
  );
}

function OccasionCard({ occasion }: { occasion: Occasion }) {
  // const router = useRouter();
  const isActive = occasion.status === "active";
  const isFeatured = occasion.slug === "valentine";

  return (
    <motion.div variants={cardVariants} className="group h-full">
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300
        ${
          isFeatured
            ? "border-rose-200 ring-2 ring-rose-100"
            : isActive
              ? "border-neutral-200 hover:border-rose-200"
              : "border-neutral-200/60 opacity-75"
        }
        ${isActive ? "hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/10" : ""}
        `}
      >
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-center text-sm font-medium text-white">
            {occasion.badge} — {occasion.price}
          </div>
        )}

        {/* Coming soon badge */}
        {!isActive && (
          <span className="absolute right-4 top-4 z-10 rounded-full border border-neutral-300 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm backdrop-blur-sm">
            Coming soon
          </span>
        )}

        {/* Image */}
        <div
          className={`relative w-full overflow-hidden bg-gradient-to-br ${occasion.gradient} ${isFeatured ? "mt-10 h-48" : "h-44"}`}
        >
          <img
            src={occasion.image}
            alt={occasion.title}
            className={`h-full w-full object-cover transition-transform duration-500 ${isActive ? "group-hover:scale-105" : ""}`}
            loading={occasion.slug === "valentine" ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 font-display text-xl font-semibold text-neutral-900">
            {occasion.title}
          </h3>

          <p className="mb-5 text-sm leading-relaxed text-neutral-600">
            {occasion.description}
          </p>

          <ul className="mb-6 space-y-2">
            {occasion.features.map((feature) => (
              <FeatureItem key={feature} feature={feature} />
            ))}
          </ul>

          {/* Button */}
          {isActive && occasion.href ? (
            <button
              onClick={() => {
                // router.push(occasion.href!);
                window.location.href = occasion.href!;
              }}
              className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-300
                ${
                  isFeatured
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/10"
                }
              `}
            >
              Create {occasion.title} site
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          ) : (
            <button
              disabled
              className="mt-auto w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-3.5 text-sm font-medium text-neutral-400"
            >
              Available soon
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mx-auto mt-20 max-w-2xl text-center"
    >
      <div className="rounded-2xl border border-rose-100 bg-rose-50/50 px-8 py-8">
        <span className="mb-2 inline-block font-handwriting text-lg text-rose-500">
          Have something special in mind?
        </span>
        <h3 className="font-display text-xl font-semibold text-neutral-900">
          We&apos;re adding more occasions soon
        </h3>
        <p className="mt-2 text-neutral-600">
          Tell us what moment you want to celebrate and we&apos;ll prioritize
          it.
        </p>
        <a
          href="mailto:hello@bandhan.love"
          className="mt-4 inline-flex items-center gap-2 font-medium text-rose-600 transition-colors hover:text-rose-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Let us know
        </a>
      </div>
    </motion.div>
  );
}

function BackLink() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to home
      </Link>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function OccasionsPage() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-rose-50/50 via-white to-amber-50/30 px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <PageHeader />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.slug} occasion={occasion} />
          ))}
        </motion.div>

        <FooterCTA />
      </div>
    </section>
  );
}
