"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
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
  MessageCircle,
  X,
  Sparkles,
  Trophy,
  Bot,
} from "lucide-react";

/* ─── Types ─── */
type Step = "subjects" | "topics" | "workspace";

interface Subject {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
  bgMedium: string;
  textColor: string;
  borderHover: string;
  assignments: number;
}

interface Assignment {
  title: string;
  status: "In progress" | "Needs review" | "Not started";
  time: string;
}

/* ─── Data ─── */
const subjects: Subject[] = [
  { name: "Science", icon: <Atom size={36} />, color: "cyan", bgLight: "bg-cyan-50", bgMedium: "bg-cyan-100", textColor: "text-cyan-600", borderHover: "hover:border-cyan-300", assignments: 4 },
  { name: "Maths", icon: <Calculator size={36} />, color: "purple", bgLight: "bg-purple-50", bgMedium: "bg-purple-100", textColor: "text-purple-600", borderHover: "hover:border-purple-300", assignments: 6 },
  { name: "History", icon: <BookOpen size={36} />, color: "orange", bgLight: "bg-orange-50", bgMedium: "bg-orange-100", textColor: "text-orange-600", borderHover: "hover:border-orange-300", assignments: 3 },
  { name: "English", icon: <PenTool size={36} />, color: "green", bgLight: "bg-green-50", bgMedium: "bg-green-100", textColor: "text-green-600", borderHover: "hover:border-green-300", assignments: 5 },
  { name: "Biology", icon: <Leaf size={36} />, color: "pink", bgLight: "bg-pink-50", bgMedium: "bg-pink-100", textColor: "text-pink-600", borderHover: "hover:border-pink-300", assignments: 2 },
  { name: "Physics", icon: <Magnet size={36} />, color: "blue", bgLight: "bg-blue-50", bgMedium: "bg-blue-100", textColor: "text-blue-600", borderHover: "hover:border-blue-300", assignments: 4 },
];

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
  { level: 1, name: "Think First", desc: "Guiding questions to help you think", emoji: "💡", xp: 65, attemptsNeeded: 0 },
  { level: 2, name: "Concept Hint", desc: "Formula or rule reminder", emoji: "📐", xp: 50, attemptsNeeded: 2 },
  { level: 3, name: "Similar Example", desc: "Solved similar problem", emoji: "🧩", xp: 35, attemptsNeeded: 4 },
  { level: 4, name: "Step by Step", desc: "Walk through your question", emoji: "👣", xp: 20, attemptsNeeded: 6 },
  { level: 5, name: "Full Answer", desc: "Complete solution (Parents notified)", emoji: "✅", xp: 5, attemptsNeeded: 8 },
];

const aiResponses: Record<number, string[]> = {
  1: [
    "Let me help you think about this! What do you already know about Snell's Law?",
    "Think about it: when light goes from a less dense medium to a denser one, does it bend towards or away from the normal?",
    "Try writing the formula first. What are the two values you need to plug in?",
  ],
  2: [
    "Here's the key formula: n₁ sin(θ₁) = n₂ sin(θ₂)",
    "Remember: n for air = 1.0, n for glass = 1.5, and θ₁ = 30°",
  ],
  3: [
    "Let me solve a similar one for you:\n\nIf light enters water (n=1.33) at 45°:\nsin(θ₂) = sin(45°) / 1.33 = 0.707 / 1.33 = 0.532\nθ₂ = sin⁻¹(0.532) = 32.1°\n\nNow try yours with glass (n=1.5) at 30°!",
  ],
};

