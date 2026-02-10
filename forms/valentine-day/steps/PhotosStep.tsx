import { useState } from "react";
import { motion } from "framer-motion";
import { PhotoUpload, PhotoItem } from "@/components/forms";
import { Camera, Sparkles, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";

interface PhotosStepProps {
  photos: { url: string; caption?: string }[];
  error?: string;
  onUpdate: (photos: PhotoItem[]) => void;
}

export default function PhotosStep({
  photos,
  error,
  onUpdate,
}: PhotosStepProps) {
  const [uploading, setUploading] = useState(false);

  // Convert to PhotoItem format
  const photoItems: PhotoItem[] = photos.map((p) => ({
    url: p.url,
    caption: p.caption,
  }));

  const uploadFile = async (file: File): Promise<string> => {
    // Compress image if it's larger than 1MB
    let fileToUpload = file;
    
    // Only compress if image is > 1MB
    if (file.size > 1024 * 1024) {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: file.type // Ensure original file type is preserved if possible
            };
            
            console.log(`Compressing ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)...`);
            const compressedFile = await imageCompression(file, options);
            console.log(`Compressed to ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
            
            fileToUpload = compressedFile;
        } catch (error) {
            console.error("Compression failed:", error);
            // Fallback to original file if compression fails
        }
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handlePhotosChange = async (newPhotos: PhotoItem[]) => {
    // Check if there are any new files to upload
    const photosToUpload = newPhotos.filter((p) => p.file);
    
    // If no new files, just update immediately
    if (photosToUpload.length === 0) {
        onUpdate(newPhotos);
        return;
    }

    setUploading(true);
    
    try {
        // Create a copy of photos to update progressively or at end
        const updatedPhotos = [...newPhotos];

        // Process uploads
        await Promise.all(
            updatedPhotos.map(async (photo, index) => {
                if (photo.file) {
                    try {
                        const secureUrl = await uploadFile(photo.file);
                        // Update the photo object with the new URL and remove file
                        updatedPhotos[index] = {
                            ...photo,
                            url: secureUrl,
                            file: undefined // Mark as uploaded by removing file
                        };
                    } catch (err) {
                        console.error("Failed to upload photo:", err);
                        // Optional: Handle error state for specific photo
                    }
                }
            })
        );

        onUpdate(updatedPhotos);
    } catch (err) {
        console.error("Error updating photos:", err);
    } finally {
        setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mb-4"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
          ) : (
             <Camera className="w-8 h-8 text-pink-500" />
          )}
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your memories together
        </h2>
        <p className="text-gray-600">
          Upload photos that capture your special moments
        </p>
      </div>

      {/* Photo upload */}
      <div className={uploading ? "opacity-70 pointer-events-none" : ""}>
        <PhotoUpload
            label="Photos"
            photos={photoItems}
            onChange={handlePhotosChange}
            maxPhotos={6}
            error={error}
            maxCaptionLength={500}
        />
        {uploading && (
            <p className="text-center text-sm text-pink-500 mt-2 font-medium animate-pulse">
                Uploading your memories to the cloud...
            </p>
        )}
      </div>

      {/* Tips */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-pink-800">
                Photo tips for the best experience:
              </p>
              <ul className="text-sm text-pink-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Choose photos with good lighting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Include candid moments, not just posed shots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Add meaningful captions for each photo
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Mix different moments: first date, trips, everyday life
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
