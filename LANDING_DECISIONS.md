# FABRA Landing Decisions

Last updated: 2026-06-02

This document captures the shared decisions for the FABRA landing page so the project can be resumed from here without redoing the discovery conversation.

## Project Context

- Landing repo: `/Users/jon/DEV/repos/fabra-landing-codex`
- Product repo used as visual/product reference: `/Users/jon/DEV/repos/ats-cv-ai-checker`
- Product URL, temporary CTA destination: `https://tts-cv-ai-checker.vercel.app/`
- The landing should be implemented as an independent project, not inside the main app repo.
- The landing should borrow the real product DNA, but with marketing-level polish.

## Technical Direction

- Stack: Next.js, React, TypeScript, Tailwind CSS.
- Motion: Framer Motion.
- Icons: Lucide.
- Data: hardcoded interactions, structured internally with a `demo-data.ts` style file.
- No backend, real upload, auth, or real AI calls in the landing.
- CTA URL should be configurable so the temporary app URL can change easily later.
- Primary CTA should navigate in the same tab.
- Desktop is the primary showcase experience; mobile must be polished and simplified.

## Visual Thesis

FABRA should feel like a premium career operating system: a dark, focused workspace where a real career profile is analyzed, reshaped, matched to an opportunity, and turned into long-term career memory.

The design should not feel like a conventional landing page with text and screenshots. It should feel like a guided, interactive product experience.

## Inspiration References

These references inspired the desired direction. They should not be copied literally; use them as signals for interaction quality, visual ambition, pacing, and product storytelling.

- `https://www.nash.ai/#tour`
  - Inspiration: guided product tour, interactive flow, strong sense of progression.
- `https://tessact.ai/`
  - Inspiration: premium AI product atmosphere, polished visual language, cinematic product presence.
- `https://www.bevel.health/es`
  - Inspiration: refined health/product storytelling, high-end motion, clean premium positioning.
- `https://www.gpthumanizer.ai/es`
  - Inspiration: direct product-led conversion and interactive-feeling landing structure.

Reference takeaway:

FABRA should use the same level of polish and experiential ambition, but the concept must remain specific to FABRA: a career operating system where the visitor actively moves through CV analysis, template editing, job matching, and career memory.

## Brand And Copy

- Brand wordmark: `FABRA`.
- No separate icon for v1. A logo/icon may be explored later.
- Main H1: `Craft your career, your way.`
- Main CTA: `Start crafting with Fabra`.
- Secondary CTA: `Watch the flow`.
- Hero subcopy direction:
  - `An AI-guided workspace to analyze your CV, shape it for each opportunity, and turn everyday work into career momentum.`
- Copy tone:
  - calm
  - premium
  - direct
  - product-minded
  - human
  - no empty AI hype
- Avoid:
  - `Revolutionize your career with AI`
  - `Land your dream job instantly`
  - `10x your job search`
  - generic SaaS phrasing

## Audience And Positioning

Primary audience:

People who want to manage their career deliberately, not only react when they need a new job.

Positioning:

FABRA is more than a CV analyzer. It is a workspace for CVs, opportunities, goals, work evidence, feedback, interview preparation, and career memory.

The CV flow is the tangible entry point. The broader promise is career management.

## Experience Structure

The landing should be a hybrid experience:

- Scroll-led chapters.
- Fake but real-feeling user interactions.
- User-controlled moments through buttons and micro-actions.
- The visitor should feel like they used FABRA for 90 seconds, not like they read a feature page.

Recommended chapters:

1. Hero.
2. CV Intelligence.
3. Template Studio.
4. Job Match.
5. Career Workspace.
6. Final CTA.

Navigation:

- Minimal top nav:
  - `Flow`
  - `Templates`
  - `Job Match`
  - `Career`
- CTA in header:
  - `Start crafting with Fabra`
- Desktop can include a discreet chapter rail:
  - `CV`
  - `Template`
  - `Match`
  - `Career`
  - `Start`
