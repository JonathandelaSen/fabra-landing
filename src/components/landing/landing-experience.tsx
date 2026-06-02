"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  Globe,
  HelpCircle,
  KanbanSquare,
  Loader2,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { appUrl, cvAnalysis, job, profile } from "@/lib/demo-data";

type FlowStep =
  | "idle"
  | "uploading"
  | "ready"
  | "loading"
  | "analysis"
  | "templates"
  | "studio"
  | "completion"
  | "job-loading"
  | "job-analysis"
  | "job-chat"
  | "job-tracking";

const stepper = [
  { key: "upload", label: "Upload CV" },
  { key: "analysis", label: "AI analysis" },
  { key: "studio", label: "Template Studio" },
  { key: "match", label: "Job Match" },
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

interface AppFeature {
  id: string;
  title: string;
  teaser: string;
  description: string;
  icon: React.ComponentType<any>;
  color: "emerald" | "violet" | "amber" | "indigo" | "cyan" | "rose";
  top: string;
  left: string;
}

const APP_FEATURES: AppFeature[] = [
  {
    id: "cv-analyses",
    title: "CV analyses",
    teaser: "Diagnóstico inteligente de tu perfil profesional",
    description: "Analiza tu currículum con IA para identificar puntos fuertes, áreas de mejora clave, legibilidad para herramientas ATS y densidad de palabras clave adaptadas a tu sector laboral.",
    icon: FileText,
    color: "emerald",
    top: "5%",
    left: "5%",
  },
  {
    id: "cv-library",
    title: "CV Library",
    teaser: "Historial y versiones optimizadas en un solo lugar",
    description: "Mantén todas las versiones de tu CV organizadas y accesibles. Compara versiones anteriores, recupera secciones y realiza un seguimiento de los cambios aplicados en tu historial.",
    icon: Briefcase,
    color: "indigo",
    top: "18%",
    left: "45%",
  },
  {
    id: "templates",
    title: "Templates",
    teaser: "Diseños profesionales de alto impacto visual",
    description: "Exporta tu perfil en plantillas elegantes y validadas por reclutadores como Linea, Marco, Pulso o Filo, ajustando los colores y la estructura de forma instantánea.",
    icon: Sparkles,
    color: "violet",
    top: "8%",
    left: "75%",
  },
  {
    id: "cv-editor",
    title: "CV Editor",
    teaser: "Tu centro de control laboral a largo plazo",
    description: "Define tu rumbo profesional. Consolida toda tu experiencia laboral, feedback formal, proyectos destacados y objetivos de crecimiento en un espacio personal único y privado.",
    icon: Globe,
    color: "cyan",
    top: "32%",
    left: "10%",
  },
  {
    id: "job-analyses",
    title: "Job analyses",
    teaser: "Mide tu compatibilidad con cada puesto",
    description: "Compara tu currículum directamente con la descripción de una oferta de empleo para obtener tu puntuación de afinidad, identificar requisitos faltantes y ajustar tu CV.",
    icon: Target,
    color: "amber",
    top: "45%",
    left: "48%",
  },
  {
    id: "interview-questions",
    title: "Interview questions",
    teaser: "Prepárate con cuestionarios personalizados por IA",
    description: "Genera preguntas de entrevista basadas en la oferta que te interesa y practica tus respuestas con el feedback y consejos de posicionamiento de nuestro copiloto de IA.",
    icon: HelpCircle,
    color: "rose",
    top: "35%",
    left: "76%",
  },
  {
    id: "work-journal",
    title: "Work Journal",
    teaser: "Registra tus logros y hitos del día a día",
    description: "Anota tus victorias diarias, proyectos finalizados e hitos importantes. Convierte este historial en evidencias de valor para tus revisiones de desempeño y actualizaciones de CV.",
    icon: Trophy,
    color: "emerald",
    top: "60%",
    left: "8%",
  },
  {
    id: "objectives",
    title: "Objectives",
    teaser: "Planifica y alcanza tus metas de desarrollo",
    description: "Establece metas profesionales a corto y largo plazo. Vincula tus actividades diarias y la retroalimentación recibida para avanzar de forma constante hacia tu próximo gran paso.",
    icon: Star,
    color: "cyan",
    top: "75%",
    left: "38%",
  },
  {
    id: "received-feedback",
    title: "Received feedback",
    teaser: "Centraliza las valoraciones de tu equipo",
    description: "Guarda la retroalimentación formal e informal de tus compañeros, mánagers y clientes para extraer señales claras de tus fortalezas y aspectos a mejorar.",
    icon: MessageSquare,
    color: "violet",
    top: "66%",
    left: "70%",
  },
  {
    id: "feedback-notes",
    title: "Feedback notes",
    teaser: "Reflexiones y planes de acción personales",
    description: "Analiza el feedback recibido y documenta planes de acción concretos, notas de reuniones de desarrollo y estrategias para potenciar tus habilidades clave.",
    icon: ClipboardList,
    color: "indigo",
    top: "84%",
    left: "12%",
  },
];

interface PhysicsBubble {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  targetSpeed: number;
  initialX: number;
  initialY: number;
  featureIndex: number;
}

const featureColorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: {
    bg: "bg-emerald-500/10 hover:bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/20 hover:border-emerald-500/35",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_0_30px_rgba(16,185,129,0.22)]",
  },
  violet: {
    bg: "bg-violet-500/10 hover:bg-violet-500/15",
    text: "text-violet-400",
    border: "border-violet-500/20 hover:border-violet-500/35",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.08)] hover:shadow-[0_0_30px_rgba(139,92,246,0.22)]",
  },
  amber: {
    bg: "bg-amber-500/10 hover:bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/20 hover:border-amber-500/35",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.08)] hover:shadow-[0_0_30px_rgba(245,158,11,0.22)]",
  },
  indigo: {
    bg: "bg-indigo-500/10 hover:bg-indigo-500/15",
    text: "text-indigo-400",
    border: "border-indigo-500/20 hover:border-indigo-500/35",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.08)] hover:shadow-[0_0_30px_rgba(99,102,241,0.22)]",
  },
  cyan: {
    bg: "bg-cyan-500/10 hover:bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/20 hover:border-cyan-500/35",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.08)] hover:shadow-[0_0_30px_rgba(6,182,212,0.22)]",
  },
  rose: {
    bg: "bg-rose-500/10 hover:bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/20 hover:border-rose-500/35",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.08)] hover:shadow-[0_0_30px_rgba(244,63,94,0.22)]",
  },
};

