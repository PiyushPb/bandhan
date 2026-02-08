"use client";

import React from "react";
import LoveTimeline from "@/templates/valentine-day/LoveTimeline/LoveTimeline";
import { TemplateData } from "@/types/template";

const DEMO_DATA: TemplateData = {
  basicInfo: {
    fromName: "Rohan",
    toName: "Priya",
    greeting: "To my forever person",
  },
  story: `We met at a coffee shop in Mumbai in 2023. I was reading a book and you asked if the seat next to me was free. We ended up talking for hours and I knew you were special from that very first conversation.

From that day on, every moment with you has been an adventure. You've shown me what true love feels like.`,
  reasons: [
    "Your infectious laugh that lights up every room you enter",
    "How you always remember the small things that matter to me",
    "Your kindness to everyone, even strangers on the street",
    "The way you support my dreams as if they were your own",
    "Your beautiful smile that makes my heart skip a beat",
    "How you make ordinary moments feel extraordinary",
  ],
  photos: [
    {
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      caption: "Our first date at Marine Drive",
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      caption: "That day we got caught in the rain",
    },
    {
      url: "https://images.unsplash.com/photo-1504203328398-5b5de5d2c4e1?w=800",
      caption: "Dancing under the stars",
    },
    {
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800",
      caption: "Our Goa trip - best vacation ever!",
    },
  ],
  secretLetter: {
    title: "One Last Thing… 💌",
    body: `Priya,

      If you've reached here, it means you beat me fair and square.
      But the truth is — I lost the moment I fell in love with you.

      You are my calm, my chaos, my home.
      No game, no distance, no time could ever change that.

      I choose you. Always.`,
    signature: "— Rohan",
  },
  finalMessage: `I can't imagine my life without you. Every day with you is a gift, and I can't wait to spend forever by your side.

Here's to our love story, today and always.

Happy Valentine's Day, my love! 💕`,
};

function page() {
  return (
    <div>
      <LoveTimeline data={DEMO_DATA} />
    </div>
  );
}

export default page;
