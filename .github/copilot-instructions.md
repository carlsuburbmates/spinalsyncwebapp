# Copilot Instructions for spinalsyncwebapp

## Project Overview
- Next.js 15 App Router project delivering spinal cord injury education, bedside guidelines, and emergency workflows.
- Feature routes live under `app/`, shared UI in `components/`, and shared logic/types in `lib/`.
- Supabase provides persistence for badges, profiles, events, progress, and user badge awards.
- Tailwind-based styling (via shadcn/ui primitives) keeps UI consistent across feature modules.

## Architecture & Patterns
- `app/layout.tsx` defines the global shell: fonts, sticky header, `AppNav`, `<Suspense>` fallback, and registers `public/service-worker.js` to cache critical pages.
- Treat files in `app/` as React Server Components by default; add `'use client'` only when hooks/state are needed (e.g., `components/BadgesGrid.tsx`).
- Data flows: UI components request JSON from Next.js API routes, which call Supabase through `lib/supabase/server.ts`. Avoid direct Supabase access from client components.
- Structured data such as guidelines, modules, and assessments live in `lib/` (`lib/guidelines-data.ts`, `lib/modules-data.ts`) so they can be reused by server and client modules.
- Layout composition: feature pages wrap content in shared layouts (`components/ModuleLayout.tsx`) and supporting widgets (`InteractiveSidebar`, `QuickRefCard`) to keep navigation consistent.
- Offline support: `public/service-worker.js` caches high-priority emergency/guideline URLs; update the `CRITICAL_URLS` list whenever new critical routes are added.

## Developer Workflows
- Requirements: Node 20.x (matching Next.js 15), npm 10+, and a Supabase project. Install dependencies with `npm install`.
- Copy `.env.local` (or create one) with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and **server-only** `SUPABASE_SERVICE_ROLE_KEY`. Never expose the service role key to the browser.
- Local dev: `npm run dev` starts Next.js at `http://localhost:3000`. Run `npm run lint` before submitting PRs and `npm run build` to confirm production readiness.
- API + DB bootstrap: run the app locally, then seed starter badge data with `node scripts/seed-supabase.js`. The script posts to local API routes, so the dev server must be running.
- Testing: `npm run test` executes Vitest unit/integration tests such as `__tests__/badges-api.test.ts` (requires the dev server). `npm run test:e2e` runs Playwright if you add browser tests.
- Analytics: `@vercel/analytics/next` is wired in the root layout; no extra setup required, but disable it in tests if it interferes.

## Conventions & Practices
- TypeScript everywhere. Import shared types from `lib/types.ts` to align Supabase responses with UI expectations.
- PascalCase component filenames, kebab-case route segments, and colocated data/helpers in the same directory when scoped to a feature.
- Prefer server components (or API routes) for Supabase reads/writes to keep the service role key on the server. Client components should call `/api/*` endpoints with `fetch`.
- Use Tailwind utility classes and shadcn/ui primitives for styling. Keep responsive breakpoints aligned with existing patterns (`container`, `grid`, `md:` utilities).
- API handlers return `NextResponse.json(...)` with explicit status codes and structured `{ error }` bodies on failure (see `app/api/badges/route.ts`).
- Tests follow Vitest’s `describe/it/expect` style. When adding new API endpoints, add a corresponding spec under `__tests__/` that hits `http://localhost:3000/api/...`.
- Keep service worker URLs in sync with new emergency/guideline routes and bump `CACHE_NAME` when caching rules change.

## Integration Points

### Supabase Data Models
- Refer to `lib/types.ts` for canonical shapes: `Badge`, `Profile`, `Event`, `UserBadge`, `Progress`, and education module types (`Module`, `SubModule`, `AssessmentQuestion`).
- `createSupabaseServerClient()` (alias `createClient`) in `lib/supabase/server.ts` requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Handle missing env vars by throwing early.
- `Event.user_id` is optional; check for null responses when consuming analytics or audit logs.

### API Endpoints
- `/api/badges` (`app/api/badges/route.ts`): GET returns all badges, POST inserts via Supabase `insert(...).select()`.
- `/api/profiles`, `/api/events`, `/api/progress`, `/api/user_badges`: follow the same pattern—construct a Supabase client per request, validate payloads, return JSON plus status.
- Always import the shared Supabase client helper (`import { createClient } from '@/lib/supabase/server'`) and never ship the service role key to the client bundle.

### Frontend Modules
- Home dashboard (`app/page.tsx`) shows the layout pattern: sticky sidebar (`InteractiveSidebar`), quick-access cards, and floating emergency CTA.
- Guidelines pages (`app/guidelines/[id]/page.tsx`) consume structured data from `lib/guidelines-data.ts`; extend the data file when adding new guidelines.
- Badge listing (`app/badges/page.tsx`) renders `components/BadgesGrid.tsx`, which fetches `/api/badges` on mount and handles loading/error states consistently.

## Examples

Fetch badges from the API (client-side):
```ts
const res = await fetch('/api/badges')
if (!res.ok) throw new Error('Failed to load badges')
const badges = await res.json()
```

Insert a badge inside an API route:
```ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const POST = async (req: Request) => {
  const supabase = createClient()
  const payload = await req.json()
  const { data, error } = await supabase.from('badges').insert([payload]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
```

Render a client component with Supabase-backed data:
```tsx
'use client'
import { useEffect, useState } from 'react'
import type { Badge } from '@/lib/types'
import { BadgeCard } from '@/components/badge-card'

export function UserBadges() {
  const [badges, setBadges] = useState<Badge[]>([])
  useEffect(() => {
    async function load() {
      const res = await fetch('/api/user_badges')
      if (!res.ok) return
      setBadges(await res.json())
    }
    load()
  }, [])
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} isEarned />
      ))}
    </div>
  )
}
```

## Key Files & Directories
- `app/layout.tsx`: Global HTML shell, analytics, service worker registration.
- `app/page.tsx`: Dashboard layout and navigation pattern for new feature pages.
- `app/api/*/route.ts`: REST-style handlers that wrap Supabase queries.
- `components/BadgesGrid.tsx`, `components/InteractiveSidebar.tsx`: Client-side patterns for data fetching and navigation.
- `lib/supabase/server.ts`: Server-side Supabase factory (service role key usage).
- `scripts/seed-supabase.js`: Local seeding utility that exercises API routes.
- `.env.local`: Source of Supabase credentials; keep service role key out of the client.

## Row Level Security (RLS) Policy Planning
- Enable RLS on `profiles`, `progress`, `user_badges`, and `events` to restrict access by `auth.uid()`. Bypass only in trusted server contexts (service role).
- Example baseline policies:
```
alter table profiles enable row level security;
alter table user_badges enable row level security;
alter table progress enable row level security;
alter table events enable row level security;

create policy "profile owner can read" on profiles
  for select using (auth.uid() = user_id);
create policy "profile owner can update" on profiles
  for update using (auth.uid() = user_id);

create policy "progress owner full access" on progress
  for select using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user badges owner full access" on user_badges
  for select using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "event owner full access" on events
  for select using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```
- Badges are public. If you need write protection, restrict inserts/updates to service-role or admin roles. Remember the service role key bypasses RLS—only call those endpoints from the Next.js server runtime.
