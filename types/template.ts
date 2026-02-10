// types/template.ts

export type TemplateId =
  | "love-timeline"
  | "polaroid-memories"
  | "heartbeat-scroll";

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  thumbnailUrl: string;
  previewGifUrl: string;
  features: string[];
  price: number;
  badge?: string;
  isPremium?: boolean;
  maxPhotos?: number;
  status?: "active" | "sold-out";
  tag?: string;
}

export interface PhotoData {
  url: string;
  caption?: string;
  file?: File;
}

export interface LoveLetter {
  title: string;
  body: string;
  signature?: string;
}

export interface TemplateData {
  basicInfo: {
    fromName: string;
    toName: string;
    greeting: string;
  };
  story: string;
  reasons: string[];
  photos: {
    url: string;
    caption?: string;
  }[];
  finalMessage: string;

  secretLetter?: {
    title: string;
    body: string;
    signature?: string;
  };
}

export interface FormState extends TemplateData {
  currentStep: number;
  selectedTemplate: TemplateId | null;
  templatePrice: number | null; // ✅ ADD THIS
  completedSteps: number[];
  lastSaved?: string;
}
