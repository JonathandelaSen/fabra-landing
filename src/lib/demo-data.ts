export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://tts-cv-ai-checker.vercel.app/";

export const profile = {
  name: "Jonathan de la Sen",
  role: "Senior Software Engineer",
  descriptor: "software engineer building AI products",
  email: "jonathandelasen@gmail.com",
  stats: ["10+ years", "2M+ daily users", "10k+ req/s app layer", "50k+ req/s database load"],
  summary:
    "Senior Software Engineer with 10+ years building and scaling high-traffic web applications end to end.",
  refinedSummary:
    "Senior Software Engineer with 10+ years building high-scale product systems and AI-assisted engineering workflows. I connect backend architecture, product iteration, and developer productivity to ship reliable AI-powered experiences faster.",
  experience: [
    {
      company: "Edpuzzle",
      title: "Senior Software Engineer",
      dates: "Sep 2024 - Present",
      bullets: [
        "Own product features end to end for a platform used by 2M+ daily active users.",
        "Operate Node.js, MongoDB and Redis systems under real production load.",
        "Help the engineering team adopt AI-assisted development workflows.",
      ],
    },
    {
      company: "Dezzai",
      title: "Tech Lead",
      dates: "Sep 2020 - Present",
      bullets: [
        "Built and scaled multidisciplinary engineering teams and delivery practices.",
        "Designed event-driven systems, DDD boundaries and data processing pipelines.",
      ],
    },
  ],
  skills: ["Node.js", "TypeScript", "MongoDB", "Redis", "React", "DDD", "CQRS", "Observability", "AI workflows"],
};

export const cvAnalysis = {
  score: 64,
  strengths: [
    "Scalable systems and high-traffic product experience.",
    "Strong end-to-end ownership from discovery to monitoring.",
    "Clear AI-assisted engineering narrative.",
  ],
  improvements: [
    {
      title: "Quantify AI product impact",
      description: "Anchor your AI integrations at Edpuzzle to concrete business results. Highlight user adoption metrics, latency reductions, or developer productivity gains."
    },
    {
      title: "Decouple leadership and execution",
      description: "Clearly demarcate your high-level tech-lead strategy (e.g. Grupo Prisa workflows, scaling teams) from raw day-to-day coding activities to sound more executive-ready."
    },
    {
      title: "Elevate technical skill visibility",
      description: "For AI and platform-focused engineering roles, position core competencies (DDD, system design, event-driven architectures) higher up on the first page."
    },
    {
      title: "Reframe founder & CTO experience",
      description: "Translate your entrepreneurial history at Dezzai into high-leverage product strategy, iterative customer feedback loops, and architectural direction."
    }
  ],
};

export const templates = [
  {
    name: "Linea",
    id: "linea",
    description: "Compact, precise and ATS-friendly.",
    accent: "#111827",
  },
  {
    name: "Marco",
    id: "marco",
    description: "Classic, editorial and elegant.",
    accent: "#1a1a2e",
  },
  {
    name: "Pulso",
    id: "pulso",
    description: "Modern, energetic and visually alive.",
    accent: "#37c78f",
  },
  {
    name: "Filo",
    id: "filo",
    description: "Sharp, structured and senior.",
    accent: "#52525b",
  },
];

export const job = {
  title: "Staff Software Engineer, AI Platform",
  company: "Northstar AI",
  location: "Remote Europe",
  tags: ["AI Platform", "Node.js", "Product Systems", "Observability", "Evaluation", "Scale"],
  score: 84,
  matches: ["Node.js", "High traffic systems", "Product ownership", "Observability", "AI-assisted workflows"],
  gaps: ["AI evaluation systems", "Staff-level leadership scope", "Platform ownership wording"],
  chatQuestion: "How should I position my Edpuzzle experience for this role?",
  chatAnswer:
    "Lead with scale and ownership, then connect the AI-first engineering work to platform leverage. Make Edpuzzle read less like feature delivery and more like operating critical systems while improving how the team ships AI-enabled product work.",
};

export const careerModules = [
  {
    title: "Work Journal",
    value: "Shipped AI-assisted review workflow for engineering team.",
    action: "Add this as CV evidence",
  },
  {
    title: "Goals",
    value: "Move toward Staff-level AI platform ownership.",
    action: "Turn into quarterly focus",
  },
  {
    title: "Received Feedback",
    value: "Strong product sense; make strategic impact more visible.",
    action: "Use for performance review",
  },
  {
    title: "Interview Questions",
    value: "Tell me about scaling systems under real traffic.",
    action: "Practice with context",
  },
];