export function LandingExperience() {
  const [step, setStep] = useState<FlowStep>("idle");
  const [selectedFeature, setSelectedFeature] = useState<AppFeature | null>(null);
  const flowRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const bubblesRef = useRef<PhysicsBubble[]>([]);
  const containerWidthRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Only run physics simulation on screen widths >= 1024 (desktop)
    if (typeof window === "undefined") return;

    const initPhysics = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const containerW = rect.width;
      const containerH = rect.height;

      containerWidthRef.current = containerW;
      containerHeightRef.current = containerH;

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

      // 3. Mutate DOM styles directly for high performance
      for (let i = 0; i < numBubbles; i++) {
        const bubble = bubbles[i];
        const el = cardRefs.current[bubble.featureIndex];
        if (el) {
          const offsetX = bubble.x - bubble.initialX;
          const offsetY = bubble.y - bubble.initialY;
          el.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0px)`;
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
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedFeature) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFeature(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFeature]);

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
    setStep("loading");
    window.setTimeout(() => setStep("analysis"), 3800);
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
        setStep("loading");
        window.setTimeout(() => setStep("analysis"), 3800);
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

      <section className="relative flex min-h-[100svh] items-center px-5 pt-32 pb-16 sm:px-8 lg:px-12 snap-start snap-always animate-fade-in" id="top" ref={heroRef as any}>
        <div className="absolute inset-0 -z-10 soft-grid opacity-35" />

        <div className="w-full pointer-events-none flex flex-col items-center justify-center text-center">
          
          {/* Title Header (Goes in front of cards: z-30) */}
          <div className="relative z-30 pointer-events-auto">
            <p className="mb-6 text-5xl font-black tracking-[0.18em] text-white sm:text-7xl lg:text-8xl select-none">
              FABRA
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
              Analyze your CV with AI, understand your strongest signal, and start shaping the next version of your career.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full">
              {/* Interactive Demo Glowing Button */}
              <button
                type="button"
                onClick={scrollToFlow}
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
                  onClick={() => setSelectedFeature(feature)}
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
                onClick={() => setSelectedFeature(feature)}
                className={`absolute p-3 rounded-2xl glass flex items-center gap-3 cursor-pointer text-left border ${styles.border} ${styles.bg} ${styles.glow} transition-all duration-300 pointer-events-auto w-[230px] scale-100 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] z-[20]`}
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

      <section ref={flowRef} id="flow" className="min-h-[100svh] px-5 py-20 sm:px-8 lg:px-12 snap-start snap-always">
        <div className="mx-auto max-w-7xl">
          {["job-loading", "job-analysis", "job-chat", "job-tracking"].includes(step) ? (
            <JobMatchFlowHeader
              current={step}
              onStepChange={(newStep) => setStep(newStep)}
              onBackToCV={() => setStep("completion")}
            />
          ) : (
            <FlowHeader current={step} onTabClick={handleTabClick} />
          )}
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
                <AnalysisExperience onImprove={() => setStep("templates")} />
              </motion.div>
            ) : step === "templates" ? (
              <motion.div
                key="templates"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <TemplateSelectionView onSelectTemplate={(tpl) => {
                  setSelectedTemplate(tpl);
                  resetStudioStates();
                  setStep("studio");
                }} />
              </motion.div>
            ) : step === "studio" ? (
              <motion.div
                key="studio"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <TemplateStudioView 
                  key={selectedTemplate}
                  template={selectedTemplate}
                  onChangeTemplate={() => {
                    resetStudioStates();
                    setStep("templates");
                  }}
                  onFinalize={() => setStep("completion")}
                  accentColor={accentColor}
                  setAccentColor={setAccentColor}
                  skillsPosition={skillsPosition}
                  setSkillsPosition={setSkillsPosition}
                  isSummaryCondensed={isSummaryCondensed}
                  setIsSummaryCondensed={setIsSummaryCondensed}
                  isSuggestionsApplied={isSuggestionsApplied}
                  setIsSuggestionsApplied={setIsSuggestionsApplied}
                />
              </motion.div>
            ) : step === "completion" ? (
              <motion.div
                key="completion"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <CompletionExperience
                  template={selectedTemplate}
                  accentColor={accentColor}
                  skillsPosition={skillsPosition}
                  isSummaryCondensed={isSummaryCondensed}
                  isSuggestionsApplied={isSuggestionsApplied}
                  onStartJobMatch={() => setStep("job-loading")}
                />
              </motion.div>
            ) : step === "job-loading" ? (
              <motion.div
                key="job-loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.42 }}
                className="mt-10"
              >
                <JobMatchLoadingExperience onComplete={() => setStep("job-analysis")} />
              </motion.div>
            ) : step === "job-analysis" ? (
              <motion.div
                key="job-analysis"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <JobMatchAnalysisView 
                  onNext={() => setStep("job-chat")} 
                  onBack={() => setStep("completion")} 
                />
              </motion.div>
            ) : step === "job-chat" ? (
              <motion.div
                key="job-chat"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <JobMatchChatView 
                  onNext={() => setStep("job-tracking")} 
                  onBack={() => setStep("job-analysis")} 
                />
              </motion.div>
            ) : step === "job-tracking" ? (
              <motion.div
                key="job-tracking"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="mt-8"
              >
                <JobMatchTrackingView 
                  onBack={() => setStep("job-chat")} 
                  onResetAll={() => setStep("ready")} 
                />
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

      {/* Screenshot detail modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-5 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
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
                      onClick={() => setSelectedFeature(null)}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:bg-white/10 hover:text-white lg:static"
                      title="Close overlay"
                    >
                      ✕
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
                        setSelectedFeature(null);
                        scrollToFlow();
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
      case "templates":
        return {
          badge: "06 · TEMPLATE STUDIO",
          title: "Select your preferred layout template",
          glowColor: "99, 102, 241", // indigo
        };
      case "studio":
        return {
          badge: "07 · DYNAMIC TAILORING",
          title: "Use conversational prompts to polish your CV",
          glowColor: "168, 85, 247", // purple
        };
      case "completion":
        return {
          badge: "08 · CV READY",
          title: "Your optimized CV is ready!",
          glowColor: "16, 185, 129", // emerald
        };
      case "job-loading":
        return {
          badge: "09 · COMPARING ROLES",
          title: "Matching profile to Staff Software Engineer...",
          glowColor: "124, 58, 237", // violet
        };
      case "job-analysis":
        return {
          badge: "10 · MATCH DIAGNOSIS",
          title: "Alignment Score: 84/100 · Strong Match",
          glowColor: "99, 102, 241", // indigo
        };
      case "job-chat":
        return {
          badge: "11 · AI COACHING",
          title: "Consulting Fabra Copilot on positioning",
          glowColor: "168, 85, 247", // purple
        };
      case "job-tracking":
        return {
          badge: "12 · OPPORTUNITY TRACKING",
          title: "Position added to pipeline & moving toward Interview Prep",
          glowColor: "34, 211, 238", // cyan
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

const CORE_LOADING_LOGS = [
  "Reading PDF document structure...",
  "Extracting metadata & career checkpoints...",
  "Benchmarking technical skills against industry standards...",
  "Scanning keyword alignment and coverage...",
  "Consulting models for strategic analysis...",
  "Assembling recommendations & finishing diagnostic report...",
];

function LoadingExperience() {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < CORE_LOADING_LOGS.length - 1 ? prev + 1 : prev));
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
              {CORE_LOADING_LOGS[logIndex]}
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
  onTabClick: (key: "upload" | "analysis" | "studio" | "match") => void;
}) {
  const activeIndex = 
    current === "idle" || current === "uploading" || current === "ready" ? 0 : 
    current === "loading" || current === "analysis" ? 1 : 
    current === "templates" || current === "studio" ? 2 :
    3;
  const canNavigateToAnalysis = current !== "idle" && current !== "uploading";
  const canNavigateToMatch = current === "completion";

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
          if (index === 3) isClickable = canNavigateToMatch;

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

function RealCVPreview({
  template = "raw",
  accentColor = "default",
  skillsPosition = "bottom",
  isSummaryCondensed = false,
  isSuggestionsApplied = false,
  small = false,
}: {
  template?: "raw" | "linea" | "marco" | "pulso" | "filo";
  accentColor?: "default" | "cool";
  skillsPosition?: "bottom" | "top";
  isSummaryCondensed?: boolean;
  isSuggestionsApplied?: boolean;
  small?: boolean;
}) {
  const getResolvedColor = (t: string, accent: "default" | "cool") => {
    if (t === "linea") return accent === "cool" ? "#1e3a8a" : "#111827";
    if (t === "marco") return accent === "cool" ? "#1d4ed8" : "#1a1a2e";
    if (t === "pulso") return accent === "cool" ? "#6366f1" : "#0f766e";
    if (t === "filo") return accent === "cool" ? "#06b6d4" : "#9f1239";
    return accent === "cool" ? "#4f46e5" : "#111827";
  };

  const resolvedColor = getResolvedColor(template, accentColor);

  const getTemplatePaperStyle = (t: string) => {
    if (t === "linea") return "font-sans bg-[#ffffff] border-slate-200 text-[#2d2d2d]";
    if (t === "marco") return "font-serif bg-[#fdfdfd] border-slate-200 text-[#2d2d2d]";
    if (t === "pulso") return "font-sans bg-[#ffffff] border-slate-100 text-[#2d2d2d]";
    if (t === "filo") return "font-sans bg-[#ffffff] border-slate-200 text-[#27272a]";
    return "font-serif bg-white border-slate-300 text-slate-800";
  };

  const getAccentBgClass = (t: string, col: "default" | "cool") => {
    if (t === "linea") return col === "cool" ? "bg-blue-50 text-blue-900 border border-blue-100/50" : "bg-[#f4f4f5] text-[#2d2d2d] border border-slate-200/50";
    if (t === "marco") return col === "cool" ? "bg-indigo-50 text-indigo-900" : "bg-[#f0ede6] text-[#2d2d2d]";
    if (t === "pulso") return col === "cool" ? "bg-violet-50 text-violet-700 border border-violet-100/50" : "bg-[#f0fdfa] text-[#0f766e] border border-teal-100/50";
    if (t === "filo") return col === "cool" ? "border border-[#06b6d4] text-[#27272a] bg-white rounded-none" : "border border-[#9f1239] text-[#27272a] bg-white rounded-none";
    return col === "cool" ? "bg-violet-50 text-violet-700" : "bg-slate-100";
  };

  const sectionIds = skillsPosition === "top" 
    ? ["skills", "summary", "experience"] 
    : ["summary", "experience", "skills"];

  const experiences = [
    {
      company: "Edpuzzle",
      role: "Senior Software Engineer",
      dates: "Sep 2024 - Present",
      bullets: isSuggestionsApplied ? [
        "<strong>Drove feature delivery</strong> for a platform with <strong>2M+ daily active users</strong>, maintaining a <strong>99.98% uptime SLA</strong>.",
        "<strong>Architected and scaled</strong> high-throughput backend services (Node.js, MongoDB, Redis), reducing query latency by <strong>35%</strong>.",
        "<strong>Standardized AI-assisted engineering workflows</strong> across squads, boosting delivery velocity by <strong>22%</strong>."
      ] : [
        "Own product features end to end for a platform used by 2M+ daily active users.",
        "Operate Node.js, MongoDB and Redis systems under real production load.",
        "Help the engineering team adopt AI-assisted development workflows.",
      ],
    },
    {
      company: "Dezzai",
      role: "Tech Lead",
      dates: "Sep 2020 - Sep 2024",
      bullets: isSuggestionsApplied ? [
        "<strong>Steered product engineering</strong> and digital workflows for <strong>Grupo Prisa (Colombia)</strong>, scaling team capacity by <strong>40%</strong>.",
        "<strong>Designed event-driven analytical systems</strong> and DDD boundaries, accelerating data pipeline throughput by <strong>3x</strong>."
      ] : [
        "Built and scaled multidisciplinary engineering teams and delivery practices.",
        "Designed event-driven systems, DDD boundaries and data processing pipelines.",
      ],
    },
  ];

  return (
    <div
      className={`cv-paper mx-auto transition-all duration-300 ${getTemplatePaperStyle(template)} ${
        small
          ? "max-h-[460px] max-w-[390px] overflow-hidden p-5 text-[10px] rounded-lg"
          : "w-full max-w-[680px] p-10 sm:p-12 text-[12px] flex flex-col rounded-lg"
      }`}
    >
      {template === "raw" && (
        <header className="border-b border-slate-300 pb-4 text-left font-serif">
          <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: resolvedColor }}>{profile.name}</h3>
          <p className="text-xs text-slate-600 italic mt-0.5">{profile.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
            <p>📧 {profile.email}</p>
            <p>💻 github.com/JonathandelaSen</p>
          </div>
        </header>
      )}

      {template === "linea" && (
        <header className="flex justify-between items-start border-b-[2.5px] pb-4 mb-5" style={{ borderBottomColor: resolvedColor }}>
          <div>
            <h3 className="text-2xl font-black leading-none mb-1" style={{ color: resolvedColor }}>{profile.name}</h3>
            <p className="text-[11px] text-[#505050] font-semibold uppercase tracking-wider">{profile.role}</p>
          </div>
          <div className="text-right text-[10.5px] text-[#4f4f4f] flex flex-col gap-0.5 mt-0.5">
            <span>{profile.email}</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}

      {template === "marco" && (
        <header className="flex flex-col items-center text-center gap-1 border-b pb-3.5 mb-5" style={{ borderBottomColor: resolvedColor }}>
          <h3 className="text-2xl font-bold tracking-wide" style={{ color: resolvedColor }}>{profile.name}</h3>
          <p className="text-[11px] text-[#505050] uppercase tracking-widest font-semibold">{profile.role}</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 text-[10.5px] text-[#4f4f4f]">
            <span>{profile.email}</span>
            <span>·</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}

      {template === "pulso" && (
        <header className="flex flex-col gap-1 pb-4 mb-4">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1" style={{ color: accentColor === "cool" ? resolvedColor : undefined }}>{profile.name}</h3>
          <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: resolvedColor }}>{profile.role}</p>
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#4f4f4f] font-semibold">
            <span>{profile.email}</span>
            <span>·</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}

      {template === "filo" && (
        <header className="flex flex-col gap-1.5 pb-4 mb-4 border-t-[6px] border-b-2 border-b-[#171717] pt-3.5" style={{ borderTopColor: resolvedColor }}>
          <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-0.5" style={{ color: accentColor === "cool" ? resolvedColor : "#111111" }}>{profile.name}</h3>
          <p className="text-[10.5px] font-black uppercase tracking-wider" style={{ color: resolvedColor }}>{profile.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] font-bold text-[#3f3f46]">
            <span>{profile.email}</span>
            <span>·</span>
            <span>github.com/JonathandelaSen</span>
          </div>
        </header>
      )}
      
      <motion.div layout className="flex-1 flex flex-col">
        <AnimatePresence mode="popLayout">
          {sectionIds.map((secId) => {
            if (secId === "summary") {
              return (
                <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 15 }} key="summary">
                  <CVSection title="About me" small={small} template={template} accentColor={accentColor}>
                    <div className="transition-all duration-500 rounded-lg p-1.5">
                      {isSummaryCondensed ? (
                        <p dangerouslySetInnerHTML={{ __html: isSuggestionsApplied 
                          ? "<strong>Senior Software Engineer</strong> with 10+ years scaling high-traffic systems (<strong>2M+ DAU</strong>) and directing developer velocity workflows at Edpuzzle. Expert in backend performance, DDD, and event-driven architectures."
                          : "Senior Software Engineer with 10+ years of experience scaling high-traffic applications (<strong>2M+ DAU</strong>) and leading AI-first developer workflows at Edpuzzle. Expert in backend architecture, system design, DDD, and event-driven microservices."
                        }} />
                      ) : (
                        <div className="space-y-1.5">
                          {isSuggestionsApplied ? (
                            <p>
                              Senior Software Engineer with 10+ years building high-scale product systems and AI-assisted engineering workflows. I connect backend architecture, product iteration, and developer productivity to ship reliable AI-powered experiences faster.
                            </p>
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </CVSection>
                </motion.div>
              );
            }
            if (secId === "experience") {
              return (
                <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 15 }} key="experience">
                  <CVSection title="Work experience" small={small} template={template} accentColor={accentColor}>
                    <div className={template === "raw" ? "space-y-3" : "space-y-4"}>
                      {experiences.map((exp, index) => {
                        const isModern = template === "pulso";
                        const titleText = isModern ? exp.company : exp.role;
                        const metaText = isModern ? `${exp.role} · Barcelona` : `${exp.company} · Barcelona`;
                        
                        return (
                          <div 
                            key={index} 
                            className="cvp-item break-inside-avoid transition-all duration-500 rounded-lg p-1.5"
                          >
                            <div className="flex justify-between items-start gap-4 mb-0.5">
                              <div>
                                <h5 className={`font-bold text-[#161616] text-[11px] sm:text-[11.5px] leading-tight ${template === "marco" ? "font-serif" : "font-sans"}`}>
                                  {titleText}
                                </h5>
                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                  {metaText}
                                </p>
                              </div>
                              <span className="text-[10px] text-slate-500 font-semibold shrink-0 text-right">
                                {exp.dates}
                              </span>
                            </div>
                            <ul className="mt-1.5 space-y-0.5 pl-4 list-disc text-[10px] sm:text-[10.5px] text-slate-700 leading-relaxed">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </CVSection>
                </motion.div>
              );
            }
            if (secId === "skills") {
              return (
                <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 15 }} key="skills">
                  <CVSection title="Skills" small={small} template={template} accentColor={accentColor}>
                    <div className="transition-all duration-500 rounded-lg p-1.5">
                      {template === "raw" ? (
                        <p className="text-slate-600 font-normal text-[11px] sm:text-[11.5px] leading-relaxed font-serif">
                          Node.js, TypeScript, MongoDB, Redis, React, DDD, CQRS, Observability, AI workflows.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {["Node.js", "TypeScript", "MongoDB", "Redis", "React", "DDD", "CQRS", "Observability", "AI workflows"].map((skill) => (
                            <span key={skill} className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${getAccentBgClass(template, accentColor)}`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CVSection>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function CVSection({
  title,
  children,
  small = false,
  template = "raw",
  accentColor = "default",
}: {
  title: string;
  children: React.ReactNode;
  small?: boolean;
  template?: "raw" | "linea" | "marco" | "pulso" | "filo";
  accentColor?: "default" | "cool";
}) {
  const getResolvedColor = (t: string, accent: "default" | "cool") => {
    if (t === "linea") return accent === "cool" ? "#1e3a8a" : "#111827";
    if (t === "marco") return accent === "cool" ? "#1d4ed8" : "#1a1a2e";
    if (t === "pulso") return accent === "cool" ? "#6366f1" : "#0f766e";
    if (t === "filo") return accent === "cool" ? "#06b6d4" : "#9f1239";
    return accent === "cool" ? "#4f46e5" : "#111827";
  };

  const resolvedColor = getResolvedColor(template, accentColor);

  if (template === "linea") {
    return (
      <section className={`${small ? "mt-3" : "mt-5"} text-slate-800 text-left font-sans`}>
        <h4 
          className="border-b pb-1 font-extrabold uppercase tracking-wider text-[10.5px] sm:text-[11px]"
          style={{ borderBottomColor: accentColor === "cool" ? resolvedColor : '#dfd9ce', color: accentColor === "cool" ? resolvedColor : '#111827' }}
        >
          {title}
        </h4>
        <div className="mt-2 space-y-1.5 text-slate-700 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  if (template === "marco") {
    return (
      <section className={`${small ? "mt-4" : "mt-5.5"} text-slate-900 text-left font-serif`}>
        <h4 
          className="border-b pb-1 font-bold text-center uppercase tracking-widest text-[10.5px] sm:text-[11.5px]"
          style={{ borderBottomColor: '#c8c4bc', color: resolvedColor }}
        >
          {title}
        </h4>
        <div className="mt-2 space-y-2 text-slate-800 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  if (template === "filo") {
    return (
      <section className={`${small ? "mt-3" : "mt-5"} text-slate-800 text-left`}>
        <h4 
          className="border-t-2 border-b py-1.5 font-black uppercase tracking-wider text-[10.5px] sm:text-[11px]"
          style={{ borderTopColor: resolvedColor, borderBottomColor: '#171717', color: accentColor === "cool" ? resolvedColor : '#171717' }}
        >
          {title}
        </h4>
        <div className="mt-2 space-y-1.5 text-[#27272a] text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  if (template === "raw") {
    return (
      <section className={`${small ? "mt-3" : "mt-5"} text-slate-800 text-left font-serif`}>
        <h4 
          className="mb-1 border-b border-slate-300 pb-0.5 font-bold uppercase tracking-wider text-[11px] sm:text-[11.5px]"
          style={{ color: resolvedColor }}
        >
          {title}
        </h4>
        <div className="space-y-1.5 text-slate-800 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
      </section>
    );
  }
  // Default is "pulso"
  return (
    <section className={`${small ? "mt-4" : "mt-5.5"} text-slate-800 text-left`}>
      <h4 
        className="border-l-4 pl-3 pb-0.5 font-black uppercase tracking-wider text-[10.5px] sm:text-[11px]"
        style={{ borderLeftColor: resolvedColor, color: resolvedColor }}
      >
        {title}
      </h4>
      <div className="mt-2 space-y-1.5 text-slate-700 text-[10.5px] sm:text-[11px] leading-relaxed">{children}</div>
    </section>
  );
}

function AnalysisExperience({ onImprove }: { onImprove: () => void }) {
  return (
    <div className="relative w-full">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute inset-0 -z-10 bg-radial from-violet-600/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="space-y-10">
        <AnalysisCTA onImprove={onImprove} />
        <AnalysisHero />

        <div className="grid gap-8 lg:grid-cols-2">
          <ImprovementPanel />
          <KeywordsPanel />
        </div>
      </div>
    </div>
  );
}

function AnalysisCTA({ onImprove }: { onImprove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex justify-center"
    >
      <motion.button
        type="button"
        onClick={onImprove}
        animate={{ scale: [1, 1.03, 1], boxShadow: [
          "0 20px 50px rgba(124,58,237,0.3)",
          "0 24px 60px rgba(124,58,237,0.5)",
          "0 20px 50px rgba(124,58,237,0.3)",
        ]}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-violet-600 px-12 text-base font-bold text-white transition hover:bg-violet-500 active:scale-[0.97] cursor-pointer"
      >
        Improve CV in Template Studio
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="size-5" />
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

function AnalysisHero() {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0d12]/50 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Resplandor interior decorativo */}
      <div className="absolute -right-32 -top-32 size-96 bg-radial from-amber-500/[0.07] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -left-32 -bottom-32 size-96 bg-radial from-violet-500/[0.05] to-transparent blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
        {/* Score ring column */}
        <div className="flex flex-col items-center shrink-0">
          <ScoreRing score={cvAnalysis.score} variant="amber" label="Score" size={120} strokeWidth={8} />
          <div className="mt-4 flex flex-col items-center">
            <span className="rounded-full bg-amber-500/12 border border-amber-500/20 px-3 py-1 text-xs font-black text-amber-300">
              IMPROVABLE
            </span>
          </div>
        </div>

        {/* Details column */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center lg:justify-start">
              <h3 className="text-2xl sm:text-3xl font-black text-white">Jonathan de la Sen CV</h3>

            </div>
          </div>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-4xl">
            This CV presents exceptional content, highlighting solid experience and deep technical knowledge in software engineering. It is particularly strong in impact quantification, system performance, and AI-assisted development. The next step is to clarify chronology, sharpen the summary and make the strongest signals easier for ATS and recruiters to scan.
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-white/40 pt-2">
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-medium">
              Model: gemini-2.5-flash
            </span>
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-medium">
              Analyzed: June 2, 2026 · 00:38
            </span>
          </div>
        </div>
      </div>
    </div>
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

function TemplateSelectionView({
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

function TemplateStudioView({
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
      
      {/* Columna Izquierda: Chatbot Editor */}
      <div className="lg:col-span-5 flex flex-col h-[640px] rounded-3xl border border-white/10 bg-[#0c0d12]/80 backdrop-blur-md shadow-2xl overflow-hidden relative">
        
        {/* Cabecera del chat */}
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

        {/* Historial de mensajes */}
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

          {/* Indicador de escritura */}
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

        {/* Entrada y píldoras rápidas */}
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

      {/* Columna Derecha: Previsualización de CV adaptable */}
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
function CompletionExperience({
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

function JobMatchFlowHeader({
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
        {/* Línea de progreso de fondo */}
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
              {/* Nodo circular interactivo */}
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

                {/* Resplandor pulsante para nodo activo */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-violet-400/20 pointer-events-none" />
                )}
              </motion.div>

              {/* Etiqueta */}
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

function JobMatchLoadingExperience({ onComplete }: { onComplete: () => void }) {
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

      {/* Círculo de Carga Inteligente */}
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
              {JOB_MATCH_LOGS[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Barra de progreso de carga */}
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

function ScoreRing({
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
        {/* Trazo de fondo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Trazo de progreso con gradiente */}
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
      {/* Texto del score central */}
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

function JobMatchAnalysisView({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [activeHeroTab, setActiveHeroTab] = useState("summary");

  const heroTabs = [
    { id: "summary", label: "Summary", icon: ClipboardList },
    { id: "offer", label: "Offer Details", icon: Briefcase },
    { id: "questions", label: "Questions", icon: HelpCircle },
    { id: "copilot", label: "AI Copilot", icon: Sparkles },
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

          {activeHeroTab === "copilot" && (
            <motion.div
              key="copilot-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-white/10 bg-[#0c0d12]/40 p-10 sm:p-12 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-center gap-6 text-center w-full animate-fadeIn"
            >
              {/* Background glow decoration */}
              <div className="absolute -right-32 -bottom-32 size-96 bg-radial from-violet-500/[0.08] to-transparent blur-3xl pointer-events-none" />
              <div className="absolute -left-32 -top-32 size-96 bg-radial from-indigo-500/[0.06] to-transparent blur-3xl pointer-events-none" />

              <div className="size-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-2 relative z-10">
                <MessageSquare className="size-8 text-violet-400" />
              </div>

              <div className="space-y-2 max-w-md relative z-10">
                <h4 className="text-xl sm:text-2xl font-black text-white">Consult Fabra AI Copilot</h4>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                  Need custom positioning strategies, custom bullet points, or real-time simulation answers? Open the sandbox chat to interact directly with your CV coach.
                </p>
              </div>

              <button
                onClick={onNext}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 text-sm font-bold text-white transition hover:scale-[1.03] cursor-pointer shadow-[0_10px_30px_rgba(124,58,237,0.25)] relative z-10"
              >
                Open Copilot Chat
                <ArrowRight className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation block */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onNext}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 text-sm font-bold text-white transition hover:scale-[1.02] cursor-pointer"
        >
          Consult AI Copilot
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function JobMatchChatView({
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

function JobMatchTrackingView({
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

      {/* Kanban Board - takes full width */}
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

        {/* Kanban Columns */}
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
