import { OCCASIONS } from "@/data/occasions";
import { OccasionSlug } from "@/types/occasion";

export function getAllOccasions() {
  return OCCASIONS;
}

export function getOccasionBySlug(slug: string) {
  return OCCASIONS.find((o) => o.slug === slug) ?? null;
}

export function isValidOccasionSlug(slug: string): slug is OccasionSlug {
  return OCCASIONS.some((o) => o.slug === slug);
}
