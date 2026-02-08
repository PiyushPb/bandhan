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
    thumbnailUrl:
      "https://images.unsplash.com/photo-1487035242901-d419a42d17af?q=80&w=727&auto=format&fit=crop",
    previewGifUrl:
      "https://images.unsplash.com/photo-1487035242901-d419a42d17af?q=80&w=727&auto=format&fit=crop",
    features: ["Vertical scroll", "Timeline design", "Story cards"],
  },
  {
    id: "polaroid-memories",
    name: "Polaroid Memories",
    description:
      "Instagram-style polaroid grid with handwritten notes for a playful feel",
    badge: "₹199",
    price: 199,
    thumbnailUrl: "/templates/polaroid-thumb.jpg",
    previewGifUrl: "/templates/polaroid-preview.gif",
    features: ["Masonry grid", "Handwritten fonts", "Playful animations"],
  },
  {
    id: "heartbeat-scroll",
    name: "Heartbeat Scroll",
    description:
      "Modern, animated experience with heart-shaped reveals and smooth effects",
    badge: "₹499",
    price: 499,
    thumbnailUrl: "/templates/heartbeat-thumb.jpg",
    previewGifUrl: "/templates/heartbeat-preview.gif",
    features: ["Scroll animations", "Heart effects", "Dark theme"],
  },
];
