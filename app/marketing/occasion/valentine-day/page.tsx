"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateId } from "@/types/template";
import { formStorage } from "@/lib/form-storage";
import { TEMPLATES } from "./data/Template";

import HeartDroppingBG from "@/components/bg/HeartDroppingBG";
import PageHeader from "./components/PageHeader";
import TemplateGrid from "./components/TemplateGrid";
import ContinueButton from "./components/ContinueButton";

export default function TemplateSelectionPage() {
  const router = useRouter();

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = formStorage.loadTemplate();
    if (saved) setSelectedTemplate(saved as TemplateId);
  }, []);

  const handleSelectTemplate = (templateId: TemplateId) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template || template.status === "sold-out") return;

    setSelectedTemplate(templateId);
    formStorage.save({
      selectedTemplate: templateId,
      templatePrice: template.price,
    });
  };

  const handlePreviewTemplate = (templateId: TemplateId) => {
    router.push(`/preview/valentine-day/${templateId}?demo=true`);
  };

  const handleContinue = () => {
    if (!selectedTemplate) return;
    setIsLoading(true);

    formStorage.save({
      selectedTemplate,
      currentStep: 1,
    });

    router.push(`/create/valentine-day/${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen relative">
      <HeartDroppingBG />

      <PageHeader onBack={() => router.back()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TemplateGrid
          templates={TEMPLATES}
          selectedTemplate={selectedTemplate}
          onSelect={handleSelectTemplate}
          onPreview={(template) => handlePreviewTemplate(template.id)}
        />

        <ContinueButton
          disabled={!selectedTemplate}
          loading={isLoading}
          onClick={handleContinue}
        />
      </main>
    </div>
  );
}
