import type React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { appUrl } from "@/lib/demo-data";
import { APP_FEATURES, AppFeature, featureColorMap } from "./landing-data";

type HeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  cardRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  letterRefs: React.RefObject<(HTMLSpanElement | null)[]>;
  hoveredRef: React.RefObject<string | null>;
  onFeatureSelect: (feature: AppFeature) => void;
  onDemoClick: () => void;
};

export function HeroSection({ heroRef, cardRefs, letterRefs, hoveredRef, onFeatureSelect, onDemoClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center px-5 pt-32 pb-16 sm:px-8 lg:px-12 snap-start snap-always animate-fade-in" id="top" ref={heroRef}>
      <div className="absolute inset-0 -z-10 soft-grid opacity-35" />

      <div className="w-full pointer-events-none flex flex-col items-center justify-center text-center">
        {/* Title Header (Goes in front of cards: z-30) */}
        <div className="relative z-30 pointer-events-auto">
          <p className="mb-6 text-5xl font-black tracking-[0.18em] text-white sm:text-7xl lg:text-8xl select-none">
            {["F", "A", "B", "R", "A"].map((char, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  if (letterRefs.current) {
                    letterRefs.current[idx] = el;
                  }
                }}
                className="inline-block transition-all duration-500 ease-out transform"
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* Subtitle & Actions (Goes behind cards: z-10) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="w-full text-center flex flex-col items-center justify-center pointer-events-auto relative z-10"
        >
          <h1 className="text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            Craft your career, your way.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 mx-auto">
            Go beyond the job search. Track achievements, plan your growth, and steer your entire professional journey with AI-driven insights.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full">
            {/* Interactive Demo Glowing Button */}
            <button
              type="button"
              onClick={onDemoClick}
              className="group animate-pulse-scale-glow relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-8 text-base font-bold text-white select-none cursor-pointer"
            >
              <Sparkles className="size-5 text-violet-200 animate-pulse" />
              <span>Try the Interactive Demo</span>
              <ArrowRight className="size-5 text-white/80 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <a
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-8 text-base font-extrabold text-cyan-50 shadow-[0_0_26px_rgba(77,222,208,0.16)] transition hover:border-cyan-200/60 hover:bg-cyan-300/16 hover:shadow-[0_0_34px_rgba(77,222,208,0.26)] select-none"
            >
              Open Fabra
              <ExternalLink className="size-4" />
            </a>
          </div>
        </motion.div>

        {/* Mobile feature cards (Mobile/Tablet only) */}
        <div className="lg:hidden w-full mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto text-left">
          <div className="col-span-1 sm:col-span-2 mb-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Core Features
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Explore real capabilities</h2>
          </div>
          {APP_FEATURES.map((feature) => {
            const styles = featureColorMap[feature.color];
            return (
              <button
                key={feature.id}
                onClick={() => onFeatureSelect(feature)}
                className={`p-4 rounded-2xl glass flex items-center gap-4 text-left border ${styles.border} ${styles.bg} ${styles.glow} transition-all w-full`}
              >
                <div className={`p-2.5 rounded-xl border ${styles.bg} ${styles.border} ${styles.text} flex items-center justify-center shrink-0`}>
                  <feature.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{feature.title}</h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Cards (Desktop only - Behind title "FABRA" but in front of rest of content) */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none hidden lg:block select-none">
        {APP_FEATURES.map((feature, index) => {
          const styles = featureColorMap[feature.color];
          return (
            <button
              key={feature.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseEnter={() => { hoveredRef.current = feature.id; }}
              onMouseLeave={() => { hoveredRef.current = null; }}
              onClick={() => onFeatureSelect(feature)}
              className={`absolute p-3 rounded-2xl glass flex items-center gap-3 cursor-pointer text-left border ${styles.border} ${styles.bg} ${styles.glow} transition-[background,border,box-shadow,opacity] duration-300 pointer-events-auto w-[230px] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] z-[20]`}
              style={{ top: feature.top, left: feature.left }}
            >
              <div className={`p-2.5 rounded-xl border ${styles.bg} ${styles.border} ${styles.text} flex items-center justify-center shrink-0`}>
                <feature.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">{feature.title}</h3>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