- Mobile can simplify or hide the rail.

## Hero

The first viewport should be full-bleed and product-led.

Hierarchy:

1. FABRA wordmark.
2. `Craft your career, your way.`
3. AI-guided workspace subcopy.
4. Primary CTA and secondary CTA.
5. Dominant visual: the FABRA workspace coming into focus.

The hero should not use a generic dashboard card or a split marketing layout. It should feel like the beginning of the product experience.

## Protagonist Profile

The demo uses the user as the protagonist.

Name:

- Jonathan de la Sen

Role:

- Senior Software Engineer

Descriptor:

- software engineer building AI products

Personal data:

- Keep email visible.
- Hide phone number.

Professional details that can be shown:

- 10+ years of experience.
- Senior Software Engineer at Edpuzzle.
- Experience with high-traffic systems.
- 2M+ daily active users.
- 10k+ req/s at the application layer.
- 50k+ req/s at the database level.
- Companies can be visible:
  - Edpuzzle
  - Dezzai
  - RoadStr
  - Zenfood

The profile should be realistic and recognizable, but curated for public/demo safety.

## CV Intelligence Flow

First user action:

- Prefer `Analyze sample CV`, not a fake upload as the main action.
- A CV is already present in the workspace.
- The first click should produce transformation immediately.

Flow:

1. Show Jonathan's CV as a ready file/profile.
2. User clicks `Analyze sample CV`.
3. CV opens.
4. Text extraction appears by sections.
5. AI analysis appears in parallel.
6. Score animates.

Recommended initial CV score:

- `78/100`

Tone:

- Strong but improvable.
- The CV is not bad; FABRA sharpens it for the next move.

Suggested strengths:

- Scalable systems and high-traffic product experience.
- Strong end-to-end ownership.
- Clear AI-assisted engineering narrative.

Suggested improvements:

- Make AI product impact more measurable.
- Separate leadership scope from implementation details.
- Reframe older founder experience as product strategy, not only execution.
- Add stronger role-specific keywords for AI platform roles.

## Templates

Use the real template names from the app:

- Linea
- Marco
- Pulso
- Filo

Internal app mappings discovered in code:

- Linea maps to `compact`.
- Marco maps to `classic`.
- Pulso maps to `modern`.
- Filo maps to `filo`.

Template personality:

- Linea: compact, precise, ATS-friendly.
- Marco: classic, editorial, elegant.
- Pulso: modern, energetic, visually alive.
- Filo: sharp, structured, senior/decisive.

The demo should show all four templates.

Protagonist template:

- Pulso.

Pulso should resemble the real app template closely, even if the landing implementation is hardcoded and simplified.

## Template Studio Flow

After CV analysis:

1. Show the four templates.
2. User selects Pulso.
3. CV is transformed into a Pulso-style preview.
4. User sees an editor with both AI and manual controls.

AI edit should show a prompt like:

`Make this CV sharper for AI Platform roles. Shift the accent to a cooler tone, hide projects, move technical skills above experience, and tighten the summary.`

Transformation should demonstrate:

- Summary rewrite.
- Accent color change from green to a cooler blue/purple tone.
- Projects section hidden.
- Technical Skills moved above Experience.
- Structure remains user-controlled.

Show both AI and manual editing:

- AI Edit should be the main wow moment.
- Manual Edit should show concrete controls:
  - accent color swatches
  - section visibility toggles
  - drag/reorder affordance for sections

## Job Match Flow

Use a prepared role instead of making the user paste a job description.

Fake role:

- Title: `Staff Software Engineer, AI Platform`
- Company: `Northstar AI`
- Location: `Remote Europe`

Role focus:

- Build AI-powered product workflows.
- Own backend architecture for high-throughput systems.
- Design evaluation, observability, and reliability for AI features.
- Partner with product/design to ship fast.
- Lead engineering practices around AI-assisted development.

Suggested tags:

