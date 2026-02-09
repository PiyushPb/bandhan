// lib/form-storage.ts

import { FormState, TemplateData } from "@/types/template";
import type { TemplateId } from "@/types/template"; // adjust import path if TemplateId is elsewhere

const STORAGE_KEY = "valentine-site-draft";
const TEMPLATE_KEY = "selected-template";

type StoredTemplate = {
  id: TemplateId;
  price: number;
};

export const formStorage = {
  // ----------------------------
  // Generic form save/load
  // ----------------------------
  save: (data: Partial<FormState>) => {
    try {
      const existing = formStorage.load();
      const updated = {
        ...existing,
        ...data,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save form data:", error);
    }
  },

  load: (): Partial<FormState> => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Failed to load form data:", error);
      return {};
    }
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TEMPLATE_KEY);
  },

  // ----------------------------
  // Template selection (legacy)
  // ----------------------------
  saveTemplate: (templateId: string) => {
    localStorage.setItem(TEMPLATE_KEY, templateId);
  },

  loadTemplate: (): string | null => {
    return localStorage.getItem(TEMPLATE_KEY);
  },

  // ----------------------------
  // Template selection (NEW)
  // Used for payment step
  // ----------------------------
  saveSelectedTemplate: (template: StoredTemplate) => {
    try {
      const existing = formStorage.load();
      formStorage.save({
        ...existing,
        selectedTemplate: template.id,
        templatePrice: template.price,
      });
    } catch (error) {
      console.error("Failed to save selected template:", error);
    }
  },

  getSelectedTemplate: (): StoredTemplate | null => {
    const data = formStorage.load();

    if (!data.selectedTemplate || !data.templatePrice) {
      return null;
    }

    return {
      id: data.selectedTemplate as TemplateId,
      price: data.templatePrice as number,
    };
  },

  // ----------------------------
  // Autosave status
  // ----------------------------
  getAutoSaveStatus: (): string => {
    const data = formStorage.load();
    if (data.lastSaved) {
      const saved = new Date(data.lastSaved);
      const now = new Date();
      const diffMs = now.getTime() - saved.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Saved just now";
      if (diffMins === 1) return "Saved 1 minute ago";
      if (diffMins < 60) return `Saved ${diffMins} minutes ago`;
      return "Saved earlier";
    }
    return "Not saved";
  },
};
