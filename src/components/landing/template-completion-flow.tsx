"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Briefcase, Check, Sparkles, Star, Trophy } from "lucide-react";
import { cvAnalysis, job, profile } from "@/lib/demo-data";
import { RealCVPreview } from "./flow-common";

export function TemplateSelectionView({
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

export function TemplateStudioView({
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
  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>(() => [
    {
      sender: "ai",
      text: `Welcome to the Template Studio! I've loaded your data into the "${template.toUpperCase()}" template. How would you like to refine your CV? You can click one of the suggested actions below.`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
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
      
      {/* Left column: chatbot editor */}
      <div className="lg:col-span-5 flex flex-col h-[640px] rounded-3xl border border-white/10 bg-[#0c0d12]/80 backdrop-blur-md shadow-2xl overflow-hidden relative">
        
        {/* Chat header */}
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

        {/* Message history */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
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

          {/* Typing indicator */}
          {isTyping && (
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

      {/* Right column: responsive CV preview */}
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
  const [params] = useState(() => ({
    xOffset: (Math.random() - 0.5) * 200,
    rotateAmt: 360 + Math.random() * 360,
    duration: 3 + Math.random() * 2,
    repeatDelay: Math.random() * 3,
    width: 6 + Math.random() * 8,
    height: 6 + Math.random() * 8,
    initialRotation: Math.random() * 45,
  }));

  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, 600],
        x: [0, params.xOffset],
        rotate: [0, params.rotateAmt],
        opacity: [1, 1, 0],
        scale: [1, 0.6],
      }}
      transition={{
        duration: params.duration,
        delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: params.repeatDelay,
      }}
      className="absolute top-0 pointer-events-none"
      style={{ left }}
    >
      <div
        className="rounded-sm"
        style={{
          width: `${params.width}px`,
          height: `${params.height}px`,
          background: color,
          transform: `rotate(${params.initialRotation}deg)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Completion Experience ─── */
export function CompletionExperience({
  template,
  accentColor,
  skillsPosition,
  isSummaryCondensed,
  isSuggestionsApplied,
  onStartJobMatch,
}: {
  template: "linea" | "marco" | "pulso" | "filo";
  accentColor: "default" | "cool";
  skillsPosition: "bottom" | "top";
  isSummaryCondensed: boolean;
  isSuggestionsApplied: boolean;
  onStartJobMatch: () => void;
}) {
  const confettiColors = [
    "#a855f7", "#6366f1", "#ec4899", "#f59e0b", "#10b981",
    "#06b6d4", "#f43f5e", "#8b5cf6", "#22d3ee", "#fbbf24",
  ];

  const [confettiParticles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      color: confettiColors[i % confettiColors.length],
      left: `${Math.random() * 100}%`,
    }))
  );

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
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-indigo-600/10 to-cyan-600/5 p-4 sm:p-6 shadow-[0_24px_80px_rgba(124,58,237,0.12)] relative overflow-hidden">
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
                Compare your tailored profile against this live role. Get alignment scoring, gaps, and positioning strategy instantly.
              </p>

              {/* Fake job card */}
              <div className="w-full  rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#0c0d12]/90 to-[#090a10]/95 p-7 sm:p-8 mb-8 text-left shadow-[0_25px_60px_rgba(124,58,237,0.18)] relative overflow-hidden hover:border-violet-500/50 transition duration-300 group">
                {/* Accent glow line inside */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />
                
                <div className="flex gap-5 items-start mb-5">

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg sm:text-2xl font-black text-white leading-tight truncate">{job.title}</p>
                      <span className="shrink-0 rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                    <p className="text-base font-semibold text-white/60 mt-1">{job.company} · {job.location}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <p className="text-[11px] font-black text-white/30 uppercase tracking-wider mb-3">Role tags & technology</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-violet-500/10 bg-violet-500/[0.04] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-violet-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <motion.button
                type="button"
                onClick={onStartJobMatch}
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

/* ─── Job Match Flow Components ─── */
