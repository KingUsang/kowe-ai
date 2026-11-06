export const USER = {
  name: "Folasade",
  fullName: "Folasade Adebayo",
  school: "UNILAG",
  faculty: "College of Medicine, Idi-Araba",
  department: "Department of Pharmaceutical Chemistry",
  program: "Pharmacy 300L",
  semester: "First Semester • Week 8",
  dateFormatted: "Wednesday, 12 November",
  rhythmDays: 14,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAVZKASqjj_J1e92kDy1p5HpOr16Ab_mRiU3IXDA7Ne0QIWJ0tXRuEHucmleQsEWhfw2bv6_FIhsjNzfL3yW38uC6J_yZ7C24DS4Hptl2CNZ4MXntLZFHyqGWlFUCjfKodelW-XQ6cOEddZvRzQT_akmXVMqBmnpbjhJQ_v2UUO_wbpsxO7jWNMH-xD67oSPNZXk8qV1PUsYpyRNTNxT9Z92rEBtYVu-J6N_VOJA",
  stats: {
    topicMastery: 84,
    modulesCompleted: 24,
    totalModules: 28,
    flaggedTopics: 3
  }
};

export const COURSES = [
  {
    id: "pch-301",
    code: "PCH 301",
    title: "Pharmaceutical Chemistry",
    shortTitle: "Pharm Chem II",
    progress: 62,
    totalLessons: 7,
    currentLesson: 4,
    nextTopic: "Structure-Activity Relationship (SAR) of Penicillins & Beta-Lactams",
    description: "Core mechanisms: C-6 acylamino substitution kinetics, thiazolidine ring strain, and beta-lactamase degradation pathways.",
    remainingMinutes: 18,
    modulesDone: 4,
    badgeColor: "bg-primary-container text-on-primary",
    tag: "High Yield PQ"
  },
  {
    id: "pha-303",
    code: "PHA 303",
    title: "Pharmacology II",
    shortTitle: "Pharmacology II",
    progress: 74,
    totalLessons: 12,
    currentLesson: 9,
    nextTopic: "Adrenergic Receptor Antagonists & Sympatholytics",
    description: "Receptor affinities, selectivity profiles, and hemodynamic responses in hypertensive emergencies.",
    remainingMinutes: 15,
    modulesDone: 9,
    badgeColor: "bg-primary-container text-on-primary",
    tag: "Mock Test Prep"
  },
  {
    id: "phs-305",
    code: "PHS 305",
    title: "Human Physiology",
    shortTitle: "Physiology",
    progress: 58,
    totalLessons: 10,
    currentLesson: 6,
    nextTopic: "Renal Autoregulation, GFR & Clearance Mechanisms",
    description: "Tubuloglomerular feedback, myogenic mechanisms, and renin-angiotensin-aldosterone axis.",
    remainingMinutes: 25,
    modulesDone: 6,
    badgeColor: "bg-surface-container-high text-on-surface",
    tag: "Tutorial Scheduled"
  },
  {
    id: "chm-311",
    code: "CHM 311",
    title: "Organic Chemistry III",
    shortTitle: "Org Chem III",
    progress: 45,
    totalLessons: 8,
    currentLesson: 4,
    nextTopic: "Nucleophilic Substitution & Stereochemical Inversion",
    description: "SN1 vs SN2 kinetics, polar aprotic solvent stabilization, and Walden inversion stereochemistry.",
    remainingMinutes: 30,
    modulesDone: 4,
    badgeColor: "bg-surface-container-high text-on-surface",
    tag: "Problem Set Due"
  },
  {
    id: "pct-302",
    code: "PCT 302",
    title: "Pharmaceutics & Formulation",
    shortTitle: "Pharmaceutics",
    progress: 81,
    totalLessons: 9,
    currentLesson: 7,
    nextTopic: "Emulsion Stability & HLB Calculations",
    description: "Coalescence prevention, phase inversion temperature, and Surfactant packaging kinetics.",
    remainingMinutes: 12,
    modulesDone: 7,
    badgeColor: "bg-surface-container-high text-on-surface",
    tag: "Lab Practical"
  },
  {
    id: "pmb-304",
    code: "PMB 304",
    title: "Pharmaceutical Microbiology",
    shortTitle: "Microbiology",
    progress: 68,
    totalLessons: 11,
    currentLesson: 8,
    nextTopic: "Sterilization Validation & Bioburden Kinetics",
    description: "D-value, Z-value calculations, autoclave validation, and membrane filtration challenges.",
    remainingMinutes: 20,
    modulesDone: 8,
    badgeColor: "bg-surface-container-high text-on-surface",
    tag: "Assigned Reading"
  }
];

