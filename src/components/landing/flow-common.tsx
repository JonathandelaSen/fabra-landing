"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, FileText, Loader2, Sparkles, Star, Trophy } from "lucide-react";
import { cvAnalysis, profile } from "@/lib/demo-data";
import { ScoreRing } from "./job-match-analysis-flow";
import { FlowStep, keywords, stepper } from "./landing-data";

export function GuideBanner({ step }: { step: FlowStep }) {
  const getGuideContent = () => {
    switch (step) {
      case "idle":
        return {
          badge: "01 · SANDBOX SIMULATION",
          title: "Simulate loading a sample profile",
          glowColor: "139, 92, 246", // violet
        };
      case "uploading":
        return {
          badge: "02 · PARSING DATA",
          title: "Extracting career history...",
          glowColor: "236, 72, 153", // fuchsia
        };
      case "ready":
        return {
          badge: "03 · PARSE COMPLETE",
          title: "CV successfully parsed into workspace",
          glowColor: "16, 185, 129", // emerald
        };
      case "loading":
        return {
          badge: "04 · AI EVALUATION",
          title: "Running AI analysis...",
          glowColor: "245, 158, 11", // amber
        };
      case "analysis":
        return {
          badge: "05 · FINAL DIAGNOSIS",
          title: "Strategic diagnostic report generated!",
          glowColor: "234, 179, 8", // yellow
        };
      case "templates":
        return {
          badge: "06 · TEMPLATE STUDIO",
          title: "Select your preferred layout template",
          glowColor: "99, 102, 241", // indigo
        };
      case "studio":
        return {
          badge: "07 · DYNAMIC TAILORING",
          title: "Use conversational prompts to polish your CV",
          glowColor: "168, 85, 247", // purple
        };
      case "completion":
        return {
          badge: "08 · CV READY",
          title: "Your optimized CV is ready!",
          glowColor: "16, 185, 129", // emerald
        };
      case "job-loading":
        return {
          badge: "09 · COMPARING ROLES",
          title: "Matching profile to Staff Software Engineer...",
          glowColor: "124, 58, 237", // violet
        };
      case "job-analysis":
        return {
          badge: "10 · MATCH DIAGNOSIS",
          title: "Alignment Score: 84/100 · Strong Match",
          glowColor: "99, 102, 241", // indigo
        };
      case "job-chat":
        return {
          badge: "11 · AI COACHING",
          title: "Consulting Fabra Copilot on positioning",
          glowColor: "168, 85, 247", // purple
        };
      case "job-tracking":
        return {
          badge: "12 · OPPORTUNITY TRACKING",
          title: "Position added to pipeline & moving toward Interview Prep",
          glowColor: "34, 211, 238", // cyan
        };
      default:
        return null;
    }
  };

  const content = getGuideContent();
  if (!content) return null;

  return (
    <motion.div
      key={step}
      initial={false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative text-center max-w-3xl mx-auto mb-8 mt-6 py-4 px-6 overflow-hidden select-none"
    >
      <div className="absolute inset-0 -z-10 bg-radial from-violet-500/[0.02] to-transparent blur-xl pointer-events-none" />
      
      <div className="flex flex-col items-center gap-2">
        <span className="w-fit text-sm sm:text-base lg:text-lg font-black uppercase tracking-[0.32em] bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-1">
          {content.badge}
        </span>
        <h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white transition-all duration-300 animate-pulse pb-1"
          style={{ 
            textShadow: `0 0 12px rgba(${content.glowColor}, 0.22), 0 0 24px rgba(${content.glowColor}, 0.08)` 
          }}
        >
          {content.title}
        </h2>
      </div>
    </motion.div>
  );
}

const CORE_LOADING_LOGS = [
  "Reading PDF document structure...",
  "Extracting metadata & career checkpoints...",
  "Benchmarking technical skills against industry standards...",
  "Scanning keyword alignment and coverage...",
  "Consulting models for strategic analysis...",
  "Assembling recommendations & finishing diagnostic report...",
];

export function LoadingExperience() {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < CORE_LOADING_LOGS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-16 flex flex-col items-center justify-center text-center relative select-none">
      <div className="absolute inset-0 -z-10 rounded-[3rem] bg-violet-500/[0.03] blur-3xl pointer-events-none" />
      
      {/* Smart guide loading circle */}
      <div className="relative size-44 mb-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-violet-500/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-dashed border-fuchsia-500/15"
        />
        <div className="absolute size-28 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 blur-2xl opacity-35 animate-pulse animate-duration-1000" />
        <div className="relative size-24 rounded-full bg-[#090a10] border border-white/10 flex items-center justify-center shadow-2xl">
          <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
      </div>

      <div className="space-y-5 w-full">
        <span className="w-fit text-xs font-black uppercase tracking-[0.28em] bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
          AI Diagnostic in Progress
        </span>
        
        {/* Dynamic task log */}
        <div className="h-14 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={logIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white/90"
            >
              {CORE_LOADING_LOGS[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading progress bar */}
        <div className="h-2 w-full max-w-[320px] mx-auto rounded-full bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </div>
      </div>
    </div>
  );
}


export function FlowHeader({
  current,
  onTabClick,
}: {
  current: FlowStep;
  onTabClick: (key: "upload" | "analysis" | "studio" | "match") => void;
}) {
  const activeIndex = 
    current === "idle" || current === "uploading" || current === "ready" ? 0 : 
    current === "loading" || current === "analysis" ? 1 : 
    current === "templates" || current === "studio" ? 2 :
    3;
  const canNavigateToAnalysis = current !== "idle" && current !== "uploading";
  const canNavigateToMatch = current === "completion";

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6">
      <div className="relative flex items-center justify-between w-full px-8 py-4">
        {/* Background progress line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 -z-10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400"
            initial={false}
            animate={{ width: activeIndex === 0 ? "0%" : activeIndex === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {stepper.map((item, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          
          let isClickable = false;
          if (index === 0) isClickable = true;
          if (index === 1) isClickable = canNavigateToAnalysis;
          if (index === 2) isClickable = canNavigateToAnalysis;
          if (index === 3) isClickable = canNavigateToMatch;

          return (
            <button
              key={item.key}
              type="button"
              disabled={!isClickable}
              onClick={() => onTabClick(item.key)}
              className={`relative flex flex-col items-center gap-2 group transition-all duration-300 ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-40"
              }`}
            >
              {/* Interactive circular node */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  boxShadow: isActive 
                    ? "0 0 20px rgba(139, 92, 246, 0.4)" 
                    : isCompleted 
                    ? "0 0 10px rgba(16, 185, 129, 0.2)"
                    : "0 0 0px rgba(0,0,0,0)"
                }}
                className={`relative flex size-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? "bg-violet-600 border-violet-400 text-white" 
                    : isCompleted 
                    ? "bg-emerald-600 border-emerald-400 text-white" 
                    : "bg-[#090a10] border-white/15 text-white/40 group-hover:border-white/30 group-hover:text-white/60"
                }`}
              >
                {isCompleted ? (
                  <Check className="size-4 stroke-[3]" />
                ) : (
                  <span className="text-xs font-black">{index + 1}</span>
                )}

                {/* Pulsing glow for the active node */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-violet-400/20 pointer-events-none" />
                )}
              </motion.div>

              {/* Step label */}
              <span className={`text-[10px] font-black uppercase tracking-[0.18em] transition-all duration-300 ${
                isActive 
                  ? "text-violet-300 scale-105" 
                  : isCompleted 
                  ? "text-emerald-300"
                  : "text-white/38 group-hover:text-white/60"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function UploadExperience({
  step,
  onStartUpload,
  onAnalyze,
}: {
  step: FlowStep;
  onStartUpload: () => void;
  onAnalyze: () => void;
}) {
  const ready = step === "ready";

  if (ready) {
    return (
      <div className="w-full max-w-[580px] mx-auto py-4">
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative flex flex-col items-center w-full"
        >
          <div className="absolute inset-10 -z-10 rounded-[3rem] bg-violet-500/5 blur-3xl" />
          
          <div className="mb-6 w-full flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm font-semibold text-white">CV successfully uploaded</p>
              <p className="text-xs text-white/42">jonathandelasen cv.pdf</p>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3.5 py-1 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.12)]">
              <Check className="size-3.5" />
              Ready
            </span>
          </div>

          <div className="w-full max-w-[580px] rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <RealCVPreview small={false} />
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex justify-center w-full"
          >
            <button
              type="button"
              onClick={onAnalyze}
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-violet-600 px-12 text-base font-bold text-white shadow-[0_20px_50px_rgba(124,58,237,0.38)] transition hover:bg-violet-500 hover:scale-[1.03] active:scale-[0.97]"
            >
              Analyze profile with AI
              <Sparkles className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto py-8">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col items-center w-full"
      >
        <div className="absolute inset-10 -z-10 rounded-[2.5rem] bg-violet-500/10 blur-3xl" />
        
        <UploadDropzone ready={false} uploading={step === "uploading"} />
        
        {step === "idle" && (
          <button
            type="button"
            onClick={onStartUpload}
            className="mt-8 w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 px-6 text-sm font-bold text-white shadow-[0_12px_40px_rgba(124,58,237,0.3)] transition hover:bg-violet-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            Simulate PDF CV upload
            <ArrowRight className="size-4 animate-pulse" />
          </button>
        )}
      </motion.div>
    </div>
  );
}

function UploadDropzone({ ready, uploading }: { ready: boolean; uploading: boolean }) {
  return (
    <div className="relative flex min-h-[340px] w-full flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-dashed border-white/18 bg-black/18 p-6 text-center">
      <motion.div
        animate={{
          y: uploading ? [0, -12, 0] : 0,
          scale: 1,
          rotate: 0,
        }}
        transition={{ duration: 1.2, repeat: uploading ? Infinity : 0, ease: "easeInOut" }}
        className="relative grid size-28 place-items-center rounded-3xl border border-white/14 bg-white/[0.07] shadow-2xl"
      >
        <FileText className="size-12 text-violet-100" />
        <span className="absolute -right-3 -top-3 rounded-full bg-violet-500 px-2 py-1 text-[10px] font-black text-white shadow-md shadow-violet-500/20">
          PDF
        </span>
        <span className="absolute -left-3 -top-3 rounded-full bg-fuchsia-500 px-2 py-1 text-[10px] font-black text-white shadow-md shadow-fuchsia-500/20">
          JSON
        </span>
      </motion.div>
      <div className="mt-9 h-1.5 w-full max-w-[260px] rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: uploading ? "100%" : "0%" }}
          transition={{ duration: uploading ? 1.5 : 0, ease: "easeInOut" }}
          className="h-full bg-violet-400"
        />
      </div>
      <p className="mt-6 text-sm font-semibold text-white">
        {uploading ? "Uploading Jonathan's CV..." : "Demo document ready"}
      </p>
      <p className="mt-2 max-w-xs text-xs leading-5 text-white/42">
        {uploading
          ? "Extracting metadata and profiling career..."
          : "Click below to run the sandbox upload."}
      </p>
    </div>
  );
}

export function RealCVPreview({
  template = "raw",
  accentColor = "default",
  skillsPosition = "bottom",
  isSummaryCondensed = false,
  isSuggestionsApplied = false,
  small = false,
}: {
  template?: "raw" | "linea" | "marco" | "pulso" | "filo";
  accentColor?: "default" | "cool";
  skillsPosition?: "bottom" | "top";
  isSummaryCondensed?: boolean;
  isSuggestionsApplied?: boolean;
  small?: boolean;
}) {
  const getResolvedColor = (t: string, accent: "default" | "cool") => {
    if (t === "linea") return accent === "cool" ? "#1e3a8a" : "#111827";
    if (t === "marco") return accent === "cool" ? "#1d4ed8" : "#1a1a2e";
    if (t === "pulso") return accent === "cool" ? "#6366f1" : "#0f766e";
    if (t === "filo") return accent === "cool" ? "#06b6d4" : "#9f1239";
    return accent === "cool" ? "#4f46e5" : "#111827";
  };

  const resolvedColor = getResolvedColor(template, accentColor);

  const getTemplatePaperStyle = (t: string) => {
    if (t === "linea") return "font-sans bg-[#ffffff] border-slate-200 text-[#2d2d2d]";
    if (t === "marco") return "font-serif bg-[#fdfdfd] border-slate-200 text-[#2d2d2d]";
    if (t === "pulso") return "font-sans bg-[#ffffff] border-slate-100 text-[#2d2d2d]";
    if (t === "filo") return "font-sans bg-[#ffffff] border-slate-200 text-[#27272a]";
    return "font-serif bg-white border-slate-300 text-slate-800";
  };

  const getAccentBgClass = (t: string, col: "default" | "cool") => {
    if (t === "linea") return col === "cool" ? "bg-blue-50 text-blue-900 border border-blue-100/50" : "bg-[#f4f4f5] text-[#2d2d2d] border border-slate-200/50";
    if (t === "marco") return col === "cool" ? "bg-indigo-50 text-indigo-900" : "bg-[#f0ede6] text-[#2d2d2d]";
    if (t === "pulso") return col === "cool" ? "bg-violet-50 text-violet-700 border border-violet-100/50" : "bg-[#f0fdfa] text-[#0f766e] border border-teal-100/50";
    if (t === "filo") return col === "cool" ? "border border-[#06b6d4] text-[#27272a] bg-white rounded-none" : "border border-[#9f1239] text-[#27272a] bg-white rounded-none";
    return col === "cool" ? "bg-violet-50 text-violet-700" : "bg-slate-100";
  };

  const sectionIds = skillsPosition === "top" 
    ? ["skills", "summary", "experience"] 
    : ["summary", "experience", "skills"];

  const experiences = [
    {
      company: "Edpuzzle",
      role: "Senior Software Engineer",
      dates: "Sep 2024 - Present",
      bullets: isSuggestionsApplied ? [
        "<strong>Drove feature delivery</strong> for a platform with <strong>2M+ daily active users</strong>, maintaining a <strong>99.98% uptime SLA</strong>.",
        "<strong>Architected and scaled</strong> high-throughput backend services (Node.js, MongoDB, Redis), reducing query latency by <strong>35%</strong>.",
        "<strong>Standardized AI-assisted engineering workflows</strong> across squads, boosting delivery velocity by <strong>22%</strong>."
      ] : [
        "Own product features end to end for a platform used by 2M+ daily active users.",
        "Operate Node.js, MongoDB and Redis systems under real production load.",
        "Help the engineering team adopt AI-assisted development workflows.",
      ],
    },
    {
      company: "Dezzai",
      role: "Tech Lead",
      dates: "Sep 2020 - Sep 2024",
      bullets: isSuggestionsApplied ? [
        "<strong>Steered product engineering</strong> and digital workflows for <strong>Grupo Prisa (Colombia)</strong>, scaling team capacity by <strong>40%</strong>.",
        "<strong>Designed event-driven analytical systems</strong> and DDD boundaries, accelerating data pipeline throughput by <strong>3x</strong>."
      ] : [
        "Built and scaled multidisciplinary engineering teams and delivery practices.",
        "Designed event-driven systems, DDD boundaries and data processing pipelines.",
      ],
    },
  ];

  return (
    <div
      className={`cv-paper mx-auto transition-all duration-300 ${getTemplatePaperStyle(template)} ${
        small
          ? "max-h-[460px] max-w-[390px] overflow-hidden p-5 text-[10px] rounded-lg"
          : "w-full max-w-[680px] p-10 sm:p-12 text-[12px] flex flex-col rounded-lg"
      }`}
    >
      {template === "raw" && (
        <header className="border-b border-slate-300 pb-4 text-left font-serif">
          <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: resolvedColor }}>{profile.name}</h3>
          <p className="text-xs text-slate-600 italic mt-0.5">{profile.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
            <p>📧 {profile.email}</p>
            <p>💻 github.com/JonathandelaSen</p>
          </div>
        </header>
      )}

      {template === "linea" && (
        <header className="flex justify-between items-start border-b-[2.5px] pb-4 mb-5" style={{ borderBottomColor: resolvedColor }}>
          <div>
            <h3 className="text-2xl font-black leading-none mb-1" style={{ color: resolvedColor }}>{profile.name}</h3>
            <p className="text-[11px] text-[#505050] font-semibold uppercase tracking-wider">{profile.role}</p>
          </div>
          <div className="text-right text-[10.5px] text-[#4f4f4f] flex flex-col gap-0.5 mt-0.5">
            <span>{profile.email}</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}

      {template === "marco" && (
        <header className="flex flex-col items-center text-center gap-1 border-b pb-3.5 mb-5" style={{ borderBottomColor: resolvedColor }}>
          <h3 className="text-2xl font-bold tracking-wide" style={{ color: resolvedColor }}>{profile.name}</h3>
          <p className="text-[11px] text-[#505050] uppercase tracking-widest font-semibold">{profile.role}</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 text-[10.5px] text-[#4f4f4f]">
            <span>{profile.email}</span>
            <span>·</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}

      {template === "pulso" && (
        <header className="flex flex-col gap-1 pb-4 mb-4">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1" style={{ color: accentColor === "cool" ? resolvedColor : undefined }}>{profile.name}</h3>
          <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: resolvedColor }}>{profile.role}</p>
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#4f4f4f] font-semibold">
            <span>{profile.email}</span>
            <span>·</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}

      {template === "filo" && (
        <header className="flex flex-col gap-1.5 pb-4 mb-4 border-t-[6px] border-b-2 border-b-[#171717] pt-3.5" style={{ borderTopColor: resolvedColor }}>
          <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-0.5" style={{ color: accentColor === "cool" ? resolvedColor : "#111111" }}>{profile.name}</h3>
          <p className="text-[10.5px] font-black uppercase tracking-wider" style={{ color: resolvedColor }}>{profile.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] font-bold text-[#3f3f46]">
            <span>{profile.email}</span>
            <span>·</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}
      
      <motion.div layout className="flex-1 flex flex-col">
        <AnimatePresence mode="popLayout">
          {sectionIds.map((secId) => {
            if (secId === "summary") {
              return (
                <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 15 }} key="summary">
                  <CVSection title="About me" small={small} template={template} accentColor={accentColor}>
                    <div className="transition-all duration-500 rounded-lg p-1.5">
                      {isSummaryCondensed ? (
                        <p dangerouslySetInnerHTML={{ __html: isSuggestionsApplied 
                          ? "<strong>Senior Software Engineer</strong> with 10+ years scaling high-traffic systems (<strong>2M+ DAU</strong>) and directing developer velocity workflows at Edpuzzle. Expert in backend performance, DDD, and event-driven architectures."
                          : "Senior Software Engineer with 10+ years of experience scaling high-traffic applications (<strong>2M+ DAU</strong>) and leading AI-first developer workflows at Edpuzzle. Expert in backend architecture, system design, DDD, and event-driven microservices."
                        }} />
                      ) : (
                        <div className="space-y-1.5">
                          {isSuggestionsApplied ? (
                            <p>
                              Senior Software Engineer with 10+ years building high-scale product systems and AI-assisted engineering workflows. I connect backend architecture, product iteration, and developer productivity to ship reliable AI-powered experiences faster.
                            </p>
                          ) : (
                            <>
                              <p>
                                Senior Software Engineer with 10+ years of experience building and scaling high-traffic web applications end to end.
                                Currently at Edpuzzle, I work on core learning systems used by <strong>2M+ daily active users</strong>, operating
                                high-throughput services under real production load.
                              </p>
                              <p>
                                I specialize in full-stack development with strong <strong>backend</strong> expertise and <strong>frontend</strong>
                                experience, as well as system design, DDD, CQRS and event-driven systems.
                              </p>
                              <p>
                                At Edpuzzle, I have been actively involved in the team&apos;s transition toward an <strong>AI-first development approach</strong>,
                                helping standardize tooling and improve engineering context for AI-assisted work.
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </CVSection>
                </motion.div>
              );
            }
            if (secId === "experience") {
              return (
                <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 15 }} key="experience">
                  <CVSection title="Work experience" small={small} template={template} accentColor={accentColor}>
                    <div className={template === "raw" ? "space-y-3" : "space-y-4"}>
                      {experiences.map((exp, index) => {
                        const isModern = template === "pulso";
                        const titleText = isModern ? exp.company : exp.role;
                        const metaText = isModern ? `${exp.role} · Barcelona` : `${exp.company} · Barcelona`;
                        
                        return (
                          <div 
                            key={index} 
                            className="cvp-item break-inside-avoid transition-all duration-500 rounded-lg p-1.5"
                          >
                            <div className="flex justify-between items-start gap-4 mb-0.5">
                              <div>
                                <h5 className={`font-bold text-[#161616] text-[11px] sm:text-[11.5px] leading-tight ${template === "marco" ? "font-serif" : "font-sans"}`}>
                                  {titleText}
                                </h5>
                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                  {metaText}
                                </p>
                              </div>
                              <span className="text-[10px] text-slate-500 font-semibold shrink-0 text-right">
                                {exp.dates}
                              </span>
                            </div>
                            <ul className="mt-1.5 space-y-0.5 pl-4 list-disc text-[10px] sm:text-[10.5px] text-slate-700 leading-relaxed">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </CVSection>
                </motion.div>
              );
            }
            if (secId === "skills") {
              return (
                <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 15 }} key="skills">
                  <CVSection title="Skills" small={small} template={template} accentColor={accentColor}>
                    <div className="transition-all duration-500 rounded-lg p-1.5">
                      {template === "raw" ? (
                        <p className="text-slate-600 font-normal text-[11px] sm:text-[11.5px] leading-relaxed font-serif">
                          Node.js, TypeScript, MongoDB, Redis, React, DDD, CQRS, Observability, AI workflows.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {["Node.js", "TypeScript", "MongoDB", "Redis", "React", "DDD", "CQRS", "Observability", "AI workflows"].map((skill) => (
                            <span key={skill} className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${getAccentBgClass(template, accentColor)}`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CVSection>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function CVSection({
  title,
  children,
  small = false,
  template = "raw",
  accentColor = "default",
}: {
  title: string;
  children: React.ReactNode;
  small?: boolean;
  template?: "raw" | "linea" | "marco" | "pulso" | "filo";
  accentColor?: "default" | "cool";
}) {
  const getResolvedColor = (t: string, accent: "default" | "cool") => {
    if (t === "linea") return accent === "cool" ? "#1e3a8a" : "#111827";
    if (t === "marco") return accent === "cool" ? "#1d4ed8" : "#1a1a2e";
    if (t === "pulso") return accent === "cool" ? "#6366f1" : "#0f766e";
    if (t === "filo") return accent === "cool" ? "#06b6d4" : "#9f1239";
    return accent === "cool" ? "#4f46e5" : "#111827";
  };

  const resolvedColor = getResolvedColor(template, accentColor);

  if (template === "linea") {
    return (
      <section className={`${small ? "mt-3" : "mt-5"} text-slate-800 text-left font-sans`}>
        <h4 
          className="border-b pb-1 font-extrabold uppercase tracking-wider text-[10.5px] sm:text-[11px]"
          style={{ borderBottomColor: accentColor === "cool" ? resolvedColor : '#dfd9ce', color: accentColor === "cool" ? resolvedColor : '#111827' }}
        >
          {title}
        </h4>
        <div className="mt-2 space-y-1.5 text-slate-700 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  if (template === "marco") {
    return (
      <section className={`${small ? "mt-4" : "mt-5.5"} text-slate-900 text-left font-serif`}>
        <h4 
          className="border-b pb-1 font-bold text-center uppercase tracking-widest text-[10.5px] sm:text-[11.5px]"
          style={{ borderBottomColor: '#c8c4bc', color: resolvedColor }}
        >
          {title}
        </h4>
        <div className="mt-2 space-y-2 text-slate-800 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  if (template === "filo") {
    return (
      <section className={`${small ? "mt-3" : "mt-5"} text-slate-800 text-left`}>
        <h4 
          className="border-t-2 border-b py-1.5 font-black uppercase tracking-wider text-[10.5px] sm:text-[11px]"
          style={{ borderTopColor: resolvedColor, borderBottomColor: '#171717', color: accentColor === "cool" ? resolvedColor : '#171717' }}
        >
          {title}
        </h4>
        <div className="mt-2 space-y-1.5 text-[#27272a] text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  if (template === "raw") {
    return (
      <section className={`${small ? "mt-3" : "mt-5"} text-slate-800 text-left font-serif`}>
        <h4 
          className="mb-1 border-b border-slate-300 pb-0.5 font-bold uppercase tracking-wider text-[11px] sm:text-[11.5px]"
          style={{ color: resolvedColor }}
        >
          {title}
        </h4>
        <div className="space-y-1.5 text-slate-800 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  // Default is "pulso"
  return (
    <section className={`${small ? "mt-4" : "mt-5.5"} text-slate-800 text-left`}>
      <h4 
        className="border-l-4 pl-3 pb-0.5 font-black uppercase tracking-wider text-[10.5px] sm:text-[11px]"
        style={{ borderLeftColor: resolvedColor, color: resolvedColor }}
      >
        {title}
      </h4>
      <div className="mt-2 space-y-1.5 text-slate-700 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
    </section>
  );
}

export function AnalysisExperience({ onImprove }: { onImprove: () => void }) {
  return (
    <div className="relative w-full">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-radial from-violet-600/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="space-y-10">
        <AnalysisCTA onImprove={onImprove} />
        <AnalysisHero />

        <div className="grid gap-8 lg:grid-cols-2">
          <ImprovementPanel />
          <KeywordsPanel />
        </div>
      </div>
    </div>
  );
}

function AnalysisCTA({ onImprove }: { onImprove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex justify-center"
    >
      <motion.button
        type="button"
        onClick={onImprove}
        animate={{ scale: [1, 1.03, 1], boxShadow: [
          "0 20px 50px rgba(124,58,237,0.3)",
          "0 24px 60px rgba(124,58,237,0.5)",
          "0 20px 50px rgba(124,58,237,0.3)",
        ]}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-violet-600 px-12 text-base font-bold text-white transition hover:bg-violet-500 active:scale-[0.97] cursor-pointer"
      >
        Improve CV in Template Studio
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="size-5" />
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

function AnalysisHero() {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0d12]/50 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Decorative inner glow */}
      <div className="absolute -right-32 -top-32 size-96 bg-radial from-amber-500/[0.07] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -left-32 -bottom-32 size-96 bg-radial from-violet-500/[0.05] to-transparent blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
        {/* Score ring column */}
        <div className="flex flex-col items-center shrink-0">
          <ScoreRing score={cvAnalysis.score} variant="amber" label="Score" size={120} strokeWidth={8} />
          <div className="mt-4 flex flex-col items-center">
            <span className="rounded-full bg-amber-500/12 border border-amber-500/20 px-3 py-1 text-xs font-black text-amber-300">
              IMPROVABLE
            </span>
          </div>
        </div>

        {/* Details column */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center lg:justify-start">
              <h3 className="text-2xl sm:text-3xl font-black text-white">Jonathan de la Sen CV</h3>

            </div>
          </div>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-4xl">
            This CV presents exceptional content, highlighting solid experience and deep technical knowledge in software engineering. It is particularly strong in impact quantification, system performance, and AI-assisted development. The next step is to clarify chronology, sharpen the summary and make the strongest signals easier for ATS and recruiters to scan.
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-white/40 pt-2">
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-medium">
              Model: gemini-2.5-flash
            </span>
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-medium">
              Analyzed: June 2, 2026 · 00:38
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImprovementPanel() {
  return (
    <section className="rounded-3xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.05] via-transparent to-transparent p-8 sm:p-10 shadow-lg relative overflow-hidden">
      <h4 className="mb-8 flex items-center gap-3 text-lg font-bold tracking-tight text-amber-400">
        <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
          <Star className="size-5" />
        </span>
        Areas to improve
      </h4>
      <ul className="space-y-6 text-[16px] md:text-[17px] font-medium leading-relaxed text-white/80">
        {cvAnalysis.improvements.map((item, idx) => (
          <li 
            key={item.title} 
            className="flex gap-4 p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all duration-300 group"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-black text-amber-300 group-hover:scale-110 transition duration-300">
              0{idx + 1}
            </span>
            <div className="flex flex-col gap-1.5 pt-0.5 select-none text-left">
              <strong className="text-white group-hover:text-amber-300 transition duration-300 font-bold text-base sm:text-lg">
                {item.title}
              </strong>
              <p className="text-sm leading-relaxed text-white/54 font-normal">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function KeywordsPanel() {
  return (
    <section className="rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent p-8 sm:p-10 shadow-lg relative overflow-hidden">
      <h4 className="mb-8 flex items-center gap-3 text-lg font-bold tracking-tight text-emerald-400">
        <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
          <Check className="size-5" />
        </span>
        Keywords found
      </h4>
      <div className="flex flex-wrap gap-2.5">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-xl border border-white/8 bg-white/[0.03] hover:border-emerald-500/30 hover:bg-emerald-500/10 px-3.5 py-2.5 text-[13px] font-semibold text-white/80 hover:text-emerald-200 transition duration-300 cursor-default hover:-translate-y-0.5 shadow-sm"
          >
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}
