import type { Badge } from "./types"

export const badges: Badge[] = [
  // Foundation Badges (Novice Level)
  {
    id: "bladder-basics-master",
    name: "Bladder Basics Master",
    description: "Complete all Bladder Management System modules with 80%+ assessment scores",
    category: "Foundation",
    criteria: "Complete modules 1-b, 1-c, 1-d with 80%+ scores",
    icon: "💧",
  },
  {
    id: "bowel-care-champion",
    name: "Bowel Care Champion",
    description: "Complete all Bowel Management System modules with 80%+ assessment scores",
    category: "Foundation",
    criteria: "Complete all Module 2 sub-modules with 80%+ scores",
    icon: "🎯",
  },
  {
    id: "skin-guardian",
    name: "Skin Guardian",
    description: "Complete all Skin Integrity modules with 80%+ assessment scores",
    category: "Foundation",
    criteria: "Complete all Module 6 sub-modules with 80%+ scores",
    icon: "🛡️",
  },
  {
    id: "first-responder",
    name: "First Responder",
    description: "Complete Emergency Recognition module",
    category: "Foundation",
    criteria: "Complete Module 9-a with passing score",
    icon: "🚨",
  },

  // Advanced Badges (Competent Level)
  {
    id: "respiratory-expert",
    name: "Respiratory Expert",
    description: "Complete all Respiratory Care modules with 85%+ scores",
    category: "Advanced",
    criteria: "Complete all Module 3 sub-modules with 85%+ scores",
    icon: "🫁",
  },
  {
    id: "cardiovascular-specialist",
    name: "Cardiovascular Specialist",
    description: "Complete Cardiovascular Management with 85%+ scores",
    category: "Advanced",
    criteria: "Complete all Module 4 sub-modules with 85%+ scores",
    icon: "❤️",
  },
  {
    id: "pain-management-pro",
    name: "Pain Management Pro",
    description: "Complete Pain Management modules with 85%+ scores",
    category: "Advanced",
    criteria: "Complete all Module 8 sub-modules with 85%+ scores",
    icon: "💊",
  },
  {
    id: "equipment-safety-specialist",
    name: "Equipment Safety Specialist",
    description: "Complete Equipment modules with 85%+ scores",
    category: "Advanced",
    criteria: "Complete all Module 10 sub-modules with 85%+ scores",
    icon: "🦽",
  },

  // Master Badges (Advanced Level)
  {
    id: "sci-care-master",
    name: "SCI Care Master",
    description: "Complete all Critical priority modules with 90%+ scores",
    category: "Master",
    criteria: "Complete all Critical modules with 90%+ scores",
    icon: "🏆",
  },
  {
    id: "comprehensive-care-expert",
    name: "Comprehensive Care Expert",
    description: "Complete all modules (Critical + Important) with 85%+ scores",
    category: "Master",
    criteria: "Complete all modules with 85%+ scores",
    icon: "⭐",
  },
  {
    id: "perfect-score-champion",
    name: "Perfect Score Champion",
    description: "Achieve 100% on any module assessment",
    category: "Master",
    criteria: "Score 100% on any sub-module assessment",
    icon: "💯",
  },
  {
    id: "consistent-learner",
    name: "Consistent Learner",
    description: "Complete modules 7 days in a row",
    category: "Master",
    criteria: "7-day learning streak",
    icon: "🔥",
  },

  // Special Recognition Badges
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Complete any module in under the estimated time with 90%+ score",
    category: "Special",
    criteria: "Complete module faster than duration estimate with 90%+ score",
    icon: "⚡",
  },
  {
    id: "helping-hand",
    name: "Helping Hand",
    description: "Share a module with a caregiver or family member",
    category: "Special",
    criteria: "Use share feature on any module",
    icon: "🤝",
  },
  {
    id: "safety-advocate",
    name: "Safety Advocate",
    description: "Complete all emergency and safety-related modules",
    category: "Special",
    criteria: "Complete Modules 4-b, 6-a, 9-a, 9-b",
    icon: "🦺",
  },
  {
    id: "wellness-warrior",
    name: "Wellness Warrior",
    description: "Complete all health maintenance modules",
    category: "Special",
    criteria: "Complete all modules in Body Systems category",
    icon: "💪",
  },
]

export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id)
}

export function getBadgesByCategory(category: Badge["category"]): Badge[] {
  return badges.filter((b) => b.category === category)
}
