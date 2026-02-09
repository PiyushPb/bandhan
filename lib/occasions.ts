import { occasions } from "@/data/occasions";
import { OccasionSlug } from "@/types/occasion";

export function getAllOccasions() {
  return occasions;
}

export function getOccasionBySlug(slug: string) {
  return occasions.find((o) => o.slug === slug) ?? null;
}

export function isValidOccasionSlug(slug: string): slug is OccasionSlug {
  return occasions.some((o) => o.slug === slug);
}
