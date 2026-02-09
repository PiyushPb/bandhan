"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Save, SkipForward, Loader2 } from "lucide-react";
import { FormProgress, StepInfo } from "@/components/forms";
import { TemplateId } from "@/types/template";
import { useValentineForm } from "./useValentineForm";
import {
  BasicInfoStep,
  StoryStep,
  ReasonsStep,
  PhotosStep,
  FinalMessageStep,
  SecretLetterStep,
  PreviewStep,
} from "./steps";

interface ValentineFormWizardProps {
  templateId: TemplateId;
  onComplete?: () => void;
}

export default function ValentineFormWizard({
  templateId,
  onComplete,
}: ValentineFormWizardProps) {
  const {
    formData,
    currentStep,
    completedSteps,
    errors,
    isLoading,
    isSaving,
    steps,
    currentStepInfo,
    isLastStep,
    isCurrentStepOptional,
    updateBasicInfo,
    updateFormData,
    updateReasons,
    updatePhotos,
    updateSecretLetter,
    nextStep,
    prevStep,
    goToStep,
    skipStep,
  } = useValentineForm({ templateId });

  // Convert steps to StepInfo format
  const stepInfos: StepInfo[] = steps.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
  }));

  // Handle form completion
  const handleComplete = () => {
    if (nextStep()) {
      // All steps completed
      onComplete?.();
    }
  };

  // Render current step
  const renderStep = () => {
    const stepId = currentStepInfo?.id;

    switch (stepId) {
      case "basic-info":
        return (
          <BasicInfoStep
            fromName={formData.basicInfo.fromName}
            toName={formData.basicInfo.toName}
            greeting={formData.basicInfo.greeting}
            errors={{
              fromName: errors.fromName,
              toName: errors.toName,
              greeting: errors.greeting,
            }}
            onUpdate={updateBasicInfo}
          />
        );

      case "story":
        return (
          <StoryStep
            story={formData.story}
            error={errors.story}
            onUpdate={(value) => updateFormData({ story: value })}
          />
        );

      case "reasons":
        return (
          <ReasonsStep
            reasons={formData.reasons}
            error={errors.reasons}
            onUpdate={updateReasons}
          />
        );

      case "photos":
        return (
          <PhotosStep
            photos={formData.photos}
            error={errors.photos}
            onUpdate={updatePhotos}
          />
        );

      case "final-message":
        return (
          <FinalMessageStep
            message={formData.finalMessage}
            toName={formData.basicInfo.toName}
            error={errors.finalMessage}
            onUpdate={(value) => updateFormData({ finalMessage: value })}
          />
        );

      case "secret-letter":
        return (
          <SecretLetterStep
            letter={formData.secretLetter}
            toName={formData.basicInfo.toName}
            fromName={formData.basicInfo.fromName}
            errors={errors.secretLetter}
            onUpdate={updateSecretLetter}
          />
        );

      case "preview":
        return (
          <PreviewStep
            templateId={templateId}
            data={formData}
            onEdit={() => goToStep(0)}
          />
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your progress...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress indicator */}
        <FormProgress
          steps={stepInfos}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />

        {/* Auto-save indicator */}
        <AnimatePresence>
          {isSaving && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4"
            >
              <Save className="w-4 h-4 animate-pulse" />
              Saving...
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep}>{renderStep()}</motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Back button */}
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold
              transition-all duration-200
              ${
                currentStep === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
            whileHover={currentStep > 0 ? { x: -4 } : {}}
            whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Skip button (for optional steps) */}
            {isCurrentStepOptional && (
              <motion.button
                type="button"
                onClick={skipStep}
                className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Skip
                <SkipForward className="w-4 h-4" />
              </motion.button>
            )}

            {/* Next/Complete button */}
            <motion.button
              type="button"
              onClick={isLastStep ? handleComplete : nextStep}
              className="flex items-center gap-2 px-8 py-3 
                bg-gradient-to-r from-pink-500 to-rose-500 
                text-white rounded-full font-semibold
                shadow-lg shadow-pink-200
                hover:shadow-xl hover:shadow-pink-300
                transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLastStep ? (
                <>
                  Complete
                  <Check className="w-5 h-5" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
