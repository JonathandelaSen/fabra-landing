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

type FlowStep = "upload" | "ready" | "loading" | "analysis";

const stepper = [
  { key: "upload", label: "Upload CV" },
  { key: "analysis", label: "AI analysis" },
  { key: "insights", label: "Insights" },
] as const;

const keywords = [
  "Senior Software Engineer",
  "full-stack development",
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
  "Claude Code",
  "Codex",
  "Gemini",
  "high-traffic web applications",
  "high-throughput services",
  "DataDog",
  "Express",
  "Redis",
  "LMS integrations",
  "LTI",
  "TypeScript",
  "Kotlin",
  "Swift",
  "Microservices",
  "Sockets",
  "Lean methodology",
  "Stripe",
  "Apple In-App Purchases",
  "Web Software Engineering",
  "Scalable Systems",
  "Frontend",
  "User Experience",
  "Developer Productivity",
  "product discovery",
  "post-release tracking and monitoring",
  "system performance",
  "product health",
  "code reviews",
  "testing culture",
  "internal demos",
  "data science teams",
  "CTO responsibilities",
  "real-time features",
  "Android",
  "iOS",
  "mobile applications",
  "web applications",
  "revenue generation",
  "user feedback iteration",
];

export function LandingExperience() {
  const [step, setStep] = useState<FlowStep>("upload");
  const flowRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (step !== "upload") return;

    const timer = window.setTimeout(() => setStep("ready"), 1200);
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
    window.setTimeout(() => setStep("analysis"), 950);
  };

  const reset = () => {
    setStep("upload");
    flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <FlowHeader current={step} />
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
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-10"
              >
                <UploadExperience step={step} onAnalyze={analyze} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function FlowHeader({ current }: { current: FlowStep }) {
  const activeIndex = current === "upload" || current === "ready" ? 0 : current === "loading" ? 1 : 2;

  return (
    <div className="flex justify-center border-b border-white/10 pb-6 mb-8">
      <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-1">
        {stepper.map((item, index) => (
          <div
            key={item.key}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition sm:px-4 ${
              index <= activeIndex ? "bg-violet-500 text-white" : "text-white/42"
            }`}
          >
            <span>{index + 1}.</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadExperience({ step, onAnalyze }: { step: FlowStep; onAnalyze: () => void }) {
  const ready = step === "ready";

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-8 -z-10 rounded-[2.5rem] bg-violet-500/16 blur-3xl" />
        <div className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">CV upload</p>
              <p className="text-xs text-white/42">jonathandelasen cv.pdf</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/54">
              {ready ? "Ready" : "Uploading"}
            </span>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.54fr_1fr] xl:items-center">
            <UploadDropzone ready={ready} />
            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: ready ? 1 : 0.28, x: ready ? 0 : 18 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative"
            >
              <RealCVPreview small />
            </motion.div>
          </div>

          <AnimatePresence>
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="mt-6 flex justify-end"
              >
                <button
                  type="button"
                  onClick={onAnalyze}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-500 px-6 text-sm font-bold text-white shadow-[0_18px_50px_rgba(124,58,237,0.32)] transition hover:bg-violet-400"
                >
                  Analyze with Fabra
                  <Sparkles className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function UploadDropzone({ ready }: { ready: boolean }) {
  return (
    <div className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-dashed border-white/18 bg-black/18 p-6 text-center">
      <motion.div
        animate={{
          y: ready ? -72 : [0, -12, 0],
          scale: ready ? 0.82 : 1,
          rotate: ready ? -4 : 0,
        }}
        transition={{ duration: ready ? 0.5 : 1.2, repeat: ready ? 0 : Infinity, ease: "easeInOut" }}
        className="relative grid size-28 place-items-center rounded-3xl border border-white/14 bg-white/[0.07] shadow-2xl"
      >
        <FileText className="size-12 text-violet-100" />
        <span className="absolute -right-3 -top-3 rounded-full bg-violet-500 px-2 py-1 text-[10px] font-black text-white">
          PDF
        </span>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ width: ready ? "100%" : "42%" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="mt-9 h-1.5 max-w-[260px] rounded-full bg-violet-400"
      />
      <p className="mt-6 text-sm font-semibold text-white">{ready ? "CV uploaded" : "Uploading Jonathan's CV"}</p>
      <p className="mt-2 max-w-xs text-xs leading-5 text-white/42">
        {ready ? "The PDF is ready to be analyzed." : "Extracting the file into Fabra's workspace."}
      </p>
    </div>
  );
}

function RealCVPreview({ small = false }: { small?: boolean }) {
  return (
    <div className={`cv-paper mx-auto rounded-[0.35rem] ${small ? "max-h-[560px] max-w-[410px] overflow-hidden p-5" : "p-7"}`}>
      <header>
        <h3 className="text-[22px] font-medium tracking-wide text-slate-900">
          {profile.name} · {profile.role}
        </h3>
        <div className="mt-4 space-y-1.5 text-[12px] font-semibold text-slate-800">
          <p>@ {profile.email}</p>
          <p>⌘ github.com/JonathandelaSen</p>
        </div>
      </header>
      <CVSection title="About me">
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
      <CVSection title="Work experience">
        <p>
          <strong>Senior Software Engineer at Edpuzzle</strong>
          <br />
          <span className="text-slate-500">Sep 2024 - Present</span>
        </p>
        <ul className="mt-3 space-y-2 pl-4">
          <li>Own features end-to-end for a platform with <strong>2M+ daily active users</strong>.</li>
          <li>Develop and operate high throughput backend services using Node.js, Express, MongoDB and Redis.</li>
          <li>Design monitoring pipelines and dashboards using DataDog.</li>
        </ul>
      </CVSection>
    </div>
  );
}

function CVSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 text-[12px] leading-[1.25] text-slate-800">
      <h4 className="mb-3 text-[15px] font-black uppercase tracking-wide text-[#f25778]">{title}</h4>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function AnalysisExperience({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        className="pointer-events-none absolute inset-x-0 -top-8 -z-10 mx-auto max-w-3xl blur-sm"
      >
        <RealCVPreview small />
      </motion.div>
      <div className="relative rounded-[1.8rem] border border-white/10 bg-[#10131b] p-5 shadow-2xl">
        <AnalysisHero onReset={onReset} />
        <div className="mt-9 inline-flex rounded-2xl border border-white/10 bg-white/[0.035] p-1">
          <div className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-bold text-white">
            <Sparkles className="size-4" />
            Summary
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ImprovementPanel />
          <KeywordsPanel />
        </div>
      </div>
    </div>
  );
}

function AnalysisHero({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-[1.4rem] border border-amber-500/38 bg-amber-500/[0.11] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-amber-500/18 pb-6 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Jonathan de la Sen CV</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-400/40 bg-amber-400/12 px-3 py-1 text-xs font-bold text-amber-300">
              Improvable
            </span>
            <span className="rounded-full border border-violet-300/30 bg-violet-300/12 px-3 py-1 text-xs font-bold text-violet-200">
              General analysis
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-1 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 shadow-[0_8px_30px_rgba(245,158,11,0.08)] w-fit shrink-0">
          <span className="text-3xl font-black tracking-tight text-amber-300">65</span>
          <span className="text-xs font-semibold text-amber-400/50">/100</span>
        </div>
      </div>
      
      <div>
        <p className="max-w-5xl text-[15px] leading-7 text-white/62">
          This CV presents exceptional content, highlighting solid experience and deep technical knowledge in software engineering.
          It is particularly strong in impact quantification, system performance and AI-assisted development. The next step is to
          clarify chronology, sharpen the summary and make the strongest signals easier for ATS and recruiters to scan.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <MetaPill>gemini-2.5-flash</MetaPill>
          <MetaPill>June 2, 2026 · 00:38</MetaPill>
          <MetaPill accent>jonathandelasen cv.pdf <ExternalLink className="size-3" /></MetaPill>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-violet-400/28 bg-violet-500/15 px-3 py-2 text-xs font-bold text-violet-200">
            <Download className="size-3.5" />
            Export
          </button>
          <button onClick={onReset} className="inline-flex items-center gap-2 rounded-lg border border-rose-400/28 bg-rose-500/15 px-3 py-2 text-xs font-bold text-rose-200">
            <Trash2 className="size-3.5" />
            Restart
          </button>
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
    <section className="min-h-[520px] rounded-[1.35rem] border border-amber-500/38 bg-amber-500/[0.04] p-6">
      <h4 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#ffc107]">
        <Star className="size-4" />
        Areas to improve
      </h4>
      <ul className="space-y-5 text-[15px] leading-6 text-white/72">
        {cvAnalysis.improvements.map((item) => (
          <li key={item} className="flex gap-3">
            <ArrowRight className="mt-1 size-4 shrink-0 text-[#ffc107]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function KeywordsPanel() {
  return (
    <section className="min-h-[520px] rounded-[1.35rem] border border-white/12 bg-white/[0.055] p-6">
      <h4 className="mb-5 flex items-center gap-2 text-sm font-bold text-emerald-300">
        <Check className="size-4" />
        Keywords found
      </h4>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-lg border border-emerald-400/24 bg-emerald-400/12 px-3 py-2 text-xs font-medium text-emerald-200"
          >
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}
