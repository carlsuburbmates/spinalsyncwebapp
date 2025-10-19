# Service Worker & API Validation Notes

This reference explains how offline caching and server-side validation currently work so future changes remain consistent.

---

## Service Worker (`public/service-worker.js`)

### Purpose
Provide offline-first caching for critical emergency and guideline pages so clinicians can access key protocols without connectivity.

### Key Concepts
- **Cache versioning:** `CACHE_NAME` (e.g., `spinalsync-critical-v2`). Increment the suffix whenever caching logic or URL lists change to invalidate old entries.
- **Static URLs:** `STATIC_URLS` contains exact routes (e.g., `/emergency`, `/guidelines/bladder`) preloaded during the `install` phase.
- **Dynamic prefixes:** `CRITICAL_PREFIXES` (e.g., `/emergency/`, `/guidelines/`) determine whether a request should be cached at runtime.
- **Network fallback:** On a cache miss the worker fetches the request and stores a clone. If the network fails, the cached response (if any) is returned.
- **Non-GET requests:** Ignored to avoid caching mutations.

### Updating the Worker
1. Add new emergency/guideline routes to `STATIC_URLS` if they should be precached.
2. Extend `CRITICAL_PREFIXES` for new dynamic segments.
3. Bump `CACHE_NAME` to invalidate stale caches.
4. Rebuild and redeploy. Encourage users to refresh once to activate the new worker.

### Registration
- `components/service-worker-register.tsx` is a small client component rendered from `app/layout.tsx`. It registers the worker and logs errors in development.
- Server components must not call `useEffect`; keep the registration logic isolated in client components.

---

## API Route Validation

### Location
`app/api/*/route.ts` files handle Supabase CRUD operations for `badges`, `profiles`, `events`, `progress`, and `user_badges`.

### Patterns
- **Service-role client:** Created with `lib/supabase/server.ts`. Throws on missing credentials to surface configuration issues early.
- **Zod validation:** Each POST request uses a Zod schema (e.g., `badgeSchema`) and rejects invalid payloads with a `400` and `parsed.error.flatten()` details.
- **Column whitelisting:** Supabase `.select()` calls only return expected columns to avoid leaking internal fields.
- **Error handling:** Database errors return `500` with the Supabase message.
- **Client boundaries:** Client components should never instantiate Supabase directly with the service role key. They use `fetch("/api/...")`.

### Extending Schemas
1. Add new fields to the Zod schema and the JSON schema for the tool or payload.
2. Update the matching `select()` clause so responses include the new data.
3. Ensure RLS policies permit the required operations if using Supabase security.
4. Add or update tests under `__tests__/` to cover the new contract.

### Progress Endpoint Special Case
- `app/api/progress/route.ts` expects a `userId` query parameter for GET and uses `upsert` with composite keys (`user_id`, `sub_module_id`). Keep this in sync with Supabase table definitions in `.github/copilot-instructions.md`.

---

## Testing & Verification

- **Build-time type checks:** `pnpm build` will fail if API routes import client-only modules or if type guards break.
- **Runtime checks:** Use `__tests__/badges-api.test.ts` as a template when adding new endpoints. Tests assume the dev server is running locally.
- **Manual QA:** Verify client flows after schema changes (e.g., badges grid, quick access cards) and check the service worker caches new routes by inspecting Application → Cache Storage in the browser dev tools.

---

Refer to `README.md` for environment setup and `.github/copilot-instructions.md` for architectural conventions.
