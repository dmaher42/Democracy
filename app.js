const {
  useEffect,
  useMemo,
  useRef,
  useState
} = React;
const {
  createRoot
} = ReactDOM;

// Year 9 Civics & Citizenship — Unit Plan (Single-file React app)
// Designed for quick editing, printing, export/import (JSON), and ACARA/SA alignment viewing.
// Tailwind is available in this canvas. No external deps required.

// ---- Default Data ----
const DEFAULT_PLAN = {
  meta: {
    title: "Year 9 Civics & Citizenship – Healthy Democracy",
    subtitle: "How might a deeper understanding of living in a healthy democracy restore trust and foster civically minded students?",
    duration: "6–8 weeks",
    author: "Daniel Maher",
    school: "Murray Bridge High School (SA)",
    lastUpdated: new Date().toISOString().slice(0, 10)
  },
  curriculumView: "SA",
  // "ACARA" | "SA"
  learningIntentions: ["Understand how Australia's Constitution structures a federal democracy and enables change (referendums, separation of powers).", "Explain how laws are made, interpreted and applied (parliament, courts, rights, responsibilities).", "Evaluate how media (including social media) shapes identity, trust and civic participation.", "Plan and justify a civic action addressing a school or community issue, incorporating diverse perspectives."],
  successCriteria: ["I can analyse how the Constitution and federal system support democratic processes and change (AC9HC9K01).", "I can explain how a federal policy idea becomes law and the influences on that process (AC9HC9K02).", "I can describe court hierarchy, roles and rights of accused/victims; explain civil vs criminal (AC9HC9K03–K04).", "I can evaluate strategies for civic participation and design a feasible, ethical action (AC9HC9S04).", "I use evidence and correct civics terms to argue a position (AC9HC9S05)."],
  dispositions: [{
    name: "Socially conscious",
    notes: "Participates in actions that benefit community; recognises democratic processes."
  }, {
    name: "Discerning",
    notes: "Checks sources; weighs perspectives; anticipates consequences of actions."
  }, {
    name: "Principled",
    notes: "Acts with integrity; argues respectfully using evidence; supports others facing ethical challenges."
  }],
  capabilities: {
    CriticalInquiry: ["Develop and modify inquiry questions about political/legal systems and civic issues (AC9HC9S01)", "Locate, select and compare data/ideas from multiple sources (AC9HC9S02)"],
    AnalysisEvaluation: ["Analyse information to identify/evaluate different perspectives (AC9HC9S03)"],
    CivicParticipation: ["Evaluate decision-making methods and participation strategies; plan a civic action (AC9HC9S04)"],
    Communicating: ["Create evidence-based descriptions/explanations/arguments using civics terms (AC9HC9S05)"]
  },
  curriculumLinks: {
    ACARA: [{
      code: "AC9HC9K01",
      text: "Role of the Australian Constitution; federal system; process for constitutional change (referendum)."
    }, {
      code: "AC9HC9K02",
      text: "Legislative processes shaping federal policy; influences on policy."
    }, {
      code: "AC9HC9K03",
      text: "Court features, jurisdictions; operations of courts/tribunals."
    }, {
      code: "AC9HC9K04",
      text: "Roles in trials; rights of accused and victims; access to justice; legal aid."
    }, {
      code: "AC9HC9K05",
      text: "How/why groups participate in civic life and global citizenship."
    }, {
      code: "AC9HC9K06",
      text: "Influence of media (incl. social media) on identity and attitudes to diversity."
    }, {
      code: "AC9HC9S01–S05",
      text: "Skills: questioning/researching; analysis/evaluation; participation/decision-making; communicating."
    }],
    SA: [{
      code: "Learning Standard",
      text: "Investigate systems/issues; analyse perspectives; evaluate participation strategies; communicate with evidence."
    }, {
      code: "Dispositions",
      text: "Socially conscious; Discerning; Principled."
    }, {
      code: "Capabilities",
      text: "Critical inquiry; Ethical understanding; Intercultural understanding."
    }, {
      code: "Courts & Legal Systems",
      text: "Ensure just outcomes; roles, rights and access to justice."
    }, {
      code: "Constitution & Government",
      text: "Framework/principles of governance; referendums; policy process."
    }, {
      code: "Civic Participation & Media",
      text: "Worldviews; platforms; media influence on identity and fairness."
    }]
  },
  assessment: {
    formative: [{
      name: "Source Reliability Check",
      description: "Students compare 3 sources (news article, gov site, NGO brief) on the same issue; rate credibility and bias.",
      evidence: "Annotated checklist + short reflection (200 words)."
    }, {
      name: "Socratic Seminar: Trust in Institutions",
      description: "Students discuss prompts linking trust and healthy democracy; teacher uses discussion rubric.",
      evidence: "Rubric ratings + student self-assessment."
    }, {
      name: "Court System Concept Map",
      description: "Students build a visual of court hierarchy/jurisdictions; add roles/rights; compare criminal vs civil.",
      evidence: "Annotated concept map (paper or digital)."
    }],
    summative: [{
      name: "Civic Action Proposal (Group)",
      description: "Plan a small-scale action to improve fairness/participation in school/community (e.g., student voice survey, awareness campaign). Include consultation process and evaluation metrics.",
      evidence: "2–3 page proposal + presentation (5–7 min).",
      criteria: ["Needs analysis & stakeholder voices", "Feasibility & ethics", "Use of evidence & civics terms", "Evaluation plan"]
    }, {
      name: "Evidence-Based Argument (Individual)",
      description: "Write a persuasive essay responding to the inquiry question, referencing Constitution/courts/media and the action project.",
      evidence: "800–1000 word essay with citations.",
      criteria: ["Thesis & structure", "Use of evidence", "Civics terminology", "Evaluation of perspectives"]
    }]
  },
  sequence: [{
    week: 1,
    title: "Launching the Inquiry: What is a Healthy Democracy?",
    lessons: [{
      title: "Hook & Prior Knowledge",
      activities: ["Gallery walk of headlines about trust in institutions; students place green/red dots (trust/distrust).", "Mini-lecture: features of healthy democracy (participation, fairness, accountability, separation of powers).", "Student-friendly inquiry framing: 'How can understanding democracy help us trust each other and improve our community?'"],
      resources: ["Projector, sticky dots, print headlines or digital board"]
    }, {
      title: "Question Crafting (AC9HC9S01)",
      activities: ["Students draft 3 questions they want to investigate; class sorts into themes (Constitution, courts, media, participation).", "Establish research teams and roles."],
      resources: ["Question stems, wall chart/Padlet"]
    }]
  }, {
    week: 2,
    title: "Constitution & Change (AC9HC9K01)",
    lessons: [{
      title: "Federation to Referendums",
      activities: ["Timeline jigsaw: founders' aims, compromises, key sections (in plain English).", "Case study carousel: 1967 Referendum, 1999 Republic — success vs failure."],
      resources: ["Timeline cards, case briefs"]
    }, {
      title: "Policy to Law (AC9HC9K02)",
      activities: ["Flowchart from idea → bill → committees → vote → assent; identify influence points (parties, interest groups, public service, citizens).", "Choose a contemporary federal policy; map influences."],
      resources: ["Process flow templates"]
    }]
  }, {
    week: 3,
    title: "Courts, Rights & Justice (AC9HC9K03–K04)",
    lessons: [{
      title: "Court Hierarchy & Roles",
      activities: ["Build a court hierarchy ladder (Magistrates → District → Supreme → Federal → High Court).", "Roles & rights stations: judge, lawyer, jury, accused, victim; civil vs criminal scenarios."],
      resources: ["Hierarchy posters, role cards"]
    }, {
      title: "Precedent & Interpretation",
      activities: ["Mini-case: Mabo and native title; how precedent changes the law.", "Exit ticket: How does the court system support a just democracy?"],
      resources: ["Case summary, exit ticket"]
    }]
  }, {
    week: 4,
    title: "Media, Identity & Trust (AC9HC9K06)",
    lessons: [{
      title: "Media Representations",
      activities: ["Analyse representations of groups in sport/news; discuss impact on cohesion and trust.", "Bias detector: headline rewrite challenge."],
      resources: ["Clippings, projector"]
    }, {
      title: "Source Reliability Clinic (AC9HC9S02–S03)",
      activities: ["CRAAP/RECAP test on three sources covering the same issue; compare results in teams."],
      resources: ["Source packs, rubric"]
    }]
  }, {
    week: 5,
    title: "Civic Action Project – Discover & Design (AC9HC9S04)",
    lessons: [{
      title: "Needs Analysis & Stakeholders",
      activities: ["Identify a school/community issue (participation, fairness, student voice).", "Map stakeholders; plan consultations (survey/interviews)."],
      resources: ["Stakeholder map template"]
    }, {
      title: "Action Blueprint",
      activities: ["Draft goals, actions, timeline, roles, ethics checklist, evaluation metrics."],
      resources: ["Blueprint one-pager"]
    }]
  }, {
    week: 6,
    title: "Civic Action Project – Build & Share",
    lessons: [{
      title: "Prototype & Feedback",
      activities: ["Create campaign materials (poster, short video, announcement, social post).", "Peer feedback using success criteria."],
      resources: ["Canva/Slides, rubric"]
    }, {
      title: "Presentations",
      activities: ["5–7 minute group presentations + Q&A."],
      resources: ["Timer, projector"]
    }]
  }, {
    week: 7,
    title: "Synthesis & Argument (AC9HC9S05)",
    lessons: [{
      title: "Plan the Essay",
      activities: ["PEEL/TEAL refresher; collect evidence from unit; outline drafting."],
      resources: ["Essay planner"]
    }, {
      title: "Write & Confer",
      activities: ["Draft in class; teacher conferencing; citation check."],
      resources: ["Writing tools"]
    }]
  }, {
    week: 8,
    title: "Reflection & Evaluation",
    lessons: [{
      title: "Did We Restore Trust?",
      activities: ["Students revisit Week 1 dots; write reflection on shifts in trust and civic identity.", "Unit feedback + next steps for authentic participation at school."],
      resources: ["Reflection prompts"]
    }]
  }],
  differentiation: ["Choice boards for product (infographic, short video, Minecraft build of a 'healthy democracy' city district, podcast).", "Sentence starters/frames for arguments; vocabulary banks (jurisdiction, mandate, sovereignty, precedent).", "Targeted mini-lessons for reading complex sources; text simplification options.", "Adjusted success criteria for students working at Yr 7–8 literacy levels; extension: comparative case study of another democracy."],
  pedagogy: ["Visible Learning alignment: clear intentions & success criteria displayed every lesson; frequent feedback cycles.", "Teacher-as-evaluator: exit tickets, mid-unit checks, conferencing logs to adjust teaching.", "Peer learning: protocols for discussion (Socratic, think-pair-share, jigsaw)."],
  resources: ["PEO: Australian Constitution resources", "Federal Parliament Education Office: law-making process materials", "Local council website (civic participation examples)", "ABC Education media literacy lessons"],
  organisation: {
    activeWeek: 1,
    weeklyFocus: [{
      week: 1,
      focus: "Launch the inquiry and build trust norms.",
      priorities: ["Set up the trust pulse display and gallery walk prompts.", "Co-design discussion norms with students and allocate inquiry teams."],
      checkIn: "Capture baseline reflections on trust in institutions for comparison in Week 8."
    }, {
      week: 2,
      focus: "Deepen understanding of the Constitution and policy pathways.",
      priorities: ["Finalise timeline cards for the federation to referendum jigsaw.", "Curate contemporary policy examples that connect to student interests."],
      checkIn: "Identify students who need targeted vocabulary support before the policy flowchart lesson."
    }, {
      week: 3,
      focus: "Explore courts, rights and justice in action.",
      priorities: ["Refresh the court hierarchy visuals and role cards.", "Invite the school wellbeing leader to observe the justice discussion."],
      checkIn: "Collect exit tickets on how the court system supports democracy; note students for conferences."
    }, {
      week: 4,
      focus: "Analyse media influence and identity.",
      priorities: ["Gather diverse media texts for representation analysis.", "Prepare bias detector mini-lesson examples."],
      checkIn: "Monitor group dynamics during source reliability clinic and schedule follow-ups."
    }, {
      week: 5,
      focus: "Design the civic action project.",
      priorities: ["Confirm stakeholder interview slots and consent requirements.", "Model a strong action blueprint using last year's exemplar."],
      checkIn: "Check each group's consultation plan and adjust timelines for students needing more scaffolds."
    }, {
      week: 6,
      focus: "Prototype, test and communicate action ideas.",
      priorities: ["Schedule peer feedback rounds and capture warm/ cool feedback language.", "Coordinate access to tech spaces for production days."],
      checkIn: "Track which groups need additional coaching on evaluation metrics."
    }, {
      week: 7,
      focus: "Synthesize evidence into arguments.",
      priorities: ["Update essay planning scaffolds and exemplars.", "Plan conferencing roster targeting students below benchmark."],
      checkIn: "Collect drafting samples for moderation with the Humanities team."
    }, {
      week: 8,
      focus: "Reflect, celebrate and map next steps.",
      priorities: ["Organise reflection prompts and celebration wall.", "Capture student voice on future civic action opportunities."],
      checkIn: "Gather evidence of growth for reporting and share success stories with leadership."
    }],
    keyDates: [{
      date: "2024-05-03",
      label: "Source reliability clinic",
      type: "checkpoint",
      detail: "Collect formative evidence during the bias detective workshop and log conferencing notes.",
      window: "Week 4 double lesson"
    }, {
      date: "2024-05-10",
      label: "Civic action proposal draft",
      type: "milestone",
      detail: "Groups share draft proposals for feedback and approval before community outreach.",
      window: "Submit via Teams by 4pm"
    }, {
      date: "2024-05-17",
      label: "Prototype feedback carousel",
      type: "workshop",
      detail: "Peer review cycle for campaign materials; capture warm and cool feedback.",
      window: "Library breakout space"
    }, {
      date: "2024-05-24",
      label: "Civic action presentations",
      type: "showcase",
      detail: "Group presentations with Q&A panel including leadership and community partner.",
      window: "Periods 3-4"
    }, {
      date: "2024-05-30",
      label: "Evidence-based argument due",
      type: "assessment",
      detail: "Collect final essays and update gradebook with achievement and next steps.",
      window: "Upload to LMS by 9pm"
    }],
    routines: [{
      title: "Monday planning huddle",
      timing: "Before school",
      checklist: ["Skim this week's learning sequence and adjust slides.", "Flag targeted conferences using last week's exit tickets."]
    }, {
      title: "Midweek formative pulse",
      timing: "Wednesday lunch",
      checklist: ["Review student work samples for quick wins and misconceptions.", "Email families of students who need encouragement or celebration."]
    }, {
      title: "Friday reflection & gratitude",
      timing: "After school",
      checklist: ["Log celebrations and challenges in professional journal.", "Schedule next week's wellbeing check-ins and send thank-you messages to collaborators."]
    }],
    communications: ["Families • Week 1 newsletter: share the inquiry question and invite conversations at home.", "Leadership • Week 3 briefing: flag upcoming civic action showcase and space requirements.", "Community partners • Week 5 email: confirm availability for feedback on student proposals.", "Students • Week 7 update: outline essay checkpoints and conferencing schedule."],
    wellbeingPrompts: ["Block two 10-minute resets across busy presentation week.", "Celebrate one student voice success in each staff meeting agenda.", "Pair up with a colleague for mutual observation during Week 3 justice lessons.", "Protect one meeting-free afternoon for resource curation and reflection."]
  },
  tasksBoard: {
    Backlog: [{
      id: "task-backlog-1",
      title: "Collect local council contact details for stakeholder list",
      due: "Week 4",
      category: "Communication",
      notes: "Check last year's spreadsheet and update councillor roles."
    }, {
      id: "task-backlog-2",
      title: "Draft extension pathway comparing another democracy",
      due: "Week 5",
      category: "Planning",
      notes: "Use New Zealand and Canada as contrasting case studies for high flyers."
    }],
    Preparing: [{
      id: "task-preparing-1",
      title: "Prepare source reliability clinic materials",
      due: "Apr 29",
      category: "Planning",
      notes: "Print CRAAP templates and load Padlet example responses."
    }, {
      id: "task-preparing-2",
      title: "Update success criteria display for civic action project",
      due: "Week 2",
      category: "Assessment",
      notes: "Translate rubric language into student-friendly statements."
    }],
    "In class": [{
      id: "task-inclass-1",
      title: "Conference with media literacy group on bias strategies",
      due: "Lesson 4.2",
      category: "Wellbeing",
      notes: "Focus on students who flagged overwhelm during last seminar."
    }, {
      id: "task-inclass-2",
      title: "Capture exit ticket data on trust shifts",
      due: "Week 3 Friday",
      category: "Assessment",
      notes: "Tag students needing follow-up conversations about civic identity."
    }],
    Completed: [{
      id: "task-completed-1",
      title: "Send Week 1 family update with inquiry overview",
      due: "Week 1 Friday",
      category: "Communication",
      notes: "Shared newsletter blurb and invited families to contribute local issues."
    }]
  },
  meetings: [{
    date: "2024-04-29",
    title: "Humanities team sync",
    focus: "Align assessment checkpoints and shared rubrics.",
    agenda: ["Compare success criteria language across subjects.", "Plan moderation windows for persuasive writing."],
    actions: ["Share civic action rubric draft with team by Thursday.", "Invite colleagues to co-observe Week 3 justice lesson."],
    notes: "Common language agreed: evidence, perspective, civic impact."
  }, {
    date: "2024-05-08",
    title: "Student leadership check-in",
    focus: "Plan authentic audiences for civic action showcase.",
    agenda: ["Brainstorm community partners and logistics.", "Identify student MCs and tech support."],
    actions: ["Confirm hall booking with leadership.", "Email community partner shortlist for availability."],
    notes: "Student leaders suggested inviting the youth council representative."
  }, {
    date: "2024-05-22",
    title: "Community partner briefing",
    focus: "Prepare guests for student presentations and feedback roles.",
    agenda: ["Share success criteria and protocols with partners.", "Clarify feedback forms and timeline."],
    actions: ["Send presentation schedule and parking information.", "Prepare thank-you packs for guests."],
    notes: "Partners requested student work samples beforehand; upload exemplars to shared folder."
  }]
};

