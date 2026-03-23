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
  { level: 1, name: "Think First", desc: "Guiding questions to help you think", attemptsNeeded: 0 },
  { level: 2, name: "Concept Hint", desc: "Formula or rule reminder", attemptsNeeded: 2 },
  { level: 3, name: "Similar Example", desc: "Solved similar problem", attemptsNeeded: 4 },
  { level: 4, name: "Step by Step", desc: "Walk through your question", attemptsNeeded: 6 },
  { level: 5, name: "Full Answer", desc: "Complete solution (Parents notified)", attemptsNeeded: 8 },
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

  const handleSubmit = () => {
    setAttempts((a) => a + 1);
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
      <div className="min-h-screen bg-[#f8fafc] relative" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button onClick={() => setStep("topics")} className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-8 sh-fade cursor-pointer" style={dFont}>
            <ArrowLeft size={20} /> Back to assignments
          </button>

          {/* Title + Tags */}
          <h1 className="text-[30px] text-[#0f172a] mb-5 sh-fade sh-d1" style={dFont}>
            {selectedAssignment.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2.5 mb-8 sh-fade sh-d2">
            <span className={`inline-flex items-center gap-1.5 text-[14px] px-4 py-1.5 rounded-full ${selectedSubject.bgMedium} ${selectedSubject.textColor}`} style={dFont}>
              <Atom size={14} /> {selectedSubject.name}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[14px] text-white bg-[#1e293b] px-4 py-1.5 rounded-full" style={dFont}>Class 8</span>
            <span className="inline-flex items-center gap-1.5 text-[14px] text-amber-700 bg-amber-100 px-4 py-1.5 rounded-full" style={dFont}>
              <Clock size={14} /> Due: Today 5:00 PM
            </span>
            <span className="inline-flex items-center gap-1.5 text-[14px] text-purple-700 bg-purple-100 px-4 py-1.5 rounded-full" style={dFont}>
              <FileText size={14} /> Long Answer
            </span>
          </div>

          {/* Assignment Question */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 mb-8 sh-fade sh-d3">
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

            {/* Reference diagram */}
            <div className="h-[240px] bg-gradient-to-br from-[#1e3a5f] via-[#2d5f8a] to-[#1e3a5f] rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent absolute left-1/2 -translate-x-1/2" />
                <div className="absolute w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/3 w-48 h-0.5 bg-yellow-300/40 rotate-[25deg]" />
                <div className="absolute top-1/2 right-1/3 w-48 h-0.5 bg-cyan-300/40 -rotate-[15deg]" />
              </div>
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-[12px] text-white/60 bg-black/30 px-3 py-1 rounded-full" style={bFont}>
                  Diagram: Light passing through different mediums
                </span>
              </div>
            </div>
          </div>

          {/* Your Answer */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 mb-8 sh-fade sh-d4">
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

            <div className="flex items-center justify-between mt-4 mb-5">
              <span className="text-[14px] text-[#94a3b8]" style={bFont}>{wordCount} words typed</span>
              <span className="text-[14px] text-[#94a3b8]" style={bFont}>Attempts: {attempts}</span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white text-[17px] rounded-2xl py-4 transition-all active:scale-[0.98] cursor-pointer"
              style={dFont}
            >
              <Send size={20} />
              Submit Answer (Attempt {attempts + 1})
            </button>
          </div>

          {/* AI Help Levels — inline */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 mb-8 sh-fade sh-d5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2.5 text-[20px] text-[#0f172a]" style={dFont}>
                <Bot size={22} className="text-purple-500" />
                AI Help Levels
              </h2>
              <span className="text-[14px] text-[#94a3b8]" style={bFont}>Unlock by submitting attempts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {helpLevels.map((hl) => {
                const isUnlocked = attempts >= hl.attemptsNeeded;
                return (
                  <button
                    key={hl.level}
                    onClick={() => isUnlocked && openHelp(hl.level)}
                    disabled={!isUnlocked}
                    className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                      isUnlocked
                        ? "border-purple-200 bg-purple-50/50 hover:shadow-lg hover:-translate-y-1 hover:border-purple-400 cursor-pointer"
                        : "border-[#e5e7eb] bg-gray-50 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                      isUnlocked ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-400"
                    }`}>
                      {isUnlocked ? <CircleCheck size={20} /> : <Lock size={16} />}
                    </div>
                    <span className="text-[14px] text-[#0f172a] mb-1" style={dFont}>
                      L{hl.level}: {hl.name}
                    </span>
                    <span className="text-[12px] text-[#94a3b8]" style={bFont}>{hl.desc}</span>
                    {!isUnlocked && (
                      <span className="text-[11px] text-[#94a3b8] mt-2" style={bFont}>
                        {hl.attemptsNeeded - attempts} more attempts
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Completion Reward */}
          <div className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-2xl p-8 flex items-center justify-between sh-fade sh-d6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Trophy size={28} className="text-white" />
              </div>
              <div>
                <p className="text-white text-[18px]" style={dFont}>Completion Reward</p>
                <p className="text-white/70 text-[14px] mt-0.5" style={bFont}>Complete with minimal AI help for bonus!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-[32px]" style={dFont}>+75 XP</p>
              <p className="text-green-300 text-[14px]" style={dFont}>+25 bonus</p>
            </div>
          </div>
        </div>

        {/* ─── AI Chat Panel (slides up from bottom-right) ─── */}
        {chatOpen && (
          <>
            <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setChatOpen(false)} />
            <div className="fixed bottom-6 right-6 w-[400px] max-h-[500px] bg-white rounded-2xl shadow-2xl border-2 border-purple-200 z-50 flex flex-col overflow-hidden chat-slide">
              {/* Chat header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-[15px]" style={dFont}>AI Study Buddy</p>
                    <p className="text-white/70 text-[12px]" style={bFont}>Level {chatLevel} Help</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[200px] max-h-[320px]">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-[#2563eb] text-white rounded-br-md"
                        : "bg-[#f1f5f9] text-[#374151] rounded-bl-md"
                    }`} style={bFont}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <div className="border-t border-[#e5e7eb] p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                    sendChatMessage(input.value);
                    input.value = "";
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    className="flex-1 bg-[#f8fafc] border-2 border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-purple-400"
                  />
                  <button type="submit" className="w-10 h-10 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Floating AI help button (when chat is closed) */}
        {!chatOpen && step === "workspace" && (
          <button
            onClick={() => {
              if (attempts > 0) openHelp(1);
            }}
            className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all z-40 ${
              attempts > 0
                ? "bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white hover:scale-110 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            title={attempts > 0 ? "Get AI Help" : "Submit an attempt first"}
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>
    );
  }

  return null;
}
