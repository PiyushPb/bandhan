import { motion } from "framer-motion";
import { Template, TemplateId } from "@/types/template";
import TemplatePreviewCard from "@/components/valentine/TemplatePreviewCard";
import { Sparkles } from "lucide-react";

type Props = {
  templates: Template[];
  selectedTemplate: TemplateId | null;
  onSelect: (id: TemplateId) => void;
  onPreview: (template: Template) => void;
};

export default function TemplateGrid({
  templates,
  selectedTemplate,
  onSelect,
  onPreview,
}: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-sm font-medium mb-5"
        >
          <Sparkles className="w-4 h-4" />
          Valentine&apos;s Day Collection
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-pink-800 to-rose-700 bg-clip-text text-transparent">
          Choose Your Template
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Pick a design that matches your vibe. Click preview to see it live with sample data!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {templates.map((template, index) => (
          <TemplatePreviewCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onSelect(template.id)}
            onPreview={() => onPreview(template)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </>
  );
}
