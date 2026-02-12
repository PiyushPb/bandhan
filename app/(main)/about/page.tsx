"use client";

import { motion } from "framer-motion";
// import { useRouter } from "next/navigation"; // Uncomment for Next.js

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
          alt="Friends laughing together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/70 via-warm-900/60 to-warm-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          <span className="inline-block font-handwriting text-rose-300 text-xl md:text-2xl mb-4">
            Our story
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
            We believe feelings
            <br />
            <span className="text-rose-200">deserve their own space</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Bandhan was born from a simple idea — that the most meaningful
            moments in life deserve more than a text message or a social media
            post.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// THE PROBLEM SECTION
// ============================================================================

function TheProblem() {
  const problems = [
    {
      icon: "💬",
      title: "Text messages feel temporary",
      description:
        "You pour your heart into a message, and it disappears in a sea of notifications.",
    },
    {
      icon: "📱",
      title: "Social media feels public",
      description:
        "Your private feelings don't belong on a feed designed for likes and comments.",
    },
    {
      icon: "💐",
      title: "Physical gifts feel generic",
      description:
        "Flowers wilt. Cards get lost. Chocolates get eaten. What remains?",
    },
    {
      icon: "🎨",
      title: "Creating something beautiful is hard",
      description:
        "You're not a designer. You're not a developer. But you have something to say.",
    },
  ];

  return (
    <SectionWrapper className="bg-warm-50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="font-handwriting text-rose-500 text-lg md:text-xl">
            The problem we noticed
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-900 mt-3 tracking-tight">
            Expressing love shouldn't be this hard
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-6 md:p-8 rounded-2xl border border-warm-100 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{problem.icon}</span>
              <h3 className="font-display text-xl text-warm-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-warm-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

// ============================================================================
// OUR SOLUTION SECTION
// ============================================================================

function OurSolution() {
  return (
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80"
              alt="Couple sharing a moment"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating quote */}
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl shadow-warm-900/10 max-w-[280px] border border-warm-100">
            <p className="font-handwriting text-xl text-warm-800 leading-relaxed">
              "What if feelings could have a home on the internet?"
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="font-handwriting text-rose-500 text-lg md:text-xl"
          >
            So we built Bandhan
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-900 mt-3 mb-6 tracking-tight leading-[1.15]"
          >
            Not a website builder.
            <br />
            <span className="text-rose-500">An emotion builder.</span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="space-y-4 text-warm-600 leading-relaxed"
          >
            <p>
              Bandhan is a platform that turns your feelings into a beautiful,
              shareable experience. No coding. No design skills. Just you, your
              memories, and 5 minutes.
            </p>
            <p>
              When someone opens your Bandhan, they don&apos;t just read a
              message they experience it. They scroll through shared photos.
              They read words meant only for them. They hear songs tied to
              memories. They feel something.
            </p>
            <p className="text-warm-800 font-medium">
              That feeling is what we create.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// ============================================================================
// OUR VALUES SECTION
// ============================================================================

function OurValues() {
  const values = [
    {
      title: "Warmth over polish",
      description:
        "We'd rather make something that feels warm and personal than something that looks perfect but feels cold.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80",
    },
    {
      title: "Simplicity over features",
      description:
        "We don't add features to impress. We add what helps you express. Nothing more, nothing less.",
      image:
        "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=600&q=80",
    },
    {
      title: "Meaning over metrics",
      description:
        "We measure success not by clicks or conversions, but by the moments we help create.",
      image:
        "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=600&q=80",
    },
  ];

  return (
    <SectionWrapper className="bg-warm-900 text-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="font-handwriting text-rose-300 text-lg md:text-xl">
            What we stand for
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mt-3 tracking-tight">
            Our values
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-3">
                {value.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

// ============================================================================
// MISSION SECTION
// ============================================================================

function Mission() {
  return (
    <SectionWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="font-handwriting text-rose-500 text-lg md:text-xl">
          Our mission
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-warm-900 mt-4 mb-8 tracking-tight leading-[1.15]">
          To give every meaningful emotion
          <br />
          <span className="text-rose-500">its own space on the internet</span>
        </h2>

        <p className="text-lg md:text-xl text-warm-600 leading-relaxed max-w-2xl mx-auto">
          Whether it&apos;s a wedding, a birthday, an anniversary, or just a
          &quot;thinking of you&quot; moment, we believe your feelings deserve
          to be more than a notification. They deserve to be an experience.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}

// ============================================================================
// WHO WE ARE SECTION
// ============================================================================

function WhoWeAre() {
  return (
    <SectionWrapper className="bg-gradient-to-br from-rose-50 to-warm-50">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="order-2 lg:order-1"
        >
          <motion.span
            variants={fadeInUp}
            className="font-handwriting text-rose-500 text-lg md:text-xl"
          >
            Who we are
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-900 mt-3 mb-6 tracking-tight"
          >
            A small team with big hearts
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="space-y-4 text-warm-600 leading-relaxed"
          >
            <p>
              We&apos;re a small, passionate team of designers, developers, and
              romantics who believe the internet can be a more personal place.
            </p>
            <p>
              We&apos;ve all been there wanting to say something meaningful
              but not having the right way to say it. That&apos;s why we built
              Bandhan.
            </p>
            <p>
              Every template, every feature, every pixel is designed with one
              question in mind:{" "}
              <span className="text-warm-800 font-medium">
                &quot;Will this help someone express something they couldn&apos;t
                before?&quot;
              </span>
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white px-5 py-3 rounded-full border border-warm-200">
              <span className="text-warm-800">🇮🇳 Made in India</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-full border border-warm-200">
              <span className="text-warm-800">💜 Built with love</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-full border border-warm-200">
              <span className="text-warm-800">✨ For everyone</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="order-1 lg:order-2"
        >
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTA() {
  // const router = useRouter(); // Uncomment for Next.js

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920&q=80"
          alt="Romantic sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 to-warm-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          <span className="font-handwriting text-rose-200 text-xl md:text-2xl">
            Ready to create something meaningful?
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 tracking-tight leading-[1.1]">
            Your story is waiting
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Create a beautiful website for someone you love. It takes 5 minutes
            and costs less than a coffee.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              // onClick={() => router.push("/occasions")} // Uncomment for Next.js
              className="w-full sm:w-auto bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all duration-300 shadow-lg shadow-black/20"
            >
              Create your Bandhan
            </motion.button>
            <motion.a
              href="/"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto border-2 border-white/60 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Back to home
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Hero />
      <TheProblem />
      <OurSolution />
      <Mission />
      <OurValues />
      <WhoWeAre />
      <CTA />
    </main>
  );
}
