export interface EmergencyProtocol {
  id: string
  title: string
  category: "Critical" | "Urgent" | "Important"
  injury_level: string
  quick_actions: string[]
  warning_signs: string[]
  when_to_call_911: string[]
  detailed_steps: {
    step: number
    action: string
    details: string
  }[]
}

export const emergencyProtocols: EmergencyProtocol[] = [
  {
    id: "autonomic-dysreflexia",
    title: "Autonomic Dysreflexia (AD)",
    category: "Critical",
    injury_level: "T6 and above",
    quick_actions: [
      "Sit person upright immediately (45-90 degrees)",
      "Loosen all tight clothing, belts, and straps",
      "Check blood pressure every 2-5 minutes",
      "Check catheter for kinks or blockage",
      "Empty bladder if distended",
      "Check for bowel impaction (use anesthetic gel)",
    ],
    warning_signs: [
      "Sudden severe pounding headache",
      "Significant rise in blood pressure (20-40 mmHg above baseline)",
      "Profuse sweating above injury level",
      "Flushing or blotchy skin above injury",
      "Pale, cool skin below injury",
      "Nasal congestion",
      "Bradycardia (slow heart rate)",
      "Anxiety or sense of doom",
    ],
    when_to_call_911: [
      "Blood pressure remains elevated after removing trigger",
      "Systolic BP above 150 mmHg despite interventions",
      "Symptoms persist or worsen",
      "Unable to identify or remove trigger",
      "Person has altered consciousness or seizure",
    ],
    detailed_steps: [
      {
        step: 1,
        action: "Sit upright immediately",
        details:
          "Elevate head and upper body to 45-90 degrees. This uses gravity to help lower blood pressure. Do NOT lay the person flat.",
      },
      {
        step: 2,
        action: "Loosen restrictive items",
        details:
          "Remove tight clothing, belts, leg straps, abdominal binders, or anything that could be restricting circulation or causing pressure.",
      },
      {
        step: 3,
        action: "Check blood pressure",
        details:
          "Monitor BP every 2-5 minutes. Record readings. Normal baseline for SCI may be lower than general population (90-110 mmHg systolic).",
      },
      {
        step: 4,
        action: "Check bladder",
        details:
          "Most common trigger. Check catheter for kinks, blockages, or overfull drainage bag. If no catheter, check for bladder distension. Drain bladder gently if needed.",
      },
      {
        step: 5,
        action: "Check bowel",
        details:
          "Second most common trigger. Check for fecal impaction. Use anesthetic gel before digital stimulation to avoid worsening AD. Remove stool gently if present.",
      },
      {
        step: 6,
        action: "Check skin",
        details:
          "Look for pressure areas, tight clothing, ingrown toenails, burns, or any skin irritation below the injury level.",
      },
      {
        step: 7,
        action: "Seek emergency help if needed",
        details:
          "If BP remains elevated or symptoms persist after removing obvious triggers, call emergency services immediately. Inform them of SCI and AD.",
      },
    ],
  },
  {
    id: "respiratory-distress",
    title: "Respiratory Distress",
    category: "Critical",
    injury_level: "C1-C8, T1-T6",
    quick_actions: [
      "Sit person upright if possible",
      "Ensure airway is clear",
      "Encourage coughing or assist with cough",
      "Provide supplemental oxygen if available",
      "Call emergency services immediately",
      "Monitor breathing rate and effort",
    ],
    warning_signs: [
      "Shortness of breath or difficulty breathing",
      "Rapid shallow breathing",
      "Use of accessory muscles (neck, shoulders)",
      "Cyanosis (bluish lips or fingernails)",
      "Weak or ineffective cough",
      "Confusion or altered consciousness",
      "Inability to speak in full sentences",
      "Chest pain or tightness",
    ],
    when_to_call_911: [
      "Severe difficulty breathing",
      "Cyanosis present",
      "Altered level of consciousness",
      "Oxygen saturation below 90%",
      "Suspected pneumonia or chest infection",
      "Any sudden change in respiratory status",
    ],
    detailed_steps: [
      {
        step: 1,
        action: "Position upright",
        details:
          "Sit person upright at 45-90 degrees to maximize lung expansion and diaphragm function. This is especially important for cervical injuries.",
      },
      {
        step: 2,
        action: "Clear airway",
        details:
          "Check mouth and throat for obstructions. Suction if equipment available and trained. Ensure head and neck are in neutral position.",
      },
      {
        step: 3,
        action: "Assist breathing",
        details:
          "Encourage deep breathing. Assist with cough techniques if trained (quad cough, abdominal thrust). Use incentive spirometer if available.",
      },
      {
        step: 4,
        action: "Provide oxygen",
        details:
          "If supplemental oxygen is available and you are trained, provide via nasal cannula or mask as appropriate. Monitor oxygen saturation.",
      },
      {
        step: 5,
        action: "Call emergency services",
        details:
          "Do not delay. Respiratory complications are a leading cause of mortality in SCI. Inform emergency services of injury level and respiratory status.",
      },
      {
        step: 6,
        action: "Monitor continuously",
        details:
          "Watch breathing rate, depth, and effort. Note any changes in consciousness, skin color, or ability to speak. Stay with person until help arrives.",
      },
    ],
  },
  {
    id: "pressure-injury-emergency",
    title: "Severe Pressure Injury",
    category: "Urgent",
    injury_level: "All",
    quick_actions: [
      "Immediately relieve all pressure from affected area",
      "Do NOT apply pressure or massage the area",
      "Cover with clean, dry dressing if open wound",
      "Document size, depth, and appearance",
      "Contact healthcare provider same day",
      "Review pressure relief schedule",
    ],
    warning_signs: [
      "Stage 3 or 4 pressure injury (deep tissue damage)",
      "Signs of infection (fever, increased pain, pus, odor)",
      "Rapidly worsening wound",
      "Exposed bone, tendon, or muscle",
      "Large area of damaged tissue",
      "Undermining or tunneling",
      "Black or necrotic tissue",
    ],
    when_to_call_911: [
      "Signs of sepsis (fever, confusion, rapid heart rate)",
      "Severe bleeding from wound",
      "Exposed bone or deep structures",
      "Person is systemically unwell",
    ],
    detailed_steps: [
      {
        step: 1,
        action: "Relieve pressure immediately",
        details:
          "Completely remove all pressure from the affected area. Reposition person to avoid any contact with the wound. Use pillows and cushions for support.",
      },
      {
        step: 2,
        action: "Assess the wound",
        details:
          "Document size (length, width, depth), stage, appearance, drainage, odor, and surrounding skin. Take photos if possible for healthcare provider.",
      },
      {
        step: 3,
        action: "Cover appropriately",
        details:
          "If open wound, cover with clean, dry dressing. Do NOT use cotton wool or fluffy materials. Do NOT apply creams without medical advice.",
      },
      {
        step: 4,
        action: "Check for infection",
        details:
          "Look for increased redness, warmth, swelling, pus, foul odor, or fever. These require urgent medical attention.",
      },
      {
        step: 5,
        action: "Contact healthcare provider",
        details:
          "Same-day contact for new or worsening pressure injuries. Provide documentation and photos. Follow advice for wound care and follow-up.",
      },
      {
        step: 6,
        action: "Review prevention",
        details:
          "Identify what caused the injury. Review and improve pressure relief schedule, equipment, nutrition, and skin inspection routine.",
      },
    ],
  },
]

export function getProtocolById(id: string): EmergencyProtocol | undefined {
  return emergencyProtocols.find((p) => p.id === id)
}

export function getProtocolsByCategory(category: EmergencyProtocol["category"]): EmergencyProtocol[] {
  return emergencyProtocols.filter((p) => p.category === category)
}

export function getCriticalProtocols(): EmergencyProtocol[] {
  return getProtocolsByCategory("Critical")
}
