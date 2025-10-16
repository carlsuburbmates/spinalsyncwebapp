# SpinalSync Web App

## Overview
This Next.js web application provides spinal cord injury education, emergency protocols, and progress tracking. All lesson content is now centralized in `lib/modules-data.ts` for maintainability and scalability.

## Key Features
- Modular curriculum with mapped and missing lessons fully integrated
- Emergency protocols and assessment logic
- Interactive components for learning and tracking
- Supabase integration for analytics and progress

## Migration Summary (2025-10-17)
- All mapped lessons migrated to `modulesData`
- Missing lessons added
- Lesson pages refactored to use centralized data
- Obsolete files removed
- Codebase validated and cleaned

## File Structure
- `app/` — Feature modules and routing
- `components/` — UI and feature components
- `lib/` — Shared data, types, and utilities
- `styles/` — Global styles

## How to Run
1. Install dependencies: `pnpm install`
2. Start dev server: `pnpm dev`
3. Build for production: `pnpm build`

## Contribution
See `CHANGELOG.md` for migration details. For new lessons, add to `lib/modules-data.ts` and follow the modular structure.