export const RECOMMENDED_TASKS = [
  {
    id: "task-1",
    courseCode: "PHA 303",
    type: "Mock Test Prep",
    title: "Review Antipsychotic Drug Metabolism notes before Thursday's tutorial",
    readTime: "12 min read",
    actionText: "Read Summary",
    actionLink: "/materials",
    badgeType: "secondary"
  },
  {
    id: "task-2",
    courseCode: "PCH 301",
    type: "High Yield PQ",
    title: "Solve 10 practice MCQs on Beta-Lactam Ring Strain & Cleavage",
    readTime: "10 Questions",
    actionText: "Start Quiz",
    actionLink: "/practice",
    badgeType: "primary",
    highlight: true
  }
];

export const MILESTONES = [
  {
    id: "ms-1",
    day: "Fri",
    date: "14",
    title: "PHA 303 Mid-Semester Mock Test",
    due: "In 2 days • Faculty Lecture Theatre (FLT)",
    type: "exam",
    icon: "notification_important",
    color: "bg-secondary-fixed text-on-secondary-fixed"
  },
  {
    id: "ms-2",
    day: "Tue",
    date: "18",
    title: "PCH 301 Drug Formulation Submission",
    due: "In 6 days • Departmental Portal Upload",
    type: "assignment",
    icon: "assignment",
    color: "bg-surface-container-high text-on-surface"
  },
  {
    id: "ms-3",
    day: "Mon",
    date: "24",
    title: "PHS 305 Renal System Practical Exam",
    due: "In 12 days • Lab Annex 4",
    type: "lab",
    icon: "science",
    color: "bg-surface-container-high text-on-surface"
  }
];

export const MATERIALS = [
  {
    id: "mat-1",
    title: "Prof. Okonjo's Antibiotic Resistance Lecture Slides",
    format: "PDF",
    icon: "picture_as_pdf",
    subtitle: "PDF Summary • Annotated with Past Questions",
    size: "4.2 MB",
    course: "PCH 301",
    cached: true,
    content: "Lecture Slide Annotations:\n1. Overcoming Penicillinase activity via clavulanic acid addition\n2. Methicillin resistance (mecA gene / PBP2a conformational alter)\n3. Porin channel downregulation in Gram-negative pseudomonas"
  },
  {
    id: "mat-2",
    title: "Pharmacokinetics Formulas & Clearance Audio",
    format: "Audio",
    icon: "headphones",
    subtitle: "Audio Explainer • 6 min listen • Offline Ready",
    size: "8.1 MB",
    course: "PHA 303",
    cached: true,
    content: "Audio Summary Script:\nClearance = (Rate of elimination) / (Plasma concentration). Half-life t1/2 = 0.693 * Vd / Cl. When GFR drops below 30 mL/min, dosage adjustments are mandatory for renally cleared aminopenicillins."
  },
  {
    id: "mat-3",
    title: "UNILAG 2018–2023 Pharmacology Past Questions Compendium",
    format: "PDF",
    icon: "description",
    subtitle: "5-Year Past Questions with Solved Model Answers",
    size: "12.4 MB",
    course: "PHA 303",
    cached: true,
    content: "Compendium Index:\nSection A: Autonomic Pharmacology (40 MCQs)\nSection B: Cardiovascular Agents (25 Vignettes)\nSection C: Chemo & Antimicrobials (Essay Solutions)"
  },
  {
    id: "mat-4",
    title: "Renal Clearance & Countercurrent Multiplier Infographic",
    format: "Chart",
    icon: "image",
    subtitle: "High-Res Schematic • Idi-Araba Syllabus Ed.",
    size: "2.8 MB",
    course: "PHS 305",
    cached: false,
    content: "Diagram Reference: Loop of Henle descending limb permeable to water, ascending limb actively pumps Na+/K+/2Cl- cotransporters creating hypertonic medullary gradient."
  }
];

