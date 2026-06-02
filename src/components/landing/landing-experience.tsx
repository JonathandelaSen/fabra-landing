"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  ExternalLink,
  FileText,
  Loader2,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { appUrl, cvAnalysis, job, profile } from "@/lib/demo-data";

type FlowStep = "idle" | "uploading" | "ready" | "loading" | "analysis" | "templates" | "studio" | "completion";

const stepper = [
  { key: "upload", label: "Upload CV" },
  { key: "analysis", label: "AI analysis" },
  { key: "studio", label: "Template Studio" },
  { key: "match", label: "Job Match" },
] as const;

const keywords = [
  "backend expertise",
  "Node.js",
  "MongoDB",
  "React",
  "modern web architectures",
  "system design",
  "DDD",
  "CQRS",
  "event-driven systems",
  "AI-first development",
  "DataDog",
  "Express",
  "Redis",
  "TypeScript",
  "Kotlin",
  "Swift",
  "Microservices",
  "Stripe",
  "Scalable Systems",
  "Frontend",
  "User Experience",
  "Developer Productivity",
  "product discovery",
  "system performance",
  "product health",
  "Android",
  "iOS",
  "mobile applications",
  "web applications",
  "revenue generation",
  "user feedback iteration",
];

export function LandingExperience() {
  const [step, setStep] = useState<FlowStep>("idle");
  const flowRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);

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

  useEffect(() => {
    if (step === "analysis" || step === "templates" || step === "studio" || step === "completion") {
      flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const scrollToFlow = () => {
    flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const analyze = () => {
    setStep("loading");
    window.setTimeout(() => setStep("analysis"), 3800);
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
        setStep("loading");
        window.setTimeout(() => setStep("analysis"), 3800);
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

  // Asistencia por JavaScript para scroll dirigido extremadamente fluido
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const currentScrollY = window.scrollY;
      
      if (!flowRef.current) return;
      const flowOffsetTop = flowRef.current.offsetTop;
      const inHero = currentScrollY < flowOffsetTop - 100;

      if (deltaY > 0) {
        if (inHero) {
          e.preventDefault();
          isScrollingRef.current = true;
          flowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
        }
      } else if (deltaY < 0) {
        if (!inHero && window.scrollY <= flowOffsetTop + 10) {
          e.preventDefault();
          isScrollingRef.current = true;
          const topElement = document.getElementById("top");
          topElement?.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      (window as any).touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const touchStartY = (window as any).touchStartY || 0;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const currentScrollY = window.scrollY;
      
      if (!flowRef.current) return;
      const flowOffsetTop = flowRef.current.offsetTop;
      const inHero = currentScrollY < flowOffsetTop - 100;

      if (Math.abs(deltaY) > 20) {
        if (deltaY > 0) {
          if (inHero) {
            e.preventDefault();
            isScrollingRef.current = true;
            flowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 800);
          }
        } else {
          if (!inHero && window.scrollY <= flowOffsetTop + 10) {
            e.preventDefault();
            isScrollingRef.current = true;
            const topElement = document.getElementById("top");
            topElement?.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 800);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [step]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="noise" />

      <section className="relative flex min-h-[100svh] items-center px-5 pt-24 sm:px-8 lg:px-12 snap-start snap-always" id="top">
        <div className="absolute inset-0 -z-10 soft-grid opacity-35" />
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="mb-6 text-5xl font-black tracking-[0.18em] text-white sm:text-7xl lg:text-8xl">
              FABRA
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Craft your career, your way.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              Analyze your CV with AI, understand your strongest signal, and start shaping the next version of your career.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToFlow}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#090a10] transition hover:scale-[1.02]"
              >
                Explore the flow
                <ArrowRight className="size-4" />
              </button>
              <a
                href={appUrl}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white/82 transition hover:border-white/30 hover:bg-white/8"
              >
                Start crafting with Fabra
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={flowRef} id="flow" className="min-h-[100svh] px-5 py-20 sm:px-8 lg:px-12 snap-start snap-always">
        <div className="mx-auto max-w-7xl">
          <FlowHeader current={step} onTabClick={handleTabClick} />
          <GuideBanner step={step} />
          <AnimatePresence mode="wait">
            {step === "analysis" ? (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <AnalysisExperience onImprove={() => setStep("templates")} />
              </motion.div>
            ) : step === "templates" ? (
              <motion.div
                key="templates"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <TemplateSelectionView onSelectTemplate={(tpl) => {
                  setSelectedTemplate(tpl);
                  resetStudioStates();
                  setStep("studio");
                }} />
              </motion.div>
            ) : step === "studio" ? (
              <motion.div
                key="studio"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <TemplateStudioView 
                  template={selectedTemplate}
                  onChangeTemplate={() => {
                    resetStudioStates();
                    setStep("templates");
                  }}
                  onFinalize={() => setStep("completion")}
                  accentColor={accentColor}
                  setAccentColor={setAccentColor}
                  skillsPosition={skillsPosition}
                  setSkillsPosition={setSkillsPosition}
                  isSummaryCondensed={isSummaryCondensed}
                  setIsSummaryCondensed={setIsSummaryCondensed}
                  isSuggestionsApplied={isSuggestionsApplied}
                  setIsSuggestionsApplied={setIsSuggestionsApplied}
                />
              </motion.div>
            ) : step === "completion" ? (
              <motion.div
                key="completion"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
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
                />
              </motion.div>
            ) : step === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
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
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-10"
              >
                <UploadExperience step={step} onStartUpload={() => setStep("uploading")} onAnalyze={analyze} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function GuideBanner({ step }: { step: FlowStep }) {
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
      default:
        return null;
    }
  };

  const content = getGuideContent();
  if (!content) return null;

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, scale: 0.98, y: -10 }}
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

function LoadingExperience() {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "Reading PDF document structure...",
    "Extracting metadata & career checkpoints...",
    "Benchmarking technical skills against industry standards...",
    "Scanning keyword alignment and coverage...",
    "Consulting models for strategic analysis...",
    "Assembling recommendations & finishing diagnostic report...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-16 flex flex-col items-center justify-center text-center relative select-none">
      <div className="absolute inset-0 -z-10 rounded-[3rem] bg-violet-500/[0.03] blur-3xl pointer-events-none" />
      
      {/* Círculo de Carga Inteligente de la Guía */}
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
        
        {/* Log dinámico de tareas */}
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
              {logs[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Barra de progreso de carga */}
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


function FlowHeader({
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
        {/* Línea de progreso de fondo */}
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
              {/* Nodo circular interactivo */}
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

                {/* Resplandor pulsante para nodo activo */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-violet-400/20 pointer-events-none" />
                )}
              </motion.div>

              {/* Etiqueta del paso */}
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

function UploadExperience({
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
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
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
            initial={{ opacity: 0, y: 18 }}
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
        initial={{ opacity: 0, y: 15 }}
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

function RealCVPreview({
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

function AnalysisExperience({ onImprove }: { onImprove: () => void }) {
  return (
    <div className="relative w-full">
      {/* Resplandor ambiental de fondo */}
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
    <div className="rounded-3xl border border-amber-500/18 bg-gradient-to-br from-amber-500/[0.12] via-amber-600/[0.03] to-transparent p-8 sm:p-10 shadow-[0_24px_80px_rgba(245,158,11,0.08)] relative overflow-hidden">
      {/* Resplandor interior decorativo */}
      <div className="absolute -right-20 -top-20 -z-10 size-96 rounded-full bg-radial from-amber-500/12 to-transparent blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-amber-500/18 pb-8 mb-8">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Jonathan de la Sen CV</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-400/40 bg-amber-400/12 px-3.5 py-1 text-xs font-bold text-amber-300">
              Improvable
            </span>
            <span className="rounded-full border border-violet-300/30 bg-violet-300/12 px-3.5 py-1 text-xs font-bold text-violet-200">
              General analysis
            </span>
          </div>
        </div>
        
        {/* Marcador de puntuación circular premium y animado */}
        <div className="relative flex items-center justify-center size-28 sm:size-32 rounded-full border border-amber-500/30 bg-[#090a10]/95 shadow-[0_0_50px_rgba(245,158,11,0.22)] shrink-0 group">
          {/* Anillo de brillo exterior pulsante */}
          <span className="absolute inset-0 rounded-full border border-amber-500/10 animate-ping opacity-75 pointer-events-none" />
          {/* Anillo giratorio de guiones */}
          <span className="absolute inset-2 rounded-full border border-dashed border-amber-500/20 animate-spin animate-duration-[20000ms]" />
          {/* Segundo anillo concéntrico estático */}
          <span className="absolute inset-4 rounded-full border border-dotted border-amber-500/10" />
          <div className="flex items-baseline select-none z-10">
            <span className="text-5xl sm:text-6xl font-black tracking-tighter bg-gradient-to-b from-white via-amber-200 to-amber-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]">
              {cvAnalysis.score}
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <p className="max-w-5xl text-base sm:text-lg leading-8 text-white/62">
          This CV presents exceptional content, highlighting solid experience and deep technical knowledge in software engineering.
          It is particularly strong in impact quantification, system performance and AI-assisted development. The next step is to
          clarify chronology, sharpen the summary and make the strongest signals easier for ATS and recruiters to scan.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <MetaPill>gemini-2.5-flash</MetaPill>
          <MetaPill>June 2, 2026 · 00:38</MetaPill>
          <MetaPill accent>jonathandelasen cv.pdf <ExternalLink className="size-3" /></MetaPill>
        </div>
      </div>
    </div>
  );
}

function MetaPill({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
        accent
          ? "border-sky-400/30 bg-sky-500/15 text-sky-200"
          : "border-white/8 bg-white/[0.045] text-white/38"
      }`}
    >
      {children}
    </span>
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

function TemplateSelectionView({
  onSelectTemplate,
}: {
  onSelectTemplate: (key: "linea" | "marco" | "pulso" | "filo") => void;
}) {
  const templatesData: ReadonlyArray<{
    readonly id: "linea" | "marco" | "pulso" | "filo";
    readonly name: string;
    readonly description: string;
    readonly tag: string;
    readonly badgeColor: string;
    readonly previewLines: ReadonlyArray<string>;
  }> = [
    {
      id: "linea",
      name: "Linea",
      description: "Compact, precise, and highly ATS-friendly. Built for classic technical profiling.",
      tag: "Minimalist",
      badgeColor: "bg-slate-500/10 text-slate-300 border-slate-500/20",
      previewLines: [
        "------------------------------------",
        "JONATHAN DE LA SEN · SOFTWARE ENGINEER",
        "------------------------------------",
        "■ About  ■ Experience  ■ Skills",
      ]
    },
    {
      id: "marco",
      name: "Marco",
      description: "Classic, editorial, and elegant. Features traditional serif typography and margins.",
      tag: "Traditional",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      previewLines: [
        "====================================",
        "      JONATHAN DE LA SEN",
        "       Software Engineer",
        "====================================",
      ]
    },
    {
      id: "pulso",
      name: "Pulso",
      description: "Modern, energetic, and visually alive. Recommended for technology and startup roles.",
      tag: "Protagonist",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      previewLines: [
        "◆ JONATHAN DE LA SEN",
        "  Senior Software Engineer",
        "  --------------------------------",
        "  ● Node.js  ● React  ● TypeScript",
      ]
    },
    {
      id: "filo",
      name: "Filo",
      description: "Sharp, structured, and decisive. Accented with left border layouts and modern font hierarchy.",
      tag: "Executive",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      previewLines: [
        "| JONATHAN DE LA SEN",
        "| Senior Software Engineer",
        "| About Me",
        "| Work Experience",
      ]
    },
  ] as const;

  return (
    <div className="w-full py-6 select-none">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Select a layout template
        </h3>
        <p className="mt-3 text-base text-white/60">
          Choose a style to preview your analyzed data. You can refine and customize the sections in the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {templatesData.map((tpl) => (
          <motion.button
            key={tpl.id}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectTemplate(tpl.id)}
            className="relative flex flex-col text-left rounded-3xl border border-white/10 p-6 bg-gradient-to-b from-[#11131b]/90 to-[#0b0c10]/95 hover:border-violet-500/30 transition-all duration-300 group cursor-pointer shadow-xl"
          >
            
            <div className="flex items-center justify-between mb-4">
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tpl.badgeColor}`}>
                {tpl.tag}
              </span>
            </div>

            <h4 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors duration-300">
              {tpl.name}
            </h4>
            <p className="mt-2 text-xs text-white/54 leading-relaxed flex-1">
              {tpl.description}
            </p>

            {/* Live miniature preview of the template */}
            <div className="mt-5 h-[300px] w-full rounded-xl bg-slate-950/50 border border-white/5 overflow-hidden relative select-none pointer-events-none flex justify-center items-start">
              <div 
                className="relative shrink-0 origin-top"
                style={{
                  width: '500px',
                  transform: 'scale(0.58)',
                  marginTop: '8px',
                }}
              >
                <RealCVPreview template={tpl.id} accentColor="default" small={false} />
              </div>
            </div>

            <div className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 transition duration-300">
              Use Template
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function TemplateStudioView({
  template,
  onChangeTemplate,
  onFinalize,
  accentColor,
  setAccentColor,
  skillsPosition,
  setSkillsPosition,
  isSummaryCondensed,
  setIsSummaryCondensed,
  isSuggestionsApplied,
  setIsSuggestionsApplied,
}: {
  template: "linea" | "marco" | "pulso" | "filo";
  onChangeTemplate: () => void;
  onFinalize: () => void;
  accentColor: "default" | "cool";
  setAccentColor: (c: "default" | "cool") => void;
  skillsPosition: "bottom" | "top";
  setSkillsPosition: (p: "bottom" | "top") => void;
  isSummaryCondensed: boolean;
  setIsSummaryCondensed: (b: boolean) => void;
  isSuggestionsApplied: boolean;
  setIsSuggestionsApplied: (b: boolean) => void;
}) {
  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: `Welcome to the Template Studio! I've loaded your data into the "${template.toUpperCase()}" template. How would you like to refine your CV? You can click one of the suggested actions below.`
      }
    ]);
  }, [template]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const isColorApplied = accentColor === "cool";
  const isSkillsApplied = skillsPosition === "top";
  const isSummaryApplied = isSummaryCondensed;

  const handlePillClick = (type: "color" | "skills" | "summary" | "suggestions") => {
    if (isTyping) return;
    
    let userText = "";
    if (type === "color") {
      userText = "🎨 Change colors to a cooler blue/purple tone.";
    } else if (type === "skills") {
      userText = "🔄 Move Skills section above Work Experience.";
    } else if (type === "summary") {
      userText = "✍️ Condense the professional summary paragraph.";
    } else if (type === "suggestions") {
      userText = "Implement AI recommendations from profile analysis.";
    }

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      if (type === "color") {
        setAccentColor("cool");
        aiText = "Theme colors updated successfully! The template has been set to the cooler blue/purple palette.";
      } else if (type === "skills") {
        setSkillsPosition("top");
        aiText = "Technical Skills section repositioned! It is now loaded at the top to highlight core competencies.";
      } else if (type === "summary") {
        setIsSummaryCondensed(true);
        aiText = "Summary condensed! Your professional profile bio is now brief, direct, and results-oriented.";
      } else if (type === "suggestions") {
        setIsSuggestionsApplied(true);
        setSkillsPosition("top");
        aiText = "All suggestions applied! I have repositioned your technical skills to the top, quantified your impact at Edpuzzle (99.98% uptime, 35% database query reduction), and reframed your CTO role at Dezzai to sound more executive-ready. Check out the highlighted changes in the preview!";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full py-4 select-none space-y-6">
      <div className="flex justify-center">
        <motion.button
          type="button"
          onClick={onFinalize}
          animate={{ scale: [1, 1.03, 1], boxShadow: [
            "0 16px 40px rgba(16,185,129,0.25)",
            "0 20px 50px rgba(16,185,129,0.4)",
            "0 16px 40px rgba(16,185,129,0.25)",
          ]}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-10 text-sm font-black text-white transition hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          <Check className="size-4 stroke-[3]" />
          Finalize CV
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="size-4" />
          </motion.span>
        </motion.button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Columna Izquierda: Chatbot Editor */}
      <div className="lg:col-span-5 flex flex-col h-[640px] rounded-3xl border border-white/10 bg-[#0c0d12]/80 backdrop-blur-md shadow-2xl overflow-hidden relative">
        
        {/* Cabecera del chat */}
        <div className="p-5 border-b border-white/8 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-3.5 rounded-full bg-violet-50 animate-pulse" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">AI Assistant</h4>
              <p className="text-[10px] text-white/42 font-medium">CV Tailoring Sandbox</p>
            </div>
          </div>
          <button 
            onClick={onChangeTemplate}
            className="text-[11px] font-bold text-violet-400 hover:text-violet-300 border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 rounded-full transition duration-300 cursor-pointer"
          >
            Change Template
          </button>
        </div>

        {/* Historial de mensajes */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-violet-600 text-white rounded-br-none" 
                    : "bg-white/[0.04] border border-white/5 text-white/80 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Indicador de escritura */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-bl-none p-4 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "100ms" }} />
                <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "200ms" }} />
                <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Entrada y píldoras rápidas */}
        <div className="p-5 border-t border-white/8 bg-white/[0.01] space-y-4">
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Suggested Adjustments</p>
            <div className="flex flex-wrap gap-2">
              <button
                disabled={isSuggestionsApplied || isTyping}
                onClick={() => handlePillClick("suggestions")}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black transition duration-300 ${
                  isSuggestionsApplied
                    ? "bg-amber-500/12 border border-amber-500/20 text-amber-400 opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.38)] cursor-pointer"
                }`}
              >
                {isSuggestionsApplied ? "✓ Suggestions Applied" : "✨ Implement Suggestions"}
              </button>

              <button
                disabled={isColorApplied || isTyping}
                onClick={() => handlePillClick("color")}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition duration-300 ${
                  isColorApplied
                    ? "bg-emerald-500/12 border border-emerald-500/20 text-emerald-400 opacity-60 cursor-not-allowed"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-white/70 hover:text-white cursor-pointer"
                }`}
              >
                {isColorApplied ? "✓ Theme Updated" : "🎨 Change Colors"}
              </button>
              
              <button
                disabled={isSkillsApplied || isTyping}
                onClick={() => handlePillClick("skills")}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition duration-300 ${
                  isSkillsApplied
                    ? "bg-emerald-500/12 border border-emerald-500/20 text-emerald-400 opacity-60 cursor-not-allowed"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-white/70 hover:text-white cursor-pointer"
                }`}
              >
                {isSkillsApplied ? "✓ Skills Moved to Top" : "🔄 Move Skills to Top"}
              </button>

              <button
                disabled={isSummaryApplied || isTyping}
                onClick={() => handlePillClick("summary")}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition duration-300 ${
                  isSummaryApplied
                    ? "bg-emerald-500/12 border border-emerald-500/20 text-emerald-400 opacity-60 cursor-not-allowed"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-white/70 hover:text-white cursor-pointer"
                }`}
              >
                {isSummaryApplied ? "✓ Summary Condensed" : "✍️ Condense Summary"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/8 p-1">
            <input 
              type="text" 
              readOnly
              placeholder="Select an adjustment pill above to command the AI..." 
              className="flex-1 px-4 text-xs text-white/30 bg-transparent border-0 outline-none select-none cursor-default"
            />
            <button 
              disabled 
              className="size-8 rounded-full bg-violet-600/30 flex items-center justify-center text-white/40 cursor-not-allowed"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Columna Derecha: Previsualización de CV adaptable */}
      <div className="lg:col-span-7 flex flex-col items-center w-full">
        <div className="w-full max-w-[680px] mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Interactive CV Studio</p>
            <p className="text-[10px] font-medium text-white/42 uppercase tracking-widest">Editing in {template.toUpperCase()} Mode</p>
          </div>
          <div className="flex gap-2">
            {accentColor === "cool" && (
              <span className="rounded-full bg-indigo-500/12 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 animate-fade-in">
                Cool Palette
              </span>
            )}
            {skillsPosition === "top" && (
              <span className="rounded-full bg-amber-500/12 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 animate-fade-in">
                Skills at Top
              </span>
            )}
            {isSummaryCondensed && (
              <span className="rounded-full bg-emerald-500/12 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 animate-fade-in">
                Condensed Summary
              </span>
            )}
          </div>
        </div>
        
        <div className="w-full max-w-[680px] rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          <RealCVPreview 
            template={template}
            accentColor={accentColor}
            skillsPosition={skillsPosition}
            isSummaryCondensed={isSummaryCondensed}
            isSuggestionsApplied={isSuggestionsApplied}
            small={false}
          />
        </div>
      </div>
      </div>

    </div>
  );
}

/* ─── Confetti Particle ─── */
function ConfettiParticle({ delay, color, left }: { delay: number; color: string; left: string }) {
  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, 600],
        x: [0, (Math.random() - 0.5) * 200],
        rotate: [0, 360 + Math.random() * 360],
        opacity: [1, 1, 0],
        scale: [1, 0.6],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
      className="absolute top-0 pointer-events-none"
      style={{ left }}
    >
      <div
        className="rounded-sm"
        style={{
          width: `${6 + Math.random() * 8}px`,
          height: `${6 + Math.random() * 8}px`,
          background: color,
          transform: `rotate(${Math.random() * 45}deg)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Completion Experience ─── */
function CompletionExperience({
  template,
  accentColor,
  skillsPosition,
  isSummaryCondensed,
  isSuggestionsApplied,
}: {
  template: "linea" | "marco" | "pulso" | "filo";
  accentColor: "default" | "cool";
  skillsPosition: "bottom" | "top";
  isSummaryCondensed: boolean;
  isSuggestionsApplied: boolean;
}) {
  const confettiColors = [
    "#a855f7", "#6366f1", "#ec4899", "#f59e0b", "#10b981",
    "#06b6d4", "#f43f5e", "#8b5cf6", "#22d3ee", "#fbbf24",
  ];

  const confettiParticles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`,
  }));

  return (
    <div className="relative w-full py-8 select-none">
      {/* Confetti layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        {confettiParticles.map((p) => (
          <ConfettiParticle key={p.id} delay={p.delay} color={p.color} left={p.left} />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 bg-radial from-emerald-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Celebration hero */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="relative size-28 sm:size-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-violet-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.25)]">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Trophy className="size-14 sm:size-16 text-amber-400 drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]" />
            </motion.div>
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20"
            />
          </div>

          {/* Floating emojis */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-2 -right-4 text-3xl"
          >
            🎉
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="absolute -bottom-1 -left-5 text-2xl"
          >
            🎊
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="absolute top-0 -left-3 text-xl"
          >
            ✨
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Your CV is ready!
          </h3>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Congratulations! Your optimized CV has been tailored and polished. Now let&apos;s see how it stacks up against a real opportunity.
          </p>
        </motion.div>

        {/* Mini CV preview */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10 w-full max-w-md"
        >
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/60 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/8">
              <div className="size-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <Check className="size-4 text-emerald-400 stroke-[3]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">{profile.name}</p>
                <p className="text-[10px] text-white/42">{template.toUpperCase()} Template · Optimized</p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-500/12 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                Ready
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/5">
              <div className="flex justify-center items-start overflow-hidden" style={{ height: '180px' }}>
                <div
                  className="relative shrink-0 origin-top"
                  style={{ width: '500px', transform: 'scale(0.35)', marginTop: '4px' }}
                >
                  <RealCVPreview
                    template={template}
                    accentColor={accentColor}
                    skillsPosition={skillsPosition}
                    isSummaryCondensed={isSummaryCondensed}
                    isSuggestionsApplied={isSuggestionsApplied}
                    small={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25">Next step</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="size-5 text-white/20 rotate-90" />
          </motion.div>
        </motion.div>

        {/* Job match CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-indigo-600/10 to-cyan-600/5 p-8 sm:p-10 shadow-[0_24px_80px_rgba(124,58,237,0.12)] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -right-16 -top-16 size-64 bg-radial from-violet-500/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 size-64 bg-radial from-cyan-500/8 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="size-14 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mb-5">
                <Briefcase className="size-7 text-violet-400" />
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                Compare against a job offer
              </h4>
              <p className="text-sm text-white/55 leading-relaxed max-w-md mb-6">
                See how your optimized profile matches a real engineering role. AI will score your alignment, flag gaps, and suggest how to position your experience.
              </p>

              {/* Fake job card */}
              <div className="w-full max-w-sm rounded-2xl border border-white/8 bg-white/[0.03] p-5 mb-6 text-left">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-white">{job.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{job.company} · {job.location}</p>
                  </div>
                  <span className="rounded-lg bg-violet-500/12 border border-violet-500/20 px-2 py-1 text-[10px] font-black text-violet-300">
                    NEW
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <motion.button
                type="button"
                animate={{
                  boxShadow: [
                    "0 20px 50px rgba(124,58,237,0.25)",
                    "0 24px 60px rgba(124,58,237,0.45)",
                    "0 20px 50px rgba(124,58,237,0.25)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 px-10 text-base font-black text-white transition hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              >
                <Sparkles className="size-5" />
                Match my profile to this role
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              </motion.button>

              <p className="mt-4 text-[11px] text-white/30">
                Powered by AI · Takes ~5 seconds
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

