"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { TemplateData } from "@/types/template";

// Dynamic imports for templates
const LoveTimeline = dynamic(
  () => import("@/templates/valentine-day/LoveTimeline/LoveTimeline"),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);

const PolaroidMemories = dynamic(
  () => import("@/templates/valentine-day/PolaroidMemories/PolaroidMemories"),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);

function TemplateSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
    </div>
  );
}

interface PublicTemplateViewerProps {
  type: string;
  data: TemplateData;
}

export default function PublicTemplateViewer({ type, data }: PublicTemplateViewerProps) {
  switch (type) {
    case "love-timeline":
      return <LoveTimeline data={data} />;
    case "polaroid-memories":
      return <PolaroidMemories data={data} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center p-10 text-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Template Not Found</h1>
            <p className="text-gray-600">Unknown template type: {type}</p>
          </div>
        </div>
      );
  }
}
