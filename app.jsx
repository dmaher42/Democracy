const { useEffect, useMemo, useRef, useState } = React;
const { createRoot } = ReactDOM;

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
    lastUpdated: new Date().toISOString().slice(0, 10),
  },
  curriculumView: "SA", // "ACARA" | "SA"
  learningIntentions: [
    "Understand how Australia's Constitution structures a federal democracy and enables change (referendums, separation of powers).",
    "Explain how laws are made, interpreted and applied (parliament, courts, rights, responsibilities).",
    "Evaluate how media (including social media) shapes identity, trust and civic participation.",
    "Plan and justify a civic action addressing a school or community issue, incorporating diverse perspectives.",
  ],
  successCriteria: [
    "I can analyse how the Constitution and federal system support democratic processes and change (AC9HC9K01).",
    "I can explain how a federal policy idea becomes law and the influences on that process (AC9HC9K02).",
    "I can describe court hierarchy, roles and rights of accused/victims; explain civil vs criminal (AC9HC9K03–K04).",
    "I can evaluate strategies for civic participation and design a feasible, ethical action (AC9HC9S04).",
    "I use evidence and correct civics terms to argue a position (AC9HC9S05).",
  ],
  dispositions: [
    { name: "Socially conscious", notes: "Participates in actions that benefit community; recognises democratic processes." },
    { name: "Discerning", notes: "Checks sources; weighs perspectives; anticipates consequences of actions." },
    { name: "Principled", notes: "Acts with integrity; argues respectfully using evidence; supports others facing ethical challenges." },
  ],
  capabilities: {
    CriticalInquiry: [
      "Develop and modify inquiry questions about political/legal systems and civic issues (AC9HC9S01)",
      "Locate, select and compare data/ideas from multiple sources (AC9HC9S02)",
    ],
    AnalysisEvaluation: [
      "Analyse information to identify/evaluate different perspectives (AC9HC9S03)",
    ],
    CivicParticipation: [
      "Evaluate decision-making methods and participation strategies; plan a civic action (AC9HC9S04)",
    ],
    Communicating: [
      "Create evidence-based descriptions/explanations/arguments using civics terms (AC9HC9S05)",
    ],
  },
  curriculumLinks: {
    ACARA: [
      { code: "AC9HC9K01", text: "Role of the Australian Constitution; federal system; process for constitutional change (referendum)." },
      { code: "AC9HC9K02", text: "Legislative processes shaping federal policy; influences on policy." },
      { code: "AC9HC9K03", text: "Court features, jurisdictions; operations of courts/tribunals." },
      { code: "AC9HC9K04", text: "Roles in trials; rights of accused and victims; access to justice; legal aid." },
      { code: "AC9HC9K05", text: "How/why groups participate in civic life and global citizenship." },
      { code: "AC9HC9K06", text: "Influence of media (incl. social media) on identity and attitudes to diversity." },
      { code: "AC9HC9S01–S05", text: "Skills: questioning/researching; analysis/evaluation; participation/decision-making; communicating." },
    ],
    SA: [
      { code: "Learning Standard", text: "Investigate systems/issues; analyse perspectives; evaluate participation strategies; communicate with evidence." },
      { code: "Dispositions", text: "Socially conscious; Discerning; Principled." },
      { code: "Capabilities", text: "Critical inquiry; Ethical understanding; Intercultural understanding." },
      { code: "Courts & Legal Systems", text: "Ensure just outcomes; roles, rights and access to justice." },
      { code: "Constitution & Government", text: "Framework/principles of governance; referendums; policy process." },
      { code: "Civic Participation & Media", text: "Worldviews; platforms; media influence on identity and fairness." },
    ],
  },
  assessment: {
    formative: [
      {
        name: "Source Reliability Check",
        description: "Students compare 3 sources (news article, gov site, NGO brief) on the same issue; rate credibility and bias.",
        evidence: "Annotated checklist + short reflection (200 words).",
      },
      {
        name: "Socratic Seminar: Trust in Institutions",
        description: "Students discuss prompts linking trust and healthy democracy; teacher uses discussion rubric.",
        evidence: "Rubric ratings + student self-assessment.",
      },
      {
        name: "Court System Concept Map",
        description: "Students build a visual of court hierarchy/jurisdictions; add roles/rights; compare criminal vs civil.",
        evidence: "Annotated concept map (paper or digital).",
      },
    ],
    summative: [
      {
        name: "Civic Action Proposal (Group)",
        description: "Plan a small-scale action to improve fairness/participation in school/community (e.g., student voice survey, awareness campaign). Include consultation process and evaluation metrics.",
        evidence: "2–3 page proposal + presentation (5–7 min).",
        criteria: ["Needs analysis & stakeholder voices", "Feasibility & ethics", "Use of evidence & civics terms", "Evaluation plan"],
      },
      {
        name: "Evidence-Based Argument (Individual)",
        description: "Write a persuasive essay responding to the inquiry question, referencing Constitution/courts/media and the action project.",
        evidence: "800–1000 word essay with citations.",
        criteria: ["Thesis & structure", "Use of evidence", "Civics terminology", "Evaluation of perspectives"],
      },
    ],
  },
  sequence: [
    {
      week: 1,
      title: "Launching the Inquiry: What is a Healthy Democracy?",
      lessons: [
        {
          title: "Hook & Prior Knowledge",
          activities: [
            "Gallery walk of headlines about trust in institutions; students place green/red dots (trust/distrust).",
            "Mini-lecture: features of healthy democracy (participation, fairness, accountability, separation of powers).",
            "Student-friendly inquiry framing: 'How can understanding democracy help us trust each other and improve our community?'",
          ],
          resources: ["Projector, sticky dots, print headlines or digital board"],
        },
        {
          title: "Question Crafting (AC9HC9S01)",
          activities: [
            "Students draft 3 questions they want to investigate; class sorts into themes (Constitution, courts, media, participation).",
            "Establish research teams and roles.",
          ],
          resources: ["Question stems, wall chart/Padlet"],
        },
      ],
    },
    {
      week: 2,
      title: "Constitution & Change (AC9HC9K01)",
      lessons: [
        {
          title: "Federation to Referendums",
          activities: [
            "Timeline jigsaw: founders' aims, compromises, key sections (in plain English).",
            "Case study carousel: 1967 Referendum, 1999 Republic — success vs failure.",
          ],
          resources: ["Timeline cards, case briefs"],
        },
        {
          title: "Policy to Law (AC9HC9K02)",
          activities: [
            "Flowchart from idea → bill → committees → vote → assent; identify influence points (parties, interest groups, public service, citizens).",
            "Choose a contemporary federal policy; map influences.",
          ],
          resources: ["Process flow templates"],
        },
      ],
    },
    {
      week: 3,
      title: "Courts, Rights & Justice (AC9HC9K03–K04)",
      lessons: [
        {
          title: "Court Hierarchy & Roles",
          activities: [
            "Build a court hierarchy ladder (Magistrates → District → Supreme → Federal → High Court).",
            "Roles & rights stations: judge, lawyer, jury, accused, victim; civil vs criminal scenarios.",
          ],
          resources: ["Hierarchy posters, role cards"],
        },
        {
          title: "Precedent & Interpretation",
          activities: [
            "Mini-case: Mabo and native title; how precedent changes the law.",
            "Exit ticket: How does the court system support a just democracy?",
          ],
          resources: ["Case summary, exit ticket"],
        },
      ],
    },
    {
      week: 4,
      title: "Media, Identity & Trust (AC9HC9K06)",
      lessons: [
        {
          title: "Media Representations",
          activities: [
            "Analyse representations of groups in sport/news; discuss impact on cohesion and trust.",
            "Bias detector: headline rewrite challenge.",
          ],
          resources: ["Clippings, projector"],
        },
        {
          title: "Source Reliability Clinic (AC9HC9S02–S03)",
          activities: [
            "CRAAP/RECAP test on three sources covering the same issue; compare results in teams.",
          ],
          resources: ["Source packs, rubric"],
        },
      ],
    },
    {
      week: 5,
      title: "Civic Action Project – Discover & Design (AC9HC9S04)",
      lessons: [
        {
          title: "Needs Analysis & Stakeholders",
          activities: [
            "Identify a school/community issue (participation, fairness, student voice).",
            "Map stakeholders; plan consultations (survey/interviews).",
          ],
          resources: ["Stakeholder map template"],
        },
        {
          title: "Action Blueprint",
          activities: [
            "Draft goals, actions, timeline, roles, ethics checklist, evaluation metrics.",
          ],
          resources: ["Blueprint one-pager"],
        },
      ],
    },
    {
      week: 6,
      title: "Civic Action Project – Build & Share",
      lessons: [
        {
          title: "Prototype & Feedback",
          activities: [
            "Create campaign materials (poster, short video, announcement, social post).",
            "Peer feedback using success criteria.",
          ],
          resources: ["Canva/Slides, rubric"],
        },
        {
          title: "Presentations",
          activities: [
            "5–7 minute group presentations + Q&A.",
          ],
          resources: ["Timer, projector"],
        },
      ],
    },
    {
      week: 7,
      title: "Synthesis & Argument (AC9HC9S05)",
      lessons: [
        {
          title: "Plan the Essay",
          activities: [
            "PEEL/TEAL refresher; collect evidence from unit; outline drafting.",
          ],
          resources: ["Essay planner"],
        },
        {
          title: "Write & Confer",
          activities: [
            "Draft in class; teacher conferencing; citation check.",
          ],
          resources: ["Writing tools"],
        },
      ],
    },
    {
      week: 8,
      title: "Reflection & Evaluation",
      lessons: [
        {
          title: "Did We Restore Trust?",
          activities: [
            "Students revisit Week 1 dots; write reflection on shifts in trust and civic identity.",
            "Unit feedback + next steps for authentic participation at school.",
          ],
          resources: ["Reflection prompts"],
        },
      ],
    },
  ],
  differentiation: [
    "Choice boards for product (infographic, short video, Minecraft build of a 'healthy democracy' city district, podcast).",
    "Sentence starters/frames for arguments; vocabulary banks (jurisdiction, mandate, sovereignty, precedent).",
    "Targeted mini-lessons for reading complex sources; text simplification options.",
    "Adjusted success criteria for students working at Yr 7–8 literacy levels; extension: comparative case study of another democracy.",
  ],
  pedagogy: [
    "Visible Learning alignment: clear intentions & success criteria displayed every lesson; frequent feedback cycles.",
    "Teacher-as-evaluator: exit tickets, mid-unit checks, conferencing logs to adjust teaching.",
    "Peer learning: protocols for discussion (Socratic, think-pair-share, jigsaw).",
  ],
  resources: [
    "PEO: Australian Constitution resources",
    "Federal Parliament Education Office: law-making process materials",
    "Local council website (civic participation examples)",
    "ABC Education media literacy lessons",
  ],
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
function SectionCard({ title, right, children }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {right}
      </div>
      <div className="mt-3 prose prose-slate max-w-none">{children}</div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-slate-300 bg-slate-50">
      {children}
    </span>
  );
}

