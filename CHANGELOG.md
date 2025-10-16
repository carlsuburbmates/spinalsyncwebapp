# Changelog

## 2025-10-17

### Major Migration & Refactor
- Migrated all mapped lessons to `lib/modules-data.ts`:
  - Catheterization Techniques
  - Bladder Complications
  - Daily Bladder Management
  - Neurogenic Bowel Fundamentals
  - Autonomic Dysreflexia Emergency
  - Pressure Injury Risk
  - Respiratory Emergencies
  - Pneumonia Prevention
- Added missing lessons to `lib/modules-data.ts`:
  - Understanding Pain in SCI
  - Breathing Techniques & Exercises
- Refactored lesson page components to source content from `modulesData` and use `LessonContent` for rendering.
- Validated all lesson pages for correct rendering, assessment logic, and interactive features.
- Removed obsolete lesson content files from `app/` directory.
- Cleaned up redundant imports and updated documentation.
- No errors found in lesson pages, supporting components, or data files.
- All changes staged and committed.

---
This migration centralizes lesson data, improves maintainability, and ensures all curriculum gaps are closed for mapped and missing lessons.