- AI Platform
- Node.js
- Product Systems
- Observability
- Evaluation
- Scale

User action:

- `Compare with this role`

Recommended match score:

- `84/100`

The score should be high but still useful. FABRA should identify meaningful gaps instead of pretending the match is perfect.

Suggested gaps:

- AI evaluation systems.
- More explicit platform ownership.
- Staff-level leadership scope.
- Product impact storytelling.

After match:

1. Show match score and reason codes.
2. Show matching keywords and missing signals.
3. Open a contextual chat.
4. Then show tracking/kanban.
5. Interview questions can appear inside or alongside tracking.

Suggested chat prompt:

`How should I position my Edpuzzle experience for this role?`

Suggested sequence:

- match
- chat
- tracking

## Job Tracking

Show that FABRA does not stop at analysis.

Tracking should create a Kanban-style card:

- `Northstar AI`
- `Staff Software Engineer, AI Platform`
- Status can move toward `Interview prep`.

The tracking scene can include:

- next action
- notes
- checklist
- generated interview questions
- link back to the job match analysis

## Career Workspace

The second large flow should not be another long onboarding sequence. It should feel like an interactive career cockpit.

Modules:

- Work Journal
- Goals
- Received Feedback
- Feedback Notes
- Interview Questions
- Career Memory

Example Work Journal item:

- `Shipped AI-assisted review workflow for engineering team.`

Example Goal:

- `Move toward Staff-level AI platform ownership.`

Example Received Feedback:

- `Strong product sense; make strategic impact more visible.`

Example Feedback Notes:

- `Peer review notes for upcoming performance cycle.`

Example Interview Question:

- `Tell me about scaling systems under real traffic.`

Example AI output:

- `Add this as CV evidence`
- `Use this for performance review`

Core idea:

FABRA turns day-to-day work, goals, feedback, and interviews into reusable career signal.

## Trust And Conversion

Avoid classic landing blocks early:

- No generic feature grid.
- No testimonial block in v1 unless it fits naturally.
- No pricing in v1.
- No FAQ in v1 unless needed later.

Trust should be embedded inside the product experience:

- metrics from Jonathan's profile
- transparent match reasons
- concrete keywords and gaps
- career memory connections

Final CTA:

- `Start crafting with Fabra`

Supporting final CTA copy:

- `Open the workspace and begin with your CV.`

## Motion Direction

Motion should be premium, visible, and product-first.

Important motion moments:

- Hero workspace comes into focus.
- CV lines are extracted and highlighted.
- Score animates from 0 to 78.
- Pulso preview changes accent color.
- Sections reorder visually.
- Projects section disappears.
- Keywords connect between CV and job role.
- Chat response types in.
- Kanban card moves to `Interview prep`.
- Career workspace modules activate by hover/click.

Avoid:

- excessive parallax
- decorative motion with no product meaning
- motion that blocks comprehension
- moving text too much
- generic AI sparkle effects

## Responsive Direction

Desktop:

- Full premium experience.
- Workspace, rail, panels, and rich microinteractions.

Tablet:

- Same narrative with stacked or simplified composition.

Mobile:

- Guided cards/steps.
- Fewer simultaneous panels.
- Same core actions:
  - Analyze sample CV
  - Choose Pulso
  - Apply AI edit
  - Compare with role
  - View career workspace

Mobile should be polished, but the primary “award moment” is desktop.

## Implementation Notes

Recommended initial file structure:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/landing/*`
- `src/lib/demo-data.ts`
- `src/lib/utils.ts`

The landing should be data-driven enough that copy, scores, sections, templates, and job details can be changed without rewriting component internals.

Do not depend directly on the product app repo at runtime. Copy/adapt only the design language and necessary concepts.

## Open Later

Items intentionally deferred:

- FABRA icon/logo symbol.
- Pricing.
- Final production CTA URL.
- Real signup flow.
- Testimonials/social proof.
- SEO expansion pages.
- Real app screenshots or media exports.
- Possible localization.
