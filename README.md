# SpinalSync Web App

Modern spinal cord injury (SCI) education hub built with Next.js App Router. The app delivers bedside guidelines, emergency workflows, learning modules, and progress tracking backed by Supabase.

---

## Requirements

- **Node.js 20.x** (aligns with Next.js 15 support matrix)
- **pnpm 10.x** (Vercel builds run with pnpm; install via `corepack enable`)
- **Supabase project** for persistence (badges, profiles, events, progress, user badges)

Optional tooling:
- **Stripe / Neon** mocks via `scripts/agent-link.ts` (uses `ts-node`)
- **Playwright** and **Vitest** for testing

---

## Quick Start

```bash
pnpm install
cp .env.example .env.local   # create locally if missing
pnpm dev                     # http://localhost:3000
```

To generate a production build locally:

```bash
pnpm build
pnpm start
```

> ℹ️ The repository also exposes npm scripts; however, pnpm is the canonical package manager for lockfile parity with Vercel.

---

## Environment Configuration

Create `.env.local` with the following values:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # server-only
```

- The `service_role` key **must never** leak to client components. Server code (API routes, server components) uses `lib/supabase/server.ts` to create clients securely.
- Additional env vars (analytics, feature flags) can be added to `.env.local` and configured in the Vercel dashboard.

---

## Supabase & Data Seeding

- Supabase schemas align with interfaces in `lib/types.ts`.
- Row Level Security should be enabled for user-specific tables (`profiles`, `progress`, `user_badges`, `events`) using the policies documented in `.github/copilot-instructions.md`.
- Seed badge data against a running dev server:

  ```bash
  pnpm dev          # start Next.js locally
  node scripts/seed-supabase.js
  ```

  The script posts against local API routes and fails fast if responses are non-200.

---

## Project Structure

| Path | Description |
| ---- | ----------- |
| `app/` | Next.js routes (App Router). Server components by default; mark client components with `'use client'`. |
| `components/` | Reusable UI pieces (`InteractiveSidebar`, `BadgesGrid`, shadcn primitives). |
| `lib/` | Shared data (`modules-data`, `guidelines-data`), Supabase helpers, TypeScript types. |
| `public/` | Static assets and the offline service worker (`service-worker.js`). |
| `scripts/` | Utility scripts (seeding, agent integration). |
| `types/` | Supplemental type declarations (e.g., temporary shim for `@openai/agents`). |

See `.github/copilot-instructions.md` for deeper architectural notes.

---

## Common Commands

| Command | Purpose |
| ------- | ------- |
| `pnpm dev` | Start the dev server (port 3000). |
| `pnpm lint` | Run Next.js/ESLint checks. |
| `pnpm test` | Execute Vitest unit/integration suites (`__tests__/`). Requires dev server for API specs. |
| `pnpm test:e2e` | Run Playwright end-to-end tests (headless). |
| `pnpm build` | Production bundle + type checks. |
| `pnpm agent:link` | Execute the commerce agent workflow (see below). |

---

## Commerce Agent Script

`scripts/agent-link.ts` contains a prototype “Commerce Agent” that chains mocked Stripe and Neon actions.

- Uses Zod schemas with `additionalProperties: false` to validate tool inputs.
- Run via `pnpm agent:link` (requires `ts-node` and the stub types in `types/openai-agents.d.ts`).
- Adjust schemas/tool behavior in the script before connecting to real services.

---

## Offline & Service Worker Notes

- `components/service-worker-register.tsx` registers `public/service-worker.js` from client components.
- The worker caches critical emergency/guideline routes with prefix-based matching. Bump `CACHE_NAME` when modifying cached URLs to invalidate old caches.
- Keep `CRITICAL_PREFIXES` updated as new bedside pages are added.

---

## API & Data Contracts

- API routes (`app/api/*/route.ts`) interact with Supabase using the service-role key. Every POST validates payloads with Zod and returns selective columns to avoid leaking internal fields.
- When extending tables (e.g., adding profile metadata), update the Zod schema and select list in the corresponding route.
- Client components should call the API routes instead of directly instantiating Supabase clients to keep secrets server-side.

---

## Testing & QA Checklist

- **Unit/Integration:** `pnpm test` (Vitest). See `__tests__/badges-api.test.ts` for API contract examples.
- **Linting:** `pnpm lint` (runs automatically in CI).
- **Type safety:** `pnpm build` invokes TypeScript checks; treat failures as blocking.
- **Manual QA:** Verify quick-access cards, offline cache readiness, API badge operations, and guideline page navigation before releases.

---

## Deployment Notes

- Vercel uses frozen pnpm lockfiles. Regenerate with `pnpm install` after modifying dependencies to avoid build failures.
- Supply production Supabase keys via Vercel environment variables.
- If adding agent tooling or other Node scripts, ensure optional dependencies are excluded from client bundles (keep scripts in `scripts/`).

---

## Contributing

- Track major changes in `CHANGELOG.md`.
- New lessons or guidelines belong in `lib/modules-data.ts` / `lib/guidelines-data.ts` with matching components under `app/`.
- Run lint, tests, and `pnpm build` before opening PRs.

For internal coordination and additional context, refer to `.github/copilot-instructions.md`. Contributors can extend docs in `docs/` for specialized workflows or design notes.
