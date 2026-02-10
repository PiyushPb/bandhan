// data/templates/valentine.ts

import { Template } from "@/types/template";

export const TEMPLATES: Template[] = [
  {
    id: "love-timeline",
    name: "Love Timeline",
    description:
      "Perfect for sharing your journey together with a beautiful vertical timeline",
    badge: "₹99",
    price: 99,
    status: "active",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1487035242901-d419a42d17af?q=80&w=727&auto=format&fit=crop",
    previewGifUrl:
      "https://images.unsplash.com/photo-1487035242901-d419a42d17af?q=80&w=727&auto=format&fit=crop",
    features: [
      "Up to 6 photos",
      "Vertical timeline design",
      "Secret letter reveal",
      "Animated transitions",
    ],
    maxPhotos: 6,
  },
  {
    id: "polaroid-memories",
    name: "Polaroid Memories",
    description:
      "Instagram-style polaroid grid with handwritten notes for a playful feel",
    badge: "₹199",
    price: 199,
    status: "active",
    tag: "Best Seller",
    thumbnailUrl: "/templates/polaroid-thumb.jpg",
    previewGifUrl: "/templates/polaroid-preview.gif",
    features: [
      "Up to 10 photos",
      "Masonry polaroid grid",
      "Handwritten fonts",
      "Secret letter reveal",
      "Scrapbook decorations",
    ],
    maxPhotos: 10,
  },
  {
    id: "heartbeat-scroll",
    name: "Heartbeat Scroll",
    description:
      "Modern, animated experience with heart-shaped reveals and smooth effects",
    badge: "₹499",
    price: 499,
    status: "sold-out",
    thumbnailUrl: "/templates/heartbeat-thumb.jpg",
    previewGifUrl: "/templates/heartbeat-preview.gif",
    features: [
      "Up to 15 photos",
      "Cinematic scroll animations",
      "Heart-shaped reveals",
      "Premium dark theme",
      "Secret letter reveal",
      "Background music support",
    ],
    maxPhotos: 15,
  },
];
