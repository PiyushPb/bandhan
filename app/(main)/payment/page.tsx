"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { formStorage } from "@/lib/form-storage";
import { TemplateData } from "@/types/template";
import { TEMPLATES } from "@/data/templates/valentine";
import { motion } from "framer-motion";
import { Check, CreditCard, Loader2, Shield, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

function PaymentContent() {
  const router = useRouter();
  const [data, setData] = useState<Partial<TemplateData> | null>(null);
  const [template, setTemplate] = useState<(typeof TEMPLATES)[0] | null>(null);
  const [step, setStep] = useState<
    "summary" | "processing" | "uploading" | "success"
  >("summary");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    // Try to load from our form storage (valentine-site-draft)
    const saved = formStorage.load();
    if (!saved || !saved.selectedTemplate) {
      router.push("/occasion/valentine-day");
      return;
    }

    const tmpl = TEMPLATES.find((t) => t.id === saved.selectedTemplate);
    if (tmpl) {
      setTemplate(tmpl);
      setData(saved);
    }
  }, [router]);

  const uploadImagesAndCreateOrder = async (
    razorpayPaymentId: string,
    razorpayOrderId: string
  ) => {
    if (!data || !template) return;

    setStep("uploading");

    // Upload images
    const photos = data.photos || [];
    const uploadedPhotos = [];

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];

      // Update progress
      setUploadProgress(Math.round((i / photos.length) * 100));

      if (photo.url.startsWith("blob:")) {
        // Fetch blob
        const response = await fetch(photo.url);
        const blob = await response.blob();

        // Convert blob to File for compression library
        const file = new File([blob], "image.jpg", { type: blob.type });

        // Compress image
        const options = {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/jpeg" as const,
        };

        let compressedFile = file;
        try {
          compressedFile = await imageCompression(file, options);
          console.log(`Compressed: ${file.size} -> ${compressedFile.size}`);
        } catch (error) {
          console.error("Compression failed, using original", error);
        }

        const formData = new FormData();
        formData.append("file", compressedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Upload failed");

        const result = await uploadRes.json();
        uploadedPhotos.push({ ...photo, url: result.secure_url });
      } else {
        uploadedPhotos.push(photo);
      }
    }
    setUploadProgress(100);

    // Final Data Submission
    const finalPayload = {
      ...data,
      photos: uploadedPhotos,
      paymentStatus: "paid",
      paymentId: razorpayPaymentId,
      razorpayOrderId: razorpayOrderId,
      createdAt: new Date().toISOString(),
    };

    const orderRes = await fetch("/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    });

    if (!orderRes.ok) throw new Error("Order creation failed");

    const orderData = await orderRes.json();

    setStep("success");
    toast.success("Payment Successful! Your Valentine gift is ready.");

    // Clear form storage
    formStorage.clear();

    // Redirect to the new public page
    setTimeout(() => {
      router.push(`/w/${orderData.slug}`);
    }, 2000);
  };

  const handlePayment = async () => {
    if (!data || !template) return;

    if (!razorpayReady) {
      toast.error("Payment system is loading. Please try again in a moment.");
      return;
    }

    try {
      setStep("processing");

      // 1. Create a Razorpay order on our server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template.id }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.error || "Failed to create payment order");
      }

      const { orderId, amount, currency, keyId, templateName } =
        await orderRes.json();

      // 2. Open Razorpay Checkout
      const options: RazorpayOptions = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Bandhan",
        description: `Payment for ${templateName}`,
        order_id: orderId,
        theme: {
          color: "#e11d48",
        },
        modal: {
          confirm_close: true,
          escape: false,
          ondismiss: () => {
            setStep("summary");
            toast.error("Payment was cancelled.");
          },
        },
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            // 3. Verify payment signature on our server
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }

            const verifyData = await verifyRes.json();

            if (!verifyData.verified) {
              throw new Error("Payment could not be verified");
            }

            // 4. Payment verified — upload images & create order
            await uploadImagesAndCreateOrder(
              response.razorpay_payment_id,
              response.razorpay_order_id
            );
          } catch (error) {
            console.error("Post-payment error:", error);
            toast.error("Payment was received but order creation failed. Please contact support.");
            setStep("summary");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
      setStep("summary");
    }
  };

  if (!data || !template) return null;

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayReady(true)}
        onError={() => {
          toast.error("Failed to load payment system. Please refresh the page.");
        }}
      />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-lg w-full rounded-2xl shadow-xl overflow-hidden"
        >
          {step === "summary" && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-pink-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Complete Your Order
                </h1>
                <p className="text-gray-500">
                  Secure Payment for {template.name}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Template</span>
                  <span className="font-medium">{template.name}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Price</span>
                  <span className="font-medium">₹{template.price}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{template.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4" />
                  <span>Secured by Razorpay — 128-bit SSL Encrypted</span>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50/50 cursor-pointer group transition-colors hover:border-pink-200">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500 cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900">
                    I understand that once payment is made, this template{" "}
                    <span className="font-semibold text-gray-900">cannot be edited</span>{" "}
                    and is <span className="font-semibold text-gray-900">non-refundable</span>.
                  </span>
                </label>
              </div>

              {!razorpayReady && (
                <div className="flex items-center gap-2 text-sm text-amber-600 mb-4 bg-amber-50 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Loading payment system...</span>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!razorpayReady || !agreedToTerms}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-bold font-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                Pay Now ₹{template.price}
              </button>

              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  <span>No Refund</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>Final Sale</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>Permanent link</span>
                </div>
                <p className="text-[10px] text-gray-400 text-center">
                  By proceeding, you agree to our Terms of Service & Privacy Policy
                </p>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="p-12 text-center">
              <Loader2 className="w-16 h-16 text-pink-500 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-semibold mb-2">
                Preparing Payment...
              </h2>
              <p className="text-gray-500">
                Please do not close this window.
              </p>
            </div>
          )}

          {step === "uploading" && (
            <div className="p-12 text-center">
              <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-semibold mb-2">
                Creating Your Gift...
              </h2>
              <p className="text-gray-500 mb-6">
                Uploading your beautiful photos
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {uploadProgress}% Complete
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-8">
                Your {template.name} has been created successfully. We have sent
                the details to our team.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
