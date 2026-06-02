"use client";

import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnalysisExperience, FlowHeader, GuideBanner, LoadingExperience, UploadExperience } from "./flow-common";
import { JobMatchAnalysisView, JobMatchFlowHeader, JobMatchLoadingExperience } from "./job-match-analysis-flow";
import { JobMatchChatView, JobMatchTrackingView } from "./job-match-followup-flow";
import { FlowStep } from "./landing-data";
import { CompletionExperience, TemplateSelectionView, TemplateStudioView } from "./template-completion-flow";

type FlowSectionProps = {
  flowRef: React.RefObject<HTMLElement | null>;
  step: FlowStep;
  selectedTemplate: "linea" | "marco" | "pulso" | "filo";
  accentColor: "default" | "cool";
  skillsPosition: "bottom" | "top";
  isSummaryCondensed: boolean;
  isSuggestionsApplied: boolean;
  onTabClick: (tabKey: "upload" | "analysis" | "studio" | "match") => void;
  onStepChange: React.Dispatch<React.SetStateAction<FlowStep>>;
  onAnalyze: () => void;
  onResetStudioStates: () => void;
  onSelectedTemplateChange: React.Dispatch<React.SetStateAction<"linea" | "marco" | "pulso" | "filo">>;
  onAccentColorChange: React.Dispatch<React.SetStateAction<"default" | "cool">>;
  onSkillsPositionChange: React.Dispatch<React.SetStateAction<"bottom" | "top">>;
  onSummaryCondensedChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSuggestionsAppliedChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FlowSection({
  flowRef,
  step,
  selectedTemplate,
  accentColor,
  skillsPosition,
  isSummaryCondensed,
  isSuggestionsApplied,
  onTabClick,
  onStepChange,
  onAnalyze,
  onResetStudioStates,
  onSelectedTemplateChange,
  onAccentColorChange,
  onSkillsPositionChange,
  onSummaryCondensedChange,
  onSuggestionsAppliedChange,
}: FlowSectionProps) {
  return (
    <section ref={flowRef} id="flow" className="min-h-[100svh] px-5 py-20 sm:px-8 lg:px-12 snap-start snap-always">
        <div className="mx-auto max-w-7xl">
          {["job-loading", "job-analysis", "job-chat", "job-tracking"].includes(step) ? (
            <JobMatchFlowHeader
              current={step}
              onStepChange={(newStep) => onStepChange(newStep)}
              onBackToCV={() => onStepChange("completion")}
            />
          ) : (
            <FlowHeader current={step} onTabClick={onTabClick} />
          )}
          <GuideBanner step={step} />
          <AnimatePresence mode="wait" initial={false}>
            {step === "analysis" ? (
              <motion.div
                key="analysis"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <AnalysisExperience onImprove={() => onStepChange("templates")} />
              </motion.div>
            ) : step === "templates" ? (
              <motion.div
                key="templates"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <TemplateSelectionView onSelectTemplate={(tpl) => {
                  onSelectedTemplateChange(tpl);
                  onResetStudioStates();
                  onStepChange("studio");
                }} />
              </motion.div>
            ) : step === "studio" ? (
              <motion.div
                key="studio"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <TemplateStudioView 
                  key={selectedTemplate}
                  template={selectedTemplate}
                  onChangeTemplate={() => {
                    onResetStudioStates();
                    onStepChange("templates");
                  }}
                  onFinalize={() => onStepChange("completion")}
                  accentColor={accentColor}
                  setAccentColor={onAccentColorChange}
                  skillsPosition={skillsPosition}
                  setSkillsPosition={onSkillsPositionChange}
                  isSummaryCondensed={isSummaryCondensed}
                  setIsSummaryCondensed={onSummaryCondensedChange}
                  isSuggestionsApplied={isSuggestionsApplied}
                  setIsSuggestionsApplied={onSuggestionsAppliedChange}
                />
              </motion.div>
            ) : step === "completion" ? (
              <motion.div
                key="completion"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <CompletionExperience
                  template={selectedTemplate}
                  accentColor={accentColor}
                  skillsPosition={skillsPosition}
                  isSummaryCondensed={isSummaryCondensed}
                  isSuggestionsApplied={isSuggestionsApplied}
                  onStartJobMatch={() => onStepChange("job-loading")}
                />
              </motion.div>
            ) : step === "job-loading" ? (
              <motion.div
                key="job-loading"
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.42 }}
                className="mt-10"
              >
                <JobMatchLoadingExperience onComplete={() => onStepChange("job-analysis")} />
              </motion.div>
            ) : step === "job-analysis" ? (
              <motion.div
                key="job-analysis"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <JobMatchAnalysisView 
                  onNext={() => onStepChange("job-chat")} 
                  onBack={() => onStepChange("completion")} 
                />
              </motion.div>
            ) : step === "job-chat" ? (
              <motion.div
                key="job-chat"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <JobMatchChatView 
                  onNext={() => onStepChange("job-tracking")} 
                  onBack={() => onStepChange("job-analysis")} 
                />
              </motion.div>
            ) : step === "job-tracking" ? (
              <motion.div
                key="job-tracking"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <JobMatchTrackingView 
                  onBack={() => onStepChange("job-chat")} 
                  onResetAll={() => onStepChange("ready")} 
                />
              </motion.div>
            ) : step === "loading" ? (
              <motion.div
                key="loading"
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.42 }}
                className="mt-10"
              >
                <LoadingExperience />
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-10"
              >
                <UploadExperience step={step} onStartUpload={() => onStepChange("uploading")} onAnalyze={onAnalyze} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


  );
}
