import { Occasion } from "@/types/occasion";

export const occasions: Occasion[] = [
  {
    slug: "valentine-day",
    title: "Valentine's Day",
    description:
      "Create a personal, beautifully designed website to express love, memories, and meaningful moments.",
    features: [
      "Romantic & minimal templates",
      "Photos, messages, and videos",
      "Instant shareable link",
    ],
    status: "active",
    href: "/occasion/valentine-day",
    gradient: "from-rose-50 via-pink-50 to-red-50",
    image:
      "https://images.unsplash.com/photo-1513193563746-fac77a988f8d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "wedding",
    title: "Wedding Invitation",
    description:
      "Design elegant digital wedding invitations and share all important details in one place.",
    features: [
      "Event details & schedules",
      "Photo galleries",
      "Guest-friendly experience",
    ],
    status: "coming-soon",
    gradient: "from-amber-50 via-orange-50 to-rose-50",
    image:
      "https://images.unsplash.com/photo-1561287495-a3fe1fd28504?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "birthday",
    title: "Birthday Celebration",
    description:
      "Celebrate birthdays with a personalized page filled with memories, wishes, and moments.",
    features: ["Custom messages", "Photo memories", "Easy sharing"],
    status: "coming-soon",
    gradient: "from-blue-50 via-indigo-50 to-purple-50",
    image:
      "https://images.unsplash.com/photo-1502035618526-6b2f1f5bca1b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "holiday-invitations",
    title: "Holiday Invitations",
    description:
      "Create beautiful digital invitations for holidays, celebrations, and seasonal gatherings.",
    features: [
      "Festive templates",
      "Event details & RSVP",
      "Easy sharing links",
    ],
    status: "coming-soon",
    gradient: "from-emerald-50 via-red-50 to-amber-50",
    image:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "family",
    title: "Family Moments",
    description:
      "Create a shared space for family memories, celebrations, and important moments.",
    features: ["Private family pages", "Photo collections", "Long-term access"],
    status: "coming-soon",
    gradient: "from-emerald-50 via-teal-50 to-cyan-50",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600&auto=format&fit=crop",
  },
];
