import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

export default function ContinueButton({ disabled, loading, onClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: disabled ? 0.5 : 1 }}
      className="flex justify-center"
    >
      <button
        disabled={disabled || loading}
        onClick={onClick}
        className="group px-8 py-4 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Continue to Content
            <Sparkles className="w-5 h-5" />
          </div>
        )}
      </button>
    </motion.div>
  );
}
