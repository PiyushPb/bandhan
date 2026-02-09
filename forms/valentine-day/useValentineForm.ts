"use client";

import { useState, useCallback, useEffect } from "react";
import { TemplateData, TemplateId, FormState } from "@/types/template";
import { formStorage } from "@/lib/form-storage";
import { PhotoItem } from "@/components/forms";

// Step configuration
export interface StepConfig {
  id: string;
  title: string;
  description: string;
  isOptional?: boolean;
  forTemplates?: TemplateId[];
}

export const FORM_STEPS: StepConfig[] = [
  {
    id: "basic-info",
    title: "Basic Info",
    description: "Who is this for?",
  },
  {
    id: "story",
    title: "Your Story",
    description: "How did you meet?",
  },
  {
    id: "reasons",
    title: "Reasons",
    description: "Why do you love them?",
  },
  {
    id: "photos",
    title: "Photos",
    description: "Your memories together",
  },
  {
    id: "final-message",
    title: "Final Message",
    description: "Your closing words",
  },
  {
    id: "secret-letter",
    title: "Secret Letter",
    description: "A hidden surprise",
    isOptional: true,
    forTemplates: ["love-timeline", "polaroid-memories"],
  },
  {
    id: "preview",
    title: "Preview",
    description: "See your creation",
  },
];

// Validation errors type
export interface FormErrors {
  fromName?: string;
  toName?: string;
  greeting?: string;
  story?: string;
  reasons?: string;
  photos?: string;
  finalMessage?: string;
  secretLetter?: {
    title?: string;
    body?: string;
  };
}

// Initial form data
const initialFormData: TemplateData = {
  basicInfo: {
    fromName: "",
    toName: "",
    greeting: "",
  },
  story: "",
  reasons: ["", "", ""],
  photos: [],
  finalMessage: "",
  secretLetter: undefined,
};

interface UseValentineFormOptions {
  templateId: TemplateId;
  autoSave?: boolean;
}

