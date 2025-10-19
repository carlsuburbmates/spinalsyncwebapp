export type Priority = "Critical" | "Important"
export type DifficultyLevel = "Novice" | "Competent" | "Advanced"
export type InjuryLevel = "All" | "Cervical" | "Thoracic" | "Lumbar" | "T6 and above" | "C1-C4" | "C5-C8" | "T1-T6"

export interface SubModule {
  id: string
  module_id: number
  title: string
  description: string
  content: ContentSection[]
  learning_objectives: string[]
  assessment_questions: AssessmentQuestion[]
  metadata: {
    injury_level: InjuryLevel
    duration: number // minutes
    priority: Priority
    difficulty_level: DifficultyLevel
  }
}

export interface ContentSection {
  type: "heading" | "paragraph" | "list" | "callout" | "steps"
  content: string | string[]
  level?: number // for headings
  variant?: "info" | "warning" | "danger" | "success" // for callouts
}

export interface Module {
  module_id: number
  title: string
  category: string
  summary: string
  priority: Priority
  sub_modules: SubModule[]
  order: number
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: string
  explanation: string
}

export interface Badge {
  id: string
  name: string
  description: string
  category: "Foundation" | "Advanced" | "Master" | "Special"
  criteria: string
  icon: string
}

// Supabase table: profiles
export interface Profile {
  user_id: string // PK, maps to Supabase auth user id
  // Add more fields if present in your DB (e.g., display_name, email, etc.)
}

// Supabase table: events
export interface Event {
  event_id: number // PK
  user_id?: string // FK to profiles.user_id, nullable
  // Add more fields if present (e.g., type, timestamp, details)
}

// Supabase table: user_badges
export interface UserBadge {
  user_id: string // PK, FK to profiles.user_id
  badge_id: string // PK, FK to badges.badge_id
  // Add more fields if present (e.g., awarded_at)
}

export interface UserProgress {
  user_id: string
  completed_modules: string[] // sub-module IDs
  assessment_scores: Record<string, number> // sub-module ID -> score percentage
  badges_earned: string[] // badge IDs
  current_level: 1 | 2 | 3 | 4 | 5
  streak_days: number
  last_activity: Date
}

export interface InteractiveElement {
  module_id: number
  type: string
  title: string
  config: string
}

export interface Assessment {
  module_id: number
  difficulty: string
  title: string
  type: string
}

export interface CrossReference {
  module_id: number
  related_module_id: number
  relation_type: string
}

export interface Resource {
  title: string
  type: string
  url: string
  module_id?: number
  category?: "Emergency" | "General" | "Clinical Guidelines"
}

export interface Progress {
  completed: number
  pending_quizzes: number
}