export const PRACTICE_QUESTIONS = [
  {
    id: 1,
    course: "PHA 303",
    topic: "Autonomic Pharmacology",
    tag: "UNILAG 2022 Past Question (High-Yield)",
    type: "Clinical Vignette • Single Best Answer",
    prompt: "A 52-year-old male with chronic open-angle glaucoma is prescribed a topical autonomic agent. Which of the following drugs reduces intraocular pressure primarily by increasing trabecular outflow through ciliary muscle contraction?",
    conceptTags: ["#OcularPharmacology", "#M3Receptors", "#AqueousDynamics"],
    options: [
      { key: "A", text: "Timolol maleate" },
      { key: "B", text: "Pilocarpine hydrochloride" },
      { key: "C", text: "Apraclonidine" },
      { key: "D", text: "Betaxolol" }
    ],
    correctAnswer: "B",
    explanation: "Pilocarpine is a direct-acting muscarinic agonist (M3) that stimulates ciliary muscle contraction. This puts physical tension on the scleral spur and opens the trabecular meshwork spaces, dramatically increasing aqueous humor drainage into Schlemm's canal.",
    pastExamInfo: "Appeared in UNILAG 2022 1st Semester Final (Q14) • 82% Student Accuracy"
  },
  {
    id: 2,
    course: "PHA 303",
    topic: "Autonomic Pharmacology",
    tag: "UI 2021 Professional Exam",
    type: "Single Best Answer",
    prompt: "During surgical resection of a pheochromocytoma, severe reflex bradycardia and hypertension are avoided by administering which drug before beta-blocker therapy is initiated?",
    conceptTags: ["#Sympatholytics", "#Pheochromocytoma", "#ReceptorBlockade"],
    options: [
      { key: "A", text: "Propranolol" },
      { key: "B", text: "Phenoxybenzamine" },
      { key: "C", text: "Atenolol" },
      { key: "D", text: "Epinephrine" }
    ],
    correctAnswer: "B",
    explanation: "Alpha-blockade with phenoxybenzamine MUST always precede beta-blocker administration. Administering a beta-blocker first leaves alpha-1 receptors unopposed, triggering catastrophic hypertensive crisis.",
    pastExamInfo: "Classic PCN Board Examination Question • Must-Know"
  },
  {
    id: 3,
    course: "PCH 301",
    topic: "Medicinal Chemistry",
    tag: "UNILAG 2023 Exam",
    type: "Clinical Case Vignette",
    prompt: "Which structural feature in Clavulanic Acid prevents it from exhibiting antibacterial activity while retaining potent irreversible inhibition of TEM-1 beta-lactamase?",
    conceptTags: ["#SuicideInhibitors", "#BetaLactamase", "#SAR"],
    options: [
      { key: "A", text: "Lack of 6-acylamino side chain" },
      { key: "B", text: "Presence of thiazolidine sulfur" },
      { key: "C", text: "D-stereochemistry at C-5" },
      { key: "D", text: "Double bond at C-2 to C-3" }
    ],
    correctAnswer: "A",
    explanation: "Clavulanic acid lacks the C-6 acylamino group found in penicillins. Therefore, it cannot bind effectively to bacterial Transpeptidase (PBP) active sites to halt cell wall synthesis, yet it acts as a suicide substrate for beta-lactamase enzymes.",
    pastExamInfo: "UNILAG 2023 Med Chem (Q07) • 2 Marks"
  },
  {
    id: 4,
    course: "PHS 305",
    topic: "Renal Physiology",
    tag: "UNILAG 2020 Past Question",
    type: "Conceptual SBA",
    prompt: "In a patient experiencing profound hemorrhagic shock, which autoregulatory response acts first to preserve Glomerular Filtration Rate (GFR)?",
    conceptTags: ["#RenalAutoregulation", "#Tubuloglomerular", "#AngiotensinII"],
    options: [
      { key: "A", text: "Afferent arteriolar vasoconstriction" },
      { key: "B", text: "Angiotensin II-mediated efferent arteriolar constriction" },
      { key: "C", text: "Inhibition of renin release by macula densa" },
      { key: "D", text: "Downregulation of aldosterone receptors" }
    ],
    correctAnswer: "B",
    explanation: "Low renal perfusion triggers high renin and angiotensin II release. Angiotensin II selectively constricts efferent arterioles more than afferent arterioles, raising intraglomerular capillary pressure and defending GFR.",
    pastExamInfo: "Physiology Department Baseline Benchmark"
  }
];

