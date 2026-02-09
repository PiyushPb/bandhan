"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TemplateData, TemplateId } from "@/types/template";
import { TEMPLATES } from "@/data/templates/valentine";
import { formStorage } from "@/lib/form-storage";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Edit, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  Loader2,
  Lock
} from "lucide-react";

// Dynamically import templates
const LoveTimeline = dynamic(
  () => import("@/templates/valentine-day/LoveTimeline/LoveTimeline"),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);

const PolaroidMemories = dynamic(
  () => import("@/templates/valentine-day/PolaroidMemories/PolaroidMemories"),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);

// Template ID mapping
const TEMPLATE_ID_MAP: Record<string, TemplateId> = {
  "love-timeline": "love-timeline",
  "polaroid-memories": "polaroid-memories",
  "heartbeat-scroll": "heartbeat-scroll",
};

// Minimum required fields to validate form data
function isValidFormData(data: Partial<TemplateData>): boolean {
  if (!data.basicInfo?.fromName?.trim()) return false;
  if (!data.basicInfo?.toName?.trim()) return false;
  if (!data.basicInfo?.greeting?.trim()) return false;
  if (!data.story?.trim() || data.story.length < 50) return false;
  if (!data.reasons || data.reasons.filter(r => r.trim()).length < 3) return false;
  if (!data.photos || data.photos.length < 2) return false;
  if (!data.finalMessage?.trim()) return false;
  return true;
}

function TemplateSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-pink-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading your creation...</p>
      </div>
    </div>
  );
}

function AccessDenied({ message, onBack, isEmbedded }: { message: string; onBack: () => void; isEmbedded: boolean }) {
  if (isEmbedded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-amber-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Access Restricted
        </h1>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <motion.button
          onClick={onBack}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 
            text-white rounded-full font-semibold shadow-lg
            hover:shadow-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Go to Template Selection
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<TemplateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("");

  const templateIdParam = params.templateId as string;
  const templateId = TEMPLATE_ID_MAP[templateIdParam];
  
  // Check if in embedded mode (iframe)
  const isEmbedded = searchParams.get("embedded") === "true";

  useEffect(() => {
    // Validate template ID
    if (!templateId) {
      setAccessError("Invalid template. Please select a valid template.");
      setIsLoading(false);
      return;
    }

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      setAccessError("Template not found.");
      setIsLoading(false);
      return;
    }
    setTemplateName(template.name);

    // Load and validate form data from localStorage
    const saved = formStorage.load();
    
    if (!saved || Object.keys(saved).length === 0) {
      setAccessError("No form data found. Please complete the form first.");
      setIsLoading(false);
      return;
    }

    // Verify the saved data matches the requested template
    if (saved.selectedTemplate && saved.selectedTemplate !== templateId) {
      setAccessError("Template mismatch. You started with a different template.");
      setIsLoading(false);
      return;
    }

    // Validate form completeness
    if (!isValidFormData(saved)) {
      setAccessError("Incomplete form data. Please complete all required fields.");
      setIsLoading(false);
      return;
    }

    // All checks passed - set the form data
    setFormData({
      basicInfo: saved.basicInfo!,
      story: saved.story!,
      reasons: saved.reasons!,
      photos: saved.photos!,
      finalMessage: saved.finalMessage!,
      secretLetter: saved.secretLetter,
    });
    
    setIsLoading(false);
  }, [templateId]);

  // Render template
  const renderTemplate = () => {
    if (!formData) return null;

    switch (templateId) {
      case "love-timeline":
        return <LoveTimeline data={formData} />;
      case "polaroid-memories":
        return <PolaroidMemories data={formData} />;
      case "heartbeat-scroll":
        // TODO: Add HeartbeatScroll when implemented
        return <LoveTimeline data={formData} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <TemplateSkeleton />;
  }

  if (accessError) {
    return (
      <AccessDenied 
        message={accessError} 
        onBack={() => router.push("/occasion/valentine-day")}
        isEmbedded={isEmbedded}
      />
    );
  }

  // Embedded mode - just render template without chrome
  if (isEmbedded) {
    return (
      <div className="min-h-screen">
        {renderTemplate()}
      </div>
    );
  }

  // Full page mode with header and footer
  return (
    <div className="min-h-screen relative">
      {/* Floating header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back button */}
            <motion.button
              onClick={() => router.push(`/create/valentine-day/${templateId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Edit</span>
            </motion.button>

            {/* Title */}
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                Preview: {templateName}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => router.push(`/create/valentine-day/${templateId}`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  // TODO: Navigate to payment
                  alert("Payment step coming soon!");
                }}
                className="flex items-center gap-2 px-6 py-2 
                  bg-gradient-to-r from-pink-500 to-rose-500 
                  text-white rounded-full font-semibold shadow-lg
                  hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CreditCard className="w-4 h-4" />
                <span>Proceed to Pay</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Preview notice */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 
            rounded-full text-sm font-medium shadow-lg border border-amber-200"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>This is a local preview only. Complete payment to get your shareable link!</span>
        </motion.div>
      </div>

      {/* Template content with top padding for fixed header */}
      <div className="pt-16">
        {renderTemplate()}
      </div>
    </div>
  );
}

