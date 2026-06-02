"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, KanbanSquare, MessageSquare, Sparkles, Star } from "lucide-react";
import { appUrl, job } from "@/lib/demo-data";

export function JobMatchChatView({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [usedPills, setUsedPills] = useState<string[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages([{ sender: "user", text: job.chatQuestion }]);
      setChatStep(1);
    }, 500);

    const timer2 = setTimeout(() => {
      setIsTyping(true);
      setChatStep(2);
    }, 1500);

    const timer3 = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: job.chatAnswer },
      ]);
      setChatStep(3);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSuggestionClick = (pillText: string) => {
    if (isReplying) return;

    setMessages((prev) => [...prev, { sender: "user", text: pillText }]);
    setUsedPills((prev) => [...prev, pillText]);
    setIsReplying(true);
    setIsTyping(true);

    let replyText = "";
    if (pillText.includes("bullets")) {
      replyText = "Here are three tailored bullet points optimized for Northstar AI's team context:\n\n1. **AI Platform Scale**: 'Built and operated key product pipelines handling 2.2M+ daily active users on Node.js/MongoDB platforms, improving system resilience and caching architectures.'\n2. **AI Workflows & Tooling**: 'Mentored engineering cohorts in adopting generative workflows and LLM developer frameworks, accelerating feature delivery cycles by 30%.'\n3. **Decoupled Architecture**: 'Pioneered platform-first boundaries (DDD) to migrate legacy monolithic features into highly modular APIs, streamlining cross-team deployment cycles.'";
    } else if (pillText.includes("scale")) {
      replyText = "To prove system scale, focus on raw throughput and caching efficiency. Use numbers like these:\n\n- **Database load mitigation**: 'Engineered Redis caching layer to handle 50k+ database operations/sec load, reducing primary DB latency by 40%.'\n- **Traffic scale**: 'Architected and optimized microservices processing over 10k+ req/s during peak platform activity.'\n- **Efficiency**: 'Refined event-driven data processing pipelines (CQRS) to reduce compute overhead by 25% across high-traffic Node.js clusters.'";
    } else if (pillText.includes("questions")) {
      replyText = "Here are strategic questions to ask the hiring team to demonstrate senior platform presence:\n\n1. *'How is the team currently addressing prompt drift and evaluation metrics as model APIs evolve?'*\n2. *'What are the primary performance bottlenecks when scaling your generative features to European latency requirements?'*\n3. *'How does the AI Platform team balance building generic internal tools versus specialized features for product squads?'*";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: replyText }]);
      setIsReplying(false);
    }, 2000);
  };

  const suggestions = [
    "Suggest bullets for Northstar AI",
    "How do I prove my system scale?",
    "Formulate questions to ask the interviewer",
  ];

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fadeIn">
      {/* Back link */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Back to Analysis
        </button>
        {chatStep === 3 && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-5 py-2 text-xs font-bold text-white transition cursor-pointer"
          >
            Track Opportunity
            <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>

      <div className="w-full rounded-3xl border border-white/10 bg-[#0c0d12]/50 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl flex flex-col min-h-[450px]">
        {/* Ambient background glows */}
        <div className="absolute -right-32 -top-32 size-96 bg-radial from-violet-500/[0.04] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 size-96 bg-radial from-indigo-500/[0.03] to-transparent blur-3xl pointer-events-none" />

        {/* Chat header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/8 relative z-10">
          <div className="size-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <MessageSquare className="size-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white leading-none">Fabra Copilot</h3>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
              Online · Contextual Coaching
            </p>
          </div>
        </div>

        {/* Messages space */}
        <div ref={chatContainerRef} className="flex-1 py-6 space-y-6 overflow-y-auto relative z-10 min-h-[250px]">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-violet-600/80 border border-violet-500/30 text-white rounded-br-none"
                    : "bg-white/[0.03] border border-white/8 text-white/85 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl rounded-bl-none p-4 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-violet-400 animate-bounce animate-delay-100" />
                <span className="size-2 rounded-full bg-violet-400 animate-bounce animate-delay-200" />
                <span className="size-2 rounded-full bg-violet-400 animate-bounce animate-delay-300" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat footer suggestions and input mock */}
        <div className="mt-auto relative z-10 pt-4 border-t border-white/8">
          {chatStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {suggestions.map((pill) => {
                const isUsed = usedPills.includes(pill);
                return (
                  <button
                    key={pill}
                    disabled={isUsed || isReplying}
                    onClick={() => handleSuggestionClick(pill)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      isUsed
                        ? "border-white/5 bg-white/[0.01] text-white/20 cursor-not-allowed opacity-50"
                        : isReplying
                        ? "border-white/8 bg-white/[0.02] text-white/30 cursor-not-allowed"
                        : "border-white/8 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-white/50 hover:text-white/80"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </motion.div>
          )}

          <div className="relative">
            <input
              type="text"
              disabled
              placeholder={
                chatStep < 3 ? "Copilot is working..." : "Ask a follow-up question..."
              }
              className="w-full h-12 rounded-xl border border-white/8 bg-white/[0.01] px-4 pr-12 text-sm text-white/40 outline-none cursor-not-allowed"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                <ArrowRight className="size-4 text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {chatStep === 3 && (
        <div className="flex justify-end mt-2">
          <button
            onClick={onNext}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 text-sm font-bold text-white transition hover:scale-[1.02] cursor-pointer"
          >
            Track in Kanban Board
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function JobMatchTrackingView({
  onBack,
  onResetAll,
}: {
  onBack: () => void;
  onResetAll: () => void;
}) {
  const [offers, setOffers] = useState([
    {
      id: "northstar",
      company: "Northstar AI",
      title: "Staff Software Engineer",
      location: "Remote Europe",
      match: "84%",
      status: "applied"
    },
    {
      id: "edpuzzle",
      company: "Edpuzzle",
      title: "Senior Full Stack Engineer",
      location: "Barcelona, ES",
      match: "92%",
      status: "offer"
    },
    {
      id: "dezzai",
      company: "Dezzai",
      title: "Tech Lead (Data Pipelines)",
      location: "Madrid, ES",
      match: "88%",
      status: "offer"
    },
    {
      id: "stripe",
      company: "Stripe",
      title: "Staff Engineer, DevTools",
      location: "Remote US/EU",
      match: "78%",
      status: "applied"
    },
    {
      id: "mercado-libre",
      company: "Mercado Libre",
      title: "Principal Backend Engineer",
      location: "Remote LatAm",
      match: "74%",
      status: "interesting"
    },
    {
      id: "vercel",
      company: "Vercel",
      title: "Senior Frontend Developer",
      location: "Remote",
      match: "62%",
      status: "discarded"
    },
    {
      id: "meta",
      company: "Meta",
      title: "Production Engineer",
      location: "London, UK",
      match: "71%",
      status: "rejected"
    },
    {
      id: "replicate",
      company: "Replicate",
      title: "AI Infrastructure Engineer",
      location: "Remote",
      match: "82%",
      status: "interesting"
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffers((prev) =>
        prev.map((off) =>
          off.id === "northstar" ? { ...off, status: "review" } : off
        )
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { id: "interesting", label: "Interesting", color: "text-white/40", border: "border-white/5 bg-white/[0.01]" },
    { id: "applied", label: "Applied", color: "text-blue-400", border: "border-blue-500/10 bg-blue-500/[0.01]" },
    { id: "review", label: "Review", color: "text-indigo-400", border: "border-indigo-500/10 bg-indigo-500/[0.01]" },
    { id: "offer", label: "Offer", color: "text-emerald-400", border: "border-emerald-500/10 bg-emerald-500/[0.01]" },
    { id: "rejected", label: "Rejected", color: "text-rose-400", border: "border-rose-500/10 bg-rose-500/[0.01]" },
    { id: "discarded", label: "Discarded", color: "text-amber-400", border: "border-amber-500/10 bg-amber-500/[0.01]" },
  ] as const;

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fadeIn">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Back to AI Chat
        </button>
        <button
          onClick={onResetAll}
          className="flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition cursor-pointer"
        >
          Restart Sandbox
          <Sparkles className="size-3.5" />
        </button>
      </div>

      {/* Kanban board - takes full width */}
      <div className="w-full rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <KanbanSquare className="size-5 text-violet-400" />
              Active Opportunities
            </h4>
            <p className="text-xs text-white/40 mt-1">
              Your tracking pipeline. Cards auto-update based on preparation status.
            </p>
          </div>
          
          <a
            href={appUrl}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 px-5 text-xs font-black text-white transition hover:scale-[1.02] cursor-pointer shadow-lg shadow-violet-500/20"
          >
            Unlock Full Workspace
            <Sparkles className="size-3.5" />
          </a>
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full flex-1">
          {columns.map((col) => {
            const colOffers = offers.filter((off) => off.status === col.id);

            return (
              <div
                key={col.id}
                className={`rounded-2xl border p-3 flex flex-col gap-3 min-h-[350px] transition-all duration-300 ${col.border}`}
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${col.color}`}>
                    {col.label}
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold text-white/40">
                    {colOffers.length}
                  </span>
                </div>

                <div className="relative flex-1 flex flex-col gap-2 overflow-y-auto max-h-[450px] scrollbar-none">
                  <AnimatePresence mode="popLayout">
                    {colOffers.map((off) => (
                      <motion.div
                        layout
                        key={off.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        className="rounded-xl border border-white/10 bg-[#090a10]/80 p-3 shadow-md hover:border-violet-500/40 transition duration-300 relative group cursor-pointer"
                      >
                        {/* Interactive glow border on card */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

                        <div className="relative z-10 space-y-2 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black uppercase tracking-wider text-violet-400 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded truncate max-w-[70px]">
                              {off.company}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5 shrink-0">
                              <Star className="size-2.5 fill-emerald-400" />
                              {off.match}
                            </span>
                          </div>

                          <div>
                            <p className="text-xs font-black text-white leading-tight truncate">{off.title}</p>
                            <p className="text-[9px] text-white/50 mt-0.5 truncate">{off.location}</p>
                          </div>

                          <div className="flex items-center justify-between text-[8px] text-white/30 border-t border-white/5 pt-1.5 mt-1">
                            <span>Status: {off.status.toUpperCase()}</span>
                            <span className="shrink-0">{off.id === "northstar" ? "Just now" : "Recent"}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
