"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Instagram,
  Twitter,
  MessageCircle,
  LucideIcon,
} from "lucide-react";

const FOOTER_LINKS = {
  product: {
    title: "Product",
    links: [
      { href: "#/pricing", label: "Pricing" },
      { href: "/occasion/valentine-day", label: "Valentine Day" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      // { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

const SOCIAL_LINKS: { href: string; icon: LucideIcon; label: string }[] = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: MessageCircle, label: "MessageCircle" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on preview and template pages
  if (pathname.includes("/w/") || pathname.includes("/preview/")) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Bandhan</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create beautiful, interactive digital memories for your loved
              ones. The perfect way to express your feelings.
            </p>
          </div>

          {/* Link Sections */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-pink-600 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Bandhan. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in
            India
          </p>
        </div>
      </div>
    </footer>
  );
}
