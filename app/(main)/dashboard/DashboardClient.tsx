"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Edit, Eye, Trash2, Copy, Calendar, MoreVertical } from "lucide-react";
import { useState } from "react";
import { deleteTemplate } from "@/lib/actions/template";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
  template: any;
}

export default function DashboardClient({ template }: DashboardClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this memory? This action cannot be undone.",
      )
    ) {
      setIsDeleting(true);
      try {
        await deleteTemplate(template.id);
        toast.success("Memory deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete memory");
        setIsDeleting(false);
      }
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/w/${template.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  // Format date
  const date = new Date(template.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
    >
      {/* Preview Image / Placeholder */}
      <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-4xl">
          {template.type === "valentine-day" ? "💝" : "🎉"}
        </span>

        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/w/${template.slug}`}
            target="_blank"
            className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-all"
            title="View Live"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={handleCopyLink}
            className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:text-blue-600 hover:scale-110 transition-all"
            title="Copy Link"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 truncate pr-4">
            {template.data?.basicInfo?.toName
              ? `For ${template.data.basicInfo.toName}`
              : "Untitled Memory"}
          </h3>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Active
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          {date}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex gap-2">
            <Link
              href={`/create/${template.type}?id=${template.slug}`} // Assuming we support editing via create flow or separate edit page
              /* Note: The create flow might need adjustment to support loading existing data by ID */
              className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
            >
              Edit
            </Link>
          </div>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            {isDeleting ? "Deleting..." : "Delete"}
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
