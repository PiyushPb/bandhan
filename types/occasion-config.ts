import { Template } from "@/types/template";
import { JSX, ReactNode } from "react";

export type OccasionConfig = {
  slug: string;
  title: string;
  subtitle: string;
  stepLabel: string;
  progress: number; // %
  templates: Template[];
  Background?: () => JSX.Element;
};
