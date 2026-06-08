/**
 * Shared FE constants for the landing demo experience.
 *
 * Centralizes the kebab-case string literals used across the demo flow so they
 * are referenced by name instead of being repeated as magic strings.
 */

/** Steps of the interactive CV + Job Match demo flow. */
export const FLOW_STEPS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  READY: "ready",
  LOADING: "loading",
  ANALYSIS: "analysis",
  TEMPLATES: "templates",
  STUDIO: "studio",
  COMPLETION: "completion",
  JOB_LOADING: "job-loading",
  JOB_ANALYSIS: "job-analysis",
  JOB_CHAT: "job-chat",
  JOB_TRACKING: "job-tracking",
} as const;

export type FlowStep = (typeof FLOW_STEPS)[keyof typeof FLOW_STEPS];

/** Top-level tabs of the CV stepper header. */
export const FLOW_TABS = {
  UPLOAD: "upload",
  ANALYSIS: "analysis",
  STUDIO: "studio",
  MATCH: "match",
} as const;

export type FlowTab = (typeof FLOW_TABS)[keyof typeof FLOW_TABS];

/** Identifiers for the product features showcased in the preview grid. */
export const FEATURE_IDS = {
  CV_ANALYSES: "cv-analyses",
  CV_LIBRARY: "cv-library",
  TEMPLATES: "templates",
  JOB_CHAT: "job-chat",
  CV_EDITOR: "cv-editor",
  JOB_ANALYSES: "job-analyses",
  INTERVIEW_QUESTIONS: "interview-questions",
  PUBLIC_CV_URL: "public-cv-url",
  AI_MODEL_OPTIONS: "ai-model-options",
  JOB_TRACKING: "job-tracking",
  WORK_JOURNAL: "work-journal",
  OBJECTIVES: "objectives",
  RECEIVED_FEEDBACK: "received-feedback",
  FEEDBACK_NOTES: "feedback-notes",
} as const;

export type FeatureId = (typeof FEATURE_IDS)[keyof typeof FEATURE_IDS];
