import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { appUrl } from "@/lib/demo-data";
import { AppFeature, featureColorMap } from "./landing-data";

type FeaturePreviewModalProps = {
  selectedFeature: AppFeature | null;
  onClose: () => void;
  onDemoClick: () => void;
};

export function FeaturePreviewModal({ selectedFeature, onClose, onDemoClick }: FeaturePreviewModalProps) {
  return (
    <>
      {/* Screenshot detail modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-5 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onClose()}
              className="absolute inset-0 bg-[#06070a]/92 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative z-10 flex h-[calc(100dvh-1.5rem)] w-full max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#080910]/95 shadow-[0_32px_100px_rgba(0,0,0,0.72)] backdrop-blur-2xl animate-fade-in sm:h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)] lg:h-[calc(100dvh-2.5rem)] lg:max-w-[calc(100vw-2.5rem)]"
            >
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`hidden shrink-0 rounded-2xl border p-3 sm:inline-flex ${featureColorMap[selectedFeature.color].bg} ${featureColorMap[selectedFeature.color].border} ${featureColorMap[selectedFeature.color].text}`}>
                      <selectedFeature.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <span className={`block text-[10px] font-black uppercase tracking-[0.22em] ${featureColorMap[selectedFeature.color].text}`}>
                        Feature preview
                      </span>
                      <h2 className="truncate text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                        {selectedFeature.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <p className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-100 shadow-[0_0_28px_rgba(63,210,152,0.14)]">
                      Real screenshots from the app
                    </p>
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:bg-white/10 hover:text-white lg:static"
                      title="Close overlay"
                    >
                      x
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 bg-[#05060a] p-2 sm:p-3 lg:p-4">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                    <Image
                      src="/screenshot.png"
                      alt={`${selectedFeature.title} real app screenshot`}
                      fill
                      sizes="calc(100vw - 2rem)"
                      className="object-contain select-none pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                  <p className="max-w-3xl text-sm font-medium leading-relaxed text-white/62">
                    A real Fabra product screenshot, shown as-is so you can inspect the workspace and the detail behind each feature.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => {
                        onDemoClick();
                      }}
                      className="group animate-pulse-scale-glow relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-6 text-sm font-extrabold text-white select-none cursor-pointer"
                    >
                      <Sparkles className="size-4 text-violet-200 animate-pulse" />
                      <span>Try the Interactive Demo</span>
                      <ArrowRight className="size-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <a
                      href={appUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-6 text-sm font-extrabold text-cyan-50 shadow-[0_0_26px_rgba(77,222,208,0.16)] transition hover:border-cyan-200/60 hover:bg-cyan-300/16 hover:shadow-[0_0_34px_rgba(77,222,208,0.26)] select-none"
                    >
                      Open Fabra
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
