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

### Interactive Components
- `components/BreathingExerciseTracker.tsx`, `CaseStudyViewer.tsx`, `PainTracker.tsx`, `PressureReliefReminder.tsx`, `RespiratoryAssessment.tsx`, and `SkinInspectionChecklist.tsx` now provide complete UI/logic (timers, logging, scoring). They no longer raise lint warnings.

---

## 5. Build & Quality Checks

Latest command runs (2025-10-14):

```bash
npm run lint   # clean
npm run test   # vitest quiz flow coverage
npm run build  # succeeds with lint + type checks
```

In CI, run the trio above to catch regressions.

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

### Supabase Integration

- Environment keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (see `.env.local`).
- Table definition for `progress`:
  ```sql
  create table if not exists progress (
    user_id uuid not null,
    sub_module_id text not null,
    score integer,
    completed_at timestamptz default now(),
    inserted_at timestamptz default now(),
    updated_at timestamptz default now(),
    primary key (user_id, sub_module_id)
  );

  create index if not exists progress_user_idx on progress (user_id);

  alter table progress enable row level security;
  create policy "Users can read their own progress"
    on progress for select using (auth.uid() = user_id);
  create policy "Users can upsert their own progress"
    on progress for insert with check (auth.uid() = user_id);
  create policy "Users can update their own progress"
    on progress for update using (auth.uid() = user_id);
  ```
- Server helper: `lib/supabase/server.ts` (service-role client). Browser helper: `lib/supabase/client.ts`.
- API bridge: `app/api/progress/route.ts` handles GET/POST for client components.
- UI:
  - `app/assessment/[id]/page.tsx` upserts progress after quizzes.
  - `app/progress/page.tsx` reads Supabase progress and merges it with curriculum metadata.
- Replace the “sign-in to track progress” placeholder once the authentication flow is connected.

### Testing

- Vitest config: `vitest.config.ts`, `vitest.setup.ts`. React is injected via `jsxInject`.
- Test suites live in `__tests__/`. Current coverage ensures quiz-answer handling works as expected (`quiz-question.test.tsx`).
- Use `npm run test` locally and in CI.

---

## 7. Recommended Future Enhancements

- Finish or remove template components to resolve lint warnings.
- Expand Supabase progress tracking (add badge/streak logic driven from DB).
- Introduce broader automated tests (e.g., progress API, emergency logging) as features grow.
- Expand `resources` dataset or integrate with CMS for easier content management.
- Flesh out README with a project overview and link to this handbook.

---

## 8. Revision History

| Date (ISO) | Author | Notes |
| --- | --- | --- |
| 2025-10-14 | Codex Agent | Initial comprehensive handbook and documentation protocol |
| 2025-10-15 | Codex Agent | Supabase integration, interactive component completion, lint/test/build workflow updates |

---

_Keep this document up to date. It is the single source of truth for understanding and maintaining SpinalSync._
