import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 mx-8">
            <p className="text-sm text-gray-600 mb-2">Step 1 of 4</p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "25%" }}
                className="h-full bg-linear-to-r from-pink-500 to-rose-500"
              />
            </div>
          </div>

          <div className="w-20" />
        </div>
      </div>
    </header>
  );
}