// ---- Helpers ----
const TAB_ITEMS = [{
  id: "Overview",
  label: "Overview",
  icon: "🧭",
  description: "Surface key intentions, pedagogy moves and dispositions at a glance."
}, {
  id: "Sequence",
  label: "Learning Sequence",
  icon: "🗂️",
  description: "Explore each week and lesson in a fluid, scrollable storyboard."
}, {
  id: "Planner",
  label: "Planning Hub",
  icon: "🗓️",
  description: "Coordinate weekly focus, routines, key dates and communications."
}, {
  id: "Tasks",
  label: "Task Board",
  icon: "✅",
  description: "Track preparation, in-class moves and follow-up actions."
}, {
  id: "Meetings",
  label: "Meetings",
  icon: "🤝",
  description: "Capture collaboration notes and turn them into next steps."
}, {
  id: "Assessment",
  label: "Assessment",
  icon: "📝",
  description: "Review formative checkpoints and summative tasks with evidence notes."
}, {
  id: "Curriculum",
  label: "Curriculum",
  icon: "🎓",
  description: "Toggle between ACARA and South Australian outcomes with resource links."
}, {
  id: "Differentiation",
  label: "Differentiation",
  icon: "🛠️",
  description: "Capture scaffolds, extensions and adjustments ready for planning."
}, {
  id: "Resources",
  label: "Resources",
  icon: "📚",
  description: "Keep teacher-facing notes and inspiration alongside the unit."
}];
const TAB_ACCENTS = {
  Overview: "from-sky-500/80 to-cyan-400/80",
  Sequence: "from-violet-500/80 to-fuchsia-400/70",
  Planner: "from-indigo-500/80 to-sky-400/70",
  Tasks: "from-emerald-500/80 to-teal-400/70",
  Meetings: "from-orange-500/80 to-rose-400/70",
  Assessment: "from-amber-500/80 to-orange-400/70",
  Curriculum: "from-emerald-500/80 to-lime-400/70",
  Differentiation: "from-rose-500/80 to-orange-400/70",
  Resources: "from-blue-500/80 to-indigo-400/70"
};
const classNames = (...c) => c.filter(Boolean).join(" ");
const formatDate = (dateStr, options = {
  month: "short",
  day: "numeric"
}) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }
  try {
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return dateStr;
  }
};
const formatDateWithWeekday = dateStr => formatDate(dateStr, {
  weekday: "short",
  month: "short",
  day: "numeric"
});
const generateId = () => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
const TASK_STAGES = ["Backlog", "Preparing", "In class", "Completed"];
const TASK_STAGE_META = {
  Backlog: {
    accent: "from-slate-600/40 to-slate-500/20",
    subtitle: "Ideas parked for later or future iterations."
  },
  Preparing: {
    accent: "from-sky-600/40 to-cyan-500/20",
    subtitle: "Resources, logistics and prep that need attention."
  },
  "In class": {
    accent: "from-violet-600/40 to-fuchsia-500/20",
    subtitle: "Moves happening during lessons to monitor and note."
  },
  Completed: {
    accent: "from-emerald-600/40 to-lime-500/20",
    subtitle: "Wins to celebrate and archive."
  }
};
const TASK_CATEGORIES = ["Planning", "Assessment", "Communication", "Wellbeing"];
const KEY_DATE_ICONS = {
  checkpoint: "⏱️",
  milestone: "🎯",
  workshop: "🛠️",
  showcase: "🎤",
  assessment: "📝",
  community: "🤝"
};
function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}
function BackgroundDecor() {
  return /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 overflow-hidden print:hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -left-24 top-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.4),_transparent_70%)] blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[-10%] top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.25),_transparent_70%)] blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-[-15%] left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.3),_transparent_75%)] blur-3xl"
  }));
}
function SectionCard({
  title,
  right,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-80",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-semibold text-white"
  }, title), right ? /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0"
  }, right) : null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-sm text-slate-100/90"
  }, children)));
}
function Badge({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100/80"
  }, children);
}
function PillToggle({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 shadow-inner shadow-slate-950/40",
    role: "group"
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt,
    type: "button",
    className: classNames("group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300", value === opt ? "text-slate-900" : "text-slate-300 hover:text-white"),
    onClick: () => onChange(opt),
    "aria-pressed": value === opt
  }, value === opt ? /*#__PURE__*/React.createElement("span", {
    className: classNames("absolute inset-0 -z-10 rounded-full bg-gradient-to-r shadow-glow", TAB_ACCENTS[opt] || "from-sky-500/80 to-cyan-400/80"),
    "aria-hidden": "true"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 -z-10 rounded-full bg-white/0 transition group-hover:bg-white/10",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "relative"
  }, opt))));
}
function EditableList({
  items,
  onChange,
  placeholder
}) {
  const [draft, setDraft] = useState("");
  const handleAdd = () => {
    if (!draft.trim()) return;
    onChange([...items, draft.trim()]);
    setDraft("");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "group relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100/90 transition hover:border-sky-400/40 hover:bg-sky-500/10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex-1 leading-6"
  }, t), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300 transition opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-rose-200",
    onClick: () => onChange(items.filter((_, k) => k !== i)),
    "aria-label": `Remove ${t}`
  }, "Remove")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 sm:flex-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Add item"), /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-500/40",
    placeholder: placeholder,
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAdd();
      }
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/30 transition hover:from-sky-400 hover:to-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200",
    onClick: handleAdd
  }, "Add")));
}
function LessonCard({
  lesson
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-sky-400/40 hover:bg-sky-500/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)]",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-base font-semibold text-white"
  }, lesson.title), lesson.activities?.length ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Activities"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100/80"
  }, lesson.activities.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, a)))) : null, lesson.resources?.length ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Resources"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100/80"
  }, lesson.resources.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r)))) : null));
}
function WeekBlock({
  block
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: `week-${block.week}`,
    className: "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/10 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.55)] transition hover:border-sky-400/40 hover:shadow-[0_35px_90px_rgba(56,189,248,0.35)] scroll-mt-28"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_65%)]",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-lg font-semibold text-white"
  }, "Week ", block.week, ": ", block.title), /*#__PURE__*/React.createElement(Badge, null, block.lessons?.length || 0, " lessons")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 md:grid-cols-2"
  }, block.lessons?.map((lesson, index) => /*#__PURE__*/React.createElement(LessonCard, {
    key: index,
    lesson: lesson
  })))));
}
function WeeklyFocusCard({
  focus,
  isActive,
  onSelectActive
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: classNames("relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 transition", isActive ? "border-sky-400/60 bg-sky-500/10 shadow-[0_28px_80px_rgba(56,189,248,0.35)]" : "hover:border-sky-400/40 hover:bg-sky-500/10")
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Week ", focus.week), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-base font-semibold text-white"
  }, focus.focus)), isActive ? /*#__PURE__*/React.createElement(Badge, null, "Active week") : /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSelectActive,
    className: "rounded-full border border-white/20 bg-white/0 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-white"
  }, "Set active")), focus.priorities?.length ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Priorities"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100/80"
  }, focus.priorities.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, item)))) : null, focus.checkIn ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-sky-400/40 bg-sky-500/10 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-sky-200/80"
  }, "Check-in"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm leading-6 text-slate-100/90"
  }, focus.checkIn)) : null));
}
function KeyDateTimeline({
  items
}) {
  if (!items?.length) {
    return /*#__PURE__*/React.createElement("p", {
      className: "rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300/80"
    }, "No key dates recorded yet. Add milestones to keep the schedule visible.");
  }
  const sorted = [...items].sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (Number.isNaN(aDate.getTime()) || Number.isNaN(bDate.getTime())) {
      return 0;
    }
    return aDate - bDate;
  });
  return /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, sorted.map(item => {
    const icon = KEY_DATE_ICONS[item.type] || "📌";
    return /*#__PURE__*/React.createElement("li", {
      key: `${item.date}-${item.label}`,
      className: "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
    }, formatDateWithWeekday(item.date) || "Schedule"), /*#__PURE__*/React.createElement("div", {
      className: "mt-1 text-base font-semibold text-white"
    }, item.label)), /*#__PURE__*/React.createElement("span", {
      className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/20 text-lg"
    }, icon)), item.detail ? /*#__PURE__*/React.createElement("p", {
      className: "mt-3 text-sm leading-6 text-slate-100/80"
    }, item.detail) : null, item.window ? /*#__PURE__*/React.createElement("div", {
      className: "mt-2 text-xs font-semibold uppercase tracking-wide text-slate-300/70"
    }, "Window: ", item.window) : null);
  }));
}
function RoutineCard({
  routine
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border border-white/10 bg-white/5 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-semibold text-white"
  }, routine.title), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, routine.timing))), routine.checklist?.length ? /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100/80"
  }, routine.checklist.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, item))) : null);
}
function TaskCard({
  task,
  previousStatus,
  nextStatus,
  onMovePrev,
  onMoveNext,
  onDelete
}) {
  const actionButton = "rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-sky-400/60 hover:text-white";
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-white/10 bg-slate-950/40 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-semibold text-white"
  }, task.title), task.category ? /*#__PURE__*/React.createElement(Badge, null, task.category) : null), task.due ? /*#__PURE__*/React.createElement("span", {
    className: "rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-100"
  }, "Due: ", task.due) : null), task.notes ? /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm leading-6 text-slate-100/80"
  }, task.notes) : null, /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-wrap gap-2"
  }, previousStatus ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: actionButton,
    onClick: onMovePrev
  }, "\u2190 ", previousStatus) : null, nextStatus ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: actionButton,
    onClick: onMoveNext
  }, nextStatus, " \u2192") : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-200 transition hover:border-rose-300/60 hover:bg-rose-500/10",
    onClick: onDelete
  }, "Remove")));
}
function TaskColumn({
  status,
  tasks,
  onAddTask,
  onMoveTask,
  onDeleteTask,
  previousStatus,
  nextStatus
}) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [category, setCategory] = useState(TASK_CATEGORIES[0]);
  const [notes, setNotes] = useState("");
  const meta = TASK_STAGE_META[status] || {};
  const baseId = status.replace(/\s+/g, "-").toLowerCase();
  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(status, {
      title: title.trim(),
      due: due.trim(),
      category,
      notes: notes.trim()
    });
    setTitle("");
    setDue("");
    setNotes("");
    setCategory(TASK_CATEGORIES[0]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classNames("flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br p-4 shadow-[0_24px_70px_rgba(15,23,42,0.55)] backdrop-blur-xl", meta.accent || "from-slate-700/40 to-slate-800/20")
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-semibold text-white"
  }, status), meta.subtitle ? /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, meta.subtitle) : null), /*#__PURE__*/React.createElement(Badge, null, tasks.length, " ", tasks.length === 1 ? "task" : "tasks")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, tasks.map(task => /*#__PURE__*/React.createElement(TaskCard, {
    key: task.id,
    task: task,
    previousStatus: previousStatus,
    nextStatus: nextStatus,
    onMovePrev: previousStatus ? () => onMoveTask(status, previousStatus, task.id) : undefined,
    onMoveNext: nextStatus ? () => onMoveTask(status, nextStatus, task.id) : undefined,
    onDelete: () => onDeleteTask(status, task.id)
  })), tasks.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300/80"
  }, "No tasks in this lane yet.") : null), /*#__PURE__*/React.createElement("form", {
    className: "mt-auto space-y-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "sr-only",
    htmlFor: `${baseId}-title`
  }, "Task title"), /*#__PURE__*/React.createElement("input", {
    id: `${baseId}-title`,
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    placeholder: "Add a task title\u2026",
    value: title,
    onChange: e => setTitle(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-2 sm:grid-cols-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "sr-only",
    htmlFor: `${baseId}-due`
  }, "Due"), /*#__PURE__*/React.createElement("input", {
    id: `${baseId}-due`,
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    placeholder: "Due / week",
    value: due,
    onChange: e => setDue(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "sr-only",
    htmlFor: `${baseId}-category`
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    id: `${baseId}-category`,
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    value: category,
    onChange: e => setCategory(e.target.value)
  }, TASK_CATEGORIES.map(cat => /*#__PURE__*/React.createElement("option", {
    key: cat,
    value: cat
  }, cat))))), /*#__PURE__*/React.createElement("label", {
    className: "sr-only",
    htmlFor: `${baseId}-notes`
  }, "Notes"), /*#__PURE__*/React.createElement("textarea", {
    id: `${baseId}-notes`,
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    placeholder: "Notes or reminders (optional)",
    rows: 3,
    value: notes,
    onChange: e => setNotes(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/30 transition hover:from-sky-400 hover:to-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
  }, "Add task")));
}
function TaskBoard({
  board,
  onAddTask,
  onMoveTask,
  onDeleteTask
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4"
  }, TASK_STAGES.map((status, index) => /*#__PURE__*/React.createElement(TaskColumn, {
    key: status,
    status: status,
    tasks: board?.[status] || [],
    previousStatus: index > 0 ? TASK_STAGES[index - 1] : undefined,
    nextStatus: index < TASK_STAGES.length - 1 ? TASK_STAGES[index + 1] : undefined,
    onAddTask: onAddTask,
    onMoveTask: onMoveTask,
    onDeleteTask: onDeleteTask
  })));
}
function MeetingCard({
  meeting,
  index,
  onUpdateActions
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border border-white/10 bg-white/5 p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, formatDateWithWeekday(meeting.date) || "Meeting"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-semibold text-white"
  }, meeting.title), meeting.focus ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm leading-6 text-slate-100/80"
  }, meeting.focus) : null), /*#__PURE__*/React.createElement(Badge, null, meeting.actions?.length || 0, " actions")), meeting.agenda?.length ? /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Agenda"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100/80"
  }, meeting.agenda.map((item, itemIndex) => /*#__PURE__*/React.createElement("li", {
    key: itemIndex
  }, item)))) : null, /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Action items"), /*#__PURE__*/React.createElement(EditableList, {
    items: meeting.actions || [],
    onChange: value => onUpdateActions(index, value),
    placeholder: "Add a follow-up step\u2026"
  })), meeting.notes ? /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Notes"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm leading-6 text-slate-100/80"
  }, meeting.notes)) : null);
}
function ActionSummary({
  items
}) {
  if (!items?.length) {
    return /*#__PURE__*/React.createElement("p", {
      className: "rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300/80"
    }, "No follow-up actions recorded yet. Capture meeting actions to build momentum.");
  }
  return /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, items.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: `${item.meeting}-${index}`,
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-semibold text-white"
  }, item.action), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "From: ", item.meeting))));
}
function Toolbar({
  plan,
  setPlan
}) {
  const fileRef = useRef(null);
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.meta.title.replace(/[^a-z0-9]+/gi, "-")}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const importJSON = file => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setPlan(data);
      } catch (e) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };
  const baseButton = "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-sky-400/50 hover:bg-sky-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300";
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => window.print(),
    className: baseButton
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative z-10 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDDA8\uFE0F"), /*#__PURE__*/React.createElement("span", null, "Print")), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-white/10 to-transparent",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: exportJSON,
    className: baseButton
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative z-10 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement("span", null, "Export JSON")), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-sky-500/20 to-transparent",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => fileRef.current?.click(),
    className: baseButton
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative z-10 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCC2"), /*#__PURE__*/React.createElement("span", null, "Import")), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-cyan-500/20 to-transparent",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "application/json",
    className: "hidden",
    onChange: e => e.target.files?.[0] && importJSON(e.target.files[0])
  }));
}
function MetaField({
  label,
  value,
  editing,
  onChange,
  multiline = false,
  type = "text"
}) {
  const inputClass = "w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60";
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, label), editing ? multiline ? /*#__PURE__*/React.createElement("textarea", {
    className: inputClass,
    rows: 3,
    value: value,
    onChange: e => onChange(e.target.value)
  }) : /*#__PURE__*/React.createElement("input", {
    className: inputClass,
    type: type,
    value: value,
    onChange: e => onChange(e.target.value)
  }) : /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-white/90"
  }, value));
}
function PlanHero({
  plan,
  onMetaChange,
  editMeta,
  setEditMeta,
  onCurriculumChange,
  setPlan,
  onActiveWeekChange
}) {
  const organisation = plan.organisation || {};
  const weeklyFocus = organisation.weeklyFocus || [];
  const activeWeek = organisation.activeWeek ?? weeklyFocus[0]?.week ?? plan.sequence?.[0]?.week ?? 1;
  const activeFocus = weeklyFocus.find(f => f.week === activeWeek) || weeklyFocus[0];
  const handleActiveWeekChange = value => {
    const numericValue = typeof value === "number" ? value : parseInt(value, 10);
    const nextValue = Number.isNaN(numericValue) ? value : numericValue;
    if (typeof onActiveWeekChange === "function") {
      onActiveWeekChange(nextValue);
    } else if (setPlan) {
      setPlan(prev => ({
        ...prev,
        organisation: {
          ...(prev.organisation || {}),
          activeWeek: nextValue
        }
      }));
    }
  };
  const upcomingMilestone = useMemo(() => {
    const keyDates = organisation.keyDates || [];
    if (!keyDates.length) return null;
    const sorted = [...keyDates].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      if (Number.isNaN(aDate.getTime()) || Number.isNaN(bDate.getTime())) {
        return 0;
      }
      return aDate - bDate;
    });
    const now = new Date();
    const upcoming = sorted.find(item => {
      const date = new Date(item.date);
      return !Number.isNaN(date.getTime()) && date >= now;
    });
    return upcoming || sorted[sorted.length - 1];
  }, [organisation.keyDates]);
  const milestoneIcon = upcomingMilestone ? KEY_DATE_ICONS[upcomingMilestone.type] || "📌" : "📌";
  return /*#__PURE__*/React.createElement("div", {
    className: "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-slate-900/60 to-slate-950/80 p-7 shadow-[0_30px_80px_rgba(2,6,23,0.6)] backdrop-blur-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 opacity-70 mix-blend-screen",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-0 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,_rgba(125,211,252,0.45),_transparent_70%)] blur-2xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.35),_transparent_70%)] blur-2xl"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-3"
  }, editMeta ? /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-2xl font-semibold text-white placeholder:text-slate-300 focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    value: plan.meta.title,
    onChange: e => onMetaChange("title", e.target.value)
  }) : /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-semibold text-white sm:text-4xl"
  }, plan.meta.title), editMeta ? /*#__PURE__*/React.createElement("textarea", {
    className: "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:border-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    rows: 3,
    value: plan.meta.subtitle,
    onChange: e => onMetaChange("subtitle", e.target.value)
  }) : /*#__PURE__*/React.createElement("p", {
    className: "max-w-xl text-sm text-slate-100/80 sm:text-base"
  }, plan.meta.subtitle)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setEditMeta(s => !s),
    className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-sky-400/50 hover:bg-sky-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative z-10 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, editMeta ? "✅" : "✏️"), /*#__PURE__*/React.createElement("span", null, editMeta ? "Done" : "Quick edit")), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-white/10 to-transparent",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 lg:grid-cols-[1.2fr,0.8fr]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 sm:grid-cols-2"
  }, /*#__PURE__*/React.createElement(MetaField, {
    label: "Duration",
    value: plan.meta.duration,
    editing: editMeta,
    onChange: val => onMetaChange("duration", val)
  }), /*#__PURE__*/React.createElement(MetaField, {
    label: "Author",
    value: plan.meta.author,
    editing: editMeta,
    onChange: val => onMetaChange("author", val)
  }), /*#__PURE__*/React.createElement(MetaField, {
    label: "School",
    value: plan.meta.school,
    editing: editMeta,
    onChange: val => onMetaChange("school", val)
  }), /*#__PURE__*/React.createElement(MetaField, {
    label: "Last updated",
    value: plan.meta.lastUpdated,
    editing: editMeta,
    onChange: val => onMetaChange("lastUpdated", val),
    type: "date"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-slate-950/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Upcoming milestone"), upcomingMilestone ? /*#__PURE__*/React.createElement("div", {
    className: "mt-1 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-100/80"
  }, formatDateWithWeekday(upcomingMilestone.date) || "Schedule"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-semibold text-white"
  }, upcomingMilestone.label)) : /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm leading-6 text-slate-100/70"
  }, "Add a key date to surface your next checkpoint.")), /*#__PURE__*/React.createElement("span", {
    className: "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/20 text-xl"
  }, milestoneIcon)), upcomingMilestone?.detail ? /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm leading-6 text-slate-100/80"
  }, upcomingMilestone.detail) : null, upcomingMilestone?.window ? /*#__PURE__*/React.createElement("div", {
    className: "mt-3 text-xs font-semibold uppercase tracking-wide text-slate-300/70"
  }, "Window: ", upcomingMilestone.window) : null), /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-slate-950/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Active week focus"), activeFocus ? /*#__PURE__*/React.createElement("div", {
    className: "mt-1 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-100/80"
  }, "Week ", activeFocus.week), /*#__PURE__*/React.createElement("p", {
    className: "text-base font-semibold text-white"
  }, activeFocus.focus)) : /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm leading-6 text-slate-100/70"
  }, "Capture weekly focus notes to anchor your planning rhythm.")), weeklyFocus.length ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-end gap-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80",
    htmlFor: "active-week-select"
  }, "Active week"), /*#__PURE__*/React.createElement("select", {
    id: "active-week-select",
    className: "rounded-full border border-white/15 bg-slate-950/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-100 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/60",
    value: activeWeek,
    onChange: e => handleActiveWeekChange(Number(e.target.value))
  }, weeklyFocus.map(focus => /*#__PURE__*/React.createElement("option", {
    key: focus.week,
    value: focus.week
  }, "Week ", focus.week)))) : null), activeFocus?.priorities?.length ? /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Priorities"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100/80"
  }, activeFocus.priorities.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, item)))) : null, activeFocus?.checkIn ? /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-2xl border border-sky-400/40 bg-sky-500/10 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-sky-200/80"
  }, "Check-in"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm leading-6 text-slate-100/90"
  }, activeFocus.checkIn)) : null))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70"
  }, "Curriculum view"), /*#__PURE__*/React.createElement(PillToggle, {
    options: ["SA", "ACARA"],
    value: plan.curriculumView,
    onChange: onCurriculumChange
  })), /*#__PURE__*/React.createElement(Toolbar, {
    plan: plan,
    setPlan: setPlan
  }))));
}
function TabBar({
  tabs,
  current,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-full border border-white/10 bg-white/5 p-2 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row flex-wrap items-center gap-2 overflow-x-auto no-scrollbar",
    role: "tablist"
  }, tabs.map((tab, index) => {
    const active = current === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      id: `tab-${tab.id}`,
      type: "button",
      role: "tab",
      "aria-selected": active,
      "aria-controls": active ? `${tab.id}-panel` : undefined,
      onClick: () => onChange(tab.id),
      onKeyDown: e => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const next = (index + 1) % tabs.length;
          onChange(tabs[next].id);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prev = (index - 1 + tabs.length) % tabs.length;
          onChange(tabs[prev].id);
        }
      },
      className: classNames("group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300", active ? "text-slate-900" : "text-slate-300 hover:text-white")
    }, active ? /*#__PURE__*/React.createElement("span", {
      className: classNames("absolute inset-0 -z-10 rounded-full bg-gradient-to-r", TAB_ACCENTS[tab.id] || "from-sky-500/80 to-cyan-400/80", "shadow-[0_12px_40px_rgba(56,189,248,0.35)]"),
      "aria-hidden": "true"
    }) : /*#__PURE__*/React.createElement("span", {
      className: "absolute inset-0 -z-10 rounded-full bg-white/0 transition group-hover:bg-white/10",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-lg"
    }, tab.icon), /*#__PURE__*/React.createElement("span", {
      className: "relative"
    }, tab.label));
  })));
}
function App() {
  const [plan, setPlan] = useLocalStorage("yr9-civics-plan", DEFAULT_PLAN);
  const [tab, setTab] = useState(TAB_ITEMS[0].id);
  const [editMeta, setEditMeta] = useState(false);
  const [focusWeek, setFocusWeek] = useState(null);
  const totalLessons = useMemo(() => plan.sequence.reduce((sum, week) => sum + (week.lessons?.length || 0), 0), [plan.sequence]);
  const totalAssessments = useMemo(() => plan.assessment.formative.length + plan.assessment.summative.length, [plan.assessment.formative, plan.assessment.summative]);
  const currentTab = TAB_ITEMS.find(t => t.id === tab) || TAB_ITEMS[0];
  const organisation = plan.organisation || {};
  const weeklyFocus = organisation.weeklyFocus || [];
  const routines = organisation.routines || [];
  const communications = organisation.communications || [];
  const wellbeingPrompts = organisation.wellbeingPrompts || [];
  const keyDates = organisation.keyDates || [];
  const activeWeek = organisation.activeWeek ?? weeklyFocus[0]?.week ?? plan.sequence?.[0]?.week ?? 1;
  const tasksBoard = plan.tasksBoard || {};
  const meetingCount = plan.meetings?.length || 0;
  const totalKeyDates = keyDates.length;
  const pendingTasks = useMemo(() => Object.entries(plan.tasksBoard || {}).reduce((sum, [status, tasks]) => sum + (status === "Completed" ? 0 : tasks.length), 0), [plan.tasksBoard]);
  const meetingActions = useMemo(() => (plan.meetings || []).flatMap(meeting => (meeting.actions || []).map(action => ({
    meeting: meeting.title,
    action
  }))), [plan.meetings]);
  useEffect(() => {
    if (tab === "Sequence" && focusWeek != null) {
      requestAnimationFrame(() => {
        const el = document.getElementById(`week-${focusWeek}`);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
        setFocusWeek(null);
      });
    }
  }, [tab, focusWeek]);
  const onMetaChange = (key, value) => setPlan(prev => ({
    ...prev,
    meta: {
      ...prev.meta,
      [key]: value
    }
  }));
  const setActiveWeek = weekValue => {
    const numericValue = typeof weekValue === "number" ? weekValue : parseInt(weekValue, 10);
    const nextValue = Number.isNaN(numericValue) ? weekValue : numericValue;
    setPlan(prev => ({
      ...prev,
      organisation: {
        ...(prev.organisation || {}),
        activeWeek: nextValue
      }
    }));
  };
  const updateOrganisationList = (field, value) => {
    setPlan(prev => ({
      ...prev,
      organisation: {
        ...(prev.organisation || {}),
        [field]: value
      }
    }));
  };
  const handleAddTask = (status, task) => {
    setPlan(prev => {
      const board = prev.tasksBoard || {};
      const newTask = {
        ...task,
        id: generateId()
      };
      return {
        ...prev,
        tasksBoard: {
          ...board,
          [status]: [...(board[status] || []), newTask]
        }
      };
    });
  };
  const handleMoveTask = (fromStatus, toStatus, taskId) => {
    if (fromStatus === toStatus) return;
    setPlan(prev => {
      const board = prev.tasksBoard || {};
      const fromTasks = board[fromStatus] || [];
      const taskToMove = fromTasks.find(task => task.id === taskId);
      if (!taskToMove) {
        return prev;
      }
      return {
        ...prev,
        tasksBoard: {
          ...board,
          [fromStatus]: fromTasks.filter(task => task.id !== taskId),
          [toStatus]: [...(board[toStatus] || []), taskToMove]
        }
      };
    });
  };
  const handleDeleteTask = (status, taskId) => {
    setPlan(prev => {
      const board = prev.tasksBoard || {};
      if (!board[status]) {
        return prev;
      }
      return {
        ...prev,
        tasksBoard: {
          ...board,
          [status]: board[status].filter(task => task.id !== taskId)
        }
      };
    });
  };
  const handleUpdateMeetingActions = (index, actions) => {
    setPlan(prev => {
      const meetings = prev.meetings ? [...prev.meetings] : [];
      if (!meetings[index]) {
        return prev;
      }
      meetings[index] = {
        ...meetings[index],
        actions
      };
      return {
        ...prev,
        meetings
      };
    });
  };
  const metrics = [{
    label: "Weeks",
    value: plan.sequence.length
  }, {
    label: "Lessons",
    value: totalLessons
  }, {
    label: "Assessments",
    value: totalAssessments
  }, {
    label: "Success criteria",
    value: plan.successCriteria.length
  }, {
    label: "Key dates",
    value: totalKeyDates
  }, {
    label: "Active tasks",
    value: pendingTasks
  }, {
    label: "Meetings",
    value: meetingCount
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "relative min-h-screen overflow-hidden pb-16"
  }, /*#__PURE__*/React.createElement(BackgroundDecor, null), /*#__PURE__*/React.createElement("div", {
    className: "relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-8 lg:grid-cols-[320px,1fr] xl:grid-cols-[360px,1fr]"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(PlanHero, {
    plan: plan,
    onMetaChange: onMetaChange,
    editMeta: editMeta,
    setEditMeta: setEditMeta,
    onCurriculumChange: view => setPlan(prev => ({
      ...prev,
      curriculumView: view
    })),
    onActiveWeekChange: setActiveWeek,
    setPlan: setPlan
  }), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Plan at a glance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-sm"
  }, metrics.map(metric => /*#__PURE__*/React.createElement("div", {
    key: metric.label,
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-slate-950/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, metric.label), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-2xl font-semibold text-white"
  }, metric.value)))), /*#__PURE__*/React.createElement("div", {
    className: "pt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Dispositions"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex flex-wrap gap-2"
  }, plan.dispositions.map(d => /*#__PURE__*/React.createElement(Badge, {
    key: d.name
  }, d.name))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Quick sequence access"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-300/90"
  }, "Jump to a week to edit or review lessons. The Sequence tab will open and scroll to your selection."), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-2"
  }, plan.sequence.map(week => /*#__PURE__*/React.createElement("button", {
    key: week.week,
    type: "button",
    onClick: () => {
      setTab("Sequence");
      setFocusWeek(week.week);
    },
    className: "group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left transition hover:border-sky-400/50 hover:bg-sky-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Week ", week.week), /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-semibold text-white group-hover:text-sky-100"
  }, week.title)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80 group-hover:text-sky-100"
  }, week.lessons?.length || 0, " lessons")))))), /*#__PURE__*/React.createElement("section", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(TabBar, {
    tabs: TAB_ITEMS,
    current: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-300/90"
  }, currentTab.description)), tab === "Overview" && /*#__PURE__*/React.createElement("div", {
    id: "Overview-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Overview",
    className: "grid gap-6 xl:grid-cols-2"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Learning intentions"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.learningIntentions,
    onChange: v => setPlan(prev => ({
      ...prev,
      learningIntentions: v
    })),
    placeholder: "Add a learning intention\u2026"
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Success criteria"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.successCriteria,
    onChange: v => setPlan(prev => ({
      ...prev,
      successCriteria: v
    })),
    placeholder: "Add a success criterion\u2026"
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Pedagogical moves"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.pedagogy,
    onChange: v => setPlan(prev => ({
      ...prev,
      pedagogy: v
    })),
    placeholder: "Add a pedagogy note\u2026"
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Dispositions (SA)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3 text-sm text-slate-100/90"
  }, plan.dispositions.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, d.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6"
  }, d.notes))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Capabilities focus"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3 text-sm text-slate-100/90"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Critical inquiry"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6"
  }, plan.capabilities.CriticalInquiry.join(" • "))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Analysis & evaluation"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6"
  }, plan.capabilities.AnalysisEvaluation.join(" • "))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Civic participation"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6"
  }, plan.capabilities.CivicParticipation.join(" • "))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Communicating"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6"
  }, plan.capabilities.Communicating.join(" • ")))))), tab === "Planner" && /*#__PURE__*/React.createElement("div", {
    id: "Planner-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Planner",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Weekly focus rhythm",
    right: weeklyFocus.length ? /*#__PURE__*/React.createElement(Badge, null, "Active week ", activeWeek) : null
  }, weeklyFocus.length ? /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 lg:grid-cols-2"
  }, weeklyFocus.map(focus => /*#__PURE__*/React.createElement(WeeklyFocusCard, {
    key: focus.week,
    focus: focus,
    isActive: focus.week === activeWeek,
    onSelectActive: () => setActiveWeek(focus.week)
  }))) : /*#__PURE__*/React.createElement("p", {
    className: "rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300/80"
  }, "Add weekly focus notes to guide your planning.")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.2fr,0.8fr]"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Key date timeline",
    right: totalKeyDates ? /*#__PURE__*/React.createElement(Badge, null, totalKeyDates, totalKeyDates === 1 ? " key date" : " key dates") : null
  }, /*#__PURE__*/React.createElement(KeyDateTimeline, {
    items: keyDates
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Weekly routines",
    right: routines.length ? /*#__PURE__*/React.createElement(Badge, null, routines.length, routines.length === 1 ? " routine" : " routines") : null
  }, routines.length ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, routines.map((routine, index) => /*#__PURE__*/React.createElement(RoutineCard, {
    key: `${routine.title}-${index}`,
    routine: routine
  }))) : /*#__PURE__*/React.createElement("p", {
    className: "rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300/80"
  }, "No routines recorded yet. Capture your weekly anchors.")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Communication pulses"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: communications,
    onChange: value => updateOrganisationList("communications", value),
    placeholder: "Add a communication reminder\u2026"
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Wellbeing prompts"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: wellbeingPrompts,
    onChange: value => updateOrganisationList("wellbeingPrompts", value),
    placeholder: "Add a wellbeing reminder\u2026"
  }))))), tab === "Tasks" && /*#__PURE__*/React.createElement("div", {
    id: "Tasks-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Tasks",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Teacher task board",
    right: /*#__PURE__*/React.createElement(Badge, null, pendingTasks, pendingTasks === 1 ? " active task" : " active tasks")
  }, /*#__PURE__*/React.createElement(TaskBoard, {
    board: tasksBoard,
    onAddTask: handleAddTask,
    onMoveTask: handleMoveTask,
    onDeleteTask: handleDeleteTask
  }))), tab === "Meetings" && /*#__PURE__*/React.createElement("div", {
    id: "Meetings-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Meetings",
    className: "grid gap-6 xl:grid-cols-[1.2fr,0.8fr]"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Collaboration log",
    right: meetingCount ? /*#__PURE__*/React.createElement(Badge, null, meetingCount, meetingCount === 1 ? " meeting" : " meetings") : null
  }, plan.meetings?.length ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, plan.meetings.map((meeting, index) => /*#__PURE__*/React.createElement(MeetingCard, {
    key: `${meeting.title}-${meeting.date}-${index}`,
    meeting: meeting,
    index: index,
    onUpdateActions: handleUpdateMeetingActions
  }))) : /*#__PURE__*/React.createElement("p", {
    className: "rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300/80"
  }, "No meetings recorded yet. Capture agendas and actions to keep collaborators aligned.")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Action tracker",
    right: meetingActions.length ? /*#__PURE__*/React.createElement(Badge, null, meetingActions.length, meetingActions.length === 1 ? " action" : " actions") : null
  }, /*#__PURE__*/React.createElement(ActionSummary, {
    items: meetingActions
  }))), tab === "Sequence" && /*#__PURE__*/React.createElement("div", {
    id: "Sequence-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Sequence",
    className: "space-y-5"
  }, plan.sequence.map((block, i) => /*#__PURE__*/React.createElement(WeekBlock, {
    key: i,
    block: block
  }))), tab === "Assessment" && /*#__PURE__*/React.createElement("div", {
    id: "Assessment-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Assessment",
    className: "grid gap-6 xl:grid-cols-2"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Formative assessment"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 text-sm text-slate-100/90"
  }, plan.assessment.formative.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-base font-semibold text-white"
  }, a.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6 text-slate-100/80"
  }, a.description), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Evidence: ", a.evidence))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Summative assessment"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 text-sm text-slate-100/90"
  }, plan.assessment.summative.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-base font-semibold text-white"
  }, a.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6 text-slate-100/80"
  }, a.description), a.criteria?.length ? /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Criteria: ", a.criteria.join(" • ")) : null, /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, "Evidence: ", a.evidence)))))), tab === "Curriculum" && /*#__PURE__*/React.createElement("div", {
    id: "Curriculum-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Curriculum",
    className: "grid gap-6 xl:grid-cols-2"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: plan.curriculumView === "SA" ? "SA curriculum links" : "ACARA links"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 text-sm text-slate-100/90"
  }, (plan.curriculumView === "SA" ? plan.curriculumLinks.SA : plan.curriculumLinks.ACARA).map(c => /*#__PURE__*/React.createElement("div", {
    key: c.code,
    className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold uppercase tracking-wide text-slate-300/80"
  }, c.code), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 leading-6"
  }, c.text))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Learning resources"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.resources,
    onChange: v => setPlan(prev => ({
      ...prev,
      resources: v
    })),
    placeholder: "Add a resource or link description\u2026"
  }))), tab === "Differentiation" && /*#__PURE__*/React.createElement("div", {
    id: "Differentiation-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Differentiation"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Adjustments & differentiation"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.differentiation,
    onChange: v => setPlan(prev => ({
      ...prev,
      differentiation: v
    })),
    placeholder: "Add an adjustment idea\u2026"
  }))), tab === "Resources" && /*#__PURE__*/React.createElement("div", {
    id: "Resources-panel",
    role: "tabpanel",
    "aria-labelledby": "tab-Resources",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Teacher notes"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm leading-6 text-slate-100/80"
  }, "Use the export action to save a JSON snapshot of the plan, re-import when you are ready to iterate, and print for PDP evidence or team collaboration."), /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-100/80"
  }, /*#__PURE__*/React.createElement("li", null, "Action project ideas: student voice survey, fairness policy explainer, media literacy mini-campaign, peer court role-play."), /*#__PURE__*/React.createElement("li", null, "Integrate digital tools that students enjoy (Canva, collaborative slides, Minecraft builds of democratic spaces)."), /*#__PURE__*/React.createElement("li", null, "Revisit norms for principled dialogue\u2014respect, evidence and turn-taking\u2014to nurture democratic dispositions."))))))), /*#__PURE__*/React.createElement("footer", {
    className: "relative mx-auto mt-12 w-full max-w-7xl px-4 pb-8 text-xs text-slate-400 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-xl"
  }, "\xA9 ", new Date().getFullYear(), " Unit plan scaffold \u2022 Aligned to ACARA & South Australian Curriculum (Year 9 Civics & Citizenship).")), /*#__PURE__*/React.createElement("style", null, `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
        }
      `));
}
const root = createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));
