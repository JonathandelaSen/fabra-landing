import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { appUrl } from "@/lib/demo-data";
import { APP_FEATURES, AppFeature, featureColorMap } from "./landing-data";
import { FabraLogo } from "./fabra-logo";

type HeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  logoRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  letterRefs: React.RefObject<(HTMLSpanElement | null)[]>;
  hoveredRef: React.RefObject<string | null>;
  onFeatureSelect: (feature: AppFeature) => void;
};

export function HeroSection({ heroRef, logoRef, cardRefs, letterRefs, hoveredRef, onFeatureSelect }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center px-5 pt-32 pb-16 sm:px-8 lg:px-12 snap-start snap-always animate-fade-in" id="top" ref={heroRef}>
      <div className="absolute inset-0 -z-10 soft-grid opacity-35" />

      <div className="w-full pointer-events-none flex flex-col items-center justify-center text-center">
        {/* Title Header (Goes in front of cards: z-30) */}
        <div className="relative z-30 pointer-events-auto flex flex-col items-center gap-8 mb-8">
          <FabraLogo logoRef={logoRef} className="-mt-12" />

          <p className="text-5xl font-black tracking-[0.18em] text-white sm:text-7xl lg:text-8xl select-none">
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
            Go beyond the job search. Track achievements, plan your growth, and steer your professional journey with an AI-driven platform.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full">
            {/* Interactive Demo Glowing Button */}
            <Link
              href="/demo"
              className="group animate-pulse-scale-glow relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-8 text-base font-bold text-white select-none cursor-pointer"
            >
              <Sparkles className="size-5 text-violet-200 animate-pulse" />
              <span>Try the Interactive Demo</span>
              <ArrowRight className="size-5 text-white/80 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <a
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-8 text-base font-extrabold text-cyan-50 shadow-[0_0_26px_rgba(77,222,208,0.16)] transition hover:border-cyan-200/60 hover:bg-cyan-300/16 hover:shadow-[0_0_34px_rgba(77,222,208,0.26)] select-none"
            >
              Open Fabra
              <ExternalLink className="size-4" />
            </a>

            <a
              href="https://github.com/JonathandelaSen/fabra"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-8 text-base font-bold text-white shadow-lg transition hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] select-none cursor-pointer"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>GitHub</span>
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
