import type React from "react";
import {
  Briefcase,
  ClipboardList,
  FileText,
  Globe,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";

export type FlowStep =
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

export const stepper = [
  { key: "upload", label: "Upload CV" },
  { key: "analysis", label: "AI analysis" },
  { key: "studio", label: "Template Studio" },
  { key: "match", label: "Job Match" },
] as const;

export const keywords = [
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

export interface AppFeature {
  id: string;
  title: string;
  teaser: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: "emerald" | "violet" | "amber" | "indigo" | "cyan" | "rose";
  top: string;
  left: string;
}

export const APP_FEATURES: AppFeature[] = [
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

export interface PhysicsBubble {
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

export const featureColorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
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
