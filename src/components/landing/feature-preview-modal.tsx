import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import { appUrl } from "@/lib/demo-data";
import { AppFeature, featureColorMap } from "./landing-data";

// Mobile screenshots are now mapped directly in APP_FEATURES inside landing-data.ts

type FeaturePreviewModalProps = {
  selectedFeature: AppFeature | null;
  allFeatures: AppFeature[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function FeaturePreviewModal({
  selectedFeature,
  allFeatures,
  onClose,
  onPrev,
  onNext,
}: FeaturePreviewModalProps) {
  const currentIndex = selectedFeature
    ? allFeatures.findIndex((f) => f.id === selectedFeature.id)
    : -1;

  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const mobileScreenshot = selectedFeature?.mobileScreenshot || selectedFeature?.screenshot || "";

  useEffect(() => {
    setIsZoomed(false);
    x.set(0);
    y.set(0);
  }, [selectedFeature, x, y]);

  useEffect(() => {
    if (!isZoomed) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [isZoomed, x, y]);

  useEffect(() => {
    const updateBounds = () => {
      const activeContainer = window.innerWidth < 640 ? mobileContainerRef.current : containerRef.current;
      if (isZoomed && activeContainer) {
        const rect = activeContainer.getBoundingClientRect();
        const scale = 2.2;
        const overflowX = (rect.width * scale - rect.width) / 2;
        const overflowY = (rect.height * scale - rect.height) / 2;
        setDragBounds({
          left: -overflowX,
          right: overflowX,
          top: -overflowY,
          bottom: overflowY,
        });
      } else {
        setDragBounds({ left: 0, right: 0, top: 0, bottom: 0 });
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [isZoomed, selectedFeature]);

  return (
    <>
      {/* Screenshot detail modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 lg:p-5 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onClose()}
              className="absolute inset-0 bg-[#06070a]/92 backdrop-blur-md cursor-zoom-out"
            />

            {/* Mobile image viewer */}
            <motion.div
              ref={mobileContainerRef}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="relative z-10 h-[100dvh] w-screen overflow-hidden bg-black sm:hidden"
            >
              <motion.div
                key={mobileScreenshot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: isZoomed ? 2.2 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                drag={isZoomed}
                dragConstraints={dragBounds}
                dragElastic={0.05}
                style={{ x, y }}
                onTap={() => setIsZoomed(!isZoomed)}
                className={`absolute inset-0 ${isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              >
                <Image
                  src={mobileScreenshot}
                  alt={selectedFeature.mobileScreenshot 
                    ? `${selectedFeature.title} mobile app screenshot` 
                    : `${selectedFeature.title} real app screenshot`}
                  fill
                  sizes="100vw"
                  className="pointer-events-none select-none object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close screenshot"
                className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-20 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/65 text-xl text-white backdrop-blur-md"
              >
                ×
              </button>

              {!isZoomed && allFeatures.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md"
              >
                {isZoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
              </button>
            </motion.div>

            {/* Desktop modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative z-10 hidden h-[calc(100dvh-2rem)] w-full max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#080910]/95 shadow-[0_32px_100px_rgba(0,0,0,0.72)] backdrop-blur-2xl animate-fade-in sm:flex lg:h-[calc(100dvh-2.5rem)] lg:max-w-[calc(100vw-2.5rem)]"
            >
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`hidden shrink-0 rounded-2xl border p-3 sm:inline-flex ${featureColorMap[selectedFeature.color].bg} ${featureColorMap[selectedFeature.color].border} ${featureColorMap[selectedFeature.color].text}`}>
                      <selectedFeature.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <span className={`block text-[10px] font-black uppercase tracking-[0.22em] ${featureColorMap[selectedFeature.color].text}`}>
                        Feature preview {currentIndex !== -1 ? `• ${currentIndex + 1} of ${allFeatures.length}` : ""}
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

                <div className="relative min-h-0 flex-1 bg-[#05060a] p-2 sm:p-3 lg:p-4 group/modal">
                  <div
                    ref={containerRef}
                    className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedFeature.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ 
                          opacity: 1,
                          scale: isZoomed ? 2.2 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        drag={isZoomed}
                        dragConstraints={dragBounds}
                        dragElastic={0.05}
                        style={{ x, y }}
                        onTap={() => setIsZoomed(!isZoomed)}
                        className={`absolute inset-0 flex items-center justify-center ${
                          isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                        }`}
                      >
                        <Image
                          src={selectedFeature.screenshot}
                          alt={`${selectedFeature.title} real app screenshot`}
                          fill
                          sizes="calc(100vw - 2rem)"
                          className="object-contain select-none pointer-events-none p-2 sm:p-4"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Floating Zoom Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(!isZoomed);
                      }}
                      className="absolute bottom-4 right-4 z-20 flex h-10 items-center gap-2 rounded-full border border-white/10 bg-[#080910]/80 px-4 text-xs font-bold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#080910] hover:text-white hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                      title={isZoomed ? "Zoom out" : "Zoom in"}
                    >
                      {isZoomed ? (
                        <>
                          <ZoomOut className="size-4 text-violet-400" />
                          <span>Zoom Out</span>
                        </>
                      ) : (
                        <>
                          <ZoomIn className="size-4 text-violet-400" />
                          <span>Zoom In</span>
                        </>
                      )}
                    </button>
                  </div>

                  {allFeatures.length > 1 && !isZoomed && (
                    <>
                      {/* Left Arrow Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPrev();
                        }}
                        className="absolute left-4 sm:left-6 lg:left-8 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#080910]/80 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-[#080910] hover:text-white hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                        title="Previous feature (Left Arrow)"
                      >
                        <ChevronLeft className="size-5 sm:size-6" />
                      </button>

                      {/* Right Arrow Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNext();
                        }}
                        className="absolute right-4 sm:right-6 lg:right-8 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#080910]/80 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-[#080910] hover:text-white hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                        title="Next feature (Right Arrow)"
                      >
                        <ChevronRight className="size-5 sm:size-6" />
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                  <p className="max-w-3xl text-sm font-medium leading-relaxed text-white/62">
                    {isZoomed 
                      ? "Panned view: Click anywhere on the image to zoom out, or drag to explore different areas." 
                      : "A real Fabra product screenshot. Click on the image to zoom in and drag to pan."}
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/demo"
                      onClick={() => onClose()}
                      className="group animate-pulse-scale-glow relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-6 text-sm font-extrabold text-white select-none cursor-pointer"
                    >
                      <Sparkles className="size-4 text-violet-200 animate-pulse" />
                      <span>Try the Interactive Demo</span>
                      <ArrowRight className="size-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
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
