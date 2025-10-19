# Copilot Instructions for spinalsyncwebapp

## Project Overview
This is a Next.js web application for spinal sync education and emergency protocols. The codebase is organized by feature modules under the `app/` directory, with reusable UI components in `components/` and shared logic in `lib/` and `hooks/`.

## Architecture & Patterns

## Developer Workflows

## Conventions & Practices


## Integration Points

### Supabase Data Models

- `Badge` (badges table): `{ id, name, description, category, criteria, icon }`
- `Profile` (profiles table): `{ user_id }`
- `Event` (events table): `{ event_id, user_id? }`
- `Progress` (progress table): `{ user_id, sub_module_id }`
- `UserBadge` (user_badges table): `{ user_id, badge_id }`

### API Endpoints

- `/api/badges` (GET, POST)
- `/api/profiles` (GET, POST)
- `/api/events` (GET, POST)
- `/api/progress` (GET, POST)
- `/api/user_badges` (GET, POST)

All endpoints use Supabase client/server utilities for DB access. See `lib/supabase/server.ts` and `lib/types.ts` for details.

## Examples

To fetch all badges from the API:

```ts
const res = await fetch('/api/badges')
const badges = await res.json()
```

## Key Files & Directories

See `/lib/types.ts` for data models, `/app/api/` for API routes, and `/components/BadgesGrid.tsx` for frontend integration example.


## Row Level Security (RLS) Policy Planning

If you require user-level data privacy, enable RLS on relevant Supabase tables (e.g., `profiles`, `progress`, `user_badges`).


**Recommended RLS policies for all user-related tables:**

```
-- Enable RLS for all relevant tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- PROFILES: Only allow users to access/modify their own profile
CREATE POLICY "Users can access their own profile" ON profiles
	FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can modify their own profile" ON profiles
	FOR UPDATE USING (auth.uid() = user_id);

-- PROGRESS: Only allow users to access/modify their own progress
CREATE POLICY "Users can access their own progress" ON progress
	FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can modify their own progress" ON progress
	FOR INSERT, UPDATE USING (auth.uid() = user_id);

-- USER_BADGES: Only allow users to access/modify their own badge records
CREATE POLICY "Users can access their own badges" ON user_badges
	FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can modify their own badges" ON user_badges
	FOR INSERT, UPDATE USING (auth.uid() = user_id);

-- EVENTS: Only allow users to access/modify their own events
CREATE POLICY "Users can access their own events" ON events
	FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can modify their own events" ON events
	FOR INSERT, UPDATE USING (auth.uid() = user_id);

-- BADGES: (Optional) If badges are public, no RLS needed. If not, restrict as needed.
-- Example: Only allow admins to insert/update badges
-- CREATE POLICY "Admins can modify badges" ON badges
--   FOR INSERT, UPDATE USING (auth.role() = 'service_role');
```

See Supabase docs for advanced RLS patterns and role-based access.
