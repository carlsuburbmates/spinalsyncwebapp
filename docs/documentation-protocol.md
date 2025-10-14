# SpinalSync Web App Technical Handbook

This document captures the current state of the SpinalSync education platform and defines the protocol for maintaining future documentation. Treat this as the canonical reference for developers, clinicians, and content editors working on the codebase.

---

## 1. Technology Overview

| Area | Details |
| --- | --- |
| Framework | Next.js 15 (App Router) with React 19 |
| Language & Tooling | TypeScript, Tailwind CSS v4, shadcn/ui, Radix primitives |
| Package Mgmt | npm (lockfile committed) |
| Analytics | `@vercel/analytics` wired in `app/layout.tsx` |
| Styling | `app/globals.css` with Tailwind design tokens, custom OKLCH palette |
| Data Source | Local TypeScript models under `lib/` (no external API yet) |

---

## 2. Application Structure

```
app/
  page.tsx                      → Dashboard
  modules/                      → Modules index & dynamic detail
  lesson/[id]/page.tsx          → Micro-lesson renderer
  assessment/[id]/page.tsx      → Quiz flow per sub-module
  emergency/                    → Emergency protocol list & detail
  progress/page.tsx             → Learner progress & badges
  resources/page.tsx            → Resource catalogue
  *.tsx                         → Long-form static content pages

components/
  ui/                           → shadcn primitives
  *.tsx                         → Higher-order UI widgets (quiz, progress, etc.)

lib/
  modules-data.ts               → Canonical curriculum & assessments
  emergency-protocols.ts        → Emergency response data
  badges-data.ts                → Badge catalogue
  data.ts                       → Auxiliary data (resources, mock progress)
  types.ts                      → Domain models & shared types
```

Key routing patterns:

- `app/modules/[id]/page.tsx` and `app/lesson/[id]/page.tsx` use async `params` contracts to pull data from `lib/modules-data.ts`.
- `app/assessment/[id]/page.tsx` renders a fully client-side quiz using `QuizQuestion` and `QuizResults`.
- Emergency protocols mirror the module structure with `lib/emergency-protocols.ts`.

---

## 3. Domain Data Model

- **Modules** (`lib/modules-data.ts`): Each module owns `sub_modules` (micro-lessons) with content sections, learning objectives, and assessment questions.
- **Assessments**: Attached to sub-modules. Display logic lives in `app/assessment/[id]/page.tsx`.
- **Badges** (`lib/badges-data.ts`): Referenced by the Progress page.
- **Resources** (`lib/data.ts`): Currently a simple array; extend here or migrate to CMS later.
- **Emergency Protocols** (`lib/emergency-protocols.ts`): Provide quick actions, warning signs, and detailed steps.

When adding new educational content:

1. Extend `modulesData` with a new `module` or `sub_module`.
2. If quiz questions are needed, append to `subModule.assessment_questions`.
3. Tie-in cross-module references or badges as required.

---

## 4. Component Inventory

### Production Components
- `ModuleQuiz`, `QuizQuestion`, `QuizResults`: Quiz interactions.
- `LessonContent`, `LessonHeader`: Render structured lesson content.
- `BadgeCard`, `ProgressStats`: Progress summarisation.
- `EmergencyProtocolCard`: Card view for emergency protocols.

### Template/Placeholder Components
The following remain scaffolds with unused state and placeholder comments. They are not imported anywhere, but ESLint warns about unused variables:

- `components/BreathingExerciseTracker.tsx`
- `components/CaseStudyViewer.tsx`
- `components/PainTracker.tsx`
- `components/PressureReliefReminder.tsx`
- `components/RespiratoryAssessment.tsx`
- `components/SkinInspectionChecklist.tsx`

Action: either complete these widgets or remove their exports from `components/index.ts` to silence warnings.

---

## 5. Build & Quality Checks

Latest command runs (2025-10-14):

```bash
npm run lint   # passes with warnings from placeholder components
npm run build  # succeeds; same warnings surfaced during type check
```

Primary warning sources:

- `app/assessment/[id]/page.tsx`: `useEffect` dependency on `handleNext`.
- Unused state in the template components listed above.
- `components/ui/use-toast.ts`: `actionTypes` only used for typing.

Treat these as follow-up tasks to reach a clean lint/build.

---

## 6. Documentation Workflow Protocol

To keep project knowledge consistent:

1. **Location & Format**
   - Store all docs under `docs/`. This file is the root reference.
   - Use Markdown with clear headings, dated change log entries, and describe both the “what” and “why”.
2. **When to Update**
   - Any new module, emergency protocol, or significant UI change.
   - After altering domain models (`lib/*.ts`) or workflows (assessments, badges).
   - When enabling/disabling tooling (lint rules, build steps).
3. **Process**
   - Run `npm run lint` and `npm run build` before documenting changes; record non-fatal warnings.
   - Update relevant sections here (architecture, domain data, workflows).
   - If adding extensive product or clinical content, create a dedicated file (e.g., `docs/module-authoring.md`) and cross-link it from this handbook.
   - Summarise responsibilities in a commit message (e.g., `docs: describe new respiratory module workflow`).
4. **Review**
   - Peer review documentation changes alongside code PRs.
   - Ensure new docs describe testing steps or validation guidelines.
5. **Change Log**
   - Append to the “Revision History” section (below) whenever this protocol changes.

---

## 7. Recommended Future Enhancements

- Finish or remove template components to resolve lint warnings.
- Wire learner progress to persistent storage (Supabase, Firebase, etc.) instead of hardcoded mock data.
- Introduce automated tests (e.g., vitest + React Testing Library) for quiz logic and routing.
- Expand `resources` dataset or integrate with CMS for easier content management.
- Flesh out README with a project overview and link to this handbook.

---

## 8. Revision History

| Date (ISO) | Author | Notes |
| --- | --- | --- |
| 2025-10-14 | Codex Agent | Initial comprehensive handbook and documentation protocol |

---

_Keep this document up to date. It is the single source of truth for understanding and maintaining SpinalSync._