function PillToggle({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-300 bg-slate-100 p-1">
      {options.map((opt) => (
        <button
          key={opt}
          className={classNames(
            "px-3 py-1.5 text-sm rounded-xl",
            value === opt ? "bg-white shadow font-semibold" : "text-slate-600"
          )}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function EditableList({ items, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  const handleAdd = () => {
    if (!draft.trim()) return;
    onChange([...items, draft.trim()]);
    setDraft("");
  };
  return (
    <div>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((t, i) => (
          <li key={i} className="group flex items-start gap-2">
            <span className="flex-1">{t}</span>
            <button
              aria-label="Delete"
              className="opacity-0 group-hover:opacity-100 text-xs text-red-600"
              onClick={() => onChange(items.filter((_, k) => k !== i))}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <label className="flex-1">
          <span className="sr-only">Add item</span>
          <input
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
            placeholder={placeholder}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </label>
        <button
          className="rounded-xl px-3 py-2 bg-slate-900 text-white"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function LessonCard({ lesson }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="font-semibold">{lesson.title}</div>
      {lesson.activities?.length ? (
        <div className="mt-2">
          <div className="text-sm font-medium">Activities</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {lesson.activities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {lesson.resources?.length ? (
        <div className="mt-2">
          <div className="text-sm font-medium">Resources</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {lesson.resources.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function WeekBlock({ block }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 bg-white">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Week {block.week}: {block.title}</h4>
        <Badge>{block.lessons?.length || 0} lessons</Badge>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-3">
        {block.lessons?.map((lsn, i) => <LessonCard key={i} lesson={lsn} />)}
      </div>
    </div>
  );
}

function Toolbar({ plan, setPlan }) {
  const fileRef = useRef(null);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.meta.title.replace(/[^a-z0-9]+/gi, "-")}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importJSON = (file) => {
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

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => window.print()} className="rounded-xl px-3 py-2 bg-white border border-slate-300">Print</button>
      <button onClick={exportJSON} className="rounded-xl px-3 py-2 bg-white border border-slate-300">Export JSON</button>
      <button onClick={() => fileRef.current?.click()} className="rounded-xl px-3 py-2 bg-white border border-slate-300">Import JSON</button>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
    </div>
  );
}

export default function App() {
  const [plan, setPlan] = useLocalStorage("yr9-civics-plan", DEFAULT_PLAN);
  const [tab, setTab] = useState("Overview");
  const [editMeta, setEditMeta] = useState(false);

  const tabs = ["Overview", "Sequence", "Assessment", "Curriculum", "Differentiation", "Resources"];

  const onMetaChange = (key, value) => setPlan({ ...plan, meta: { ...plan.meta, [key]: value } });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 backdrop-blur bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{plan.meta.title}</h1>
            <p className="text-sm text-slate-600">{plan.meta.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <Toolbar plan={plan} setPlan={setPlan} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <SectionCard
          title="Unit Details"
          right={
            <div className="flex items-center gap-3">
              <PillToggle
                options={["SA", "ACARA"]}
                value={plan.curriculumView}
                onChange={(v) => setPlan({ ...plan, curriculumView: v })}
              />
              <button
                className="rounded-xl px-3 py-1.5 bg-slate-900 text-white"
                onClick={() => setEditMeta((s) => !s)}
              >
                {editMeta ? "Done" : "Quick Edit"}
              </button>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {editMeta ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs uppercase text-slate-500">Title</label>
                    <input className="w-full rounded-xl border px-3 py-2" value={plan.meta.title} onChange={(e) => onMetaChange("title", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-slate-500">Inquiry / Subtitle</label>
                    <textarea className="w-full rounded-xl border px-3 py-2" rows={3} value={plan.meta.subtitle} onChange={(e) => onMetaChange("subtitle", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs uppercase text-slate-500">Duration</label>
                      <input className="w-full rounded-xl border px-3 py-2" value={plan.meta.duration} onChange={(e) => onMetaChange("duration", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase text-slate-500">Author</label>
                      <input className="w-full rounded-xl border px-3 py-2" value={plan.meta.author} onChange={(e) => onMetaChange("author", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase text-slate-500">Updated</label>
                      <input className="w-full rounded-xl border px-3 py-2" value={plan.meta.lastUpdated} onChange={(e) => onMetaChange("lastUpdated", e.target.value)} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Duration:</span> {plan.meta.duration}</div>
                  <div><span className="font-medium">Author:</span> {plan.meta.author}</div>
                  <div><span className="font-medium">School:</span> {plan.meta.school}</div>
                  <div><span className="font-medium">Last updated:</span> {plan.meta.lastUpdated}</div>
                </div>
              )}
            </div>
            <div>
              <div className="text-sm"><span className="font-medium">Dispositions:</span> {plan.dispositions.map(d => d.name).join(", ")}</div>
              <div className="mt-2 text-sm"><span className="font-medium">Capabilities:</span> Critical inquiry · Ethical understanding · Intercultural understanding</div>
              <div className="mt-3">
                <div className="text-sm font-medium">Learning Intentions</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {plan.learningIntentions.map((li, i) => <li key={i}>{li}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </SectionCard>

        <nav className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={classNames(
                "px-4 py-2 rounded-xl border",
                tab === t ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-300"
              )}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === "Overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <SectionCard title="Success Criteria">
              <EditableList
                items={plan.successCriteria}
                onChange={(v) => setPlan({ ...plan, successCriteria: v })}
                placeholder="Add a success criterion…"
              />
            </SectionCard>
            <SectionCard title="Unit Pedagogy (Visible Learning)">
              <EditableList
                items={plan.pedagogy}
                onChange={(v) => setPlan({ ...plan, pedagogy: v })}
                placeholder="Add a pedagogy note…"
              />
            </SectionCard>
            <SectionCard title="Dispositions (SA)">
              <ul className="list-disc pl-5 space-y-2">
                {plan.dispositions.map((d, i) => (
                  <li key={i}><span className="font-medium">{d.name}:</span> {d.notes}</li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Capabilities">
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">Critical inquiry:</span> {plan.capabilities.CriticalInquiry.join("; ")}</li>
                <li><span className="font-medium">Analysis & evaluation:</span> {plan.capabilities.AnalysisEvaluation.join("; ")}</li>
                <li><span className="font-medium">Civic participation:</span> {plan.capabilities.CivicParticipation.join("; ")}</li>
                <li><span className="font-medium">Communicating:</span> {plan.capabilities.Communicating.join("; ")}</li>
              </ul>
            </SectionCard>
          </div>
        )}

        {tab === "Sequence" && (
          <div className="space-y-4">
            {plan.sequence.map((w, i) => <WeekBlock key={i} block={w} />)}
          </div>
        )}

        {tab === "Assessment" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <SectionCard title="Formative Assessment">
              <ul className="list-disc pl-5 space-y-2">
                {plan.assessment.formative.map((a, i) => (
                  <li key={i}>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm">{a.description}</div>
                    <div className="text-xs text-slate-500">Evidence: {a.evidence}</div>
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Summative Assessment">
              <ul className="list-disc pl-5 space-y-2">
                {plan.assessment.summative.map((a, i) => (
                  <li key={i}>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm">{a.description}</div>
                    {a.criteria?.length ? (
                      <div className="text-xs text-slate-500">Criteria: {a.criteria.join(" · ")}</div>
                    ) : null}
                    <div className="text-xs text-slate-500">Evidence: {a.evidence}</div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        )}

        {tab === "Curriculum" && (
          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title={plan.curriculumView === "SA" ? "SA Curriculum Links" : "ACARA Links"}>
              <ul className="list-disc pl-5 space-y-2">
                {(plan.curriculumView === "SA" ? plan.curriculumLinks.SA : plan.curriculumLinks.ACARA).map((c) => (
                  <li key={c.code}>
                    <span className="font-medium">{c.code}:</span> {c.text}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Learning Resources">
              <EditableList
                items={plan.resources}
                onChange={(v) => setPlan({ ...plan, resources: v })}
                placeholder="Add a resource or link description…"
              />
            </SectionCard>
          </div>
        )}

        {tab === "Differentiation" && (
          <SectionCard title="Adjustments & Differentiation">
            <EditableList
              items={plan.differentiation}
              onChange={(v) => setPlan({ ...plan, differentiation: v })}
              placeholder="Add an adjustment idea…"
            />
          </SectionCard>
        )}

        {tab === "Resources" && (
          <SectionCard title="Teacher Notes">
            <p className="text-sm">Use the Export button to save this plan as JSON. Import later to continue editing. Print generates a clean copy for PDP evidence or sharing.</p>
            <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
              <li>Action project ideas: student voice survey, fairness policy explainer, media literacy mini-campaign, peer court role-play.</li>
              <li>Embed digital tools students enjoy (Canva, Google Slides, Minecraft builds for civic spaces).</li>
              <li>Build discussion norms (respect, evidence, turn-taking) to cultivate principled discourse.</li>
            </ul>
          </SectionCard>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-xs text-slate-500">
        <div>© {new Date().getFullYear()} Unit plan scaffold • Aligned to ACARA & South Australian Curriculum (Year 9 Civics & Citizenship).</div>
      </footer>

      <style>{`
        @media print {
          header, nav, .no-print { display: none !important; }
          main { padding: 0 !important; }
          .prose { max-width: none; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
