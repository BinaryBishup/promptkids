"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  Calculator,
  BookOpen,
  PenTool,
  Leaf,
  Magnet,
  PlayCircle,
  Clock,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

/* ─── Types ─── */
type Step = "subjects" | "topics" | "quiz";

interface Subject {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
  bgMedium: string;
  textColor: string;
  borderHover: string;
  topics: number;
}

interface Topic {
  name: string;
  description: string;
  questions: number;
  minutes: number;
  subtopics: string[];
  iconColor: string;
  iconBg: string;
}

type QuestionType = "FILLUP" | "MCQ" | "TRUE-FALSE" | "MCA" | "MATCH" | "SHORT" | "LONG";
type Difficulty = "EASY" | "MEDIUM" | "HARD";

interface Question {
  type: QuestionType;
  difficulty: Difficulty;
  topic: string;
  text: string;
  image?: boolean;
  options?: string[];
  matchLeft?: string[];
  matchRight?: string[];
}

/* ─── Data ─── */
const subjects: Subject[] = [
  { name: "Science",  icon: <Atom size={36} />,       color: "cyan",   bgLight: "bg-cyan-50",   bgMedium: "bg-cyan-100",   textColor: "text-cyan-600",   borderHover: "hover:border-cyan-300",   topics: 8  },
  { name: "Maths",    icon: <Calculator size={36} />,  color: "purple", bgLight: "bg-purple-50", bgMedium: "bg-purple-100", textColor: "text-purple-600", borderHover: "hover:border-purple-300", topics: 12 },
  { name: "History",  icon: <BookOpen size={36} />,    color: "orange", bgLight: "bg-orange-50", bgMedium: "bg-orange-100", textColor: "text-orange-600", borderHover: "hover:border-orange-300", topics: 6  },
  { name: "English",  icon: <PenTool size={36} />,     color: "green",  bgLight: "bg-green-50",  bgMedium: "bg-green-100",  textColor: "text-green-600",  borderHover: "hover:border-green-300",  topics: 10 },
  { name: "Biology",  icon: <Leaf size={36} />,        color: "pink",   bgLight: "bg-pink-50",   bgMedium: "bg-pink-100",   textColor: "text-pink-600",   borderHover: "hover:border-pink-300",   topics: 7  },
  { name: "Physics",  icon: <Magnet size={36} />,      color: "blue",   bgLight: "bg-blue-50",   bgMedium: "bg-blue-100",   textColor: "text-blue-600",   borderHover: "hover:border-blue-300",   topics: 9  },
];

