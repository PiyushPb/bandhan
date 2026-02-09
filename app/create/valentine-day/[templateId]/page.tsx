"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ValentineFormWizard } from "@/forms/valentine-day";
import { TemplateId } from "@/types/template";
import { TEMPLATES } from "@/data/templates/valentine";
import { formStorage } from "@/lib/form-storage";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";
import HeartDroppingBG from "@/components/bg/HeartDroppingBG";

// Map route params to template IDs
const TEMPLATE_ID_MAP: Record<string, TemplateId> = {
  "love-timeline": "love-timeline",
  "polaroid-memories": "polaroid-memories",
  "heartbeat-scroll": "heartbeat-scroll",
};

export default function CreateValentinePage() {
  const params = useParams();
  const router = useRouter();
  const [isValidTemplate, setIsValidTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const templateIdParam = params.templateId as string;
  const templateId = TEMPLATE_ID_MAP[templateIdParam];

  useEffect(() => {
    if (templateId) {
      const template = TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setIsValidTemplate(true);
        setTemplateName(template.name);
        // Save selected template
        formStorage.save({ selectedTemplate: templateId, templatePrice: template.price });
      } else {
        // Invalid template, redirect
        router.replace("/occasion/valentine-day");
      }
    } else {
      // No template ID, redirect
      router.replace("/occasion/valentine-day");
    }
  }, [templateId, router]);

  const handleComplete = () => {
    // Navigate to preview or payment
    router.push(`/preview/valentine-day/${templateId}`);
  };

  const handleBack = () => {
    router.push("/occasion/valentine-day");
  };

  if (!isValidTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Heart className="w-12 h-12 text-pink-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading template...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <HeartDroppingBG />

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back button */}
            <motion.button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Templates</span>
            </motion.button>

            {/* Template name */}
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="font-semibold text-gray-800">
                Creating: {templateName}
              </span>
            </div>

            {/* Spacer for alignment */}
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main form wizard */}
      <main className="relative z-10">
        <ValentineFormWizard
          templateId={templateId}
          onComplete={handleComplete}
        />
      </main>
    </div>
  );
}
