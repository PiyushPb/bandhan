"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TemplateData, TemplateId } from "@/types/template";
import { 
  Eye, 
  Edit, 
  Monitor, 
  Smartphone, 
  Tablet,
  RotateCcw,
  Maximize2,
  Minimize2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface PreviewStepProps {
  templateId: TemplateId;
  data: TemplateData;
  onEdit: () => void;
}

type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  icon: React.ElementType;
  scale: number;
}

const DEVICES: Record<DeviceType, DeviceConfig> = {
  desktop: {
    name: "Desktop",
    width: 1280,
    height: 800,
    icon: Monitor,
    scale: 0.55,
  },
  tablet: {
    name: "Tablet",
    width: 768,
    height: 1024,
    icon: Tablet,
    scale: 0.5,
  },
  mobile: {
    name: "Mobile",
    width: 375,
    height: 667,
    icon: Smartphone,
    scale: 0.7,
  },
};

// Get template preview URL (same domain iframe)
function getPreviewUrl(templateId: TemplateId): string {
  return `/preview/valentine-day/${templateId}?embedded=true`;
}

export default function PreviewStep({
  templateId,
  data,
  onEdit,
}: PreviewStepProps) {
  const [device, setDevice] = useState<DeviceType>("mobile");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentDevice = DEVICES[device];
  const DeviceIcon = currentDevice.icon;

  // Refresh iframe
  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Calculate container dimensions
  const getContainerStyle = () => {
    if (isFullscreen) {
      return {
        width: "100%",
        height: "calc(100vh - 200px)",
      };
    }

    const scaledWidth = currentDevice.width * currentDevice.scale;
    const scaledHeight = currentDevice.height * currentDevice.scale;

    return {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mb-4"
        >
          <Eye className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Preview your creation
        </h2>
        <p className="text-gray-600">
          See how it looks on different devices
        </p>
      </div>

      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Device toggles */}
        <div className="flex items-center bg-gray-100 rounded-full p-1">
          {(Object.keys(DEVICES) as DeviceType[]).map((deviceType) => {
            const deviceConfig = DEVICES[deviceType];
            const Icon = deviceConfig.icon;
            const isActive = device === deviceType;

            return (
              <motion.button
                key={deviceType}
                onClick={() => setDevice(deviceType)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-medium
                  transition-all duration-200
                  ${isActive 
                    ? "bg-white text-pink-600 shadow-md" 
                    : "text-gray-500 hover:text-gray-700"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{deviceConfig.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
            whileHover={{ scale: 1.1, rotate: -180 }}
            whileTap={{ scale: 0.9 }}
            title="Refresh preview"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Edit button */}
        <motion.button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-pink-200 
            text-pink-600 rounded-full font-medium
            hover:bg-pink-50 hover:border-pink-300 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit className="w-4 h-4" />
          Edit content
        </motion.button>
      </div>

      {/* Device frame container */}
      <div 
        ref={containerRef}
        className="flex justify-center items-start overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={device}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Device frame */}
            <div
              className={`
                relative bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden
                ${device === "mobile" ? "p-2" : device === "tablet" ? "p-3" : "p-0"}
              `}
              style={getContainerStyle()}
            >
              {/* Desktop browser chrome */}
              {device === "desktop" && (
                <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-600 rounded-full px-4 py-1 text-xs text-gray-300 text-center">
                      yourvalentine.bandhan.in
                    </div>
                  </div>
                  <div className="w-16" />
                </div>
              )}

              {/* Mobile notch */}
              {device === "mobile" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-2xl z-10" />
              )}

              {/* Tablet camera dot */}
              {device === "tablet" && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full z-10" />
              )}

              {/* Content iframe */}
              <div 
                className={`
                  bg-white overflow-hidden
                  ${device === "mobile" ? "rounded-[1.5rem]" : device === "tablet" ? "rounded-xl" : ""}
                  ${device === "desktop" ? "h-[calc(100%-36px)]" : "h-full"}
                `}
              >
                <iframe
                  key={iframeKey}
                  src={getPreviewUrl(templateId)}
                  className="w-full h-full border-0"
                  style={{
                    transform: `scale(${1 / currentDevice.scale})`,
                    transformOrigin: "top left",
                    width: `${currentDevice.width}px`,
                    height: `${currentDevice.height}px`,
                  }}
                  title="Template Preview"
                />
              </div>

              {/* Mobile home indicator */}
              {device === "mobile" && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-600 rounded-full" />
              )}
            </div>

            {/* Device reflection */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-black/10 to-transparent blur-xl" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Device info */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
          <DeviceIcon className="w-4 h-4" />
          <span>{currentDevice.name}</span>
          <span className="text-gray-400">•</span>
          <span>{currentDevice.width} × {currentDevice.height}</span>
        </div>
      </div>

      {/* Note */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 text-center">
        <p className="text-sm text-amber-700">
          💡 This is a local preview only. Complete the form and proceed to payment to get your shareable link!
        </p>
      </div>
    </motion.div>
  );
}
