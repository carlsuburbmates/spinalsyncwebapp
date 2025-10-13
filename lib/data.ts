import type { Module, InteractiveElement, Assessment, CrossReference, Resource, Progress } from "./types"

export const modules: Module[] = [
  {
    module_id: 1,
    title: "Introduction to SCI",
    category: "Foundation",
    summary: "Overview of SCI, ASIA, functional potential",
    objectives: ["Understand SCI basics"],
    order: 1,
  },
  {
    module_id: 2,
    title: "Role of the Primary Nurse",
    category: "Foundation",
    summary: "Scope and processes",
    objectives: ["Define PN role"],
    order: 2,
  },
  {
    module_id: 3,
    title: "Bowel Management",
    category: "Body Systems",
    summary: "Reflex vs flaccid, routines, safety",
    objectives: ["Differentiate bowel types", "Establish routine"],
    order: 3,
  },
  {
    module_id: 4,
    title: "Bladder Management",
    category: "Body Systems",
    summary: "Catheters, trials, scripts",
    objectives: ["Bladder options"],
    order: 4,
  },
  {
    module_id: 5,
    title: "Skin Care",
    category: "Core",
    summary: "Prevention and treatment",
    objectives: ["Skin checks"],
    order: 5,
  },
  {
    module_id: 6,
    title: "Mobility & Positioning",
    category: "Core",
    summary: "Spinal precautions",
    objectives: ["Safe positioning"],
    order: 6,
  },
  {
    module_id: 7,
    title: "SCI Complications",
    category: "Complications",
    summary: "AD, HO, etc.",
    objectives: ["Recognize complications"],
    order: 7,
  },
  {
    module_id: 8,
    title: "Respiratory Management",
    category: "Body Systems",
    summary: "Airway, assist cough",
    objectives: ["Resp care"],
    order: 8,
  },
  {
    module_id: 9,
    title: "Sexual Health",
    category: "Core",
    summary: "Counselling and referrals",
    objectives: ["Discuss sexual health"],
    order: 9,
  },
  {
    module_id: 10,
    title: "Pain Management",
    category: "Core",
    summary: "Pain types and strategies",
    objectives: ["Manage pain"],
    order: 10,
  },
  {
    module_id: 11,
    title: "Nutrition",
    category: "Core",
    summary: "Diet in SCI care",
    objectives: ["Nutrition in SCI"],
    order: 11,
  },
]

export const interactiveElements: InteractiveElement[] = [
  {
    module_id: 3,
    type: "Protocol",
    title: "Autonomic Dysreflexia",
    config: "link://emergency_protocols/AD",
  },
]

export const assessments: Assessment[] = [
  {
    module_id: 3,
    difficulty: "Basic",
    title: "Bowel basics quiz",
    type: "MCQ",
  },
]

export const crossReferences: CrossReference[] = [
  {
    module_id: 3,
    related_module_id: 5,
    relation_type: "Skin safety",
  },
]

export const resources: Resource[] = [
  {
    title: "Primary Nursing e-Booklet",
    type: "InternalPDF",
    url: "#",
  },
]

export const progress: Progress = {
  completed: 0,
  pending_quizzes: 1,
}

// Helper functions
export function getModuleById(id: number): Module | undefined {
  return modules.find((m) => m.module_id === id)
}

export function getInteractiveElementsByModuleId(moduleId: number): InteractiveElement[] {
  return interactiveElements.filter((e) => e.module_id === moduleId)
}

export function getAssessmentsByModuleId(moduleId: number): Assessment[] {
  return assessments.filter((a) => a.module_id === moduleId)
}

export function getCrossReferencesByModuleId(moduleId: number): CrossReference[] {
  return crossReferences.filter((c) => c.module_id === moduleId)
}

export function getResourcesByModuleId(moduleId: number): Resource[] {
  return resources.filter((r) => r.module_id === moduleId)
}
