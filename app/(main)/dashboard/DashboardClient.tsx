"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  Trash2,
  Copy,
  Calendar,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { deleteTemplate } from "@/lib/actions/template";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Template {
  id: string;
  slug: string;
  type: string;
  created_at: string;
  data?: {
    basicInfo?: {
      toName?: string;
    };
  };
}

interface DashboardClientProps {
  template: Template;
}

interface DeleteModalProps {
  memoryName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// ─── Template Emoji Map ──────────────────────────────────────────────────────

const TEMPLATE_EMOJI: Record<string, string> = {
  "valentine-day": "💝",
  default: "🎉",
};

// ─── Delete Confirmation Modal ───────────────────────────────────────────────

function DeleteModal({
  memoryName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={() => !isDeleting && onCancel()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete this memory?
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            You&apos;re about to delete{" "}
            <span className="font-medium text-gray-700">
              &quot;{memoryName}&quot;
            </span>
            . This action is permanent and cannot be undone. The shared link
            will also stop working.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 pt-2">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Memory
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card Header ─────────────────────────────────────────────────────────────

function CardHeader({ type }: { type: string }) {
  const emoji = TEMPLATE_EMOJI[type] || TEMPLATE_EMOJI.default;

  return (
    <div className="h-40 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
      <span className="text-4xl">{emoji}</span>
    </div>
  );
}

// ─── Card Actions ────────────────────────────────────────────────────────────

interface CardActionsProps {
  slug: string;
  onCopyLink: () => void;
  onDelete: () => void;
}

function CardActions({ slug, onCopyLink, onDelete }: CardActionsProps) {
  return (
    <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
      <Link
        href={`/w/${slug}`}
        target="_blank"
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-pink-50 text-pink-700 text-sm font-medium hover:bg-pink-100 transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View
      </Link>
      <button
        onClick={onCopyLink}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
      >
        <Copy className="w-3.5 h-3.5" />
        Copy Link
      </button>
      <button
        onClick={onDelete}
        className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DashboardClient({ template }: DashboardClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const memoryName = template.data?.basicInfo?.toName
    ? `For ${template.data.basicInfo.toName}`
    : "Untitled Memory";

  const date = new Date(template.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTemplate(template.id);
      toast.success("Memory deleted successfully");
      setShowDeleteModal(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete memory");
      setIsDeleting(false);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/w/${template.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <CardHeader type={template.type} />

        <div className="p-5">
          {/* Title & Status */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 truncate pr-4">
              {memoryName}
            </h3>
            <span className="shrink-0 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Active
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            {date}
          </div>

          {/* Actions */}
          <CardActions
            slug={template.slug}
            onCopyLink={handleCopyLink}
            onDelete={() => setShowDeleteModal(true)}
          />
        </div>
      </motion.div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            memoryName={memoryName}
            isDeleting={isDeleting}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
