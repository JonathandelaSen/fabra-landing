"use client";

import { useEffect, useRef, useState } from "react";
import { FeaturePreviewModal } from "./feature-preview-modal";
import { FlowSection } from "./flow-section";
import { HeroSection } from "./hero-section";
import {
  APP_FEATURES,
  AppFeature,
  FlowStep,
  PhysicsBubble,
} from "./landing-data";

export function LandingExperience() {
  const [step, setStep] = useState<FlowStep>("idle");
  const [restoreVersion, setRestoreVersion] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<AppFeature | null>(null);
  const flowRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lettersRectRef = useRef<{
    element: HTMLSpanElement;
    x: number;
    y: number;
    width: number;
    height: number;
  }[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const bubblesRef = useRef<PhysicsBubble[]>([]);
  const containerWidthRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const analyzeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Only run physics simulation on screen widths >= 1024 (desktop)
    if (typeof window === "undefined") return;

    const measureLetters = () => {
      if (!heroRef.current || !letterRefs.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      lettersRectRef.current = letterRefs.current
        .map((el) => {
          if (!el) return null;
          
          // Temporarily remove transform to measure original bounds accurately
          const prevTransform = el.style.transform;
          el.style.transform = "none";
          
          const letterRect = el.getBoundingClientRect();
          
          // Restore transform
          el.style.transform = prevTransform;
          
          return {
            element: el,
            x: letterRect.left - heroRect.left,
            y: letterRect.top - heroRect.top,
            width: letterRect.width,
            height: letterRect.height,
          };
        })
        .filter((item): item is { element: HTMLSpanElement; x: number; y: number; width: number; height: number } => item !== null);
    };

    const initPhysics = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const containerW = rect.width;
      const containerH = rect.height;

      containerWidthRef.current = containerW;
      containerHeightRef.current = containerH;

      measureLetters();

      // Initialize bubble structures
      const newBubbles: PhysicsBubble[] = APP_FEATURES.map((feature, index) => {
        const initialX = containerW * (parseFloat(feature.left) / 100);
        const initialY = containerH * (parseFloat(feature.top) / 100);

        // Measure card dimensions or fall back to default values
        let w = 230;
        let h = 58;
        const el = cardRefs.current[index];
        if (el) {
          const cardRect = el.getBoundingClientRect();
          w = cardRect.width || 230;
          h = cardRect.height || 58;
        }

        // Assign random starting velocity direction, magnitude targetSpeed
        const targetSpeed = 1.8 + Math.random() * 1.8; // even faster organic drift
        const angle = Math.random() * Math.PI * 2;

        return {
          id: feature.id,
          x: initialX,
          y: initialY,
          vx: Math.cos(angle) * targetSpeed,
          vy: Math.sin(angle) * targetSpeed,
          width: w,
          height: h,
          targetSpeed,
          initialX,
          initialY,
          featureIndex: index,
        };
      });

      bubblesRef.current = newBubbles;
    };

    initPhysics();

    // Resize handler
    const handleResize = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const oldW = containerWidthRef.current;
      const oldH = containerHeightRef.current;
      const newW = rect.width;
      const newH = rect.height;

      containerWidthRef.current = newW;
      containerHeightRef.current = newH;

      measureLetters();

      if (bubblesRef.current.length === 0) {
        initPhysics();
        return;
      }

      bubblesRef.current.forEach((bubble) => {
        const feature = APP_FEATURES[bubble.featureIndex];
        bubble.initialX = newW * (parseFloat(feature.left) / 100);
        bubble.initialY = newH * (parseFloat(feature.top) / 100);

        if (oldW > 0 && oldH > 0) {
          bubble.x = (bubble.x / oldW) * newW;
          bubble.y = (bubble.y / oldH) * newH;
        } else {
          bubble.x = bubble.initialX;
          bubble.y = bubble.initialY;
        }

        const el = cardRefs.current[bubble.featureIndex];
        if (el) {
          const cardRect = el.getBoundingClientRect();
          bubble.width = cardRect.width || 230;
          bubble.height = cardRect.height || 68;
        }
      });
    };

    window.addEventListener("resize", handleResize);

    // Periodically update coordinates (every 1s) to correct any layout shifts/late font loads
    const intervalId = setInterval(measureLetters, 1000);

    // Animation frame update
    const updatePhysics = () => {
      if (window.innerWidth < 1024) {
        requestRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const containerW = containerWidthRef.current;
      const containerH = containerHeightRef.current;
      if (containerW === 0 || containerH === 0) {
        requestRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const bubbles = bubblesRef.current;
      const numBubbles = bubbles.length;

      // 1. Position and boundary updates
      for (let i = 0; i < numBubbles; i++) {
        const bubble = bubbles[i];
        const isHovered = hoveredRef.current === bubble.id;

        if (isHovered) {
          bubble.vx = 0;
          bubble.vy = 0;
          continue;
        }

        // Speed regulation
        let speed = Math.sqrt(bubble.vx * bubble.vx + bubble.vy * bubble.vy);
        if (speed === 0) {
          const angle = Math.random() * Math.PI * 2;
          bubble.vx = Math.cos(angle) * bubble.targetSpeed;
          bubble.vy = Math.sin(angle) * bubble.targetSpeed;
          speed = bubble.targetSpeed;
        }

        const target = bubble.targetSpeed;
        const factor = 0.05;
        bubble.vx += (bubble.vx / speed) * (target - speed) * factor;
        bubble.vy += (bubble.vy / speed) * (target - speed) * factor;

        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Boundary check (keep on screen)
        const pad = 12;
        if (bubble.x < pad) {
          bubble.x = pad;
          bubble.vx = Math.abs(bubble.vx);
        } else if (bubble.x + bubble.width > containerW - pad) {
          bubble.x = containerW - pad - bubble.width;
          bubble.vx = -Math.abs(bubble.vx);
        }

        if (bubble.y < pad) {
          bubble.y = pad;
          bubble.vy = Math.abs(bubble.vy);
        } else if (bubble.y + bubble.height > containerH - pad) {
          bubble.y = containerH - pad - bubble.height;
          bubble.vy = -Math.abs(bubble.vy);
        }
      }

      // 2. Pairwise rectangle collisions
      const collisionGap = 10;
      const bounceDamping = 0.92;

      for (let i = 0; i < numBubbles; i++) {
        for (let j = i + 1; j < numBubbles; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];

          const isHovered1 = hoveredRef.current === b1.id;
          const isHovered2 = hoveredRef.current === b2.id;

          const cx1 = b1.x + b1.width / 2;
          const cy1 = b1.y + b1.height / 2;
          const cx2 = b2.x + b2.width / 2;
          const cy2 = b2.y + b2.height / 2;

          const hw1 = b1.width / 2 + collisionGap;
          const hh1 = b1.height / 2 + collisionGap;
          const hw2 = b2.width / 2 + collisionGap;
          const hh2 = b2.height / 2 + collisionGap;

          const overlapX = (hw1 + hw2) - Math.abs(cx1 - cx2);
          const overlapY = (hh1 + hh2) - Math.abs(cy1 - cy2);

          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const dirX = Math.sign(cx2 - cx1) || 1;
              const b1Speed = Math.max(Math.abs(b1.vx), b1.targetSpeed * 0.75);
              const b2Speed = Math.max(Math.abs(b2.vx), b2.targetSpeed * 0.75);

              if (isHovered1 && !isHovered2) {
                b2.x += overlapX * dirX;
                b2.vx = b2Speed * dirX * bounceDamping;
              } else if (!isHovered1 && isHovered2) {
                b1.x -= overlapX * dirX;
                b1.vx = -b1Speed * dirX * bounceDamping;
              } else if (!isHovered1 && !isHovered2) {
                b1.x -= overlapX * 0.5 * dirX;
                b2.x += overlapX * 0.5 * dirX;
                b1.vx = -b1Speed * dirX * bounceDamping;
                b2.vx = b2Speed * dirX * bounceDamping;
              }
            } else {
              const dirY = Math.sign(cy2 - cy1) || 1;
              const b1Speed = Math.max(Math.abs(b1.vy), b1.targetSpeed * 0.75);
              const b2Speed = Math.max(Math.abs(b2.vy), b2.targetSpeed * 0.75);

              if (isHovered1 && !isHovered2) {
                b2.y += overlapY * dirY;
                b2.vy = b2Speed * dirY * bounceDamping;
              } else if (!isHovered1 && isHovered2) {
                b1.y -= overlapY * dirY;
                b1.vy = -b1Speed * dirY * bounceDamping;
              } else if (!isHovered1 && !isHovered2) {
                b1.y -= overlapY * 0.5 * dirY;
                b2.y += overlapY * 0.5 * dirY;
                b1.vy = -b1Speed * dirY * bounceDamping;
                b2.vy = b2Speed * dirY * bounceDamping;
              }
            }
          }
        }
      }

      for (let i = 0; i < numBubbles; i++) {
        const bubble = bubbles[i];
        const pad = 12;
        bubble.x = Math.min(Math.max(bubble.x, pad), containerW - pad - bubble.width);
        bubble.y = Math.min(Math.max(bubble.y, pad), containerH - pad - bubble.height);
      }

      // 3. Mutate DOM styles directly for high performance (handling hover scale dynamically)
      for (let i = 0; i < numBubbles; i++) {
        const bubble = bubbles[i];
        const el = cardRefs.current[bubble.featureIndex];
        if (el) {
          const offsetX = bubble.x - bubble.initialX;
          const offsetY = bubble.y - bubble.initialY;
          const isHovered = hoveredRef.current === bubble.id;
          const scale = isHovered ? " scale(1.05)" : " scale(1)";
          el.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0px)${scale}`;
        }
      }

      // 4. Update letter intersections and styles
      const letterRects = lettersRectRef.current;
      for (let j = 0; j < letterRects.length; j++) {
        const letter = letterRects[j];
        let isIntersecting = false;

        for (let i = 0; i < numBubbles; i++) {
          const bubble = bubbles[i];
          
          // Calculate precise center-based overlapping for responsive feedback
          const cardCenterX = bubble.x + bubble.width / 2;
          const cardCenterY = bubble.y + bubble.height / 2;
          const activeHalfWidth = 40; // 80px total width around the center of the card
          const activeHalfHeight = bubble.height / 2 + 10; // Vertical coverage

          if (
            cardCenterX - activeHalfWidth < letter.x + letter.width &&
            cardCenterX + activeHalfWidth > letter.x &&
            cardCenterY - activeHalfHeight < letter.y + letter.height &&
            cardCenterY + activeHalfHeight > letter.y
          ) {
            isIntersecting = true;
            break;
          }
        }

        if (isIntersecting) {
          if (letter.element.dataset.active !== "true") {
            const pct = letterRects.length > 1 ? (j / (letterRects.length - 1)) * 100 : 0;
            letter.element.dataset.active = "true";
            letter.element.style.transform = "scale(1.22) translateY(-4px)";
            letter.element.style.backgroundImage = "linear-gradient(90deg, #7c3aed 0%, #c026d3 50%, #4f46e5 100%)";
            letter.element.style.backgroundSize = `${letterRects.length * 100}% 100%`;
            letter.element.style.backgroundPosition = `${pct}% 0`;
            letter.element.style.webkitBackgroundClip = "text";
            letter.element.style.backgroundClip = "text";
            letter.element.style.webkitTextFillColor = "transparent";
          }
        } else {
          if (letter.element.dataset.active === "true") {
            letter.element.dataset.active = "false";
            letter.element.style.transform = "";
            letter.element.style.textShadow = "";
            letter.element.style.backgroundImage = "";
            letter.element.style.backgroundSize = "";
            letter.element.style.backgroundPosition = "";
            letter.element.style.webkitBackgroundClip = "";
            letter.element.style.backgroundClip = "";
            letter.element.style.webkitTextFillColor = "";
          }
        }
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    // Wait a brief moment to make sure elements are rendered and have dimensions
    const timer = setTimeout(() => {
      initPhysics();
      requestRef.current = requestAnimationFrame(updatePhysics);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const recoverFromHistoryRestore = () => {
      isScrollingRef.current = false;
      hoveredRef.current = null;
      setSelectedFeature(null);

      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
        setRestoreVersion((version) => version + 1);
      });
    };

    const handlePageShow = () => {
      recoverFromHistoryRestore();
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", recoverFromHistoryRestore);
    window.addEventListener("focus", recoverFromHistoryRestore);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", recoverFromHistoryRestore);
      window.removeEventListener("focus", recoverFromHistoryRestore);
    };
  }, []);

  useEffect(() => {
    if (!selectedFeature) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFeature(null);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature.id);
        if (currentIndex !== -1) {
          const prevIndex = (currentIndex - 1 + APP_FEATURES.length) % APP_FEATURES.length;
          setSelectedFeature(APP_FEATURES[prevIndex]);
        }
      } else if (e.key === "ArrowRight") {
        const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature.id);
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % APP_FEATURES.length;
          setSelectedFeature(APP_FEATURES[nextIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFeature]);

  useEffect(() => {
    return () => {
      if (analyzeTimerRef.current) {
        window.clearTimeout(analyzeTimerRef.current);
      }
    };
  }, []);

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
    const stepsToScroll = [
      "analysis",
      "templates",
      "studio",
      "completion",
      "job-loading",
      "job-analysis",
      "job-chat",
      "job-tracking",
    ];
    if (stepsToScroll.includes(step)) {
      flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const scrollToFlow = () => {
    flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const analyze = () => {
    if (analyzeTimerRef.current) {
      window.clearTimeout(analyzeTimerRef.current);
    }
    setStep("loading");
    analyzeTimerRef.current = window.setTimeout(() => {
      setStep("analysis");
      analyzeTimerRef.current = null;
    }, 3800);
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
        if (analyzeTimerRef.current) {
          window.clearTimeout(analyzeTimerRef.current);
        }
        setStep("loading");
        analyzeTimerRef.current = window.setTimeout(() => {
          setStep("analysis");
          analyzeTimerRef.current = null;
        }, 3800);
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

  // JavaScript support for directed smooth scrolling
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

      <HeroSection
        heroRef={heroRef}
        cardRefs={cardRefs}
        letterRefs={letterRefs}
        hoveredRef={hoveredRef}
        onFeatureSelect={setSelectedFeature}
        onDemoClick={scrollToFlow}
      />

      <FlowSection
        key={restoreVersion}
        flowRef={flowRef}
        step={step}
        selectedTemplate={selectedTemplate}
        accentColor={accentColor}
        skillsPosition={skillsPosition}
        isSummaryCondensed={isSummaryCondensed}
        isSuggestionsApplied={isSuggestionsApplied}
        onTabClick={handleTabClick}
        onStepChange={setStep}
        onAnalyze={analyze}
        onResetStudioStates={resetStudioStates}
        onSelectedTemplateChange={setSelectedTemplate}
        onAccentColorChange={setAccentColor}
        onSkillsPositionChange={setSkillsPosition}
        onSummaryCondensedChange={setIsSummaryCondensed}
        onSuggestionsAppliedChange={setIsSuggestionsApplied}
        onFeatureSelect={setSelectedFeature}
      />

      <FeaturePreviewModal
        selectedFeature={selectedFeature}
        allFeatures={APP_FEATURES}
        onClose={() => setSelectedFeature(null)}
        onDemoClick={() => {
          setSelectedFeature(null);
          scrollToFlow();
        }}
        onPrev={() => {
          const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature?.id);
          if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + APP_FEATURES.length) % APP_FEATURES.length;
            setSelectedFeature(APP_FEATURES[prevIndex]);
          }
        }}
        onNext={() => {
          const currentIndex = APP_FEATURES.findIndex((f) => f.id === selectedFeature?.id);
          if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % APP_FEATURES.length;
            setSelectedFeature(APP_FEATURES[nextIndex]);
          }
        }}
      />
    </main>
  );
}
