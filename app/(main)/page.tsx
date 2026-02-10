"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Refined animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-white antialiased">
      {/* Navigation */}
      {/* <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="font-cal text-xl md:text-2xl font-medium tracking-tight text-neutral-900">
              Bandhan
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#templates"
                className="hidden sm:inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Templates
              </a>
              <a
                href="#pricing"
                className="hidden sm:inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Pricing
              </a>
              <button className="bg-neutral-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/10">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.nav> */}

      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/home-bg.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-cal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              Your moments deserve
              <br />
              <span className="text-white/80">their own space</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
              Create beautiful, personal websites to celebrate weddings,
              birthdays, anniversaries, and the moments that matter most.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-white text-neutral-900 px-8 py-4 rounded-full text-base font-medium hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => {
                  router.push("/occasions");
                }}
              >
                Create your site
              </motion.button>
              <button className="w-full sm:w-auto border-2 border-white/80 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
                View examples
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10"
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-white/80 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-cal text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 mb-6 sm:mb-8 tracking-tight">
              A space for what matters
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6">
              Bandhan is a platform that helps you create personal websites for
              life's meaningful moments. Whether you're celebrating a wedding,
              planning a birthday surprise, or commemorating a family milestone,
              Bandhan gives you a beautiful canvas to share your story.
            </p>

            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed">
              No design skills. No technical knowledge. Just you, your memories,
              and a site that feels like home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="font-cal text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 mb-4 sm:mb-6 tracking-tight">
              Every moment has a story
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Create websites that honor your celebrations, big and small
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {[
              {
                title: "Weddings",
                description:
                  "Share your love story, event details, and registry with guests in one beautiful place.",
              },
              {
                title: "Birthdays",
                description:
                  "Create a personal space for milestone birthdays with photos, wishes, and memories.",
              },
              {
                title: "Anniversaries",
                description:
                  "Celebrate years together with a timeline, photos, and heartfelt messages.",
              },
              {
                title: "Family Milestones",
                description:
                  "Document graduations, new homes, retirements, and the moments that shape your family.",
              },
              {
                title: "Personal Surprises",
                description:
                  "Craft something special for someone you love — a gift that lives forever.",
              },
              {
                title: "Friendships",
                description:
                  "Honor the bonds that matter with shared memories and inside jokes.",
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group bg-white p-6 sm:p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/5"
              >
                <h3 className="text-lg sm:text-xl font-cal font-medium text-neutral-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="font-cal text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 mb-4 sm:mb-6 tracking-tight">
              Three steps to something beautiful
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Creating your personal website takes minutes, not hours
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto"
          >
            {[
              {
                step: "01",
                title: "Choose a template",
                description:
                  "Pick from elegant, minimal, or playful designs crafted for your occasion.",
              },
              {
                step: "02",
                title: "Add your content",
                description:
                  "Share your story, upload photos, and personalize every detail with our guided flow.",
              },
              {
                step: "03",
                title: "Share your site",
                description:
                  "Get a beautiful URL to share with friends, family, or anyone who matters.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mb-6 border-2 border-neutral-900 text-neutral-900 font-cal text-lg sm:text-xl font-medium">
                  {step.step}
                </div>
                <h3 className="text-xl sm:text-2xl font-cal font-medium text-neutral-900 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Bandhan */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="font-cal text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-6 tracking-tight">
              Made for meaning, not complexity
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
              We've built Bandhan to get out of your way and let your story
              shine
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                title: "No coding required",
                description:
                  "Our guided experience helps you create something beautiful without any technical skills.",
              },
              {
                title: "No hosting headaches",
                description:
                  "Your site lives on our platform. Fast, secure, and always online.",
              },
              {
                title: "Beautiful by default",
                description:
                  "Every template is designed with care. Your site will look professional from the start.",
              },
              {
                title: "Built for moments",
                description:
                  "We understand weddings, birthdays, and celebrations — your site will feel just right.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="border border-white/10 bg-white/5 p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-cal font-medium mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32" id="templates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="font-cal text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 mb-4 sm:mb-6 tracking-tight">
              Templates for every style
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Each template is thoughtfully designed to match your occasion
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              {
                name: "Elegant",
                description: "Timeless and refined",
                color: "bg-neutral-100",
              },
              {
                name: "Minimal",
                description: "Clean and focused",
                color: "bg-neutral-50",
              },
              {
                name: "Playful",
                description: "Warm and vibrant",
                color: "bg-neutral-100",
              },
            ].map((template, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div
                  className={`aspect-[3/4] ${template.color} border border-neutral-200 mb-4 sm:mb-6 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-neutral-900/10 group-hover:border-neutral-300`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 border-2 border-neutral-300 bg-white" />
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-1.5 sm:h-2 w-20 sm:w-24 mx-auto bg-neutral-300" />
                      <div className="h-1.5 sm:h-2 w-12 sm:w-16 mx-auto bg-neutral-300" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-cal font-medium text-neutral-900 mb-1 sm:mb-2">
                  {template.name}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600">
                  {template.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-16 sm:py-20 md:py-24 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "10K+", label: "Sites created" },
              { value: "50K+", label: "Happy visitors" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "User rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="font-cal text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-neutral-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-cal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              Your story is waiting
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              Create a beautiful website for your next celebration. Share
              something meaningful with the people you love.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-neutral-900/10 hover:shadow-xl hover:shadow-neutral-900/20"
              >
                Create your Bandhan
              </motion.button>
              <button className="w-full sm:w-auto text-neutral-600 hover:text-neutral-900 text-base font-medium transition-colors">
                Learn more →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="col-span-2 md:col-span-4">
              <h3 className="font-cal text-xl sm:text-2xl font-medium text-neutral-900 mb-3 sm:mb-4">
                Bandhan
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-sm">
                Beautiful websites for life's meaningful moments.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-neutral-900 mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-neutral-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-neutral-900 mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-neutral-900 mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-600 text-center sm:text-left">
              © 2024 Bandhan. Made with care for your moments.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </main>
  );
}
