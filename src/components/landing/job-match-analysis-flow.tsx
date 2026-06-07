"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Check, ClipboardList, ExternalLink, HelpCircle, Loader2, MessageSquare, Sparkles, Target } from "lucide-react";
import { job } from "@/lib/demo-data";
import { FlowStep } from "./landing-data";

export function JobMatchFlowHeader({
  current,
  onStepChange,
  onBackToCV,
}: {
  current: FlowStep;
  onStepChange: (step: FlowStep) => void;
  onBackToCV: () => void;
}) {
  const steps = [
    { key: "job-analysis", label: "Job Analysis" },
    { key: "job-chat", label: "AI Chat" },
    { key: "job-tracking", label: "Job Tracking" },
  ] as const;

  const activeIndex =
    current === "job-loading" || current === "job-analysis" ? 0 :
    current === "job-chat" ? 1 :
    current === "job-tracking" ? 2 :
    0;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6">
      {/* Back button */}
      <button
        onClick={onBackToCV}
        className="self-start mb-4 flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition cursor-pointer"
      >
        <ArrowLeft className="size-3.5" />
        Back to CV Ready
      </button>

      <div className="relative flex items-center justify-between w-full px-8 py-4">
        {/* Background progress line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 -z-10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"
            initial={false}
            animate={{ width: activeIndex === 0 ? "0%" : activeIndex === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((item, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;

          const isClickable = current !== "job-loading";

          return (
            <button
              key={item.key}
              type="button"
              disabled={!isClickable}
              onClick={() => onStepChange(item.key as FlowStep)}
              className={`relative flex flex-col items-center gap-2 group transition-all duration-300 ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-40"
              }`}
            >
              {/* Interactive circular node */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  boxShadow: isActive
                    ? "0 0 20px rgba(124, 58, 237, 0.4)"
                    : isCompleted
                    ? "0 0 10px rgba(99, 102, 241, 0.2)"
                    : "0 0 0px rgba(0,0,0,0)"
                }}
                className={`relative flex size-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-violet-600 border-violet-400 text-white"
                    : isCompleted
                    ? "bg-indigo-600 border-indigo-400 text-white"
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

              {/* Label */}
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                isActive
                  ? "text-violet-400"
                  : isCompleted
                  ? "text-indigo-400/70"
                  : "text-white/30 group-hover:text-white/50"
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

const JOB_MATCH_LOGS = [
  "Analyzing job offer requirements...",
  "Extracting keywords and skills from job description...",
  "Correlating profile strengths with job specs...",
  "Computing role alignment score...",
  "Generating strategic gaps and positioning recommendations...",
];

export function JobMatchLoadingExperience({ onComplete }: { onComplete: () => void }) {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < JOB_MATCH_LOGS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto py-16 flex flex-col items-center justify-center text-center relative select-none">
      <div className="absolute inset-0 -z-10 rounded-[3rem] bg-violet-500/[0.03] blur-3xl pointer-events-none" />

      {/* Smart loading circle */}
      <div className="relative size-44 mb-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-violet-500/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-dashed border-indigo-500/15"
        />
        <div className="absolute size-28 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 blur-2xl opacity-35 animate-pulse animate-duration-1000" />
        <div className="relative size-24 rounded-full bg-[#090a10] border border-white/10 flex items-center justify-center shadow-2xl">
          <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
      </div>

      <div className="space-y-5 w-full">
        <span className="w-fit text-xs font-black uppercase tracking-[0.28em] bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
          Job Alignment Match in Progress
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
              {JOB_MATCH_LOGS[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading progress bar */}
        <div className="h-2 w-full max-w-[320px] mx-auto rounded-full bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

export function ScoreRing({
  score = 84,
  size = 120,
  strokeWidth = 8,
  variant = "emerald",
  label = "Match",
}: {
  score?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "emerald" | "amber";
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = score / 100;
      setOffset(circumference - progress * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const isAmber = variant === "amber";

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg className="size-full -rotate-90">
        {/* Background stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Gradient progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={`url(#scoreGradient-${variant})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id={`scoreGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {isAmber ? (
              <>
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </>
            )}
          </linearGradient>
        </defs>
      </svg>
      {/* Central score text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white leading-none">{score}</span>
        <span className={`text-[9px] font-bold tracking-wider mt-1 uppercase ${
          isAmber ? "text-amber-400/60" : "text-emerald-400/60"
        }`}>
          {label}
        </span>
      </div>
    </div>
  );
}

export function JobMatchAnalysisView({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [activeHeroTab, setActiveHeroTab] = useState("summary");

  const [chatMessages, setChatMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([
    {
      sender: "ai",
      text: "Hello Jonathan! I've analyzed your CV against the Staff Software Engineer role at Northstar AI. How can I help you customize your profile or prepare for this role? Click one of the options below to tailor your details."
    }
  ]);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [usedChatPills, setUsedChatPills] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, isChatTyping]);

  const handleChatPillClick = (type: "edpuzzle" | "evaluation" | "leadership") => {
    if (isChatTyping) return;

    let userText = "";
    let aiText = "";

    if (type === "edpuzzle") {
      userText = "Tailor my Edpuzzle experience for this job.";
      aiText = "To align with Northstar AI's backend stack, highlight your scaling achievements. Suggestion:\n\n\"Scaled Edpuzzle's core Node.js/MongoDB analytics engine to support 2.2M+ DAU, reducing database query latencies by 35% through Redis caching schemas.\"";
    } else if (type === "evaluation") {
      userText = "How do I address the AI Evaluation gap?";
      aiText = "Northstar AI requires experience with AI evaluation/observability. You can position this by discussing how you monitored prompt drifts at Edpuzzle:\n\n\"Built evaluation frameworks using LLM-as-a-judge patterns to run E2E regression testing on prompt templates, reducing prompt drift incidents by 40%.\"";
    } else if (type === "leadership") {
      userText = "Highlight my Staff-level leadership experience.";
      aiText = "To showcase Staff-level impact, highlight cross-team standard setting and mentorship:\n\n\"Defined architectural guidelines for DDD boundaries across 4 squads, mentoring 12+ developers and establishing unified event-driven patterns in Kotlin & TypeScript.\"";
    }

    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setUsedChatPills((prev) => [...prev, type]);
    setIsChatTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
      setIsChatTyping(false);
    }, 1200);
  };

  const heroTabs = [
    { id: "summary", label: "Summary", icon: ClipboardList },
    { id: "offer", label: "Offer Details", icon: Briefcase },
    { id: "questions", label: "Questions", icon: HelpCircle },
    { id: "chat", label: "Chat", icon: Sparkles },
  ];

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fadeIn">
      {/* Back button link */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Back to CV Ready
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-5 py-2 text-xs font-bold text-white transition cursor-pointer"
        >
          Proceed to AI Chat
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* Hero card */}
      <div className="w-full rounded-3xl border border-white/10 bg-[#0c0d12]/50 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        <div className="absolute -right-32 -top-32 size-96 bg-radial from-violet-500/[0.07] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 size-96 bg-radial from-cyan-500/[0.05] to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
          {/* Score ring column */}
          <div className="flex flex-col items-center shrink-0">
            <ScoreRing score={84} size={120} strokeWidth={8} />
            <div className="mt-4 flex flex-col items-center">
              <span className="rounded-full bg-emerald-500/12 border border-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-300">
                EXCELLENT MATCH
              </span>
            </div>
          </div>

          {/* Details column */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center lg:justify-start">
                <h3 className="text-2xl sm:text-3xl font-black text-white">{job.title}</h3>
                <span className="w-fit self-center rounded-lg bg-violet-500/12 border border-violet-500/20 px-2 py-0.5 text-[10px] font-black text-violet-300">
                  84% SCORE
                </span>
              </div>
              <p className="text-sm font-semibold text-white/50 mt-1">
                {job.company} · {job.location} · Full-time
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-4xl">
              Your background in high-traffic Node.js platforms, Redis caching, and scaling product systems to 2.2M+ active users is a very strong match. The primary gaps are formal AI evaluation system ownership and staff-level positioning in leading AI engineering practices.
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-white/40 pt-2">
              <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-medium">
                Model: Claude 3.5 Sonnet
              </span>
              <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-medium">
                Updated: June 2, 2026
              </span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 font-medium text-white/60 hover:text-white transition flex items-center gap-1"
              >
                LinkedIn Job Post
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Row (Now outside, below the card del score and above the contents) */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-[#0c0d12]/40 border border-white/8 backdrop-blur-md w-full sm:w-fit overflow-x-auto scrollbar-none relative z-10">
        {heroTabs.map((tab) => {
          const isActive = tab.id === activeHeroTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveHeroTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              <Icon className={`size-3.5 ${isActive ? "text-white" : "text-white/50"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="w-full relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeHeroTab === "summary" && (
            <motion.div
              key="summary-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-fadeIn"
            >
              {/* Areas to improve */}
              <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col gap-6">
                <div>
                  <h4 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-amber-500 animate-pulse" />
                    Areas to Improve (Strategic Gaps)
                  </h4>
                  <p className="text-xs text-white/40 mt-1">
                    Reframing recommendations to address missing requirements for the role.
                  </p>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] p-4 flex gap-4">
                    <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-amber-400">01</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">AI Evaluation & Observability Systems</h5>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">
                        The job demands designing evaluation pipelines for AI products. Detail how you evaluated the performance or accuracy of AI features at Edpuzzle.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.02] p-4 flex gap-4">
                    <div className="size-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-violet-400">02</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Staff-Level Technical Leadership</h5>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">
                        Provide evidence of establishing engineering standards, mentoring senior developers, and making cross-team architecture decisions.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.02] p-4 flex gap-4">
                    <div className="size-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-cyan-400">03</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Platform-Oriented Architecture</h5>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">
                        Shift language from &quot;building features&quot; to &quot;creating APIs, reusable components, and developer frameworks&quot; that empower other teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyword Alignment Dashboard */}
              <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col gap-6">
                <div>
                  <h4 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Target className="size-5 text-indigo-400" />
                    Keyword & Signal Coverage
                  </h4>
                  <p className="text-xs text-white/40 mt-1">
                    Comparison between job requirements and signals detected in your CV.
                  </p>
                </div>

                <div className="space-y-5 flex-1">
                  {/* Matching keywords */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Matching Signals (CV ↔ Offer)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Node.js", "High-traffic scale", "Product Ownership", "Redis caching", "Observability", "AI-assisted Workflows"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing keywords */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                      <span className="size-1.5 rounded-full bg-amber-500" />
                      Missing Signals (Gaps)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["AI Evaluation Systems", "Staff Leadership Scope", "Platform-first wording", "E2E LLM Testing"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Offer Keywords */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/40 flex items-center gap-1.5 mb-2">
                      <span className="size-1.5 rounded-full bg-white/30" />
                      Required in Offer
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeHeroTab === "offer" && (
            <motion.div
              key="offer-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-fadeIn"
            >
              {/* Role Overview */}
              <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col gap-6">
                <div>
                  <h4 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="size-5 text-violet-400" />
                    Role Overview & Context
                  </h4>
                  <p className="text-xs text-white/40 mt-1">
                    Main responsibilities and scope for the {job.title} position.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-white/70 leading-relaxed">
                  <p>
                    As a <strong className="text-white">{job.title}</strong> at <strong className="text-white">{job.company}</strong>, you will lead the core team focused on building robust AI-first interfaces and SDK developer tools. You will have cross-team influence, defining standards for AI pipelines, reliability under scale, and event observability.
                  </p>
                  <p>
                    The AI Platform team is responsible for ensuring that all software engineers at the company can ship generative features with high performance and complete transparency.
                  </p>
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Location:</span>
                      <span className="font-semibold text-white/80">{job.location} (Remote)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Employment Type:</span>
                      <span className="font-semibold text-white/80">Full-time</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Scale target:</span>
                      <span className="font-semibold text-white/80">2.2M+ active consumers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Matrix Checklist */}
              <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col gap-6">
                <div>
                  <h4 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Target className="size-5 text-cyan-400" />
                    Required Technology Matrix
                  </h4>
                  <p className="text-xs text-white/40 mt-1">
                    Core technologies and architectural paradigms required for this role.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-violet-400 block mb-2">Core Tech Stack</span>
                    <div className="grid grid-cols-2 gap-2">
                      {["Node.js & TypeScript", "Redis / Cache Layers", "MongoDB & Postgres", "Observability (DataDog)", "Event Architectures", "Docker / Kubernetes"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-white/80 bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                          <Check className="size-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-2">Key Challenges</span>
                    <ul className="space-y-2 text-xs text-white/60">
                      <li className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>Scaling product systems to handle 50k+ database operations/sec.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>Moving feature development to a platform-first methodology.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>Building robust evaluation scripts to measure prompt effectiveness.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeHeroTab === "questions" && (
            <motion.div
              key="questions-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col gap-6 w-full animate-fadeIn"
            >
              <div>
                <h4 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                  <HelpCircle className="size-5 text-violet-400" />
                  AI-Generated Interview Prep Questions
                </h4>
                <p className="text-xs text-white/40 mt-1">
                  Practice questions based on your CV gaps and the {job.title} requirements.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Tell me about scaling systems under real traffic. How did you structure Node.js & MongoDB?",
                    strategy: "Reference your experience at Edpuzzle with 2M+ daily active users. Discuss utilizing Redis for caching, MongoDB indexing/sharding, connection pooling mechanisms, and monitoring database load metrics."
                  },
                  {
                    q: "Explain how you would establish an evaluation framework for LLM product workflows.",
                    strategy: "Acknowledge this is a critical gap. Propose an evaluation pipeline: defining ground truth test sets, automating evaluation prompts (evaluator LLM), tracking evaluation latency, and using tracing platforms for observability."
                  },
                  {
                    q: "How do you lead architectural standards and mentor senior engineers as a Staff member?",
                    strategy: "Draw from your Tech Lead scope at Dezzai. Explain how you decoupled code bases into DDD boundaries, set event-driven patterns, and established standards that empowered the entire engineering group."
                  }
                ].map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="size-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-xs font-black text-violet-300">
                          Q{idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-white leading-relaxed">{item.q}</h5>
                      </div>
                      <div className="pl-9 border-l border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Positioning Strategy</p>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">{item.strategy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeHeroTab === "chat" && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col h-[550px] rounded-3xl border border-white/10 bg-[#0c0d12]/40 backdrop-blur-sm shadow-2xl overflow-hidden relative"
            >
              {/* Background glow decoration */}
              <div className="absolute -right-32 -bottom-32 size-96 bg-radial from-violet-500/[0.06] to-transparent blur-3xl pointer-events-none" />
              <div className="absolute -left-32 -top-32 size-96 bg-radial from-indigo-500/[0.04] to-transparent blur-3xl pointer-events-none" />

              {/* Chat header */}
              <div className="p-5 border-b border-white/8 bg-white/[0.02] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="size-3.5 rounded-full bg-violet-500 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">AI Copilot Chat</h4>
                    <p className="text-[10px] text-white/42 font-medium">Role Alignment Coaching</p>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-violet-400 border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 rounded-full">
                  Target: Staff Software Engineer
                </div>
              </div>

              {/* Message history */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4 relative z-10 scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user" 
                          ? "bg-violet-600 text-white rounded-br-none font-bold" 
                          : "bg-white/[0.04] border border-white/5 text-white/80 rounded-bl-none font-medium"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isChatTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-bl-none p-4 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "100ms" }} />
                      <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "200ms" }} />
                      <span className="size-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input and quick pills */}
              <div className="p-5 border-t border-white/8 bg-white/[0.01] space-y-4 relative z-10">
                <div className="flex flex-col gap-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Suggested Questions & Tailoring</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      disabled={usedChatPills.includes("edpuzzle") || isChatTyping}
                      onClick={() => handleChatPillClick("edpuzzle")}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition duration-300 cursor-pointer ${
                        usedChatPills.includes("edpuzzle")
                          ? "bg-violet-500/12 border border-violet-500/20 text-violet-400 opacity-60 cursor-not-allowed"
                          : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-white/70 hover:text-white"
                      }`}
                    >
                      ✨ Tailor my Edpuzzle experience
                    </button>

                    <button
                      disabled={usedChatPills.includes("evaluation") || isChatTyping}
                      onClick={() => handleChatPillClick("evaluation")}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition duration-300 cursor-pointer ${
                        usedChatPills.includes("evaluation")
                          ? "bg-violet-500/12 border border-violet-500/20 text-violet-400 opacity-60 cursor-not-allowed"
                          : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-white/70 hover:text-white"
                      }`}
                    >
                      📊 How to address the AI Evaluation gap?
                    </button>

                    <button
                      disabled={usedChatPills.includes("leadership") || isChatTyping}
                      onClick={() => handleChatPillClick("leadership")}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition duration-300 cursor-pointer ${
                        usedChatPills.includes("leadership")
                          ? "bg-violet-500/12 border border-violet-500/20 text-violet-400 opacity-60 cursor-not-allowed"
                          : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-white/70 hover:text-white"
                      }`}
                    >
                      💡 Highlight Staff-level leadership
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/8 p-1">
                  <input 
                    type="text" 
                    readOnly
                    placeholder="Select a suggested tailoring action above..." 
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
}