const scienceTopics: Topic[] = [
  { name: "Light & Reflection", description: "Study the behaviour of light, mirrors and reflection laws", questions: 12, minutes: 10, subtopics: ["Laws of Reflection", "Plane Mirrors", "Curved Mirrors", "Ray Diagrams"], iconColor: "text-amber-500", iconBg: "bg-amber-50" },
  { name: "Chemical Reactions", description: "Explore types of chemical reactions and balancing equations", questions: 15, minutes: 12, subtopics: ["Combination", "Decomposition", "Displacement", "Redox Reactions"], iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
  { name: "Force & Motion", description: "Understand forces, motion and Newton's fundamental laws", questions: 14, minutes: 11, subtopics: ["Newton's Laws", "Friction", "Momentum", "Gravitation"], iconColor: "text-blue-500", iconBg: "bg-blue-50" },
  { name: "Sound", description: "Learn about sound waves, frequency and the human ear", questions: 10, minutes: 8, subtopics: ["Sound Waves", "Frequency & Pitch", "Reflection", "Human Ear"], iconColor: "text-violet-500", iconBg: "bg-violet-50" },
  { name: "Electricity", description: "Study electric current, circuits and Ohm's law", questions: 16, minutes: 13, subtopics: ["Electric Current", "Ohm's Law", "Series & Parallel", "Power"], iconColor: "text-rose-500", iconBg: "bg-rose-50" },
];

const quizQuestions: Question[] = [
  { type: "FILLUP", difficulty: "EASY", topic: "Light & Reflection", text: "The angle of incidence is always _____ to the angle of reflection." },
  { type: "MCQ", difficulty: "MEDIUM", topic: "Light & Reflection", text: "Which law states that the angle of incidence equals the angle of reflection?", options: ["Snell's Law", "Law of Reflection", "Brewster's Law", "Fermat's Principle"] },
  { type: "TRUE-FALSE", difficulty: "EASY", topic: "Light & Reflection", text: "Light travels faster in glass than in air." },
  { type: "MCA", difficulty: "MEDIUM", topic: "Light & Reflection", text: "Which of the following are types of mirrors? (Select all that apply)", options: ["Plane Mirror", "Convex Mirror", "Concave Mirror", "Circular Mirror"] },
  { type: "MATCH", difficulty: "HARD", topic: "Light & Reflection", text: "Match each optical element with its property:", matchLeft: ["Convex Mirror", "Concave Mirror", "Plane Mirror", "Prism"], matchRight: ["Diverging", "Converging", "Neither converging nor diverging", "Dispersing"] },
  { type: "SHORT", difficulty: "MEDIUM", topic: "Light & Reflection", text: "Explain why a pencil appears bent when partially immersed in water." },
  { type: "MCQ", difficulty: "EASY", topic: "Sound", text: "What is the SI unit of frequency?", options: ["Hertz (Hz)", "Metres per second (m/s)", "Decibels (dB)", "Watts (W)"] },
  { type: "FILLUP", difficulty: "MEDIUM", topic: "Light & Reflection", text: "The speed of light in vacuum is approximately _____ m/s." },
  { type: "LONG", difficulty: "HARD", topic: "Light & Reflection", text: "Describe the process of total internal reflection and give two real-world examples." },
  { type: "TRUE-FALSE", difficulty: "EASY", topic: "Light & Reflection", text: "A concave mirror always forms a virtual image." },
];

/* ─── Font helpers ─── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ─── Difficulty badge colors ─── */
const diffColors: Record<Difficulty, { bg: string; text: string }> = {
  EASY: { bg: "bg-green-100", text: "text-green-700" },
  MEDIUM: { bg: "bg-amber-100", text: "text-amber-700" },
  HARD: { bg: "bg-red-100", text: "text-red-700" },
};

/* ─── Type label mapping ─── */
const typeLabel: Record<QuestionType, string> = {
  FILLUP: "Fill in the Blank",
  MCQ: "Multiple Choice",
  "TRUE-FALSE": "True / False",
  MCA: "Multiple Correct",
  MATCH: "Match the Following",
  SHORT: "Short Answer",
  LONG: "Long Answer",
};

/* ─── Component ─── */
export default function PracticeArenaPage() {
  const [step, setStep] = useState<Step>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  // Answer states
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null);
  const [mcaAnswers, setMcaAnswers] = useState<Set<number>>(new Set());
  const [tfAnswer, setTfAnswer] = useState<boolean | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [longAnswer, setLongAnswer] = useState("");
  const [matchAnswers, setMatchAnswers] = useState<Record<number, string>>({});

  /* ─── Animations ─── */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("pa-anim")) return;
    const s = document.createElement("style");
    s.id = "pa-anim";
    s.textContent = `
      @keyframes paFadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      .pa-fade { animation: paFadeUp .5s ease-out both }
      .pa-d1 { animation-delay:.05s } .pa-d2 { animation-delay:.1s } .pa-d3 { animation-delay:.15s }
      .pa-d4 { animation-delay:.2s } .pa-d5 { animation-delay:.25s } .pa-d6 { animation-delay:.3s }
      .pa-d7 { animation-delay:.35s } .pa-d8 { animation-delay:.4s } .pa-d9 { animation-delay:.45s }
      .pa-d10 { animation-delay:.5s } .pa-d11 { animation-delay:.55s } .pa-d12 { animation-delay:.6s }
    `;
    document.head.appendChild(s);
  }, []);

  const resetAnswers = () => {
    setMcqAnswer(null);
    setMcaAnswers(new Set());
    setTfAnswer(null);
    setFillAnswer("");
    setShortAnswer("");
    setLongAnswer("");
    setMatchAnswers({});
  };

  const handleNext = () => {
    setCompleted((prev) => new Set(prev).add(currentQ));
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      resetAnswers();
    }
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setStep("topics");
  };

  const handleStartQuiz = () => {
    setStep("quiz");
    setCurrentQ(0);
    setCompleted(new Set());
    resetAnswers();
  };

  /* ─────────────── STEP 1: Subject Selector ─────────────── */
  if (step === "subjects") {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 pa-fade"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to home
          </Link>

          <h1 className="text-[36px] text-[#0f172a] mb-3 pa-fade pa-d1" style={dFont}>
            Practice Arena — Select Subject
          </h1>
          <p className="text-[18px] text-[#64748b] mb-10 pa-fade pa-d2" style={bFont}>
            Choose a subject to practice
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <button
                key={subject.name}
                onClick={() => handleSubjectClick(subject)}
                className={`group flex flex-col items-center justify-center h-[220px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 ${subject.borderHover} cursor-pointer pa-fade pa-d${i + 3}`}
              >
                <div
                  className={`w-[72px] h-[72px] rounded-2xl ${subject.bgMedium} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}
                >
                  <span className={subject.textColor}>{subject.icon}</span>
                </div>
                <span className="text-[20px] text-[#0f172a]" style={dFont}>
                  {subject.name}
                </span>
                <span className="text-[15px] text-[#94a3b8] mt-1" style={bFont}>
                  {subject.topics} topics
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────── STEP 2: Topic Selection ─────────────── */
  if (step === "topics" && selectedSubject) {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <button
            onClick={() => setStep("subjects")}
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 pa-fade cursor-pointer"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to subjects
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-3 pa-fade pa-d1">
            <div className={`w-14 h-14 rounded-2xl ${selectedSubject.bgMedium} flex items-center justify-center`}>
              <span className={selectedSubject.textColor}>{selectedSubject.icon}</span>
            </div>
            <h1 className="text-[32px] text-[#0f172a]" style={dFont}>
              {selectedSubject.name} Practice
            </h1>
          </div>
          <p className="text-[18px] text-[#64748b] mb-10 pa-fade pa-d2" style={bFont}>
            Pick a practice quiz to get started!
          </p>

          {/* Topic cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {scienceTopics.map((topic, i) => (
              <div
                key={topic.name}
                className={`bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-200 cursor-pointer pa-fade pa-d${i + 3}`}
              >
                {/* Icon + Title + Description */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${topic.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Atom className={`w-6 h-6 ${topic.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-[18px] text-[#0f172a] mb-1" style={dFont}>{topic.name}</h3>
                    <p className="text-[14px] text-[#6b7280]" style={bFont}>{topic.description}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-4 text-[14px]">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#9ca3af]" />
                    <span style={dFont} className="text-[#374151]">{topic.questions}</span>
                    <span className="text-[#9ca3af]" style={bFont}>Questions</span>
                  </div>
                  <div className="w-px h-4 bg-[#e5e7eb]" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#9ca3af]" />
                    <span style={dFont} className="text-[#374151]">{topic.minutes}</span>
                    <span className="text-[#9ca3af]" style={bFont}>Minutes</span>
                  </div>
                </div>

                {/* Subtopic pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {topic.subtopics.map((st) => (
                    <span key={st} className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-[12px]" style={bFont}>
                      {st}
                    </span>
                  ))}
                </div>

                {/* Start Practice link */}
                <button
                  onClick={handleStartQuiz}
                  className="inline-flex items-center gap-2 text-[#2563eb] text-[14px] hover:gap-3 transition-all duration-200 cursor-pointer"
                  style={dFont}
                >
                  Start Practice <PlayCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────── STEP 3: Quiz Assessment ─────────────── */
  const q = quizQuestions[currentQ];
  const progress = ((currentQ + 1) / quizQuestions.length) * 100;
  const dc = diffColors[q.difficulty];

  const renderAnswerArea = () => {
    switch (q.type) {
      case "MCQ":
        return (
          <div className="flex flex-col gap-3 mt-6">
            {(q.options || []).map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              const selected = mcqAnswer === i;
              return (
                <button
                  key={i}
                  onClick={() => setMcqAnswer(i)}
                  className={`flex items-center gap-3 px-5 py-4 border-2 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    selected ? "border-[#2563eb] bg-blue-50/50" : "border-[#e5e7eb] bg-white hover:border-blue-200"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] flex-shrink-0 ${
                    selected ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-500"
                  }`} style={dFont}>{letter}</span>
                  <span className="text-[15px] text-[#374151]" style={bFont}>{opt}</span>
                </button>
              );
            })}
          </div>
        );

      case "MCA":
        return (
          <div className="flex flex-col gap-3 mt-6">
            {(q.options || []).map((opt, i) => {
              const selected = mcaAnswers.has(i);
              return (
                <button
                  key={i}
                  onClick={() => {
                    const next = new Set(mcaAnswers);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    setMcaAnswers(next);
                  }}
                  className={`flex items-center gap-3 px-5 py-4 border-2 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                    selected ? "border-[#2563eb] bg-blue-50/50" : "border-[#e5e7eb] bg-white hover:border-blue-200"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-md flex items-center justify-center text-[14px] flex-shrink-0 border-2 ${
                    selected ? "bg-[#2563eb] border-[#2563eb] text-white" : "bg-white border-gray-300 text-transparent"
                  }`}>
                    {selected && <CheckCircle2 className="w-5 h-5" />}
                  </span>
                  <span className="text-[15px] text-[#374151]" style={bFont}>{opt}</span>
                </button>
              );
            })}
          </div>
        );

      case "TRUE-FALSE":
        return (
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setTfAnswer(true)}
              className={`flex-1 py-5 rounded-xl border-2 text-[18px] transition-all duration-200 cursor-pointer ${
                tfAnswer === true ? "border-green-500 bg-green-50 text-green-700" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-green-300 hover:bg-green-50/50"
              }`}
              style={dFont}
            >
              True
            </button>
            <button
              onClick={() => setTfAnswer(false)}
              className={`flex-1 py-5 rounded-xl border-2 text-[18px] transition-all duration-200 cursor-pointer ${
                tfAnswer === false ? "border-red-500 bg-red-50 text-red-700" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-red-300 hover:bg-red-50/50"
              }`}
              style={dFont}
            >
              False
            </button>
          </div>
        );

      case "FILLUP":
        return (
          <div className="mt-6">
            <p className="text-[15px] text-[#6b7280] mb-3" style={bFont}>
              Fill in the blank marked with <span className="font-bold text-[#2563eb]">_____</span>
            </p>
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full border-2 border-[#e5e7eb] rounded-xl h-12 px-4 text-[15px] focus:border-[#2563eb] focus:outline-none transition-colors"
              style={bFont}
            />
          </div>
        );

      case "SHORT":
        return (
          <div className="mt-6">
            <textarea
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              placeholder="Write a brief answer (2-3 sentences)..."
              className="w-full border-2 border-[#e5e7eb] rounded-xl h-24 p-4 text-[15px] resize-none focus:border-[#2563eb] focus:outline-none transition-colors"
              style={bFont}
            />
          </div>
        );

      case "LONG":
        return (
          <div className="mt-6">
            <textarea
              value={longAnswer}
              onChange={(e) => setLongAnswer(e.target.value)}
              placeholder="Write a detailed answer with explanation..."
              className="w-full border-2 border-[#e5e7eb] rounded-xl h-40 p-4 text-[15px] resize-none focus:border-[#2563eb] focus:outline-none transition-colors"
              style={bFont}
            />
          </div>
        );

      case "MATCH":
        return (
          <div className="mt-6">
            <div className="flex flex-col gap-3">
              {(q.matchLeft || []).map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-50 border-2 border-[#e5e7eb] rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[13px] flex-shrink-0" style={dFont}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-[15px] text-[#374151]" style={bFont}>{item}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={matchAnswers[i] || ""}
                    onChange={(e) => setMatchAnswers({ ...matchAnswers, [i]: e.target.value })}
                    className="flex-1 border-2 border-[#e5e7eb] rounded-xl px-4 py-3 text-[15px] bg-white focus:border-[#2563eb] focus:outline-none transition-colors cursor-pointer appearance-none"
                    style={bFont}
                  >
                    <option value="">Select match...</option>
                    {(q.matchRight || []).map((opt, j) => (
                      <option key={j} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top progress bar */}
        <div className="mb-8 pa-fade">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[16px] text-[#374151]" style={dFont}>
              Question {currentQ + 1} of {quizQuestions.length}
            </span>
            <span className="text-[16px] text-[#2563eb]" style={dFont}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563eb] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main question area */}
          <div className="flex-1 pa-fade pa-d1">
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6">
              {/* Tags row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`${dc.bg} ${dc.text} px-3 py-1 rounded-full text-[12px]`} style={dFont}>
                  {q.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[12px]" style={dFont}>
                  {typeLabel[q.type]}
                </span>
                <span className="border border-blue-200 text-blue-600 px-3 py-1 rounded-full text-[12px]" style={bFont}>
                  {q.topic}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-[18px] text-[#0f172a] leading-relaxed" style={dFont}>
                {q.text}
              </h2>

              {/* Optional image placeholder */}
              {q.image && (
                <div className="mt-5 h-[200px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-400 text-[14px]" style={bFont}>Image placeholder</span>
                </div>
              )}

              {/* Answer area */}
              {renderAnswerArea()}

              {/* Next button */}
              <button
                onClick={handleNext}
                className="w-full mt-8 bg-[#2563eb] text-white rounded-2xl py-4 text-[16px] hover:bg-[#1d4ed8] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                style={dFont}
              >
                {currentQ < quizQuestions.length - 1 ? "Next Question >" : "Finish Quiz"}
              </button>
            </div>
          </div>

          {/* Right sidebar — Session Overview */}
          <div className="w-full lg:w-[280px] flex-shrink-0 pa-fade pa-d2">
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-5 sticky top-8">
              <h3 className="text-[16px] text-[#0f172a] mb-4" style={dFont}>
                Session Overview
              </h3>

              <div className="flex flex-col gap-1">
                {quizQuestions.map((question, i) => {
                  const isCurrent = i === currentQ;
                  const isDone = completed.has(i);
                  return (
                    <button
                      key={i}
                      onClick={() => { resetAnswers(); setCurrentQ(i); }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? "bg-blue-50 border-l-[3px] border-[#2563eb]"
                          : isDone
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                          isCurrent ? "border-[#2563eb]" : "border-gray-300"
                        }`} />
                      )}
                      <div className="flex flex-col">
                        <span className={`text-[13px] ${isCurrent ? "text-[#2563eb]" : "text-[#374151]"}`} style={dFont}>
                          Q{i + 1}
                        </span>
                        <span className="text-[11px] text-[#9ca3af]" style={bFont}>
                          {question.type}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
