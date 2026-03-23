"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Pause,
  Check,
  FileText,
  Zap,
  Send,
  Lock,
  CircleCheck,
  Circle,
  Atom,
  Calculator,
  BookOpen,
  PenTool,
  Leaf,
  Magnet,
} from "lucide-react";

/* ─── Types ─── */
type Step = "subjects" | "topics" | "workspace";

interface Subject {
  name: string;
  icon: React.ReactNode;
  color: string;
  assignments: number;
}

interface Assignment {
  title: string;
  status: "In progress" | "Needs review" | "Not started";
  time: string;
}

/* ─── Data ─── */
const subjects: Subject[] = [
  { name: "Science", icon: <Atom size={32} />, color: "cyan", assignments: 4 },
  { name: "Maths", icon: <Calculator size={32} />, color: "purple", assignments: 6 },
  { name: "History", icon: <BookOpen size={32} />, color: "orange", assignments: 3 },
  { name: "English", icon: <PenTool size={32} />, color: "green", assignments: 5 },
  { name: "Biology", icon: <Leaf size={32} />, color: "pink", assignments: 2 },
  { name: "Physics", icon: <Magnet size={32} />, color: "blue", assignments: 4 },
];

const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  cyan:   { bg: "bg-cyan-500/8",   text: "text-cyan-600",   border: "border-cyan-400",   iconBg: "bg-cyan-500/8" },
  purple: { bg: "bg-purple-500/8", text: "text-purple-600", border: "border-purple-400", iconBg: "bg-purple-500/8" },
  orange: { bg: "bg-orange-500/8", text: "text-orange-600", border: "border-orange-400", iconBg: "bg-orange-500/8" },
  green:  { bg: "bg-green-500/8",  text: "text-green-600",  border: "border-green-400",  iconBg: "bg-green-500/8" },
  pink:   { bg: "bg-pink-500/8",   text: "text-pink-600",   border: "border-pink-400",   iconBg: "bg-pink-500/8" },
  blue:   { bg: "bg-blue-500/8",   text: "text-blue-600",   border: "border-blue-400",   iconBg: "bg-blue-500/8" },
};

const assignmentsBySubject: Record<string, Assignment[]> = {
  Science: [
    { title: "Light and Refraction — Calculate angle", status: "In progress", time: "Today" },
    { title: "Chemical Reactions — Balance the equation", status: "Needs review", time: "Yesterday" },
    { title: "Force and Motion — Free body diagram", status: "Not started", time: "2 days ago" },
    { title: "Periodic Table — Element properties", status: "Not started", time: "2 days ago" },
  ],
  Maths: [
    { title: "Quadratic Equations — Solve for x", status: "In progress", time: "Today" },
    { title: "Trigonometry — Sin Cos Tan", status: "Not started", time: "Yesterday" },
    { title: "Statistics — Mean Median Mode", status: "Needs review", time: "2 days ago" },
    { title: "Algebra — Simplify expressions", status: "Not started", time: "2 days ago" },
    { title: "Geometry — Circle theorems", status: "Not started", time: "3 days ago" },
    { title: "Probability — Dice problems", status: "Not started", time: "3 days ago" },
  ],
  History: [
    { title: "World War II — Timeline of events", status: "In progress", time: "Today" },
    { title: "French Revolution — Causes and effects", status: "Not started", time: "Yesterday" },
    { title: "Indian Independence — Key figures", status: "Not started", time: "2 days ago" },
  ],
  English: [
    { title: "Essay Writing — Persuasive essay", status: "In progress", time: "Today" },
    { title: "Grammar — Active and Passive voice", status: "Needs review", time: "Yesterday" },
    { title: "Literature — Character analysis", status: "Not started", time: "2 days ago" },
    { title: "Comprehension — Passage reading", status: "Not started", time: "2 days ago" },
    { title: "Vocabulary — Word meanings", status: "Not started", time: "3 days ago" },
  ],
  Biology: [
    { title: "Cell Structure — Label the diagram", status: "In progress", time: "Today" },
    { title: "Photosynthesis — Process explanation", status: "Not started", time: "Yesterday" },
  ],
  Physics: [
    { title: "Electricity — Ohm's Law problems", status: "In progress", time: "Today" },
    { title: "Waves — Frequency and wavelength", status: "Needs review", time: "Yesterday" },
    { title: "Thermodynamics — Heat transfer", status: "Not started", time: "2 days ago" },
    { title: "Optics — Mirror and lens formula", status: "Not started", time: "3 days ago" },
  ],
};

