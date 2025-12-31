
import { Unit } from '../types';

export const curriculum: Unit[] = [
  {
    id: 1,
    title: "Unit 1: Command & Human Rights",
    lessons: [
      {
        id: 1, title: "Bureau of Detectives Structure", orderRef: "G01-02-05", summary: "Chief of Detectives reports to First Deputy Superintendent.",
        activities: [
          { type: "question", question: "To whom does the Chief of Detectives report?", options: ["Superintendent", "First Deputy Superintendent", "Mayor", "Deputy Chief"], correctAnswer: "First Deputy Superintendent", explanation: "As per G01-02-05." },
          { type: "flashcard", question: "Who commands the Bureau of Detectives?", answer: "The Chief of the Bureau of Detectives." }
        ]
      },
      {
        id: 2, title: "Procedural Justice", orderRef: "G02-01", summary: "Four principles of community trust.",
        activities: [
          { type: "flashcard", question: "Name the 4 pillars of Procedural Justice.", answer: "Voice, Neutrality, Respect, Trustworthiness." }
        ]
      },
      {
        id: 3, title: "TIGN Interactions", orderRef: "G02-01-03", summary: "Gender identity documentation and marker 'N'.",
        activities: [
          { type: "question", question: "What marker is used for non-binary gender?", options: ["U", "X", "N", "M"], correctAnswer: "N", explanation: "CPD policy G02-01-03." },
          { type: "flashcard", question: "What is the gender marker for non-binary individuals in TIGN documentation?", answer: "'N'" }
        ]
      },
      {
        id: 4, title: "First Amendment Protections", orderRef: "G02-02", summary: "Restricting recording only for safety/integrity.",
        activities: [
          { type: "scenario", question: "A citizen is filming from a sidewalk. Can you order them to stop?", options: ["Yes, for privacy", "No, unless interfering with safety/integrity", "Yes, always", "Only if it is a juvenile"], correctAnswer: "No, unless interfering with safety/integrity", explanation: "Protected under First Amendment policy." },
          { type: "flashcard", question: "Under what conditions can recording police activity be restricted?", answer: "Only for safety, scene security, or investigative integrity (Per PDF Scenario 1)." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 2,
    title: "Unit 2: Bias-Free Policing & Youth",
    lessons: [
      {
        id: 1, title: "Bias-Free Policing", orderRef: "G02-04", summary: "Characteristics only used for specific suspect descriptions.",
        activities: [
          { type: "question", question: "Which characteristic is used only for specific descriptions?", options: ["Race", "Religion", "Age", "Sexual Orientation"], correctAnswer: "Age", explanation: "Based on Unit 2 Quiz Q1." },
          { type: "flashcard", question: "During which police actions is bias-based policing prohibited?", answer: "During ALL police actions (traffic stops, arrests, investigatory stops, etc.)." }
        ]
      },
      {
        id: 2, title: "Interactions with Youth", orderRef: "G02-05", summary: "Prioritize safety during encounters.",
        activities: [
          { type: "question", question: "What is the priority when interacting with youth?", options: ["Speed", "Enforcement", "Safety", "Authority"], correctAnswer: "Safety", explanation: "Safety is the priority principle." },
          { type: "flashcard", question: "What is the primary principle when interacting with youth and children?", answer: "Safety." }
        ]
      },
      {
        id: 3, title: "Gender-Based Violence", orderRef: "G02-06", summary: "Victim-centered approach to GBV.",
        activities: [
          { type: "scenario", question: "Responding to a domestic incident with a minor. Priority?", options: ["Mediation", "Victim safety and documentation", "Arrest the minor", "Notify the media"], correctAnswer: "Victim safety and documentation", explanation: "Follow mandatory GBV protocols." },
          { type: "flashcard", question: "What approach does CPD mandate for Gender-Based Violence cases?", answer: "A victim-centered approach." }
        ]
      },
      {
        id: 4, title: "Minors' Medical Care", orderRef: "G04-10", summary: "Transporting minors in distress.",
        activities: [
          { type: "question", question: "If a minor is in medical distress in custody, you must:", options: ["Wait for parents", "Transport to nearest approved facility", "Wait for supervisor", "Give them water"], correctAnswer: "Transport to nearest approved facility", explanation: "Immediate medical care is mandatory." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 3,
    title: "Unit 3: Use of Force",
    lessons: [
      {
        id: 1, title: "Force Standard", orderRef: "G03-02", summary: "Reasonable, necessary, and proportional.",
        activities: [
          { type: "question", question: "Force must be:", options: ["Immediate", "Reasonable, Necessary, Proportional", "Decisive", "Equal"], correctAnswer: "Reasonable, Necessary, Proportional", explanation: "Standard CPD force policy." },
          { type: "flashcard", question: "When is de-escalation required by CPD policy?", answer: "Whenever time and circumstances permit." }
        ]
      },
      {
        id: 2, title: "Resistance Levels", orderRef: "G03-02-01", summary: "Classifying subject behavior.",
        activities: [
          { type: "question", question: "Authorized option for passive resistance?", options: ["Deadly force", "Impact weapon", "Control and restraint techniques", "Taser"], correctAnswer: "Control and restraint techniques", explanation: "Passive resistance allows low-level control." },
          { type: "flashcard", question: "What force option is appropriate for a 'passive resister'?", answer: "Control and restraint techniques." }
        ]
      },
      {
        id: 3, title: "Firearm Discharge", orderRef: "G03-02-03", summary: "Post-discharge mandatory actions.",
        activities: [
          { type: "question", question: "After a discharge, officers must:", options: ["Leave", "Secure scene and notify supervisor", "Write report alone", "Call the union"], correctAnswer: "Secure scene and notify supervisor", explanation: "Mandatory post-incident protocol." },
          { type: "flashcard", question: "Name the immediate requirements after an officer discharges a firearm.", answer: "Secure scene, render aid, notify supervisors, and complete mandatory reports (Per PDF Scenario 3)." }
        ]
      },
      {
        id: 4, title: "Force Review", orderRef: "G03-02-08", summary: "Systematic review of all force.",
        activities: [
          { type: "question", question: "Which force requires review?", options: ["Only deadly", "All uses of force", "Only Taser", "Only if injured"], correctAnswer: "All uses of force", explanation: "Every force application is reviewed." }
        ]
      },
      {
        id: 5, title: "Body Worn Cameras", orderRef: "G03-05", summary: "Mandatory recording of law enforcement activities.",
        activities: [
          { type: "flashcard", question: "When should the BWC be activated?", answer: "At the beginning of an incident and recorded for the entire duration." }
        ]
      },
      {
        id: 6, title: "Critical Incidents", orderRef: "G03-06", summary: "Managing officer-involved deaths.",
        activities: [
          { type: "scenario", question: "Officer-involved death occurs. First step?", options: ["Press conference", "Separate involved officers and secure scene", "Group debrief", "Go home"], correctAnswer: "Separate involved officers and secure scene", explanation: "Essential for investigative integrity." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 4,
    title: "Unit 4: Crime Scenes & Interrogations",
    lessons: [
      {
        id: 1, title: "Scene Security", orderRef: "S04-01", summary: "Integrity of the crime scene.",
        activities: [
          { type: "question", question: "First priority at a crime scene?", options: ["Evidence", "Photos", "Scene Security", "Search"], correctAnswer: "Scene Security", explanation: "Primary arriving member responsibility." },
          { type: "flashcard", question: "What is the first priority of arriving members at a crime scene?", answer: "Scene security/protection of scene integrity." }
        ]
      },
      {
        id: 2, title: "Custodial Interrogation", orderRef: "S04-03", summary: "Miranda trigger: Custody + Interrogation.",
        activities: [
          { type: "question", question: "When is Miranda required?", options: ["Arrest", "Custodial Interrogation", "Traffic Stop", "Voluntary Interview"], correctAnswer: "Custodial Interrogation", explanation: "Both must be present." },
          { type: "flashcard", question: "What are the two requirements (the 'trigger') for Miranda warnings?", answer: "Custody AND Interrogation." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 5,
    title: "Unit 5: Arrests & Searches",
    lessons: [
      {
        id: 1, title: "Arrest Procedures", orderRef: "G04-01", summary: "Probable cause for custodial arrests.",
        activities: [
          { type: "question", question: "Standard for a full custodial arrest?", options: ["Reasonable suspicion", "Probable cause", "Preponderance of evidence", "Clear and convincing"], correctAnswer: "Probable cause", explanation: "Constitutional standard." },
          { type: "flashcard", question: "What is the legal standard required for a custodial arrest?", answer: "Probable Cause." }
        ]
      },
      {
        id: 2, title: "Searches & Warrants", orderRef: "D24-01", summary: "Consent and warrant exceptions.",
        activities: [
          { type: "flashcard", question: "What are the requirements for a valid consent search?", answer: "Consent must be voluntary and informed." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 6,
    title: "Unit 6: Juveniles",
    lessons: [
      {
        id: 1, title: "Juvenile Processing", orderRef: "S06-04", summary: "Protections and parent notifications.",
        activities: [
          { type: "question", question: "What distinguishes juvenile custody?", options: ["Fewer forms", "Additional protections", "No handcuffs", "No Miranda"], correctAnswer: "Additional protections", explanation: "Juvenile Court Act requirements." },
          { type: "flashcard", question: "What is required immediately when a juvenile is arrested for a felony?", answer: "Notification of parent or guardian, and following juvenile processing rules (Per PDF Scenario 2)." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 7,
    title: "Unit 7: Property & Evidence",
    lessons: [
      {
        id: 1, title: "Chain of Custody", orderRef: "G06-01", summary: "Integrity of physical evidence.",
        activities: [
          { type: "question", question: "Purpose of chain of custody?", options: ["Inventory list", "Maintaining evidence integrity", "Tracking officer location", "Justifying the stop"], correctAnswer: "Maintaining evidence integrity", explanation: "Ensures admissibility." },
          { type: "flashcard", question: "What is the primary purpose of maintaining a chain of custody?", answer: "To ensure evidence integrity and legal admissibility." }
        ]
      }
    ],
    flashcards: [], quiz: []
  },
  {
    id: 8,
    title: "Unit 8: Legal Statutes",
    lessons: [
      {
        id: 1, title: "Criminal Statutes", orderRef: "ILCS", summary: "Statutory timelines and 48-hour rule.",
        activities: [
          { type: "question", question: "Requirement of the 48-hour rule?", options: ["Case closure", "Prompt judicial determination", "Release on bond", "Supervisor review"], correctAnswer: "Prompt judicial determination", explanation: "Probable cause hearing must occur promptly." },
          { type: "flashcard", question: "What does the '48-hour rule' require for warrantless arrests?", answer: "A prompt judicial determination of probable cause." }
        ]
      }
    ],
    flashcards: [], quiz: []
  }
];

// Re-map for global unit quiz and flashcards using lessons data
curriculum.forEach(unit => {
  unit.flashcards = unit.lessons.flatMap(l => l.activities.filter(a => a.type === 'flashcard'));
  unit.quiz = unit.lessons.flatMap(l => l.activities.filter(a => a.type !== 'flashcard'));
  
  if (unit.flashcards.length === 0) {
    unit.flashcards = [
      { type: "flashcard", question: `Review the core order for ${unit.title}.`, answer: unit.lessons[0]?.orderRef || "Consult the Reading List sidebar." }
    ];
  }
});
