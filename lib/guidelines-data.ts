// Example guideline data for clinical guideline module page template
export interface Guideline {
  id: string;
  title: string;
  summary: string;
  checklist: string[];
}

const guidelines: Guideline[] = [
  {
    id: "bladder",
    title: "Bladder Management",
    summary: "Best practices and protocols for bladder care in spinal cord injury.",
    checklist: [
      "Assess bladder function and continence status.",
      "Monitor fluid intake and output.",
      "Perform intermittent catheterization as per protocol.",
      "Monitor for signs of urinary tract infection.",
      "Educate patient and family on bladder care routines."
    ]
  },
  {
    id: "bowel",
    title: "Bowel Management",
    summary: "Protocols and checklists for bowel care in SCI patients.",
    checklist: [
      "Assess bowel function and patterns.",
      "Implement bowel program as per guideline.",
      "Monitor for constipation or impaction.",
      "Educate on diet, fluids, and bowel routines."
    ]
  },
  // Add more guidelines as needed
];

export default guidelines;
