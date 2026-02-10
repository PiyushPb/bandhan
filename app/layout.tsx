import type { Metadata } from "next";
import { Cal_Sans, Google_Sans, Urbanist } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-google-sans",
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
  title: "Bandhan",
  description: "Your app description",
};

import { Toaster } from "react-hot-toast";

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
      `}
    >
      <head>
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
