// app/demo/polaroid/page.tsx

"use client";

import PolaroidMemories from "@/templates/valentine-day/PolaroidMemories/PolaroidMemories";
import { TemplateData } from "@/types/template";

const DEMO_DATA: TemplateData = {
  basicInfo: {
    fromName: "Rohan",
    toName: "Priya",
    greeting: "My forever love",
  },
  story: `We met at a coffee shop in Mumbai, 2023. You asked if the seat was free, and we talked for hours. 

I knew from that first conversation that you were someone special. Every moment since has been magical.`,
  reasons: [
    "Your infectious laugh that lights up every room",
    "How you remember every small detail about me",
    "The way you dance when you think no one is watching",
    "Your kindness to everyone you meet",
    "How you make ordinary days feel extraordinary",
    "Your courage to always be yourself",
  ],
  photos: [
    {
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
      caption: "Our first date at Marine Drive 💕",
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      caption: "Dancing in the rain",
    },
    {
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80",
      caption: "Sunset in Goa 🌅",
    },
    {
      url: "https://images.unsplash.com/photo-1504203328398-5b5de5d2c4e1?w=800&q=80",
      caption: "Under the stars",
    },
    {
      url: "https://images.unsplash.com/photo-1542107152-d49e7b3a8fdd?w=800&q=80",
      caption: "Adventure time!",
    },
  ],
  finalMessage: `Every day with you is a gift. 

You've shown me what true love means, and I can't wait to create a lifetime of memories together.

Thank you for being you. 

I love you more than words can say. 💕`,
};

export default function PolaroidDemoPage() {
  return <PolaroidMemories data={DEMO_DATA} />;
}
