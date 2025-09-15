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

// ---- Components ----
function SectionCard({
  title,
  right,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white/80 backdrop-blur rounded-2xl shadow p-5 border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-semibold tracking-tight"
  }, title), right), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 prose prose-slate max-w-none"
  }, children));
}
function Badge({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-slate-300 bg-slate-50"
  }, children);
}
function PillToggle({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "inline-flex rounded-2xl border border-slate-300 bg-slate-100 p-1"
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt,
    className: classNames("px-3 py-1.5 text-sm rounded-xl", value === opt ? "bg-white shadow font-semibold" : "text-slate-600"),
    onClick: () => onChange(opt)
  }, opt)));
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-1"
  }, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "group flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex-1"
  }, t), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Delete",
    className: "opacity-0 group-hover:opacity-100 text-xs text-red-600",
    onClick: () => onChange(items.filter((_, k) => k !== i))
  }, "remove")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex gap-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Add item"), /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-xl border border-slate-300 px-3 py-2",
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
    className: "rounded-xl px-3 py-2 bg-slate-900 text-white",
    onClick: handleAdd
  }, "Add")));
}
function LessonCard({
  lesson
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, lesson.title), lesson.activities?.length ? /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium"
  }, "Activities"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 text-sm space-y-1"
  }, lesson.activities.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, a)))) : null, lesson.resources?.length ? /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium"
  }, "Resources"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 text-sm space-y-1"
  }, lesson.resources.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r)))) : null);
}
function WeekBlock({
  block
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 p-5 bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-lg font-semibold"
  }, "Week ", block.week, ": ", block.title), /*#__PURE__*/React.createElement(Badge, null, block.lessons?.length || 0, " lessons")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4 mt-3"
  }, block.lessons?.map((lsn, i) => /*#__PURE__*/React.createElement(LessonCard, {
    key: i,
    lesson: lsn
  }))));
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
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    className: "rounded-xl px-3 py-2 bg-white border border-slate-300"
  }, "Print"), /*#__PURE__*/React.createElement("button", {
    onClick: exportJSON,
    className: "rounded-xl px-3 py-2 bg-white border border-slate-300"
  }, "Export JSON"), /*#__PURE__*/React.createElement("button", {
    onClick: () => fileRef.current?.click(),
    className: "rounded-xl px-3 py-2 bg-white border border-slate-300"
  }, "Import JSON"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "application/json",
    className: "hidden",
    onChange: e => e.target.files?.[0] && importJSON(e.target.files[0])
  }));
}
export default function App() {
  const [plan, setPlan] = useLocalStorage("yr9-civics-plan", DEFAULT_PLAN);
  const [tab, setTab] = useState("Overview");
  const [editMeta, setEditMeta] = useState(false);
  const tabs = ["Overview", "Sequence", "Assessment", "Curriculum", "Differentiation", "Resources"];
  const onMetaChange = (key, value) => setPlan({
    ...plan,
    meta: {
      ...plan.meta,
      [key]: value
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-10 border-b border-slate-200 backdrop-blur bg-white/70"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4 justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold tracking-tight"
  }, plan.meta.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, plan.meta.subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    plan: plan,
    setPlan: setPlan
  })))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-6xl mx-auto p-4 space-y-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Unit Details",
    right: /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement(PillToggle, {
      options: ["SA", "ACARA"],
      value: plan.curriculumView,
      onChange: v => setPlan({
        ...plan,
        curriculumView: v
      })
    }), /*#__PURE__*/React.createElement("button", {
      className: "rounded-xl px-3 py-1.5 bg-slate-900 text-white",
      onClick: () => setEditMeta(s => !s)
    }, editMeta ? "Done" : "Quick Edit"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, editMeta ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs uppercase text-slate-500"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-xl border px-3 py-2",
    value: plan.meta.title,
    onChange: e => onMetaChange("title", e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs uppercase text-slate-500"
  }, "Inquiry / Subtitle"), /*#__PURE__*/React.createElement("textarea", {
    className: "w-full rounded-xl border px-3 py-2",
    rows: 3,
    value: plan.meta.subtitle,
    onChange: e => onMetaChange("subtitle", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs uppercase text-slate-500"
  }, "Duration"), /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-xl border px-3 py-2",
    value: plan.meta.duration,
    onChange: e => onMetaChange("duration", e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs uppercase text-slate-500"
  }, "Author"), /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-xl border px-3 py-2",
    value: plan.meta.author,
    onChange: e => onMetaChange("author", e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs uppercase text-slate-500"
  }, "Updated"), /*#__PURE__*/React.createElement("input", {
    className: "w-full rounded-xl border px-3 py-2",
    value: plan.meta.lastUpdated,
    onChange: e => onMetaChange("lastUpdated", e.target.value)
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-sm"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Duration:"), " ", plan.meta.duration), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Author:"), " ", plan.meta.author), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "School:"), " ", plan.meta.school), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Last updated:"), " ", plan.meta.lastUpdated))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Dispositions:"), " ", plan.dispositions.map(d => d.name).join(", ")), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Capabilities:"), " Critical inquiry \xB7 Ethical understanding \xB7 Intercultural understanding"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium"
  }, "Learning Intentions"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 text-sm space-y-1"
  }, plan.learningIntentions.map((li, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, li))))))), /*#__PURE__*/React.createElement("nav", {
    className: "flex flex-wrap gap-2"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    className: classNames("px-4 py-2 rounded-xl border", tab === t ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-300")
  }, t))), tab === "Overview" && /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Success Criteria"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.successCriteria,
    onChange: v => setPlan({
      ...plan,
      successCriteria: v
    }),
    placeholder: "Add a success criterion\u2026"
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Unit Pedagogy (Visible Learning)"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.pedagogy,
    onChange: v => setPlan({
      ...plan,
      pedagogy: v
    }),
    placeholder: "Add a pedagogy note\u2026"
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Dispositions (SA)"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, plan.dispositions.map((d, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, d.name, ":"), " ", d.notes)))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Capabilities"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Critical inquiry:"), " ", plan.capabilities.CriticalInquiry.join("; ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Analysis & evaluation:"), " ", plan.capabilities.AnalysisEvaluation.join("; ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Civic participation:"), " ", plan.capabilities.CivicParticipation.join("; ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Communicating:"), " ", plan.capabilities.Communicating.join("; "))))), tab === "Sequence" && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, plan.sequence.map((w, i) => /*#__PURE__*/React.createElement(WeekBlock, {
    key: i,
    block: w
  }))), tab === "Assessment" && /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Formative Assessment"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, plan.assessment.formative.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, a.description), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "Evidence: ", a.evidence))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Summative Assessment"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, plan.assessment.summative.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, a.description), a.criteria?.length ? /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "Criteria: ", a.criteria.join(" · ")) : null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "Evidence: ", a.evidence)))))), tab === "Curriculum" && /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: plan.curriculumView === "SA" ? "SA Curriculum Links" : "ACARA Links"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, (plan.curriculumView === "SA" ? plan.curriculumLinks.SA : plan.curriculumLinks.ACARA).map(c => /*#__PURE__*/React.createElement("li", {
    key: c.code
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, c.code, ":"), " ", c.text)))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Learning Resources"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.resources,
    onChange: v => setPlan({
      ...plan,
      resources: v
    }),
    placeholder: "Add a resource or link description\u2026"
  }))), tab === "Differentiation" && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Adjustments & Differentiation"
  }, /*#__PURE__*/React.createElement(EditableList, {
    items: plan.differentiation,
    onChange: v => setPlan({
      ...plan,
      differentiation: v
    }),
    placeholder: "Add an adjustment idea\u2026"
  })), tab === "Resources" && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Teacher Notes"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Use the Export button to save this plan as JSON. Import later to continue editing. Print generates a clean copy for PDP evidence or sharing."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 text-sm space-y-1 mt-2"
  }, /*#__PURE__*/React.createElement("li", null, "Action project ideas: student voice survey, fairness policy explainer, media literacy mini-campaign, peer court role-play."), /*#__PURE__*/React.createElement("li", null, "Embed digital tools students enjoy (Canva, Google Slides, Minecraft builds for civic spaces)."), /*#__PURE__*/React.createElement("li", null, "Build discussion norms (respect, evidence, turn-taking) to cultivate principled discourse.")))), /*#__PURE__*/React.createElement("footer", {
    className: "max-w-6xl mx-auto px-4 py-8 text-xs text-slate-500"
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 ", new Date().getFullYear(), " Unit plan scaffold \u2022 Aligned to ACARA & South Australian Curriculum (Year 9 Civics & Citizenship).")), /*#__PURE__*/React.createElement("style", null, `
        @media print {
          header, nav, .no-print { display: none !important; }
          main { padding: 0 !important; }
          .prose { max-width: none; }
          body { background: white; }
        }
      `));
}
const root = createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));