export function useValentineForm({ templateId, autoSave = true }: UseValentineFormOptions) {
  const [formData, setFormData] = useState<TemplateData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Get steps for this template
  const steps = FORM_STEPS.filter(
    (step) => !step.forTemplates || step.forTemplates.includes(templateId)
  );

  // Load saved data on mount
  useEffect(() => {
    const saved = formStorage.load();
    if (saved) {
      setFormData({
        basicInfo: saved.basicInfo || initialFormData.basicInfo,
        story: saved.story || initialFormData.story,
        reasons: saved.reasons || initialFormData.reasons,
        photos: saved.photos || initialFormData.photos,
        finalMessage: saved.finalMessage || initialFormData.finalMessage,
        secretLetter: saved.secretLetter,
      });
      // Start at step 0 (basic info), don't restore currentStep
      setCurrentStep(0);
      setCompletedSteps(saved.completedSteps || []);
    }
    setIsLoading(false);
  }, []);

  // Auto-save when form data changes
  useEffect(() => {
    if (!isLoading && autoSave) {
      const saveTimer = setTimeout(() => {
        setIsSaving(true);
        formStorage.save({
          ...formData,
          currentStep,
          completedSteps,
          selectedTemplate: templateId,
        });
        setTimeout(() => setIsSaving(false), 500);
      }, 1000);

      return () => clearTimeout(saveTimer);
    }
  }, [formData, currentStep, completedSteps, templateId, isLoading, autoSave]);

  // Update form data
  const updateFormData = useCallback((updates: Partial<TemplateData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach((key) => {
        delete newErrors[key as keyof FormErrors];
      });
      return newErrors;
    });
  }, []);

  // Update basic info
  const updateBasicInfo = useCallback(
    (field: keyof TemplateData["basicInfo"], value: string) => {
      setFormData((prev) => ({
        ...prev,
        basicInfo: { ...prev.basicInfo, [field]: value },
      }));
      // Clear error
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  // Update reasons list
  const updateReasons = useCallback((reasons: string[]) => {
    setFormData((prev) => ({ ...prev, reasons }));
    setErrors((prev) => ({ ...prev, reasons: undefined }));
  }, []);

  // Update photos
  const updatePhotos = useCallback((photos: PhotoItem[]) => {
    setFormData((prev) => ({
      ...prev,
      photos: photos.map((p) => ({ url: p.url, caption: p.caption })),
    }));
    setErrors((prev) => ({ ...prev, photos: undefined }));
  }, []);

  // Update secret letter
  const updateSecretLetter = useCallback(
    (field: "title" | "body" | "signature", value: string) => {
      setFormData((prev) => ({
        ...prev,
        secretLetter: {
          title: prev.secretLetter?.title || "",
          body: prev.secretLetter?.body || "",
          signature: prev.secretLetter?.signature,
          [field]: value,
        },
      }));
    },
    []
  );

  // Validate current step
  const validateStep = useCallback(
    (stepIndex: number): boolean => {
      const step = steps[stepIndex];
      const newErrors: FormErrors = {};

      switch (step.id) {
        case "basic-info":
          if (!formData.basicInfo.fromName.trim()) {
            newErrors.fromName = "Your name is required";
          }
          if (!formData.basicInfo.toName.trim()) {
            newErrors.toName = "Their name is required";
          }
          if (!formData.basicInfo.greeting.trim()) {
            newErrors.greeting = "A greeting is required";
          }
          break;

        case "story":
          if (!formData.story.trim()) {
            newErrors.story = "Please share your story";
          } else if (formData.story.trim().length < 50) {
            newErrors.story = "Story should be at least 50 characters";
          }
          break;

        case "reasons":
          const filledReasons = formData.reasons.filter((r) => r.trim());
          if (filledReasons.length < 3) {
            newErrors.reasons = "Please add at least 3 reasons";
          }
          break;

        case "photos":
          if (formData.photos.length < 2) {
            newErrors.photos = "Please add at least 2 photos";
          }
          break;

        case "final-message":
          if (!formData.finalMessage.trim()) {
            newErrors.finalMessage = "Please write a final message";
          }
          break;

        case "secret-letter":
          // Optional step, but if started, require title and body
          if (step.isOptional && !formData.secretLetter?.title && !formData.secretLetter?.body) {
            return true; // Skip validation if not started
          }
          if (formData.secretLetter && !formData.secretLetter.title?.trim()) {
            newErrors.secretLetter = { title: "Title is required" };
          }
          if (formData.secretLetter && !formData.secretLetter.body?.trim()) {
            newErrors.secretLetter = {
              ...newErrors.secretLetter,
              body: "Letter body is required",
            };
          }
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData, steps]
  );

  // Go to next step
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
      return true;
    }
    return false;
  }, [currentStep, steps.length, completedSteps, validateStep]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Go to specific step
  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        // Only allow going back or to completed steps
        if (stepIndex <= currentStep || completedSteps.includes(stepIndex)) {
          setCurrentStep(stepIndex);
        }
      }
    },
    [steps.length, currentStep, completedSteps]
  );

  // Skip optional step
  const skipStep = useCallback(() => {
    const step = steps[currentStep];
    if (step.isOptional && currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps, completedSteps]);

  // Check if form is complete
  const isComplete = completedSteps.length >= steps.filter((s) => !s.isOptional).length;

  // Get current step info
  const currentStepInfo = steps[currentStep];

  // Check if on last step
  const isLastStep = currentStep === steps.length - 1;

  // Check if current step is optional
  const isCurrentStepOptional = currentStepInfo?.isOptional || false;

  return {
    // State
    formData,
    currentStep,
    completedSteps,
    errors,
    isLoading,
    isSaving,

    // Step info
    steps,
    currentStepInfo,
    isLastStep,
    isCurrentStepOptional,
    isComplete,

    // Actions
    updateFormData,
    updateBasicInfo,
    updateReasons,
    updatePhotos,
    updateSecretLetter,
    validateStep,
    nextStep,
    prevStep,
    goToStep,
    skipStep,
  };
}