export const EXAM_QUESTIONS_40 = Array.from({ length: 40 }, (_, idx) => {
  const i = idx + 1;
  if (i === 7) {
    return {
      id: 7,
      number: 7,
      course: "PHM 301",
      department: "Medicinal Chem",
      year: "UNILAG 2023 Exam",
      marks: "2 Marks",
      caseTitle: "Clinical Case Vignette #07",
      title: "Mechanism of Suicide Inactivation in Beta-Lactamase Inhibitors",
      stem: "A 34-year-old patient with severe recurrent diabetic foot infection fails ampicillin monotherapy due to TEM-1 β-lactamase producing E. coli. Sulbactam is co-administered. Following nucleophilic attack by the enzyme's Ser-70 hydroxyl group on the β-lactam carbonyl of sulbactam, what subsequent chemical event permanently traps and inactivates the enzyme?",
      options: [
        { key: "A", text: "Immediate rapid hydrolysis of the acyl-enzyme intermediate regenerating free active Ser-70" },
        { key: "B", text: "Opening of the oxazolidine ring followed by irreversible covalent cross-linking forming a stable conjugated imine complex" },
        { key: "C", text: "Competitive reversible hydrogen bonding with the oxyanion hole without covalent attachment" },
        { key: "D", text: "Decarboxylation at C-3 causing direct steric occlusion of the surrounding active site water molecules" }
      ],
      correctAnswer: "B",
      flagged: true,
      answered: "B"
    };
  }

  const answeredState = i <= 24 ? (i % 4 === 0 ? "A" : i % 3 === 0 ? "B" : "C") : null;
  const flaggedState = i === 7 || i === 18;

  return {
    id: i,
    number: i,
    course: i % 2 === 0 ? "PHA 303" : "PCH 301",
    department: i % 2 === 0 ? "Pharmacology II" : "Medicinal Chem",
    year: `UNILAG ${2019 + (i % 5)} Exam`,
    marks: "2 Marks",
    caseTitle: `Question #${String(i).padStart(2, '0')}`,
    title: `PCN Licensing Standard - Objective Assessment Module ${i}`,
    stem: `Which of the following pharmacological assertions accurately reflects the pharmacokinetics, receptor kinetics, or SAR criteria for drug class #${i} according to standard PCN and UNILAG syllabus standards?`,
    options: [
      { key: "A", text: `Primary first-line therapeutic indication for class #${i} with standard clearance kinetics.` },
      { key: "B", text: `Selective antagonism with high therapeutic index and minimal cytochrome P450 inhibition.` },
      { key: "C", text: `Prodrug biotransformation via hepatic esterase cleavage to active carboxylate metabolite.` },
      { key: "D", text: `Non-competitive allosteric modulation with negligible renal elimination dependency.` }
    ],
    correctAnswer: "B",
    flagged: flaggedState,
    answered: answeredState
  };
});

export const INITIAL_CHAT = [
  {
    id: "msg-1",
    sender: "student",
    name: "Tunde (You)",
    time: "14:18",
    text: "Why does the beta-lactam ring in Penicillin G break down so easily in gastric acid, and how did medicinal chemists fix it in newer oral versions?"
  },
  {
    id: "msg-2",
    sender: "tutor",
    name: "KOWE Academic Tutor",
    time: "14:19",
    type: "pedagogical",
    intro: "The rapid decomposition of Penicillin G (Benzylpenicillin) in the acidic environment of the stomach (pH 1.5–2.5) comes down to a lethal combination of geometrical strain and intra-molecular assistance:",
    pillars: [
      {
        num: "01",
        title: "Severe Angle & Ring Strain",
        text: "The four-membered β-lactam core forces internal bond angles to approximately 90°. Normal aliphatic amides prefer planar 120° geometry, making this cyclic bond perpetually eager to snap open under mild catalytic stress."
      },
      {
        num: "02",
        title: "Suppression of Amide Resonance",
        text: "In standard amides, delocalization of nitrogen lone pairs onto the carbonyl oxygen stabilizes the dipole. However, the rigid bicyclic ring junction with the thiazolidine ring prevents coplanarity; nitrogen can't donate its electrons, leaving the β-lactam carbonyl carbon radically electrophilic."
      },
      {
        num: "03",
        title: "Intramolecular Acyl-Group Participation",
        text: "The benzyl side-chain's carbonyl oxygen acts as an internal nucleophile. Under acid catalysis, it launches a neighbor attack on the strained β-lactam carbonyl, creating an unstable oxazolone intermediate that immediately hydrolyzes to microbiologically inactive penicillic acid."
      }
    ],
    breakthrough: {
      title: "Medicinal Chemistry Breakthrough",
      text: "To make penicillin orally active, chemists appended Electron-Withdrawing Groups (EWGs) adjacent to the side-chain carbonyl. In Penicillin V (phenoxymethyl) and Ampicillin (α-amino), the EWG pulls electron density away, reducing that oxygen's nucleophilic attack on the strained β-lactam core!"
    },
    citation: "Featured in UI & UNILAG 2021 Professional Exam (Q2b) • 8 Marks"
  },
  {
    id: "msg-3",
    sender: "student",
    name: "Tunde",
    time: "14:21",
    text: "Can you give me an everyday memory aid for remembering Penicillin V vs G stability in my clinical pharmacology exam?"
  },
  {
    id: "msg-4",
    sender: "tutor",
    name: "KOWE Academic Tutor",
    time: "14:21",
    type: "mnemonic",
    title: "The \"V\" vs \"G\" Mnemonic",
    body: "Remember: Penicillin V is for Valimentary (oral/GI tract) or \"V = Victorious against acid\"! Because it resists stomach acid, you can take it as an oral tablet.\n\nMeanwhile, Penicillin G is \"Gone\" if ingested by mouth—it must be administered parenterally (IV/IM) as gastric juice obliterates it within minutes.",
    tag: "Pharmacology • Formulary Note"
  }
];
