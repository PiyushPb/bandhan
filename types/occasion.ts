export type OccasionSlug = "valentines-day" | "wedding" | "birthday";

export interface Occasion {
  slug: string; //TODO : change to OccasionSlug
  title: string;
  description: string;
  features: string[];
  gradient: string;
  image: string;
  status: "active" | "coming-soon";
  href?: string;
}
