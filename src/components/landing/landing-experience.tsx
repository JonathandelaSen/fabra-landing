"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import { appUrl, cvAnalysis, profile } from "@/lib/demo-data";

type FlowStep = "idle" | "uploading" | "ready" | "loading" | "analysis";

const stepper = [
  { key: "upload", label: "Upload CV" },
  { key: "analysis", label: "AI analysis" },
  { key: "insights", label: "Insights" },
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

  useEffect(() => {
    if (step !== "uploading") return;

    const timer = window.setTimeout(() => setStep("ready"), 1500);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step === "analysis") {
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

  const reset = () => {
    setStep("idle");
    flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTabClick = (tabKey: "upload" | "analysis" | "insights") => {
    if (tabKey === "upload") {
      if (step === "analysis" || step === "loading") {
        setStep("ready");
      } else {
        setStep("idle");
      }
    } else if (tabKey === "analysis") {
      if (step === "ready" || step === "analysis") {
        setStep("loading");
        window.setTimeout(() => setStep("analysis"), 3800);
      }
    } else if (tabKey === "insights") {
      if (step === "ready" || step === "loading" || step === "analysis") {
        setStep("analysis");
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
                <AnalysisExperience onReset={reset} />
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
  onTabClick: (key: "upload" | "analysis" | "insights") => void;
}) {
  const activeIndex = current === "idle" || current === "uploading" || current === "ready" ? 0 : current === "loading" ? 1 : 2;
  const canNavigateToAnalysis = current !== "idle" && current !== "uploading";

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

function RealCVPreview({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`cv-paper mx-auto rounded-lg shadow-2xl transition-all duration-300 ${
        small
          ? "max-h-[460px] max-w-[390px] overflow-hidden p-5 text-[10px]"
          : "w-full max-w-[680px] p-10 sm:p-12 text-[12px] flex flex-col"
      }`}
    >
      <header className={`${small ? "border-b border-slate-200 pb-2" : "border-b-2 border-slate-200 pb-4"}`}>
        <h3 className={`${small ? "text-sm" : "text-[22px]"} font-medium tracking-wide text-slate-900`}>
          {profile.name} · {profile.role}
        </h3>
        <div className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 ${small ? "text-[9px]" : "text-[12px]"} font-semibold text-slate-600`}>
          <p>📧 {profile.email}</p>
          <p>💻 github.com/JonathandelaSen</p>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col">
        <CVSection title="About me" small={small}>
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
        </CVSection>

        <CVSection title="Work experience" small={small}>
          <div className="space-y-4">
            <div>
              <p className="flex justify-between font-bold text-slate-800">
                <span>Senior Software Engineer at Edpuzzle</span>
                <span className="text-slate-500 font-normal">Sep 2024 - Present</span>
              </p>
              <ul className={`mt-2 space-y-1 pl-4 list-disc ${small ? "text-[9px] leading-relaxed" : "text-[11px] leading-relaxed"} text-slate-700`}>
                <li>Own features end-to-end for a platform with <strong>2M+ daily active users</strong>.</li>
                <li>Develop and operate high throughput backend services using Node.js, Express, MongoDB and Redis.</li>
                <li>Design monitoring pipelines and dashboards using DataDog.</li>
              </ul>
            </div>

            <div>
              <p className="flex justify-between font-bold text-slate-800">
                <span>Tech Lead at Dezzai</span>
                <span className="text-slate-500 font-normal">Sep 2020 - Present</span>
              </p>
              <ul className={`mt-2 space-y-1 pl-4 list-disc ${small ? "text-[9px] leading-relaxed" : "text-[11px] leading-relaxed"} text-slate-700`}>
                <li>Collaborated with external partners such as <strong>Grupo Prisa (Colombia)</strong> to design digitizing workflows (EGMs).</li>
                <li>Built and scaled a multidisciplinary engineering team, improving development practices.</li>
                <li>Designed backend systems using event-driven architecture, DDD, and scalable data pipelines.</li>
                <li>Coordinated closely with data science teams to integrate trained models.</li>
                <li>Temporarily assumed <strong>CTO responsibilities</strong> during two extended leaves.</li>
              </ul>
            </div>
          </div>
        </CVSection>
      </div>
    </div>
  );
}

function CVSection({ title, children, small = false }: { title: string; children: React.ReactNode; small?: boolean }) {
  return (
    <section className={`${small ? "mt-4" : "mt-6"} text-slate-800 text-left`}>
      <h4 className={`mb-1.5 font-black uppercase tracking-wide text-[#f25778] ${small ? "text-[11px]" : "text-[14px]"}`}>{title}</h4>
      <div className={`${small ? "space-y-1.5 text-[9px] leading-relaxed" : "space-y-2 text-[12px] leading-relaxed"}`}>{children}</div>
    </section>
  );
}

function AnalysisExperience({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative w-full">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute inset-0 -z-10 bg-radial from-violet-600/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="space-y-10">
        <AnalysisHero onReset={onReset} />
        <div className="grid gap-8 lg:grid-cols-2">
          <ImprovementPanel />
          <KeywordsPanel />
        </div>
      </div>
    </div>
  );
}

function AnalysisHero({ onReset }: { onReset: () => void }) {
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
