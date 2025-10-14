# Copilot Instructions for spinalsyncwebapp

## Project Overview
This is a Next.js web application for spinal sync education and emergency protocols. The codebase is organized by feature modules under the `app/` directory, with reusable UI components in `components/` and shared logic in `lib/` and `hooks/`.

## Architecture & Patterns
- **Routing & Pages:** Uses Next.js App Router. Each feature (e.g., assessment, emergency, lesson, modules, progress, resources) is a subfolder in `app/`, with dynamic routes (e.g., `[id]/page.tsx`) for detail views.
- **Components:** UI components are in `components/`, with atomic design patterns (e.g., `ui/` for primitives, feature components for domain logic).
- **Data & Types:** Shared data and types are in `lib/` (e.g., `badges-data.ts`, `emergency-protocols.ts`, `modules-data.ts`, `types.ts`).
- **Styling:** Uses global styles in `styles/globals.css` and `app/globals.css`. Component-level styles are handled via CSS modules or inline styles.

## Developer Workflows
- **Install dependencies:** `pnpm install`
- **Run dev server:** `pnpm dev` (Next.js)
- **Build for production:** `pnpm build`
- **No test suite detected** (add tests in future if needed)
- **Debugging:** Use Next.js error overlays and browser devtools. No custom debug scripts.

## Conventions & Practices
- **TypeScript everywhere:** All logic and components use TypeScript for type safety.
- **Feature-first structure:** New features should be added as subfolders in `app/`.
- **Component reuse:** Prefer using or extending components in `components/ui/` for UI consistency.
- **Data location:** Shared static data and types go in `lib/`.
- **No backend/server code** in this repo; all logic is client-side.

## Integration Points
- **No external API calls** detected; all data is local/static.
- **No authentication/authorization** present.
- **No custom middleware** or serverless functions.

## Examples
- To add a new lesson: create `app/lesson/[id]/page.tsx` and use `components/lesson-content.tsx`.
- To add a new emergency protocol: update `lib/emergency-protocols.ts` and use `components/emergency-protocol-card.tsx`.
- To add a new badge: update `lib/badges-data.ts` and use `components/badge-card.tsx`.

## Key Files & Directories
- `app/` — Feature modules and routing
- `components/` — UI and feature components
- `lib/` — Shared data, types, and utilities
- `hooks/` — Custom React hooks
- `styles/` — Global styles

---
For questions or missing conventions, ask for clarification or propose updates here.
