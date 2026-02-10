/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Template } from "@/types/template";

export default function PreviewModal({
  template,
  onClose,
  onChoose,
}: {
  template: Template;
  onClose: () => void;
  onChoose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="aspect-9/16 sm:aspect-video bg-gray-100">
          <img
            src={template.previewGifUrl}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-3">{template.name}</h2>
          <p className="text-gray-600 mb-6">{template.description}</p>

          <ul className="space-y-2">
            {template.features.map((f, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border-2 rounded-full py-3"
          >
            Close
          </button>
          <button
            onClick={onChoose}
            className="flex-1 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full py-3"
          >
            Choose This Template
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
