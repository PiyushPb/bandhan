// data/templates/demoData.ts

import { TemplateData } from "@/types/template";

/**
 * Demo data for template previews.
 * Used when ?demo=true is passed to the preview page.
 */

export const DEMO_DATA: Record<string, TemplateData> = {
  "love-timeline": {
    basicInfo: {
      fromName: "Arjun",
      toName: "Priya",
      greeting: "You are the reason my heart smiles every day 💕",
    },
    story:
      "We met on a rainy evening at a bookstore cafe. You were reading poetry, and I was pretending to read while stealing glances at you. Three years later, every day still feels like that first magical evening.",
    reasons: [
      "The way your eyes light up when you talk about something you love",
      "How you always know the right thing to say when I'm feeling down",
      "Your infectious laughter that fills every room with warmth",
      "The little notes you leave in my jacket pockets",
      "How you make even ordinary moments feel extraordinary",
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
        caption: "Our first trip together ✨",
      },
      {
        url: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=800&auto=format&fit=crop",
        caption: "That sunset we'll never forget 🌅",
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
        caption: "Coffee dates are our thing ☕",
      },
      {
        url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop",
        caption: "Adventures with you 🏔️",
      },
    ],
    finalMessage:
      "Every love story is beautiful, but ours is my favorite. Here's to a lifetime of laughter, adventures, and love. Happy Valentine's Day, my love! 💖",
    secretLetter: {
      title: "My Dearest Priya",
      body: "There are a million things I want to say, but the most important one is this — you make me want to be a better person every single day. Thank you for choosing me, for loving me, and for being the most amazing person I know. I love you more than words could ever express.",
      signature: "Forever yours, Arjun 💕",
    },
  },

  "polaroid-memories": {
    basicInfo: {
      fromName: "Rahul",
      toName: "Ananya",
      greeting: "To the one who makes every moment beautiful 🌸",
    },
    story:
      "From college friends to soulmates — our journey has been nothing short of a fairy tale. Remember when we accidentally wore matching outfits on our first date? That's when I knew the universe was rooting for us!",
    reasons: [
      "Your smile is my favorite sunrise",
      "You make burnt toast taste like a five-star meal",
      "The way you dance when you think nobody's watching",
      "How you remember every little detail about the things I love",
      "Your hugs feel like coming home",
      "The playlist you made me on our anniversary",
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
        caption: "Our favorite spot 🌿",
      },
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
        caption: "That magical evening 🌙",
      },
      {
        url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=800&auto=format&fit=crop",
        caption: "Weekend vibes 🎶",
      },
      {
        url: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=800&auto=format&fit=crop",
        caption: "Beach day with you 🏖️",
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
        caption: "Our little rituals ☕",
      },
      {
        url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop",
        caption: "Adventures together 🌄",
      },
    ],
    finalMessage:
      "You are my today and all of my tomorrows. Thank you for painting my world in the most beautiful colors. Happy Valentine's Day! 🌹✨",
    secretLetter: {
      title: "Dear Ananya",
      body: "If I had to choose between breathing and loving you, I would use my last breath to say I love you. You're not just my partner — you're my best friend, my biggest cheerleader, and my safe place. I'm so grateful for every second I get to spend with you.",
      signature: "All my love, Rahul 💝",
    },
  },
};
