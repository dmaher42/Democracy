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
  resources: ["PEO: Australian Constitution resources", "Federal Parliament Education Office: law-making process materials", "Local council website (civic participation examples)", "ABC Education media literacy lessons"]
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
  Assessment: "from-amber-500/80 to-orange-400/70",
  Curriculum: "from-emerald-500/80 to-lime-400/70",
  Differentiation: "from-rose-500/80 to-orange-400/70",
  Resources: "from-blue-500/80 to-indigo-400/70"
};
const classNames = (...c) => c.filter(Boolean).join(" ");
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
  setPlan
}) {
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
export default function App() {
  const [plan, setPlan] = useLocalStorage("yr9-civics-plan", DEFAULT_PLAN);
  const [tab, setTab] = useState(TAB_ITEMS[0].id);
  const [editMeta, setEditMeta] = useState(false);
  const [focusWeek, setFocusWeek] = useState(null);
  const totalLessons = useMemo(() => plan.sequence.reduce((sum, week) => sum + (week.lessons?.length || 0), 0), [plan.sequence]);
  const totalAssessments = useMemo(() => plan.assessment.formative.length + plan.assessment.summative.length, [plan.assessment.formative, plan.assessment.summative]);
  const currentTab = TAB_ITEMS.find(t => t.id === tab) || TAB_ITEMS[0];
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
  const metrics = [{
    label: "Weeks",
    value: plan.sequence.length
  }, {
    label: "Lessons",
    value: totalLessons
  }, {
    label: "Success criteria",
    value: plan.successCriteria.length
  }, {
    label: "Assessments",
    value: totalAssessments
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
  }, plan.capabilities.Communicating.join(" • ")))))), tab === "Sequence" && /*#__PURE__*/React.createElement("div", {
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
