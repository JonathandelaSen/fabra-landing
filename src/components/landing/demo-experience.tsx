"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FeaturePreviewModal } from "./feature-preview-modal";
import { FlowSection } from "./flow-section";
import { APP_FEATURES, AppFeature, FlowStep } from "./landing-data";

export function DemoExperience() {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>("idle");
  const [selectedFeature, setSelectedFeature] = useState<AppFeature | null>(null);
  const flowRef = useRef<HTMLElement | null>(null);
  const analyzeTimerRef = useRef<number | null>(null);

  // Template Customizer Sandbox States
  const [selectedTemplate, setSelectedTemplate] = useState<"linea" | "marco" | "pulso" | "filo">("pulso");
  const [accentColor, setAccentColor] = useState<"default" | "cool">("default");
  const [skillsPosition, setSkillsPosition] = useState<"bottom" | "top">("bottom");
  const [isSummaryCondensed, setIsSummaryCondensed] = useState(false);
  const [isSuggestionsApplied, setIsSuggestionsApplied] = useState(false);

  useEffect(() => {
    if (step !== "uploading") return;

    const timer = window.setTimeout(() => setStep("ready"), 1500);
    return () => window.clearTimeout(timer);
  }, [step]);

  // Scroll back to top when advancing to a new step
  useEffect(() => {
    const stepsToScroll = [
      "analysis",
      "templates",
      "studio",
      "completion",
      "job-loading",
      "job-analysis",
      "job-chat",
      "job-tracking",
    ];
    if (stepsToScroll.includes(step)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  useEffect(() => {
    return () => {
      if (analyzeTimerRef.current) {
        window.clearTimeout(analyzeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedFeature) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFeature(null);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature.id);
        if (currentIndex !== -1) {
          const prevIndex = (currentIndex - 1 + APP_FEATURES.length) % APP_FEATURES.length;
          setSelectedFeature(APP_FEATURES[prevIndex]);
        }
      } else if (e.key === "ArrowRight") {
        const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature.id);
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % APP_FEATURES.length;
          setSelectedFeature(APP_FEATURES[nextIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFeature]);

  const analyze = () => {
    if (analyzeTimerRef.current) {
      window.clearTimeout(analyzeTimerRef.current);
    }
    setStep("loading");
    analyzeTimerRef.current = window.setTimeout(() => {
      setStep("analysis");
      analyzeTimerRef.current = null;
    }, 3800);
  };

  const resetStudioStates = () => {
    setAccentColor("default");
    setSkillsPosition("bottom");
    setIsSummaryCondensed(false);
    setIsSuggestionsApplied(false);
  };

  const handleTabClick = (tabKey: "upload" | "analysis" | "studio" | "match") => {
    resetStudioStates();
    if (tabKey === "upload") {
      if (step === "analysis" || step === "loading" || step === "templates" || step === "studio" || step === "completion") {
        setStep("ready");
      } else {
        setStep("idle");
      }
    } else if (tabKey === "analysis") {
      if (step === "ready" || step === "analysis" || step === "templates" || step === "studio" || step === "completion") {
        if (analyzeTimerRef.current) {
          window.clearTimeout(analyzeTimerRef.current);
        }
        setStep("loading");
        analyzeTimerRef.current = window.setTimeout(() => {
          setStep("analysis");
          analyzeTimerRef.current = null;
        }, 3800);
      }
    } else if (tabKey === "studio") {
      if (step === "ready" || step === "analysis" || step === "templates" || step === "studio" || step === "completion") {
        setStep("templates");
      }
    } else if (tabKey === "match") {
      if (step === "completion") {
        // Already at completion, do nothing
      }
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="noise" />

      {/* Back to landing button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="fixed top-5 left-5 z-50"
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-2.5 text-sm font-bold text-white/70 shadow-lg transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] cursor-pointer"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
      </motion.div>

      <FlowSection
        flowRef={flowRef}
        step={step}
        selectedTemplate={selectedTemplate}
        accentColor={accentColor}
        skillsPosition={skillsPosition}
        isSummaryCondensed={isSummaryCondensed}
        isSuggestionsApplied={isSuggestionsApplied}
        onTabClick={handleTabClick}
        onStepChange={setStep}
        onAnalyze={analyze}
        onResetStudioStates={resetStudioStates}
        onSelectedTemplateChange={setSelectedTemplate}
        onAccentColorChange={setAccentColor}
        onSkillsPositionChange={setSkillsPosition}
        onSummaryCondensedChange={setIsSummaryCondensed}
        onSuggestionsAppliedChange={setIsSuggestionsApplied}
        onFeatureSelect={setSelectedFeature}
      />

      <FeaturePreviewModal
        selectedFeature={selectedFeature}
        allFeatures={APP_FEATURES}
        onClose={() => setSelectedFeature(null)}
        onPrev={() => {
          const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature?.id);
          if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + APP_FEATURES.length) % APP_FEATURES.length;
            setSelectedFeature(APP_FEATURES[prevIndex]);
          }
        }}
        onNext={() => {
          const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature?.id);
          if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % APP_FEATURES.length;
            setSelectedFeature(APP_FEATURES[nextIndex]);
          }
        }}
      />
    </main>
  );
}
