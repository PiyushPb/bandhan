import type { Metadata } from "next";
import {
  Cal_Sans,
  Google_Sans,
  Urbanist,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-google-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-playfair-display",
});

const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-cal-sans",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: {
    default: "Bandhan - Connect, Celebrate, and Strengthen Your Bonds",
    template: "%s | Bandhan",
  },
  description:
    "Bandhan helps you connect with loved ones, celebrate relationships, and strengthen bonds that matter. Create meaningful connections and share special moments together.",
  keywords: [
    "relationships",
    "connections",
    "social",
    "bonding",
    "celebrations",
    "family",
    "friends",
  ],
  authors: [{ name: "Bandhan Team" }],
  creator: "Bandhan",
  publisher: "Bandhan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bandhan - Connect, Celebrate, and Strengthen Your Bonds",
    description:
      "Bandhan helps you connect with loved ones, celebrate relationships, and strengthen bonds that matter.",
    url: "/",
    siteName: "Bandhan",
    images: [
      {
        url: "/og-image.png", // Make sure to add this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Bandhan - Connect and Celebrate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bandhan - Connect, Celebrate, and Strengthen Your Bonds",
    description:
      "Bandhan helps you connect with loved ones and strengthen bonds that matter.",
    images: ["/og-image.png"],
    creator: "@bandhan", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bandhan",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: 'verification-code',
    // yahoo: 'verification-code',
  },
  category: "social",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${googleSans.variable}
        ${calSans.variable}
        ${urbanist.variable}
        ${playfairDisplay.variable}
      `}
    >
      <head>
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />

        {/* Handwriting fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Caveat:wght@400;500;600;700&family=Indie+Flower&family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className="min-h-screen">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
