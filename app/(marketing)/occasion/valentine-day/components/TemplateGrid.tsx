import { motion } from "framer-motion";
import { Template, TemplateId } from "@/types/template";
import TemplatePreviewCard from "@/components/valentine/TemplatePreviewCard";

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
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your Template
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Pick a design that matches your vibe. Preview before choosing!
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
