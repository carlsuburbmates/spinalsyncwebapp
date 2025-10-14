import type { Module, SubModule } from "./types"

export const modulesData: Module[] = [
  {
    module_id: 1,
    title: "Bladder Management System",
    category: "Body Systems",
    summary:
      "Comprehensive bladder management including catheterization techniques, complications recognition, and daily management strategies",
    priority: "Critical",
    order: 1,
    sub_modules: [
      {
        id: "1-a",
        module_id: 1,
        title: "Understanding Neurogenic Bladder",
        description:
          "Foundational knowledge on neurogenic bladder dysfunction after spinal cord injury, including injury-level effects, management priorities, and warning signs",
        metadata: {
          injury_level: "All",
          duration: 5,
          priority: "Critical",
          difficulty_level: "Novice",
        },
        content: [
          {
            type: "paragraph",
            content:
              "Following a spinal cord injury (SCI), communication between the brain, spinal cord, and bladder can be disrupted. This disruption leads to neurogenic bladder, where bladder filling or emptying no longer follows normal patterns.",
          },
          {
            type: "heading",
            content: "How Spinal Cord Injury Affects Bladder Function",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "In people without SCI, the bladder stores urine until messages travel to the brain signalling the need to void. After SCI, that loop is interrupted. The specific impact depends on injury level, completeness, overall health, and time since injury.",
          },
          {
            type: "list",
            content: [
              "Injury level: Cervical, thoracic, lumbar, or sacral involvement changes bladder control differently",
              "Injury completeness: Complete versus incomplete injuries influence sensation and motor control",
              "Individual factors: Age, co-morbidities, and recovery trajectory alter bladder presentation",
            ],
          },
          {
            type: "heading",
            content: "Types of Neurogenic Bladder",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Spastic (Hyperreflexic) bladder (injuries above the sacral level): Involuntary bladder contractions, reduced bladder capacity, sudden urgency, and higher bladder pressures",
              "Flaccid (Areflexic) bladder (sacral injuries): Bladder fails to contract, incomplete emptying, reduced bladder sensation, and risk of overdistension",
            ],
          },
          {
            type: "heading",
            content: "Why Effective Bladder Management Matters",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Protect kidney function by avoiding high bladder pressures",
              "Reduce urinary tract infection risk",
              "Maintain skin integrity around catheter sites",
              "Preserve independence and daily quality of life",
              "Prevent autonomic dysreflexia in injuries at or above T6",
            ],
          },
          {
            type: "heading",
            content: "Key Principles of Neurogenic Bladder Care",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Ensure regular, complete bladder emptying",
              "Maintain low bladder pressures through appropriate techniques",
              "Monitor closely for urinary tract infections",
              "Track kidney function with routine reviews",
              "Select the management method that best suits the individual’s abilities and risks",
            ],
          },
          {
            type: "heading",
            content: "When to Seek Medical Advice",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Signs of UTI: Fever, cloudy or strong-smelling urine, increased spasticity",
              "Difficulty performing usual bladder emptying routine",
              "Presence of blood in the urine",
              "New leakage or urinary retention",
              "Symptoms of autonomic dysreflexia during bladder care (severe headache, flushing, sweating)",
            ],
          },
        ],
        learning_objectives: [
          "Explain how spinal cord injury alters normal bladder communication pathways",
          "Differentiate between spastic and flaccid neurogenic bladder presentations",
          "Describe why bladder management is critical for renal health, infection prevention, and quality of life",
          "Identify red flags that require urgent clinical review",
        ],
        assessment_questions: [
          {
            id: "1-a-q1",
            question: "What is neurogenic bladder?",
            options: [
              "A bladder infection common after spinal cord injury",
              "Bladder dysfunction caused by disrupted nerve communication after spinal cord injury",
              "A type of bladder surgery required after spinal cord injury",
              "Normal bladder function associated with ageing",
            ],
            correct_answer: "Bladder dysfunction caused by disrupted nerve communication after spinal cord injury",
            explanation:
              "Neurogenic bladder occurs when nervous system damage from SCI disrupts the messages that control bladder filling and emptying.",
          },
          {
            id: "1-a-q2",
            question:
              "Which neurogenic bladder type is characterised by involuntary bladder contractions and difficulty storing urine?",
            options: ["Flaccid bladder", "Areflexic bladder", "Spastic bladder", "Normal bladder"],
            correct_answer: "Spastic bladder",
            explanation:
              "Spastic (hyperreflexic) bladder typically follows injuries above the sacral level, causing involuntary contractions and reduced storage capacity.",
          },
          {
            id: "1-a-q3",
            question: "Why is proactive neurogenic bladder management important?",
            options: [
              "To reduce appointment frequency",
              "To prevent kidney damage and urinary tract infections",
              "To eliminate catheter use entirely",
              "To restore normal bladder sensation",
            ],
            correct_answer: "To prevent kidney damage and urinary tract infections",
            explanation:
              "Maintaining low bladder pressures and complete emptying protects kidneys and reduces infection risk, preserving long-term health.",
          },
        ],
      },
      {
        id: "1-b",
        module_id: 1,
        title: "Catheterization Techniques",
        description:
          "Essential knowledge and practical guidance on catheterization techniques for individuals with spinal cord injury, focusing on safe and effective bladder management",
        metadata: {
          injury_level: "All",
          duration: 6,
          priority: "Critical",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "heading",
            content: "Introduction to Catheterization in Spinal Cord Injury",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "Catheterization is a vital part of bladder management for many people with spinal cord injury (SCI). Due to disrupted nerve control, many individuals experience difficulty emptying their bladder naturally, which can lead to complications such as urinary tract infections (UTIs), kidney damage, and incontinence.",
          },
          {
            type: "callout",
            content:
              "In Australia, clinical guidelines from NSW Health Agency for Clinical Innovation (ACI), Queensland Spinal Cord Injury Service (SCIS), and Spinal Cord Injury Australia guide best practices in catheter use.",
            variant: "info",
          },
          {
            type: "heading",
            content: "Types of Catheterization Techniques",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Intermittent Catheterization (IC) - Also called clean intermittent catheterization (CIC). Recommended as the preferred method for most people with SCI who cannot empty their bladder effectively.",
              "Indwelling Catheterization - A catheter is inserted and left in place for continuous drainage. Generally used when intermittent catheterization is not possible.",
              "Other Techniques - Reflex voiding or triggered reflex voiding may be used in some injuries but are less common.",
            ],
          },
          {
            type: "heading",
            content: "Clean Intermittent Catheterization (CIC): Step-by-Step Guide",
            level: 2,
          },
          {
            type: "steps",
            content: [
              "Preparation: Wash hands thoroughly with soap and water for at least 20 seconds. Gather all necessary supplies.",
              "Positioning: Find a comfortable and safe position for catheterization. Ensure privacy and good lighting.",
              "Catheter Insertion: Clean the genital area carefully. Apply lubricant generously to the catheter tip. Gently insert until urine begins to flow.",
              "Aftercare: Dispose of single-use catheters appropriately or clean reusable catheters as per guidelines. Wash hands again.",
            ],
          },
          {
            type: "heading",
            content: "Key Considerations and Best Practices",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Frequency: Typically catheterize every 4-6 hours or as per individual bladder capacity",
              "Hydration: Maintain adequate fluid intake to promote regular urine flow",
              "Catheter Type: Use the smallest appropriate catheter size to minimize urethral trauma",
              "Lubrication: Always use sterile water-based lubricant",
              "Hygiene: Clean technique is acceptable for intermittent catheterization",
              "Recognizing Complications: Be alert for signs of UTI such as fever, cloudy urine, increased spasticity",
            ],
          },
        ],
        learning_objectives: [
          "Describe the different types of catheterization techniques used in spinal cord injury bladder management",
          "Demonstrate the steps involved in clean intermittent catheterization according to Australian best practice guidelines",
          "Identify key considerations to prevent complications such as urinary tract infections and urethral trauma",
          "Recognize when to seek healthcare advice regarding catheter-related problems",
        ],
        assessment_questions: [
          {
            id: "1-b-q1",
            question:
              "What is the preferred catheterization method for most individuals with spinal cord injury who cannot empty their bladder naturally?",
            options: [
              "Indwelling urethral catheter",
              "Clean intermittent catheterization (CIC)",
              "Reflex voiding without catheterization",
              "Condom catheter",
            ],
            correct_answer: "Clean intermittent catheterization (CIC)",
            explanation:
              "CIC is preferred because it allows for regular bladder emptying with a lower risk of infection and complications compared to indwelling catheters.",
          },
          {
            id: "1-b-q2",
            question:
              "Which of the following is a key step in preventing urinary tract infections during intermittent catheterization?",
            options: [
              "Using oil-based lubricant to ease catheter insertion",
              "Sterile catheterization technique for all patients at home",
              "Washing hands thoroughly before and after catheterization",
              "Catheterizing only once per day to reduce contamination",
            ],
            correct_answer: "Washing hands thoroughly before and after catheterization",
            explanation:
              "Hand hygiene is critical to reduce bacterial contamination and prevent infection. Clean (not sterile) technique is acceptable at home.",
          },
          {
            id: "1-b-q3",
            question:
              "Which of the following signs should prompt a person with SCI to seek medical attention regarding their bladder management?",
            options: [
              "Clear, light-coloured urine during catheterization",
              "Urine volume consistent with usual bladder capacity",
              "Fever, increased spasticity, or cloudy foul-smelling urine",
              "Difficulty inserting catheter occasionally due to dryness",
            ],
            correct_answer: "Fever, increased spasticity, or cloudy foul-smelling urine",
            explanation:
              "These symptoms may indicate a urinary tract infection or other complications and require prompt medical review.",
          },
        ],
      },
      {
        id: "1-c",
        module_id: 1,
        title: "Bladder Complications Recognition",
        description:
          "In-depth understanding of common and serious bladder-related complications following spinal cord injury, focusing on timely recognition, prevention, and management strategies",
        metadata: {
          injury_level: "All",
          duration: 6,
          priority: "Critical",
          difficulty_level: "Advanced",
        },
        content: [
          {
            type: "heading",
            content: "Introduction",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "Bladder management is a cornerstone of care for people living with spinal cord injury (SCI). While effective bladder management improves quality of life, the risk of complications remains significant and can lead to urgent medical issues, hospitalisation, and long-term health consequences.",
          },
          {
            type: "heading",
            content: "Common Bladder Complications After SCI",
            level: 2,
          },
          {
            type: "heading",
            content: "Urinary Tract Infection (UTI)",
            level: 3,
          },
          {
            type: "paragraph",
            content:
              "UTIs are the most frequent complication and a leading cause of hospitalisation in SCI. They occur due to incomplete bladder emptying, use of catheters, and bacterial colonisation.",
          },
          {
            type: "list",
            content: [
              "Signs: Cloudy or foul-smelling urine, increased spasticity, fever or chills, malaise",
              "Action: Maintain strict catheter hygiene, report symptoms early, ensure adequate hydration",
            ],
          },
          {
            type: "heading",
            content: "Urinary Retention and Overdistension",
            level: 3,
          },
          {
            type: "paragraph",
            content:
              "Bladder overdistension occurs when the bladder fills beyond capacity due to poor emptying or obstruction, leading to increased risk of UTIs and kidney damage.",
          },
          {
            type: "list",
            content: [
              "Signs: Lower abdominal discomfort, feeling of fullness, leakage or overflow incontinence",
              "Action: Use bladder scanning regularly, adjust catheterization frequency",
            ],
          },
          {
            type: "heading",
            content: "Autonomic Dysreflexia (AD) - Special Focus for T6 and Above",
            level: 2,
          },
          {
            type: "callout",
            content:
              "AD is a medical emergency caused by a noxious stimulus below the level of injury, frequently triggered by bladder complications such as UTI, bladder distension, or blocked catheters.",
            variant: "danger",
          },
          {
            type: "list",
            content: [
              "Key features: Sudden severe hypertension (>20 mmHg above baseline), pounding headache, profuse sweating above injury level, bradycardia",
              "Bladder-related triggers: Full or blocked catheter, UTI, bladder spasms",
              "Action: Sit up immediately, check and relieve bladder causes, monitor blood pressure, seek emergency help if symptoms persist",
            ],
          },
          {
            type: "heading",
            content: "Practical Tips for Patients and Caregivers",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Maintain a consistent bladder emptying schedule",
              "Monitor for changes in urine colour, odour, or volume",
              "Stay hydrated but avoid excessive fluid intake",
              "Be vigilant for symptoms of AD, especially if injury is at T6 or above",
              "Report any new or worsening symptoms promptly",
            ],
          },
        ],
        learning_objectives: [
          "Identify common bladder complications following spinal cord injury, including UTIs, retention, and bladder stones",
          "Recognise signs and symptoms of autonomic dysreflexia linked to bladder issues in individuals with injuries at T6 and above",
          "Describe practical steps to prevent and manage bladder complications based on Australian clinical guidelines",
          "Explain the importance of timely reporting and regular monitoring to reduce long-term risks",
        ],
        assessment_questions: [
          {
            id: "1-c-q1",
            question:
              "Which of the following is the most common bladder complication after spinal cord injury and a leading cause of hospitalisation?",
            options: ["Bladder stones", "Urinary tract infection (UTI)", "Bladder cancer", "Vesicoureteral reflux"],
            correct_answer: "Urinary tract infection (UTI)",
            explanation:
              "UTIs occur frequently due to incomplete bladder emptying, catheter use, and bacterial colonisation, making them the most common bladder complication post-SCI.",
          },
          {
            id: "1-c-q2",
            question:
              "A patient with a T4 SCI reports a sudden pounding headache, profuse sweating above the injury level, and nasal congestion. What is the most appropriate immediate action?",
            options: [
              "Lay the patient flat and monitor vital signs",
              "Sit the patient upright and check for bladder distension or catheter blockage",
              "Administer a diuretic to reduce fluid overload",
              "Encourage the patient to drink more fluids",
            ],
            correct_answer: "Sit the patient upright and check for bladder distension or catheter blockage",
            explanation:
              "These symptoms suggest autonomic dysreflexia, a medical emergency. The immediate step is to sit the patient upright to lower blood pressure and identify/remove the triggering cause.",
          },
          {
            id: "1-c-q3",
            question:
              "Which of the following is NOT a recommended strategy to prevent urinary tract infections in people with SCI?",
            options: [
              "Adhering to clean intermittent catheterisation technique",
              "Maintaining adequate fluid intake",
              "Using antibiotics prophylactically on a long-term basis",
              "Regular monitoring for signs and symptoms of infection",
            ],
            correct_answer: "Using antibiotics prophylactically on a long-term basis",
            explanation:
              "Long-term prophylactic antibiotics are not routinely recommended due to risks of antibiotic resistance and side effects. Prevention focuses on catheter hygiene, hydration, and early detection.",
          },
        ],
      },
      {
        id: "1-d",
        module_id: 1,
        title: "Daily Bladder Management",
        description:
          "Essential guidance on daily bladder management for individuals with spinal cord injury, focusing on maintaining urinary health and preventing complications",
        metadata: {
          injury_level: "All",
          duration: 4,
          priority: "Critical",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "paragraph",
            content:
              "Managing your bladder on a daily basis after a spinal cord injury (SCI) is crucial to protect your kidneys, prevent infections, and maintain your quality of life.",
          },
          {
            type: "heading",
            content: "Key Principles of Daily Bladder Management",
            level: 2,
          },
          {
            type: "heading",
            content: "1. Establish a Reliable Emptying Method",
            level: 3,
          },
          {
            type: "list",
            content: [
              "Intermittent catheterisation (IC): Inserting a catheter several times daily to empty your bladder fully",
              "Indwelling catheter: A catheter left in place continuously",
              "Reflex voiding with condom catheter or pads: For those with some reflex bladder emptying",
              "Timed voiding: Using a schedule to urinate regularly if bladder sensation is preserved",
            ],
          },
          {
            type: "callout",
            content:
              "Most guidelines, including NSW Health ACI, recommend intermittent catheterisation as the preferred option where possible, as it reduces infection and preserves bladder health.",
            variant: "info",
          },
          {
            type: "heading",
            content: "2. Maintain a Regular Schedule",
            level: 3,
          },
          {
            type: "list",
            content: [
              "Follow a strict timetable for bladder emptying (usually every 4-6 hours)",
              "Avoid letting your bladder become overly full",
              "Keep a bladder diary initially to track volumes and times",
            ],
          },
          {
            type: "heading",
            content: "3. Hydration and Diet",
            level: 3,
          },
          {
            type: "list",
            content: [
              "Drink adequate fluids (usually 1.5-2 litres per day), preferably water",
              "Avoid excessive caffeine and alcohol as they can irritate the bladder",
              "Maintain a balanced diet to support overall health",
            ],
          },
          {
            type: "heading",
            content: "When to Contact Your Healthcare Team",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Increased difficulty or pain with catheterisation",
              "Persistent urinary leakage or retention",
              "Signs of infection (pain, fever, cloudy urine)",
              "Blood in urine",
              "New or worsening autonomic dysreflexia symptoms",
            ],
          },
        ],
        learning_objectives: [
          "Describe the impact of spinal cord injury on bladder function and the importance of daily bladder management",
          "Identify appropriate bladder emptying methods and the rationale for their use",
          "Implement practical strategies to maintain a safe and effective daily bladder routine",
          "Recognize signs of complications and understand when to seek medical advice",
        ],
        assessment_questions: [
          {
            id: "1-d-q1",
            question:
              "What is the preferred bladder emptying method recommended by Australian clinical guidelines for most individuals with spinal cord injury who are able to perform it?",
            options: [
              "Indwelling catheterisation",
              "Intermittent catheterisation",
              "Reflex voiding with pads",
              "Timed voiding only",
            ],
            correct_answer: "Intermittent catheterisation",
            explanation:
              "Intermittent catheterisation (IC) is the preferred method because it reduces the risk of urinary tract infections and preserves bladder health better than indwelling catheters.",
          },
          {
            id: "1-d-q2",
            question:
              "Which of the following is NOT a recommended daily practice to help prevent urinary tract infections in individuals managing their bladder after SCI?",
            options: [
              "Washing hands before and after catheterisation",
              "Using sterile or clean catheterisation technique as advised",
              "Drinking at least 1.5 to 2 litres of water daily",
              "Holding urine for as long as possible to avoid frequent catheterisation",
            ],
            correct_answer: "Holding urine for as long as possible to avoid frequent catheterisation",
            explanation:
              "Holding urine for extended periods increases bladder overdistension and infection risk. Regular emptying on a schedule is essential.",
          },
          {
            id: "1-d-q3",
            question:
              "Which symptom should prompt an individual with SCI to contact their healthcare provider immediately regarding their bladder management?",
            options: [
              "Mild bladder leakage once a week",
              "Cloudy urine accompanied by fever and increased spasticity",
              "Slight delay in catheter insertion technique",
              "Mild urgency without other symptoms",
            ],
            correct_answer: "Cloudy urine accompanied by fever and increased spasticity",
            explanation:
              "Cloudy urine with systemic signs such as fever and increased spasticity indicates a possible urinary tract infection that needs prompt medical attention.",
          },
        ],
      },
    ],
  },
  {
    module_id: 5,
    title: "Pain Management",
    category: "Core",
    summary:
      "Comprehensive pain education covering neuropathic and nociceptive pain mechanisms, assessment, and the biopsychosocial approach to management",
    priority: "Important",
    order: 5,
    sub_modules: [
      {
        id: "5-a",
        module_id: 5,
        title: "Understanding Pain After SCI",
        description:
          "Explains the types of pain experienced after spinal cord injury, contributing factors, daily impact, and evidence-based assessment principles",
        metadata: {
          injury_level: "All",
          duration: 6,
          priority: "Important",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "paragraph",
            content:
              "Pain affects up to 80% of people after SCI and can have far-reaching consequences for physical, psychological, and social wellbeing. Understanding pain is the first step in effective management.",
          },
          {
            type: "heading",
            content: "Types of Pain After SCI",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Neuropathic pain: Burning, shooting, stabbing, or electric sensations due to nervous system damage; may occur at, above, or below the injury level",
              "Nociceptive pain: Aching, stiff, cramping, or throbbing pain from tissue damage or inflammation (musculoskeletal or visceral)",
              "Mixed pain: Combination of neuropathic and nociceptive mechanisms",
            ],
          },
          {
            type: "heading",
            content: "Factors Influencing Pain",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Injury-related factors: Level, completeness, time since injury, syringomyelia, complications",
              "Individual factors: Age, co-morbidities, psychological state, sleep quality, coping skills",
              "Environmental and lifestyle factors: Weather, temperature, stress, physical activity, social support",
            ],
          },
          {
            type: "heading",
            content: "Impact on Daily Life",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Physical: Reduced mobility, sleep disturbances, fatigue, decreased fitness",
              "Psychological: Depression, anxiety, irritability, difficulty concentrating, reduced motivation",
              "Social and occupational: Reduced productivity, social withdrawal, financial strain, decreased independence",
            ],
          },
          {
            type: "heading",
            content: "Pain Assessment",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Numeric Rating Scale (0-10) to capture intensity",
              "Use of descriptive words (burning, stabbing, aching, cramping) to characterise pain quality",
              "Pain diaries to track triggers, patterns, activities, and treatment effectiveness",
            ],
          },
          {
            type: "heading",
            content: "When Pain Requires Escalation",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Pain interferes with daily activities, rehabilitation, or sleep",
              "Increasing intensity or frequency of pain episodes",
              "New types of pain or changes in established pain patterns",
              "Associated mood changes, depression, or reduced participation",
              "Lack of response to usual management strategies",
            ],
          },
          {
            type: "heading",
            content: "Myths and Misconceptions",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Myth: Complete SCI eliminates pain—reality: pain can occur above, at, or below the injury",
              "Myth: Pain is purely psychological—reality: physiological mechanisms underpin pain and require treatment",
              "Myth: Living with pain is inevitable—reality: multimodal strategies can improve outcomes",
              "Myth: Only strong medications help—reality: treatment often blends pharmacological and non-pharmacological approaches",
            ],
          },
          {
            type: "heading",
            content: "Biopsychosocial Model of Pain",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "Effective pain management addresses biological drivers, psychological responses, and social context. Collaboration with the multidisciplinary team is essential.",
          },
          {
            type: "heading",
            content: "Hope and Outlook",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Pain is real and deserves attention",
              "Effective treatments are available and continue to evolve",
              "Support from healthcare teams and peers improves outcomes",
              "Significant symptom reduction and quality-of-life gains are possible",
            ],
          },
          {
            type: "heading",
            content: "Australian Resources",
            level: 2,
          },
          {
            type: "list",
            content: [
              "NSW Health Pain Management Networks",
              "Queensland Persistent Pain services",
              "Spinal Cord Injuries Australia support groups",
              "Australian Pain Society educational resources",
            ],
          },
        ],
        learning_objectives: [
          "Differentiate between neuropathic, nociceptive, and mixed pain presentations after SCI",
          "Identify injury-related, individual, and environmental factors that influence pain experience",
          "Describe how pain impacts physical, psychological, and social functioning",
          "Explain the importance of comprehensive pain assessment in developing management plans",
        ],
        assessment_questions: [
          {
            id: "5-a-q1",
            question:
              "Which type of pain is typically described as burning or shooting and results from nervous system damage after spinal cord injury?",
            options: ["Musculoskeletal pain", "Neuropathic pain", "Visceral pain", "Referred pain"],
            correct_answer: "Neuropathic pain",
            explanation:
              "Neuropathic pain arises from injury-related damage to the nervous system and is commonly described as burning, shooting, or electric in nature.",
          },
        ],
      },
    ],
  },
  {
    module_id: 2,
    title: "Bowel Management System",
    category: "Body Systems",
    summary:
      "Comprehensive bowel management including neurogenic bowel fundamentals, establishing routines, and managing complications",
    priority: "Critical",
    order: 2,
    sub_modules: [
      {
        id: "2-a",
        module_id: 2,
        title: "Neurogenic Bowel Fundamentals",
        description:
          "Essential introduction to understanding neurogenic bowel dysfunction after spinal cord injury, including physiological changes and foundational principles",
        metadata: {
          injury_level: "All",
          duration: 6,
          priority: "Critical",
          difficulty_level: "Novice",
        },
        content: [
          {
            type: "heading",
            content: "Introduction to Neurogenic Bowel",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "After a spinal cord injury (SCI), many people experience changes in bowel function, collectively known as neurogenic bowel. This condition results from disrupted communication between the brain, spinal cord, and the nerves controlling the bowels.",
          },
          {
            type: "heading",
            content: "Injury Level and Bowel Function: Above and Below L1",
            level: 2,
          },
          {
            type: "heading",
            content: "Injuries Above L1 (Upper Motor Neuron Bowel)",
            level: 3,
          },
          {
            type: "list",
            content: [
              "The reflex arc controlling bowel function remains intact but is disconnected from the brain",
              "This leads to a reflex or spastic bowel",
              "Characteristics: Increased muscle tone of anal sphincter, reflex bowel emptying triggered by rectal stimulation",
              "Management focuses on triggering reflexes with digital stimulation or suppositories",
            ],
          },
          {
            type: "heading",
            content: "Injuries Below L1 (Lower Motor Neuron Bowel)",
            level: 3,
          },
          {
            type: "list",
            content: [
              "The injury affects the conus medullaris or cauda equina",
              "Reflex arcs controlling the bowel are damaged or lost",
              "This results in a flaccid or areflexic bowel",
              "Characteristics: Reduced or absent anal sphincter tone, loss of reflex bowel activity",
              "Management often requires manual evacuation and use of laxatives or enemas",
            ],
          },
          {
            type: "heading",
            content: "Principles of Effective Bowel Management",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Diet and Fluids: Adequate fibre intake (20-30 grams daily), maintaining hydration (1.5-2 litres per day)",
              "Physical Activity: Encouraging mobility to stimulate bowel function",
              "Scheduled Bowel Care: Consistent timing after meals to utilise gastrocolic reflex",
              "Positioning and Equipment: Sitting upright on toilet or commode",
              "Medications: Stool softeners, laxatives, suppositories as appropriate",
              "Regular Monitoring: Tracking bowel movements and adjusting program with healthcare team",
            ],
          },
          {
            type: "callout",
            content:
              "For individuals with SCI at or above T6, neurogenic bowel care can sometimes trigger autonomic dysreflexia (AD) - a potentially life-threatening increase in blood pressure. Perform bowel care gently and monitor for AD signs.",
            variant: "danger",
          },
        ],
        learning_objectives: [
          "Describe the physiological changes in bowel function following spinal cord injury",
          "Differentiate between upper motor neuron (above L1) and lower motor neuron (below L1) neurogenic bowel characteristics",
          "Identify key principles of bowel management tailored to injury level",
          "Recognize the importance of preventing complications such as constipation, incontinence, and autonomic dysreflexia",
        ],
        assessment_questions: [
          {
            id: "2-a-q1",
            question:
              "Which of the following best describes neurogenic bowel function in a person with a spinal cord injury above L1?",
            options: [
              "Flaccid bowel with loss of reflex activity and reduced anal sphincter tone",
              "Reflex bowel with increased anal sphincter tone and preserved reflex evacuation",
              "Normal bowel function with voluntary control of defecation",
              "Complete loss of all bowel activity and sensation",
            ],
            correct_answer: "Reflex bowel with increased anal sphincter tone and preserved reflex evacuation",
            explanation:
              "Injuries above L1 cause an upper motor neuron or reflex bowel. The reflex arc remains intact, leading to increased anal sphincter tone and reflex bowel emptying triggered by stimulation.",
          },
          {
            id: "2-a-q2",
            question:
              "Which of the following is an important component of bowel management recommended by Australian SCI clinical guidelines?",
            options: [
              "Ignoring bowel timing to avoid stress",
              "Maintaining a high-fibre diet and adequate hydration",
              "Avoiding all physical activity to prevent autonomic dysreflexia",
              "Using digital stimulation every hour regardless of bowel program",
            ],
            correct_answer: "Maintaining a high-fibre diet and adequate hydration",
            explanation:
              "Maintaining sufficient fibre intake and hydration is essential to soften stool and promote regular bowel movements. A consistent bowel routine improves outcomes.",
          },
          {
            id: "2-a-q3",
            question: "What is the main reason why people with SCI at or above T6 must be cautious during bowel care?",
            options: [
              "Risk of developing infections",
              "Increased chance of autonomic dysreflexia triggered by bowel stimulation",
              "Possibility of permanent loss of bowel reflexes",
              "Higher likelihood of stool leakage due to flaccid sphincter",
            ],
            correct_answer: "Increased chance of autonomic dysreflexia triggered by bowel stimulation",
            explanation:
              "Autonomic dysreflexia (AD) is a dangerous, sudden increase in blood pressure caused by noxious stimuli below the injury level, such as bowel care procedures in people with SCI at or above T6.",
          },
        ],
      },
    ],
  },
  {
    module_id: 3,
    title: "Respiratory Care System",
    category: "Body Systems",
    summary:
      "Respiratory education covering the impact of SCI on breathing, evidence-based breathing exercises, and pneumonia prevention strategies",
    priority: "Critical",
    order: 3,
    sub_modules: [
      {
        id: "3-a",
        module_id: 3,
        title: "Understanding Respiratory Changes After SCI",
        description:
          "Essential overview of how different injury levels alter respiratory muscle function, common complications, and the importance of proactive respiratory care",
        metadata: {
          injury_level: "All",
          duration: 6,
          priority: "Critical",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "paragraph",
            content:
              "Spinal cord injury, particularly cervical and high thoracic lesions, can profoundly affect the respiratory system. Recognising these changes supports targeted interventions and complication prevention.",
          },
          {
            type: "heading",
            content: "Normal Respiratory Function",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Diaphragm: Primary inspiratory muscle innervated by the phrenic nerves (C3-C5)",
              "Intercostal muscles: Located between the ribs and assist chest wall expansion (T1-T12)",
              "Accessory muscles: Neck and shoulder muscles recruited during increased respiratory demand",
              "Abdominal muscles: Support forced expiration and an effective cough (T6-L1)",
            ],
          },
          {
            type: "heading",
            content: "How SCI Affects Respiratory Function",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Cervical injuries (C1-C2): Require mechanical ventilation due to diaphragm paralysis",
              "C3-C4 injuries: Partial diaphragm function; ventilatory support often required",
              "C5-C8 injuries: Diaphragm preserved but weak intercostals and abdominals reduce lung volumes and cough effectiveness",
              "T1-T6 injuries: Diaphragm intact, but intercostal weakness reduces chest wall stability and cough strength",
              "T7-T12 injuries: Gradual recovery of respiratory muscles; abdominal weakness still impacts cough",
              "Lumbar/sacral injuries: Minimal direct respiratory impact but abdominal weakness may persist",
            ],
          },
          {
            type: "heading",
            content: "Common Respiratory Complications After SCI",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Reduced lung volumes and atelectasis",
              "Impaired cough leading to secretion retention",
              "Sleep-disordered breathing including obstructive sleep apnoea",
              "Recurrent respiratory infections such as pneumonia",
              "Respiratory muscle fatigue due to increased work of breathing",
            ],
          },
          {
            type: "heading",
            content: "Factors Affecting Respiratory Function",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Injury factors: Level, completeness, time since injury, associated trauma",
              "Individual factors: Age, fitness, smoking, body weight, posture",
              "Environmental factors: Air quality, infection exposure, access to equipment and care",
            ],
          },
          {
            type: "heading",
            content: "Importance of Respiratory Care",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Maintain adequate ventilation and gas exchange",
              "Prevent respiratory complications and hospitalisations",
              "Optimise functional independence and quality of life",
              "Support participation in rehabilitation and daily activities",
            ],
          },
          {
            type: "heading",
            content: "Australian Clinical Guideline Priorities",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Regular respiratory assessment and monitoring",
              "Structured breathing exercises and airway clearance",
              "Vaccination programs and infection prevention",
              "Early mobilisation and optimal positioning",
              "Education for people with SCI, carers, and clinicians",
            ],
          },
          {
            type: "heading",
            content: "When to Seek Medical Attention",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Increasing shortness of breath or difficulty breathing",
              "Changes in cough effectiveness or sputum characteristics",
              "Fever with respiratory symptoms",
              "Chest pain or discomfort during breathing",
              "Unusual fatigue, weakness, or signs of infection",
            ],
          },
        ],
        learning_objectives: [
          "Describe how spinal cord injury affects respiratory muscles at different levels",
          "Identify common respiratory complications following spinal cord injury",
          "Recognise factors that influence respiratory function in people with SCI",
          "Explain why proactive respiratory care is vital to long-term health",
        ],
        assessment_questions: [
          {
            id: "3-a-q1",
            question: "Which respiratory muscles are primarily affected in a C4 complete spinal cord injury?",
            options: [
              "Diaphragm only",
              "Intercostal muscles only",
              "Both diaphragm and intercostal muscles",
              "Accessory neck muscles only",
            ],
            correct_answer: "Both diaphragm and intercostal muscles",
            explanation:
              "A C4 complete injury compromises both diaphragm innervation and intercostal control, dramatically reducing lung volumes and cough strength.",
          },
          {
            id: "3-a-q2",
            question: "Why are individuals with high thoracic SCI (T1-T6) at increased risk of respiratory infections?",
            options: [
              "Complete paralysis of the diaphragm",
              "Weak intercostal and abdominal muscles reduce cough effectiveness",
              "Inability to breathe without mechanical ventilation",
              "Excessive metabolic demands on the respiratory system",
            ],
            correct_answer: "Weak intercostal and abdominal muscles reduce cough effectiveness",
            explanation:
              "Although the diaphragm remains functional, intercostal and abdominal weakness limits cough strength, allowing secretions to pool and increasing infection risk.",
          },
          {
            id: "3-a-q3",
            question:
              "According to Australian clinical guidelines, which intervention is a priority component of respiratory care after SCI?",
            options: [
              "Complete bed rest to conserve energy",
              "Avoidance of physical activity",
              "Regular breathing exercises and airway clearance techniques",
              "Routine oxygen therapy for all people with SCI",
            ],
            correct_answer: "Regular breathing exercises and airway clearance techniques",
            explanation:
              "Guidelines emphasise active respiratory care—structured exercises and airway clearance—to maintain lung function and prevent complications.",
          },
        ],
      },
      {
        id: "3-b",
        module_id: 3,
        title: "Breathing Techniques and Exercises",
        description:
          "Step-by-step breathing exercises and airway clearance techniques tailored for people with spinal cord injury, based on Australian best practice",
        metadata: {
          injury_level: "All",
          duration: 7,
          priority: "Critical",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "paragraph",
            content:
              "Regular breathing exercises help maximise the function of remaining respiratory muscles, improve lung capacity, and reduce respiratory complications following SCI.",
          },
          {
            type: "heading",
            content: "Benefits of Breathing Exercises After SCI",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Increase lung capacity and chest wall mobility",
              "Strengthen remaining respiratory muscles",
              "Enhance secretion clearance and reduce infection risk",
              "Decrease respiratory fatigue and breathlessness",
              "Improve sleep quality and cardiovascular health",
              "Build confidence and independence in respiratory self-management",
            ],
          },
          {
            type: "heading",
            content: "Core Breathing Techniques",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Diaphragmatic breathing: Controlled abdominal breathing performed 2-3 times daily for 5-10 minutes",
              "Glossopharyngeal (frog) breathing: Sequential \"gulps\" of air using tongue and throat muscles—practised under supervision",
              "Incentive spirometry: Slow, deep inhalations with breath holds repeated 10-15 times every hour while awake",
              "Pursed-lip breathing: Inhale through the nose, exhale slowly through pursed lips to control airflow",
            ],
          },
          {
            type: "heading",
            content: "Chest Expansion and Mobility Exercises",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Chest wall stretching: Raise arms overhead while inhaling, hold briefly, lower during exhalation",
              "Trunk rotation: Rotate through the trunk while exhaling, return to centre with inhalation (5 repetitions per side)",
            ],
          },
          {
            type: "heading",
            content: "Coughing Techniques and Airway Clearance",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Assisted (quad) cough: Caregiver applies an upward abdominal thrust during cough effort",
              "Huffing technique: Deep breath followed by forceful \"huff\" to mobilise secretions, then gentle cough",
            ],
          },
          {
            type: "heading",
            content: "Advanced Techniques",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Breath stacking: Sequential breaths held to expand lung volume before forceful exhalation or cough",
              "Air shifting: Direct airflow to different lung regions by altering body position",
            ],
          },
          {
            type: "heading",
            content: "Exercise Progression and Safety",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Begin with 5-10 minute sessions, 2-3 times daily, and increase gradually",
              "Stop the exercise if dizziness, chest pain, or unusual breathlessness occurs",
              "Avoid intensive practice during acute infection unless advised by clinicians",
              "Maintain clean equipment and perform hand hygiene",
              "Monitor oxygen saturation when equipment is available",
            ],
          },
          {
            type: "heading",
            content: "Positioning for Optimal Breathing",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Upright sitting (90°) supports most techniques",
              "Semi-reclined (45-60°) is an alternative for fatigue",
              "Side-lying positions assist with air shifting",
              "Avoid slouched or compressed positions that restrict chest expansion",
            ],
          },
          {
            type: "heading",
            content: "When to Seek Help",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Increasing difficulty performing exercises",
              "New or worsening shortness of breath",
              "Changes in secretions or cough effectiveness",
              "Dizziness or chest pain during exercises",
            ],
          },
          {
            type: "heading",
            content: "Integration with Daily Activities",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Practise before meals or transfers",
              "Incorporate techniques into routine pressure reliefs and stretching",
              "Use exercises during stressful situations to regulate breathing",
            ],
          },
        ],
        learning_objectives: [
          "Demonstrate key breathing techniques suitable for varying injury levels",
          "Perform chest expansion and mobility exercises to maintain lung capacity",
          "Apply airway clearance methods to support secretion management",
          "Integrate breathing exercises safely into daily routines",
        ],
        assessment_questions: [
          {
            id: "3-b-q1",
            question:
              "Which breathing technique is most appropriate for a person with a high cervical SCI (C3-C5) who has limited diaphragm function?",
            options: [
              "Diaphragmatic breathing",
              "Glossopharyngeal (frog) breathing",
              "Pursed-lip breathing",
              "Incentive spirometry",
            ],
            correct_answer: "Glossopharyngeal (frog) breathing",
            explanation:
              "Glossopharyngeal breathing uses mouth and throat muscles to \"gulp\" air into the lungs, supporting people with weak diaphragm function.",
          },
          {
            id: "3-b-q2",
            question: "What is the primary purpose of incentive spirometry in people with spinal cord injury?",
            options: [
              "Strengthen abdominal muscles",
              "Encourage deep inhalation and prevent lung collapse",
              "Improve cough effectiveness directly",
              "Assist with airway suctioning",
            ],
            correct_answer: "Encourage deep inhalation and prevent lung collapse",
            explanation:
              "Incentive spirometry promotes slow, deep breaths that expand the lungs and reduce the risk of atelectasis.",
          },
          {
            id: "3-b-q3",
            question:
              "Which sign indicates a need to stop breathing exercises and seek urgent medical assessment for respiratory complications?",
            options: [
              "Mild fatigue after the session",
              "Chest pain or unusual shortness of breath during the exercises",
              "Slight increase in mucus clearance",
              "Feeling relaxed after practice",
            ],
            correct_answer: "Chest pain or unusual shortness of breath during the exercises",
            explanation:
              "Chest pain or unexplained breathlessness can signal serious complications requiring immediate clinical review.",
          },
        ],
      },
      {
        id: "3-c",
        module_id: 3,
        title: "Pneumonia Prevention",
        description:
          "Practical guidance to reduce pneumonia risk in people with spinal cord injury, covering respiratory hygiene, vaccination, daily routines, and escalation steps",
        metadata: {
          injury_level: "All",
          duration: 5,
          priority: "Critical",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "paragraph",
            content:
              "Pneumonia remains a leading cause of hospitalisation after SCI due to compromised respiratory mechanics and secretion clearance. Preventive strategies are essential.",
          },
          {
            type: "heading",
            content: "Why Pneumonia Prevention is Critical",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Respiratory infections can escalate quickly and become life-threatening",
              "Pneumonia prolongs hospital stays and delays rehabilitation progress",
              "Proactive prevention improves quality of life and reduces healthcare costs",
              "Early care mitigates complications such as respiratory failure",
            ],
          },
          {
            type: "heading",
            content: "Key Strategies for Prevention",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Respiratory hygiene: Assisted cough, upright positioning, chest physiotherapy, incentive spirometry",
              "Infection control: Vigilant hand hygiene, avoiding exposure to illness, staying up to date with influenza and pneumococcal vaccinations",
              "Optimise overall health: Adequate nutrition, hydration, smoking cessation, and regular monitoring",
              "Early recognition: Identify warning signs promptly and seek medical review",
            ],
          },
          {
            type: "heading",
            content: "Prevention Strategies by Injury Level",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Cervical injuries: Ventilatory support where needed, rigorous airway clearance, prevention of ventilator-associated pneumonia, frequent monitoring",
              "Thoracic injuries: Emphasise cough assistance, breathing exercises, and early mobilisation",
              "Lower injuries: Maintain vaccination schedules, general health optimisation, and infection prevention routines",
            ],
          },
          {
            type: "heading",
            content: "Role of Caregivers and Healthcare Providers",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Assist with respiratory therapies and airway clearance",
              "Reinforce education on symptom recognition and self-care",
              "Ensure vaccinations are current",
              "Promote mobility and upright positioning",
              "Monitor closely for complications or deterioration",
            ],
          },
          {
            type: "heading",
            content: "Environmental and Daily Routine Considerations",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Maintain clean air, use filters, and avoid smoke or pollution",
              "Keep comfortable ambient temperature and humidity",
              "Daily schedule: Morning breathing exercises and airway clearance, daytime hydration and infection prevention habits, evening respiratory care with elevated sleeping position",
            ],
          },
          {
            type: "heading",
            content: "When to Seek Medical Attention",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Fever above 37.5°C (99.5°F)",
              "Increased or discoloured sputum with a worsening cough",
              "Shortness of breath or breathing difficulty",
              "Chest pain, unusual fatigue, weakness, or changes in mental state",
              "Emergency indicators: Severe breathlessness, cyanosis, chest pain with distress, persistent high fever, or loss of consciousness (call 000 in Australia)",
            ],
          },
          {
            type: "heading",
            content: "Australian Resources and Support",
            level: 2,
          },
          {
            type: "list",
            content: [
              "NSW Health Agency for Clinical Innovation respiratory guidelines",
              "Queensland Spinal Cord Injuries Service education materials",
              "Spinal Cord Injuries Australia community supports",
              "Australian Immunisation Handbook recommendations",
            ],
          },
        ],
        learning_objectives: [
          "Explain why people with spinal cord injury face increased pneumonia risk",
          "Identify respiratory hygiene and vaccination strategies that reduce infection",
          "Recognise early warning signs of pneumonia and appropriate escalation steps",
          "Outline the roles of healthcare teams and caregivers in pneumonia prevention",
        ],
        assessment_questions: [
          {
            id: "3-c-q1",
            question:
              "Which intervention most effectively helps clear lung secretions in a person with a high-level spinal cord injury?",
            options: [
              "Increasing fluid intake only",
              "Manual assisted cough or mechanical cough assist devices",
              "Remaining lying flat to rest",
              "Avoiding physical activity to conserve energy",
            ],
            correct_answer: "Manual assisted cough or mechanical cough assist devices",
            explanation:
              "Assisted cough techniques or mechanical devices compensate for weak respiratory muscles, mobilising mucus and reducing pneumonia risk.",
          },
          {
            id: "3-c-q2",
            question: "Which vaccinations are recommended in Australia to reduce pneumonia risk after SCI?",
            options: [
              "Influenza vaccine only",
              "Pneumococcal vaccine only",
              "Both influenza and pneumococcal vaccines",
              "No vaccinations are recommended",
            ],
            correct_answer: "Both influenza and pneumococcal vaccines",
            explanation:
              "Australian guidelines advise annual influenza vaccination and scheduled pneumococcal vaccination to reduce respiratory infections.",
          },
          {
            id: "3-c-q3",
            question:
              "Which sign suggests a person with SCI may be developing pneumonia and needs prompt medical review?",
            options: [
              "Mild fatigue without respiratory symptoms",
              "Increased coughing with coloured sputum and fever",
              "Stable breathing with no cough",
              "Occasional muscle spasms",
            ],
            correct_answer: "Increased coughing with coloured sputum and fever",
            explanation:
              "Changes in sputum colour combined with fever indicate possible infection and warrant urgent clinical assessment.",
          },
        ],
      },
    ],
  },
  {
    module_id: 4,
    title: "Cardiovascular Management",
    category: "Body Systems",
    summary:
      "Critical cardiovascular management including orthostatic hypotension and autonomic dysreflexia emergency response",
    priority: "Critical",
    order: 4,
    sub_modules: [
      {
        id: "4-b",
        module_id: 4,
        title: "Autonomic Dysreflexia Emergency Response",
        description:
          "In-depth understanding of autonomic dysreflexia (AD), a potentially life-threatening emergency in individuals with spinal cord injury at or above T6",
        metadata: {
          injury_level: "T6 and above",
          duration: 7,
          priority: "Critical",
          difficulty_level: "Advanced",
        },
        content: [
          {
            type: "heading",
            content: "Introduction to Autonomic Dysreflexia (AD)",
            level: 2,
          },
          {
            type: "callout",
            content:
              "Autonomic dysreflexia is a medical emergency that occurs in individuals with spinal cord injury (SCI) at or above the sixth thoracic vertebra (T6). It is characterised by sudden and severe hypertension triggered by noxious stimuli below the level of injury.",
            variant: "danger",
          },
          {
            type: "paragraph",
            content:
              "If untreated, AD may lead to stroke, seizures, cardiac arrest, or death. Australian clinical guidelines emphasise early recognition and prompt management.",
          },
          {
            type: "heading",
            content: "Common Triggers of Autonomic Dysreflexia",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Bladder-related: urinary retention, blocked or kinked catheter, urinary tract infection",
              "Bowel-related: constipation, fecal impaction, hemorrhoids, digital stimulation",
              "Skin-related: pressure sores, tight clothing or straps, burns, insect bites",
              "Other triggers: fractures, surgical procedures, sexual activity, temperature extremes",
            ],
          },
          {
            type: "heading",
            content: "Recognising the Signs and Symptoms",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Hypertension: systolic BP increase of 20-40 mmHg or more from baseline",
              "Pounding headache (often severe)",
              "Profuse sweating above the injury level",
              "Flushing or blotchy skin above the lesion",
              "Pale, cool, clammy skin below the lesion",
              "Bradycardia (slow heart rate)",
              "Nasal congestion",
              "Anxiety or apprehension",
              "Blurred vision or spots in visual field",
            ],
          },
          {
            type: "heading",
            content: "Immediate Emergency Response Steps",
            level: 2,
          },
          {
            type: "steps",
            content: [
              "Sit the person upright: Elevate the head and upper body to 45-90 degrees to promote orthostatic reduction in blood pressure",
              "Loosen tight clothing or devices: Remove belts, tight collars, leg straps, or anything restricting circulation",
              "Check blood pressure every 2-5 minutes: Continuous monitoring helps assess response to interventions",
              "Identify and remove the triggering stimulus: Check catheter for kinks, drain bladder, assess for bowel impaction, examine skin for pressure areas",
              "If cause is not found or hypertension persists: Administer fast-acting antihypertensive medication as per local protocols, notify medical emergency team",
              "Monitor for complications: Watch for neurological changes, seizure activity, or worsening cardiovascular status",
            ],
          },
          {
            type: "heading",
            content: "Prevention Strategies",
            level: 2,
          },
          {
            type: "list",
            content: [
              "Regular bladder management: Maintain catheter patency, timely bladder emptying, monitor for infections",
              "Bowel program adherence: Prevent constipation and impaction through diet, hydration, and scheduled bowel care",
              "Skin care: Frequent repositioning, pressure relief, and skin inspection",
              "Education: Patients, families, and healthcare workers must be trained to recognise triggers and early signs",
              "Emergency plans: Have AD management plans readily available, including emergency contacts and medication protocols",
            ],
          },
        ],
        learning_objectives: [
          "Describe the pathophysiology and common triggers of autonomic dysreflexia in individuals with SCI at or above T6",
          "Recognise the clinical signs and symptoms indicating an autonomic dysreflexia emergency",
          "Implement the immediate emergency response steps according to Australian clinical guidelines",
          "Outline prevention strategies to minimise the risk of autonomic dysreflexia episodes",
        ],
        assessment_questions: [
          {
            id: "4-b-q1",
            question:
              "Which of the following is the most common trigger for autonomic dysreflexia in individuals with spinal cord injury at or above T6?",
            options: [
              "Skin irritation from tight clothing",
              "Bladder distension due to urinary retention",
              "Fractures below the level of injury",
              "Fever from infection",
            ],
            correct_answer: "Bladder distension due to urinary retention",
            explanation:
              "Bladder-related issues, particularly urinary retention or blocked catheters causing bladder distension, are the most frequent triggers of autonomic dysreflexia.",
          },
          {
            id: "4-b-q2",
            question:
              "What is the first immediate action you should take when you suspect a person with T6 SCI is experiencing autonomic dysreflexia?",
            options: [
              "Lay the person flat and elevate their legs",
              "Administer antihypertensive medication immediately",
              "Sit the person upright and loosen any tight clothing",
              "Perform a bladder catheterisation without delay",
            ],
            correct_answer: "Sit the person upright and loosen any tight clothing",
            explanation:
              "The initial management of AD involves sitting the person upright to use gravity to lower blood pressure and loosening any tight clothing or constrictive devices.",
          },
          {
            id: "4-b-q3",
            question: "Which of the following signs is NOT typically associated with autonomic dysreflexia?",
            options: [
              "Profuse sweating above the level of injury",
              "Bradycardia (slow heart rate)",
              "Flushing and nasal congestion",
              "Increased sensation below the level of injury",
            ],
            correct_answer: "Increased sensation below the level of injury",
            explanation:
              "Individuals with SCI at T6 and above often have impaired sensation below the injury level. AD symptoms include sweating, flushing, nasal congestion above the lesion, and bradycardia.",
          },
        ],
      },
    ],
  },
  {
    module_id: 6,
    title: "Skin Integrity and Pressure Management",
    category: "Core",
    summary:
      "Comprehensive skin care including pressure injury prevention, daily skin inspection protocols, and wound recognition and response",
    priority: "Critical",
    order: 6,
    sub_modules: [
      {
        id: "6-a",
        module_id: 6,
        title: "Pressure Injury Prevention",
        description:
          "Comprehensive, evidence-based guide to the core principles of preventing pressure injuries with detailed, actionable strategies",
        metadata: {
          injury_level: "All",
          duration: 8,
          priority: "Critical",
          difficulty_level: "Competent",
        },
        content: [
          {
            type: "heading",
            content: "Why is Skin So Vulnerable After SCI?",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "Pressure injuries (also known as pressure sores or bed sores) occur when a sustained period of pressure on the skin cuts off its blood supply. After an SCI, this risk is dramatically amplified.",
          },
          {
            type: "list",
            content: [
              "Loss of Sensation: You no longer receive pain or discomfort signals that would normally prompt you to move",
              "Muscle Atrophy: Muscles shrink from lack of use, reducing natural padding over bony prominences",
              "Impaired Blood Flow: Changes in the autonomic nervous system can reduce circulation",
              "Shear and Friction: Sliding down in a bed or chair creates shear forces that stretch and tear blood vessels",
            ],
          },
          {
            type: "callout",
            content:
              "More than 85% of people with an SCI will develop a pressure injury in their lifetime. Prevention is the most critical part of your management plan.",
            variant: "warning",
          },
          {
            type: "heading",
            content: "The Pillars of Prevention",
            level: 2,
          },
          {
            type: "heading",
            content: "Pressure Relief (Weight Shifts)",
            level: 3,
          },
          {
            type: "paragraph",
            content:
              "This is the single most effective prevention strategy. The goal is to completely lift pressure off a bony area to allow blood to return to the tissue.",
          },
          {
            type: "list",
            content: [
              "In a wheelchair: Perform a full pressure lift (lifting your bottom completely off the cushion) for 2-3 minutes at least every 45 minutes, ideally every 20-30 minutes",
              "In bed: You must be repositioned at least every 2-3 hours. Use pillows and wedges to support your body",
              "When sitting up in bed: Do not raise the head of the bed more than 30 degrees to prevent shearing on your sacrum",
            ],
          },
          {
            type: "heading",
            content: "Appropriate Surfaces and Equipment",
            level: 3,
          },
          {
            type: "list",
            content: [
              "You must have a high-quality, pressure-relieving wheelchair cushion prescribed specifically for you by an Occupational Therapist",
              "A standard mattress is not adequate. You need a pressure-relieving mattress (static or dynamic)",
              "Equipment must be checked regularly for proper inflation and condition",
            ],
          },
          {
            type: "heading",
            content: "Nutrition and Hydration",
            level: 3,
          },
          {
            type: "paragraph",
            content:
              "Your skin needs protein and calories to stay healthy. Malnutrition is a major risk factor for pressure injuries.",
          },
          {
            type: "list",
            content: [
              "Ensure a balanced diet rich in protein, vitamins (especially Vitamin C and Zinc), and calories",
              "Drink 2-3 litres of water daily to maintain skin elasticity",
            ],
          },
          {
            type: "heading",
            content: "Lifestyle Factors",
            level: 3,
          },
          {
            type: "callout",
            content:
              "Smoking drastically reduces blood flow and oxygen to the skin, multiplying your risk of a pressure injury. Quitting is one of the best things you can do for your skin.",
            variant: "danger",
          },
        ],
        learning_objectives: [
          "Explain two physiological reasons why SCI increases the risk of pressure injuries",
          "State the recommended frequency and duration for a pressure relief weight shift in a wheelchair",
          "Identify the two most critical pieces of equipment for pressure injury prevention",
          "Name two lifestyle factors that have a major impact on skin health",
        ],
        assessment_questions: [
          {
            id: "6-a-q1",
            question:
              "According to Australian clinical guidelines, what is the recommended minimum frequency for repositioning a person in bed to prevent pressure injuries?",
            options: ["Every 8 hours", "Once a day", "At least every 2-3 hours"],
            correct_answer: "At least every 2-3 hours",
            explanation:
              "Regular repositioning is crucial to relieve pressure from bony prominences. Waiting longer than 3 hours significantly increases the risk of tissue damage.",
          },
          {
            id: "6-a-q2",
            question:
              "A person with SCI is sitting in their wheelchair. What is the most effective way for them to perform a pressure relief?",
            options: [
              "Leaning slightly to one side for 10 seconds",
              "Lifting their bottom completely off the cushion for 2-3 minutes",
              "Shuffling their position every hour",
            ],
            correct_answer: "Lifting their bottom completely off the cushion for 2-3 minutes",
            explanation:
              "A brief or partial shift is not enough. The tissue needs several minutes completely free of pressure for blood flow to be adequately restored.",
          },
          {
            id: "6-a-q3",
            question:
              "Which of the following is a major, modifiable lifestyle risk factor for pressure injuries because it severely restricts blood flow and oxygen to the skin?",
            options: ["Drinking coffee", "Smoking cigarettes", "Eating a high-protein diet"],
            correct_answer: "Smoking cigarettes",
            explanation:
              "Smoking causes vasoconstriction, significantly reducing the blood and oxygen supply necessary for skin health and healing.",
          },
        ],
      },
    ],
  },
  {
    module_id: 9,
    title: "Emergency Recognition and Response",
    category: "Emergency",
    summary: "Critical emergency recognition and preparedness for medical emergencies specific to spinal cord injury",
    priority: "Critical",
    order: 9,
    sub_modules: [
      {
        id: "9-a",
        module_id: 9,
        title: "Medical Emergency Recognition",
        description:
          "Advanced knowledge for recognising medical emergencies in people with spinal cord injuries, with practical skills to identify critical signs",
        metadata: {
          injury_level: "All",
          duration: 6,
          priority: "Critical",
          difficulty_level: "Advanced",
        },
        content: [
          {
            type: "heading",
            content: "Why is Medical Emergency Recognition Critical in SCI?",
            level: 2,
          },
          {
            type: "paragraph",
            content:
              "SCI disrupts communication between the brain and body below the injury level, which can alter normal pain sensation, affect autonomic regulation, and mask typical signs of infection or cardiovascular instability.",
          },
          {
            type: "callout",
            content:
              "Delays in recognising these emergencies can lead to permanent damage or death. Therefore, caregivers, clinicians, and people with SCI must be skilled in early detection and immediate response.",
            variant: "danger",
          },
          {
            type: "heading",
            content: "Common Medical Emergencies in SCI",
            level: 2,
          },
          {
            type: "heading",
            content: "1. Autonomic Dysreflexia (AD)",
            level: 3,
          },
          {
            type: "paragraph",
            content:
              "A potentially life-threatening hypertensive crisis occurring in people with SCI at or above T6 level.",
          },
          {
            type: "list",
            content: [
              "Key Features: Sudden pounding headache, flushing or sweating above injury level, nasal congestion, bradycardia, anxiety",
              "Common Triggers: Bladder distension, bowel impaction, skin irritation, tight clothing",
              "Immediate Action: Sit upright, loosen tight clothing, check and relieve bladder/bowel causes, monitor BP every 5 minutes, call emergency services if symptoms persist",
            ],
          },
          {
            type: "heading",
            content: "2. Respiratory Emergencies",
            level: 3,
          },
          {
            type: "paragraph",
            content:
              "SCI at or above C5 can impair diaphragm and accessory muscles, increasing risk of respiratory failure.",
          },
          {
            type: "list",
            content: [
              "Key Features: Shortness of breath, use of accessory muscles, cyanosis (bluish lips), weak cough",
              "Immediate Actions: Position upright if possible, encourage coughing or assist with airway clearance, provide supplemental oxygen, call emergency services immediately",
            ],
          },
          {
            type: "heading",
            content: "3. Sepsis and Infection",
            level: 3,
          },
          {
            type: "paragraph",
            content: "People with SCI are at increased risk of UTIs, pneumonia, and pressure injuries.",
          },
          {
            type: "list",
            content: [
              "Key Features: Fever or hypothermia, confusion, rapid heart rate or breathing, low blood pressure",
              "Action Steps: Seek urgent medical review, monitor vital signs frequently, ensure hydration and airway support",
            ],
          },
        ],
        learning_objectives: [
          "Identify the key signs and symptoms of autonomic dysreflexia and initiate appropriate first aid measures",
          "Recognise clinical features of neurogenic shock and understand initial management priorities",
          "Detect respiratory distress in individuals with SCI and implement immediate supportive actions",
          "Understand the presentation of sepsis in SCI and the importance of urgent medical referral",
        ],
        assessment_questions: [
          {
            id: "9-a-q1",
            question:
              "Which of the following is the most common trigger for autonomic dysreflexia in a person with a spinal cord injury above T6?",
            options: ["Hypoglycaemia", "Bladder distension or blockage", "Fever", "Low blood pressure"],
            correct_answer: "Bladder distension or blockage",
            explanation:
              "Autonomic dysreflexia is most commonly triggered by noxious stimuli below the injury level, with bladder distension or urinary blockage being the most frequent cause.",
          },
          {
            id: "9-a-q2",
            question:
              "A person with a cervical spinal cord injury presents with low blood pressure, slow heart rate, warm dry skin, and dizziness. What is the most likely condition?",
            options: ["Autonomic dysreflexia", "Neurogenic shock", "Sepsis", "Pulmonary embolism"],
            correct_answer: "Neurogenic shock",
            explanation:
              "Neurogenic shock occurs with high-level SCI causing loss of sympathetic tone, resulting in hypotension and bradycardia, often with warm dry skin due to vasodilation.",
          },
          {
            id: "9-a-q3",
            question:
              "What is the best immediate action for a caregiver when a person with SCI develops sudden severe headache, sweating above the injury level, and nasal congestion?",
            options: [
              "Lay the person flat and elevate their legs",
              "Sit the person upright and loosen tight clothing",
              "Give the person fluids and wait 30 minutes",
              "Call the doctor to schedule an appointment for tomorrow",
            ],
            correct_answer: "Sit the person upright and loosen tight clothing",
            explanation:
              "These symptoms suggest autonomic dysreflexia. The first step is to sit the person upright to lower blood pressure and loosen restrictive clothing.",
          },
        ],
      },
    ],
  },
]

export function getModuleById(id: number): Module | undefined {
  return modulesData.find((m) => m.module_id === id)
}

export function getAllSubModules(): SubModule[] {
  return modulesData.flatMap((m) => m.sub_modules)
}

export function getSubModuleById(id: string): SubModule | undefined {
  return getAllSubModules().find((sm) => sm.id === id)
}

export function getSubModulesByModuleId(moduleId: number): SubModule[] {
  const targetModule = getModuleById(moduleId)
  return targetModule?.sub_modules || []
}

export function getModulesByPriority(priority: "Critical" | "Important"): Module[] {
  return modulesData.filter((m) => m.priority === priority)
}

export function getCriticalModules(): Module[] {
  return getModulesByPriority("Critical")
}