/* ─── Font helpers ─── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ─── Component ─── */
export default function StudyHubPage() {
  const [step, setStep] = useState<Step>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatLevel, setChatLevel] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpUnlocked, setHelpUnlocked] = useState(false);
  const [modalStage, setModalStage] = useState<"offer" | "unlocking" | "ready">("offer");

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("sh-anim")) return;
    const s = document.createElement("style");
    s.id = "sh-anim";
    s.textContent = `
      @keyframes shFadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      .sh-fade { animation: shFadeUp .5s ease-out both }
      .sh-d1 { animation-delay:.05s } .sh-d2 { animation-delay:.1s } .sh-d3 { animation-delay:.15s }
      .sh-d4 { animation-delay:.2s } .sh-d5 { animation-delay:.25s } .sh-d6 { animation-delay:.3s }
      .sh-d7 { animation-delay:.35s } .sh-d8 { animation-delay:.4s }
      @keyframes slideUp { from { opacity:0; transform:translateY(100%) } to { opacity:1; transform:translateY(0) } }
      .chat-slide { animation: slideUp .3s ease-out both }
      @keyframes slideInRight { from { transform:translateX(100%); opacity:0 } to { transform:translateX(0); opacity:1 } }
      .sidebar-slide-in { animation: slideInRight .6s cubic-bezier(0.16,1,0.3,1) both }
      .push-left { transition: all .6s cubic-bezier(0.16,1,0.3,1) }
    `;
    document.head.appendChild(s);
  }, []);

  const wordCount = answer.trim() === "" ? 0 : answer.trim().split(/\s+/).length;

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setStep("topics");
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setAnswer("");
    setAttempts(0);
    setChatOpen(false);
    setChatLevel(null);
    setChatMessages([]);
    setStep("workspace");
  };

  // Calculate current AI level based on attempts
  const getCurrentLevel = (att: number) => {
    const reversed = [...helpLevels].reverse();
    return reversed.find(h => att >= h.attemptsNeeded + 2) || helpLevels[0];
  };

  const currentHelpLevel = getCurrentLevel(attempts);
  const maxXP = 75;
  const currentXP = helpUnlocked ? (currentHelpLevel?.xp || 5) : maxXP;

  const handleSubmit = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (!helpUnlocked && newAttempts >= 2) {
      setTimeout(() => {
        setModalStage("offer");
        setShowHelpModal(true);
      }, 800);
    } else if (helpUnlocked) {
      // Auto-advance to next level if more attempts
      const newLevel = getCurrentLevel(newAttempts);
      if (newLevel.level > (chatLevel || 0)) {
        openHelp(newLevel.level);
      }
    }
  };

  const handleAcceptHelp = () => {
    setModalStage("unlocking");
    setTimeout(() => setModalStage("ready"), 1500);
    setTimeout(() => {
      setShowHelpModal(false);
      setHelpUnlocked(true);
      const lvl = getCurrentLevel(attempts);
      openHelp(lvl.level);
    }, 2500);
  };

  const openHelp = (level: number) => {
    const responses = aiResponses[level] || ["I can help you with this! Try breaking the problem into smaller parts."];
    setChatLevel(level);
    setChatMessages([{ role: "ai", text: responses[0] }]);
    setChatOpen(true);
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    const responses = chatLevel ? aiResponses[chatLevel] || [] : [];
    const nextIdx = chatMessages.filter((m) => m.role === "ai").length;
    const aiReply = responses[nextIdx] || "Great effort! Try applying what we discussed and submit your answer.";
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "ai", text: aiReply }]);
    }, 800);
  };

  const statusBadge = (status: Assignment["status"]) => {
    if (status === "In progress") return "bg-blue-500 text-white";
    if (status === "Needs review") return "bg-amber-500 text-white";
    return "bg-gray-400 text-white";
  };

  /* ─── STEP 1: Subjects ─── */
  if (step === "subjects") {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade" style={dFont}>
            <ArrowLeft size={20} /> Back to home
          </Link>

          <h1 className="text-[36px] text-[#0f172a] mb-3 sh-fade sh-d1" style={dFont}>
            Study Buddy — Select Subject
          </h1>
          <p className="text-[18px] text-[#64748b] mb-10 sh-fade sh-d2" style={bFont}>
            Choose the subject you need help with
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <button
                key={subject.name}
                onClick={() => handleSubjectClick(subject)}
                className={`group flex flex-col items-center justify-center h-[220px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 ${subject.borderHover} cursor-pointer sh-fade sh-d${i + 3}`}
              >
                <div className={`w-[72px] h-[72px] rounded-2xl ${subject.bgMedium} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                  <span className={subject.textColor}>{subject.icon}</span>
                </div>
                <span className="text-[20px] text-[#0f172a]" style={dFont}>{subject.name}</span>
                <span className="text-[15px] text-[#94a3b8] mt-1" style={bFont}>{subject.assignments} assignments</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 2: Topics ─── */
  if (step === "topics" && selectedSubject) {
    const assignments = assignmentsBySubject[selectedSubject.name] || [];

    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button onClick={() => setStep("subjects")} className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade cursor-pointer" style={dFont}>
            <ArrowLeft size={20} /> Back to subjects
          </button>

          <div className="flex items-center gap-4 mb-3 sh-fade sh-d1">
            <div className={`w-12 h-12 rounded-xl ${selectedSubject.bgMedium} flex items-center justify-center`}>
              <span className={selectedSubject.textColor}>{<Atom size={24} />}</span>
            </div>
            <h1 className="text-[32px] text-[#0f172a]" style={dFont}>
              {selectedSubject.name} Homework
            </h1>
          </div>
          <p className="text-[18px] text-[#64748b] mb-10 sh-fade sh-d2" style={bFont}>
            Select an assignment to start working
          </p>

          <div className="flex flex-col gap-4">
            {assignments.map((a, i) => (
              <button
                key={a.title}
                onClick={() => handleAssignmentClick(a)}
                className={`group flex items-center justify-between bg-white border-2 border-[#e5e7eb] rounded-2xl px-8 py-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${selectedSubject.borderHover} cursor-pointer text-left sh-fade sh-d${i + 3}`}
              >
                <div>
                  <span className="block text-[18px] text-[#0f172a] mb-2" style={dFont}>{a.title}</span>
                  <div className="flex items-center gap-3">
                    <span className={`inline-block text-[13px] px-3 py-1 rounded-full ${statusBadge(a.status)}`} style={dFont}>{a.status}</span>
                    <span className="inline-flex items-center gap-1.5 text-[14px] text-[#94a3b8]" style={bFont}>
                      <Clock size={14} /> {a.time}
                    </span>
                  </div>
                </div>
                <ChevronRight size={22} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 3: Workspace ─── */
  if (step === "workspace" && selectedSubject && selectedAssignment) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col" style={bFont}>
        {/* Sticky header */}
        <div className="sticky top-0 z-30 bg-white border-b-2 border-[#eef0f4] sh-fade">
          <div className="px-6 py-3 flex items-center gap-6">
            <button onClick={() => setStep("topics")} className="inline-flex items-center gap-2 text-[14px] text-[#6b7280] hover:text-[#374151] transition-colors cursor-pointer flex-shrink-0" style={dFont}>
              <ArrowLeft size={16} /> Back
            </button>
            <div className="w-px h-6 bg-[#e5e7eb] flex-shrink-0" />
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <h1 className="text-[16px] text-[#0f172a] truncate" style={dFont}>{selectedAssignment.title}</h1>
              <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full ${selectedSubject.bgMedium} ${selectedSubject.textColor} flex-shrink-0`} style={dFont}>
                <Atom size={10} /> {selectedSubject.name}
              </span>
              <span className="text-[11px] text-[#94a3b8] flex-shrink-0" style={bFont}>Class 8</span>
              <span className="text-[11px] text-amber-600 flex-shrink-0" style={bFont}>Due: Today 5:00 PM</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-[12px] text-[#94a3b8]" style={bFont}>Attempts: {attempts}</span>
              <div className="w-px h-5 bg-[#e5e7eb]" />
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${currentXP >= 50 ? "bg-purple-100 text-purple-700" : currentXP >= 20 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                <Trophy size={14} />
                <span className="text-[13px]" style={dFont}>+{currentXP} XP</span>
                {currentXP < maxXP && <span className="text-[10px] line-through opacity-50" style={bFont}>{maxXP}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* 60/40 layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT — centered until sidebar pushes it left */}
          <div className={`overflow-y-auto p-6 lg:p-8 space-y-6 push-left ${helpUnlocked ? "flex-1 lg:w-[60%]" : "w-full max-w-4xl mx-auto"}`}>
            {/* Assignment Question */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 sh-fade sh-d1">
              <h2 className="flex items-center gap-2.5 text-[20px] text-[#0f172a] mb-6" style={dFont}>
                <FileText size={22} className={selectedSubject.textColor} />
                Assignment Question
              </h2>

              <div className="border-l-4 border-amber-400 bg-amber-50/60 rounded-xl p-6 mb-6">
                <span className="flex items-center gap-2 text-[15px] text-amber-600 mb-3" style={dFont}>
                  <Zap size={18} /> Question
                </span>
                <p className="text-[16px] text-[#374151] leading-relaxed mb-4" style={bFont}>
                  A ray of light passes from air into glass at an angle of incidence of 30&deg;. If the refractive index of glass is 1.5, calculate the angle of refraction using Snell&apos;s Law.
                </p>
                <p className="text-[15px] text-[#374151]" style={dFont}>
                  Requirements: Show your working, include the formula, and explain each step.
                </p>
              </div>

              <div className="h-[200px] bg-gradient-to-br from-[#1e3a5f] via-[#2d5f8a] to-[#1e3a5f] rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent absolute left-1/2 -translate-x-1/2" />
                  <div className="absolute w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl" />
                  <div className="absolute top-1/2 left-1/3 w-48 h-0.5 bg-yellow-300/40 rotate-[25deg]" />
                  <div className="absolute top-1/2 right-1/3 w-48 h-0.5 bg-cyan-300/40 -rotate-[15deg]" />
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-[12px] text-white/60 bg-black/30 px-3 py-1 rounded-full" style={bFont}>Diagram: Light passing through different mediums</span>
                </div>
              </div>
            </div>

            {/* Your Answer */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 sh-fade sh-d2">
              <h2 className="flex items-center gap-2.5 text-[20px] text-[#0f172a] mb-2" style={dFont}>
                <PenTool size={22} className="text-green-500" />
                Your Answer
              </h2>
              <p className="text-[15px] text-[#64748b] mb-5" style={bFont}>Type your detailed answer below:</p>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Start writing your answer here... Show your working step by step."
                className="w-full h-[160px] bg-[#f8fafc] border-2 border-[#e5e7eb] rounded-xl p-5 text-[16px] text-[#0f172a] placeholder:text-[#94a3b8] resize-none focus:outline-none focus:border-blue-400 transition-colors"
              />

              <button
                onClick={handleSubmit}
                className="w-full mt-5 flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white text-[16px] rounded-2xl py-4 transition-all active:scale-[0.98] cursor-pointer"
                style={dFont}
              >
                <Send size={18} />
                Submit Answer (Attempt {attempts + 1})
              </button>
            </div>

          </div>

          {/* RIGHT 40% — Slides in pushing content left */}
          {helpUnlocked && (
            <div className="lg:w-[40%] flex-shrink-0 border-t lg:border-t-0 lg:border-l-2 border-[#eef0f4] bg-white flex flex-col overflow-hidden sidebar-slide-in">
              {/* Current AI Level — compact header */}
              <div className="p-5 border-b border-[#e5e7eb]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <Bot size={18} className="text-purple-500" />
                    <h3 className="text-[15px] text-[#0f172a]" style={dFont}>AI Study Buddy</h3>
                  </div>
                  <span className="text-[12px] text-[#94a3b8]" style={bFont}>Level {chatLevel || currentHelpLevel.level}/5</span>
                </div>

                {/* Current + Next level as two cards */}
                <div className="flex gap-2">
                  {helpLevels.filter(hl => {
                    const current = chatLevel || currentHelpLevel.level;
                    return hl.level === current || hl.level === current + 1;
                  }).map((hl) => {
                    const isCurrent = hl.level === (chatLevel || currentHelpLevel.level);
                    const isUnlocked = attempts >= hl.attemptsNeeded + 2;
                    return (
                      <button
                        key={hl.level}
                        onClick={() => isUnlocked && openHelp(hl.level)}
                        disabled={!isUnlocked}
                        className={`flex-1 flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          isCurrent
                            ? "border-purple-400 bg-purple-50 shadow-sm"
                            : isUnlocked
                            ? "border-[#e5e7eb] hover:border-purple-200 cursor-pointer"
                            : "border-[#e5e7eb] bg-gray-50/50 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <span className="text-[20px] flex-shrink-0">{hl.emoji}</span>
                        <div className="min-w-0">
                          <span className={`text-[12px] block ${isCurrent ? "text-purple-700" : "text-[#0f172a]"}`} style={dFont}>
                            {isCurrent ? "Active" : isUnlocked ? "Next" : `${hl.attemptsNeeded + 2 - attempts} more`}
                          </span>
                          <span className="text-[11px] block text-[#94a3b8]" style={bFont}>{hl.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat — always open since we auto-open on unlock */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-5 py-3 flex-shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[18px]">{currentHelpLevel.emoji}</span>
                    <span className="text-white text-[14px]" style={dFont}>{helpLevels.find(h => h.level === chatLevel)?.name || currentHelpLevel.name}</span>
                  </div>
                  <span className="text-white/60 text-[12px]" style={bFont}>{helpLevels.find(h => h.level === chatLevel)?.desc}</span>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-[#7c3aed] text-white rounded-br-md" : "bg-[#f3f4f6] text-[#374151] rounded-bl-md"}`} style={bFont}>{msg.text}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e5e7eb] p-3 flex-shrink-0">
                  <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.querySelector("input") as HTMLInputElement; sendChatMessage(input.value); input.value = ""; }} className="flex gap-2">
                    <input type="text" placeholder="Ask a follow-up..." className="flex-1 bg-[#f8fafc] border-2 border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-purple-400" />
                    <button type="submit" className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white hover:bg-[#6d28d9] transition-colors cursor-pointer flex-shrink-0"><Send size={16} /></button>
                  </form>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Gamified Help Unlock Modal */}
        {showHelpModal && (
          <>
            <div className="fixed inset-0 bg-black/40 z-50" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden" style={{ animation: "shFadeUp 0.4s ease-out" }}>
                {modalStage === "offer" && (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-5">
                      <span className="text-[40px]">🤝</span>
                    </div>
                    <h2 className="text-[22px] text-[#0f172a] mb-2" style={dFont}>Need a hand?</h2>
                    <p className="text-[15px] text-[#64748b] mb-6 leading-relaxed" style={bFont}>
                      No worries! Everyone needs help sometimes. Your AI buddy can guide you step by step.
                    </p>
                    <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <p className="text-[24px]" style={dFont}>5</p>
                          <p className="text-[11px] text-[#94a3b8]" style={bFont}>Help levels</p>
                        </div>
                        <div className="w-px h-8 bg-purple-200" />
                        <div className="text-center">
                          <p className="text-[24px]">💡→✅</p>
                          <p className="text-[11px] text-[#94a3b8]" style={bFont}>Hints to answers</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setShowHelpModal(false)} className="flex-1 py-3 rounded-xl border-2 border-[#e5e7eb] text-[14px] text-[#6b7280] hover:bg-gray-50 transition-colors cursor-pointer" style={dFont}>
                        I&apos;ll try again
                      </button>
                      <button onClick={handleAcceptHelp} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white text-[14px] hover:opacity-90 transition-all cursor-pointer" style={dFont}>
                        Yes, help me! 🙌
                      </button>
                    </div>
                  </div>
                )}

                {modalStage === "unlocking" && (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mx-auto mb-5">
                      <span className="text-[40px] animate-bounce">🔓</span>
                    </div>
                    <h2 className="text-[22px] text-[#0f172a] mb-2" style={dFont}>Unlocking AI Help...</h2>
                    <p className="text-[14px] text-[#94a3b8]" style={bFont}>Preparing your study buddy</p>
                    <div className="mt-5 w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-full transition-all duration-1000" style={{ width: "100%" }} />
                    </div>
                  </div>
                )}

                {modalStage === "ready" && (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-5">
                      <span className="text-[40px]">🎉</span>
                    </div>
                    <h2 className="text-[22px] text-[#0f172a] mb-2" style={dFont}>AI Help is Ready!</h2>
                    <p className="text-[14px] text-[#94a3b8]" style={bFont}>Starting with Level 1: Think First</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}