const helpLevels = [
  { level: 1, name: "Think First", desc: "Guiding questions to help you think", unlocked: true, attemptsNeeded: 0 },
  { level: 2, name: "Concept Hint", desc: "Formula or rule reminder", unlocked: false, attemptsNeeded: 5 },
  { level: 3, name: "Similar Example", desc: "Solved similar problem", unlocked: false, attemptsNeeded: 8 },
  { level: 4, name: "Step by Step", desc: "Walk through your question", unlocked: false, attemptsNeeded: 9 },
  { level: 5, name: "Full Answer", desc: "Complete solution (Parents notified)", unlocked: false, attemptsNeeded: 12 },
];

/* ─── Animations (injected once) ─── */
const styleId = "studyhub-animations";

function injectAnimations() {
  if (typeof document === "undefined") return;
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.5s ease-out forwards;
      opacity: 0;
    }
    .stagger-1 { animation-delay: 0.05s; }
    .stagger-2 { animation-delay: 0.1s; }
    .stagger-3 { animation-delay: 0.15s; }
    .stagger-4 { animation-delay: 0.2s; }
    .stagger-5 { animation-delay: 0.25s; }
    .stagger-6 { animation-delay: 0.3s; }
    .stagger-7 { animation-delay: 0.35s; }
    .stagger-8 { animation-delay: 0.4s; }
  `;
  document.head.appendChild(style);
}

/* ─── Font helpers ─── */
const displayFont = { fontFamily: 'var(--font-display)', fontWeight: 900 } as const;
const bodyFont = { fontFamily: 'var(--font-body)', fontWeight: 500 } as const;

/* ─── Component ─── */
export default function StudyHubPage() {
  const [step, setStep] = useState<Step>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Inject CSS animations
  useEffect(() => {
    injectAnimations();
  }, []);

  // Session timer
  useEffect(() => {
    if (step === "workspace" && !timerPaused) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, timerPaused]);

  const wordCount = answer.trim() === "" ? 0 : answer.trim().split(/\s+/).length;
  const timerMinutes = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const timerSecs = String(timerSeconds % 60).padStart(2, "0");

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setStep("topics");
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setTimerSeconds(0);
    setTimerPaused(false);
    setAnswer("");
    setAttempts(0);
    setStep("workspace");
  };

  const handleSubmit = () => {
    setAttempts((a) => a + 1);
  };

  const statusColor = (status: Assignment["status"]) => {
    if (status === "Not started") return "bg-red-500 text-white";
    return "bg-blue-500 text-white";
  };

  /* ─── STEP 1: Subjects ─── */
  if (step === "subjects") {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bodyFont}>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-gray-500 hover:text-gray-800 transition-colors mb-8 animate-fadeInUp"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <h1 className="text-[30px] font-black text-black mb-2 animate-fadeInUp stagger-1" style={displayFont}>
            Study Buddy — Select Subject
          </h1>
          <p className="text-[16px] font-medium text-[#4a5565] mb-8 animate-fadeInUp stagger-2">
            Choose the subject you need help with
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subjects.map((subject, i) => {
              const c = colorMap[subject.color];
              return (
                <button
                  key={subject.name}
                  onClick={() => handleSubjectClick(subject)}
                  className={`group flex flex-col items-center justify-center h-[184px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:${c.border} cursor-pointer animate-fadeInUp stagger-${i + 3}`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${c.iconBg} flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110`}
                  >
                    <span className={c.text}>{subject.icon}</span>
                  </div>
                  <span className="text-[18px] font-bold text-black" style={displayFont}>{subject.name}</span>
                  <span className="text-[14px] font-medium text-gray-500 mt-0.5">
                    {subject.assignments} assignments
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 2: Topics / Assignments ─── */
  if (step === "topics" && selectedSubject) {
    const c = colorMap[selectedSubject.color];
    const assignments = assignmentsBySubject[selectedSubject.name] || [];

    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bodyFont}>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <button
            onClick={() => setStep("subjects")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-gray-500 hover:text-gray-800 transition-colors mb-8 animate-fadeInUp cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to subjects
          </button>

          <div className="flex items-center gap-3 mb-2 animate-fadeInUp stagger-1">
            <span className={`${c.text}`}>{selectedSubject.icon}</span>
            <h1 className="text-[28px] font-black text-black" style={displayFont}>
              {selectedSubject.name} Homework
            </h1>
          </div>
          <p className="text-[16px] font-medium text-[#4a5565] mb-8 animate-fadeInUp stagger-2">
            Select an assignment to start working
          </p>

          <div className="flex flex-col gap-3">
            {assignments.map((a, i) => (
              <button
                key={a.title}
                onClick={() => handleAssignmentClick(a)}
                className={`group flex items-center justify-between bg-white border-2 border-[#e5e7eb] rounded-2xl px-6 py-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:${c.border} cursor-pointer text-left animate-fadeInUp stagger-${i + 3}`}
              >
                <div>
                  <span className="block text-[16px] font-bold text-black mb-1.5" style={displayFont}>{a.title}</span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block text-[12px] font-bold px-2.5 py-0.5 rounded-full ${statusColor(a.status)}`}
                      style={displayFont}
                    >
                      {a.status}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-400">
                      <Clock size={13} />
                      {a.time}
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 3: Workspace ─── */
  if (step === "workspace" && selectedSubject && selectedAssignment) {
    const c = colorMap[selectedSubject.color];

    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bodyFont}>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <button
            onClick={() => setStep("topics")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-gray-500 hover:text-gray-800 transition-colors mb-6 animate-fadeInUp cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to assignments
          </button>

          <h1 className="text-[24px] font-black text-black mb-4 animate-fadeInUp stagger-1" style={displayFont}>
            {selectedAssignment.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 animate-fadeInUp stagger-2">
            <span className="inline-flex items-center gap-1 text-[13px] font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full" style={displayFont}>
              {selectedSubject.name}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] font-bold text-gray-100 bg-gray-800 px-3 py-1 rounded-full" style={displayFont}>
              Class 8
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full" style={displayFont}>
              <Clock size={13} />
              Due: Today 5:00 PM
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full" style={displayFont}>
              <FileText size={13} />
              Long Answer
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Left Column ── */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Assignment Question */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 animate-fadeInUp stagger-3">
                <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-black mb-5" style={displayFont}>
                  <FileText size={20} className="text-blue-500" />
                  Assignment Question
                </h2>

                {/* Image placeholder */}
                <div className="h-[200px] rounded-xl mb-3 overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 to-yellow-300" />
                <p className="text-[13px] font-medium text-gray-400 mb-5 text-center">
                  Figure: Light ray passing through glass
                </p>

                {/* Question block */}
                <div className="border-l-4 border-amber-400 bg-[#fffbeb] rounded-xl p-5">
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-amber-600 mb-2">
                    <Zap size={16} />
                    Question
                  </span>
                  <p className="text-[15px] font-medium text-[#4a5565] leading-relaxed mb-3">
                    A ray of light passes from air into glass at an angle of incidence of 30&deg;.
                    The refractive index of the glass is 1.5. Calculate the angle of refraction and
                    explain the bending of light using Snell&apos;s Law.
                  </p>
                  <p className="text-[14px] font-bold text-[#4a5565]" style={displayFont}>
                    Requirements: Show your working, include the formula, and explain each step.
                  </p>
                </div>
              </div>

              {/* Your Answer */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 animate-fadeInUp stagger-4">
                <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-black mb-2" style={displayFont}>
                  <PenTool size={20} className="text-green-500" />
                  Your Answer
                </h2>
                <p className="text-[14px] font-medium text-[#4a5565] mb-4">
                  Type your detailed answer below:
                </p>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Start typing your answer here... Remember to show your working and explain each step."
                  className="w-full h-[120px] bg-white border-2 border-[#e5e7eb] rounded-xl p-4 text-[15px] font-medium text-black placeholder:text-gray-400 resize-none focus:outline-none focus:border-blue-400 transition-colors"
                />

                <div className="flex items-center justify-between mt-3 mb-4">
                  <span className="text-[13px] font-medium text-gray-400">{wordCount} words typed</span>
                  <span className="text-[13px] font-medium text-gray-400">Attempts: {attempts}</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-[16px] font-bold rounded-[14px] py-3.5 transition-colors cursor-pointer"
                  style={displayFont}
                >
                  <Send size={18} />
                  Submit Answer (Attempt {attempts + 1})
                </button>
              </div>

              {/* AI Help Levels */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 animate-fadeInUp stagger-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-black" style={displayFont}>
                    <Atom size={20} className="text-purple-500" />
                    AI Help Levels
                  </h2>
                  <span className="text-[13px] font-medium text-gray-400">Unlock by trying first</span>
                </div>

                <div className="flex flex-col gap-3">
                  {helpLevels.map((hl) => {
                    const isUnlocked = hl.unlocked || attempts >= hl.attemptsNeeded;
                    return (
                      <div
                        key={hl.level}
                        className={`flex items-center justify-between border-2 rounded-xl p-4 transition-all duration-200 ${
                          isUnlocked
                            ? "border-green-300 bg-green-50/50"
                            : "border-[#e5e7eb] bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isUnlocked ? (
                            <CircleCheck size={22} className="text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle size={22} className="text-gray-300 flex-shrink-0" />
                          )}
                          <div>
                            <span className="block text-[15px] font-bold text-black">
                              Level {hl.level}: {hl.name}
                            </span>
                            <span className="block text-[13px] font-medium text-gray-400">
                              {hl.desc}
                            </span>
                          </div>
                        </div>

                        {isUnlocked ? (
                          <button className="text-[13px] font-bold text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg transition-colors cursor-pointer flex-shrink-0">
                            Get Help
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400 flex-shrink-0">
                            <Lock size={14} />
                            {hl.attemptsNeeded - attempts > 0
                              ? `${hl.attemptsNeeded - attempts} more attempts`
                              : "Locked"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right Sidebar ── */}
            <div className="w-full lg:w-[300px] flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              {/* Session Timer */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-5 text-center animate-fadeInUp stagger-3">
                <h3 className="flex items-center justify-center gap-2 text-[16px] font-extrabold text-black mb-4">
                  <Clock size={18} className="text-blue-500" />
                  Session Timer
                </h3>
                <p className="text-[48px] font-bold text-green-500 tabular-nums leading-none mb-1">
                  {timerMinutes}:{timerSecs}
                </p>
                <p className="text-[14px] font-medium text-gray-400 mb-5">minutes spent</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTimerPaused((p) => !p)}
                    className="flex-1 flex items-center justify-center gap-1.5 border-2 border-[#e5e7eb] text-[14px] font-bold text-gray-600 rounded-xl py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Pause size={15} />
                    {timerPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={() => setStep("topics")}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[14px] font-bold rounded-xl py-2.5 transition-colors cursor-pointer"
                  >
                    <Check size={15} />
                    Done
                  </button>
                </div>
              </div>

              {/* Your Progress */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-5 animate-fadeInUp stagger-4">
                <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-black mb-4">
                  <span className="text-[18px]">📊</span>
                  Your Progress
                </h3>
                <div className="flex flex-col divide-y divide-gray-100">
                  {[
                    { label: "Attempts made", value: String(attempts) },
                    { label: "Words written", value: String(wordCount) },
                    {
                      label: "Levels unlocked",
                      value: `${helpLevels.filter((h) => h.unlocked || attempts >= h.attemptsNeeded).length}/5`,
                    },
                    { label: "Help levels used", value: "0" },
                    { label: "AI dependency", value: "None", highlight: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5">
                      <span className="text-[14px] font-medium text-gray-500">{row.label}</span>
                      <span
                        className={`text-[14px] font-bold ${
                          row.highlight ? "text-green-500" : "text-black"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Reward */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-300 rounded-2xl p-5 text-center animate-fadeInUp stagger-5">
                <h3 className="text-[16px] font-extrabold text-black mb-3">
                  <span className="mr-1">🏆</span> Completion Reward
                </h3>
                <p className="text-[32px] font-bold text-green-500 leading-none mb-1">+75 XP</p>
                <p className="text-[13px] font-medium text-[#4a5565] mb-4">
                  Complete with minimal AI help for bonus points!
                </p>
                <div className="border-t border-amber-300 pt-3 flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#4a5565]">Bonus XP</span>
                  <span className="text-[14px] font-bold text-green-500">+25 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Fallback — should not happen */
  return null;
}
