"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Atom,
  Calculator,
  BookOpen,
  PenTool,
  Leaf,
  Magnet,
  Brain,
  Lightbulb,
  Sparkles,
  Target,
  NotebookPen,
  FileDown,
  Save,
  User,
} from "lucide-react";

/* ─── Types ─── */
type Step = "subjects" | "learn";

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

interface ChatMessage {
  id: number;
  type:
    | "user"
    | "ai-buttons"
    | "ai-explanation"
    | "ai-analogy"
    | "ai-followup";
  avatarBg?: string;
  avatarIcon?: React.ReactNode;
  content: React.ReactNode;
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

/* ─── Font helpers ─── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ─── Component ─── */
export default function ConceptMasterPage() {
  const [step, setStep] = useState<Step>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inlineInput, setInlineInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  /* ─── Animations ─── */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("cm-anim")) return;
    const s = document.createElement("style");
    s.id = "cm-anim";
    s.textContent = `
      @keyframes cmFadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      .cm-fade { animation: cmFadeUp .5s ease-out both }
      .cm-d1 { animation-delay:.05s } .cm-d2 { animation-delay:.1s } .cm-d3 { animation-delay:.15s }
      .cm-d4 { animation-delay:.2s } .cm-d5 { animation-delay:.25s } .cm-d6 { animation-delay:.3s }
      .cm-d7 { animation-delay:.35s } .cm-d8 { animation-delay:.4s } .cm-d9 { animation-delay:.45s }
      .cm-d10 { animation-delay:.5s } .cm-d11 { animation-delay:.55s } .cm-d12 { animation-delay:.6s }
      @keyframes cmStagger { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      .cm-msg { animation: cmStagger .4s ease-out both }
    `;
    document.head.appendChild(s);
  }, []);

  /* scroll to bottom on new messages */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages]);

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setStep("learn");
  };

  const handleSendBottom = () => {
    if (!inputValue.trim()) return;
    setUserMessages((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
  };

  const handleSendInline = () => {
    if (!inlineInput.trim()) return;
    setUserMessages((prev) => [...prev, inlineInput.trim()]);
    setInlineInput("");
  };

  const handleOptionClick = (text: string) => {
    setUserMessages((prev) => [...prev, text]);
  };

  /* ─── STEP 1: Subjects ─── */
  if (step === "subjects") {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 cm-fade"
          >
            <ArrowLeft size={20} /> Back to home
          </Link>

          <h1
            className="text-[36px] text-[#0f172a] mb-3 cm-fade cm-d1"
            style={dFont}
          >
            Concept Master — Select Subject
          </h1>
          <p className="text-[18px] text-[#64748b] mb-10 cm-fade cm-d2">
            Choose the subject you want to learn
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <button
                key={subject.name}
                onClick={() => handleSubjectClick(subject)}
                className={`group flex flex-col items-center justify-center h-[220px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 ${subject.borderHover} cursor-pointer cm-fade cm-d${i + 3}`}
              >
                <div
                  className={`w-[72px] h-[72px] rounded-2xl ${subject.bgMedium} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}
                >
                  <span className={subject.textColor}>{subject.icon}</span>
                </div>
                <span className="text-[20px] text-[#0f172a]" style={dFont}>
                  {subject.name}
                </span>
                <span className="text-[15px] text-[#94a3b8] mt-1">
                  {subject.topics} topics
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 2: Learn Interface ─── */
  if (step === "learn" && selectedSubject) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row" style={bFont}>
        {/* ─── Left Column ─── */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header area */}
          <div className="bg-white border-b border-[#e5e7eb] px-6 py-6 cm-fade">
            <button
              onClick={() => setStep("subjects")}
              className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-5 cursor-pointer"
            >
              <ArrowLeft size={20} /> Back to subjects
            </button>

            <h1
              className="text-[24px] text-[#0f172a] mb-3"
              style={dFont}
            >
              Why does ice float on water?
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span
                className="inline-flex items-center gap-1.5 text-[14px] px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-600"
                style={dFont}
              >
                <Atom size={14} /> Science
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[14px] px-4 py-1.5 rounded-full bg-purple-100 text-purple-600"
                style={dFont}
              >
                Class 8
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-gradient-to-r from-[#faf5ff] to-[#eff6ff] rounded-[14px] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-purple-600" style={bFont}>
                  Step 3 of 7 — You&apos;re doing great!
                </span>
                <span className="text-[14px] text-purple-600" style={dFont}>
                  43%
                </span>
              </div>
              <div className="w-full h-[10px] bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7c3aed] rounded-full transition-all duration-500"
                  style={{ width: "43%" }}
                />
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-purple-50/30 px-6 py-6 space-y-6">
            {/* Message 1: User */}
            <div className="flex justify-end gap-3 cm-msg" style={{ animationDelay: "0.1s" }}>
              <div className="bg-[#7c3aed] text-white rounded-2xl rounded-tr-lg px-5 py-4 max-w-[500px]">
                <p className="text-[15px] leading-relaxed">
                  Why does ice float on water? My teacher explained but I didn&apos;t understand.
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ff6b2b] flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-white" />
              </div>
            </div>

            {/* Message 2: AI with buttons */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.25s" }}>
              <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
                <Brain size={20} className="text-white" />
              </div>
              <div className="bg-[#f3e8ff] border-2 border-purple-300/30 rounded-2xl px-5 py-4 max-w-[700px]">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={18} className="text-purple-600" />
                  <span className="text-[15px] text-purple-700" style={dFont}>
                    Let me check what you know first
                  </span>
                </div>
                <p className="text-[15px] text-[#374151] leading-relaxed mb-4">
                  Before I explain — do you know that ice is frozen water? And have you heard the word &quot;density&quot; before?
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleOptionClick("Yes, I know both things")}
                    className="bg-[#7c3aed] text-white text-[14px] px-5 py-2.5 rounded-xl hover:bg-[#6d28d9] transition-colors cursor-pointer"
                    style={dFont}
                  >
                    Yes, I know both things
                  </button>
                  <button
                    onClick={() => handleOptionClick("I know ice is frozen water, but what is density?")}
                    className="bg-white text-[#7c3aed] text-[14px] px-5 py-2.5 rounded-xl border-2 border-[#7c3aed] hover:bg-purple-50 transition-colors cursor-pointer"
                    style={dFont}
                  >
                    I know ice is frozen water, but what is density?
                  </button>
                </div>
              </div>
            </div>

            {/* Message 3: User */}
            <div className="flex justify-end gap-3 cm-msg" style={{ animationDelay: "0.4s" }}>
              <div className="bg-[#7c3aed] text-white rounded-2xl rounded-tr-lg px-5 py-4 max-w-[500px]">
                <p className="text-[15px] leading-relaxed">
                  I know both but I don&apos;t fully understand how density works
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ff6b2b] flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-white" />
              </div>
            </div>

            {/* Message 4: AI explanation card */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.55s" }}>
              <div className="w-10 h-10 rounded-full bg-[#06b6d4] flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="bg-white border-l-4 border-[#06b6d4] shadow-sm rounded-2xl px-5 py-5 max-w-[700px]">
                <span className="text-[12px] text-[#06b6d4] uppercase tracking-wide" style={dFont}>
                  Simple explanation
                </span>
                <h3 className="text-[20px] text-[#0f172a] mt-2 mb-3" style={dFont}>
                  Ice floats because it is less dense than liquid water.
                </h3>
                <p className="text-[15px] text-[#374151] leading-relaxed">
                  Most things get heavier and denser when they freeze. Water is special — it does the exact opposite! When water freezes, its molecules arrange themselves into a crystal structure that takes up more space, making ice less dense than liquid water.
                </p>
              </div>
            </div>

            {/* Message 5: AI analogy card */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.7s" }}>
              <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="bg-[#f0fdf4] border-2 border-green-300/30 rounded-2xl px-5 py-5 max-w-[700px]">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-green-600" />
                  <span className="text-[12px] text-green-600 uppercase tracking-wide" style={dFont}>
                    Think of it like this
                  </span>
                </div>
                <p className="text-[15px] text-[#374151] leading-relaxed">
                  Imagine you have a schoolbag. Normally, when you pack more things in, it gets heavier and smaller (denser). But what if you had a magic bag that, when you packed it, actually puffed up and became lighter? That&apos;s what water does when it freezes — it expands and becomes lighter, so it floats on top of the liquid water!
                </p>
              </div>
            </div>

            {/* Message 6: AI follow-up with input */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.85s" }}>
              <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
                <Brain size={20} className="text-white" />
              </div>
              <div className="bg-[#f3e8ff] border-2 border-purple-300/30 rounded-2xl px-5 py-4 max-w-[700px]">
                <p className="text-[15px] text-[#374151] leading-relaxed mb-4">
                  Does this make sense so far? Type &quot;yes&quot; to continue or ask me anything!
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inlineInput}
                    onChange={(e) => setInlineInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendInline()}
                    placeholder="Type your answer..."
                    className="flex-1 bg-white border-2 border-purple-300/30 rounded-[14px] px-4 py-3 text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-purple-400 transition-colors"
                  />
                  <button
                    onClick={handleSendInline}
                    className="w-11 h-11 bg-[#7c3aed] rounded-[14px] flex items-center justify-center text-white hover:bg-[#6d28d9] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic user messages */}
            {userMessages.map((msg, i) => (
              <div
                key={i}
                className="flex justify-end gap-3 cm-msg"
                style={{ animationDelay: "0s" }}
              >
                <div className="bg-[#7c3aed] text-white rounded-2xl rounded-tr-lg px-5 py-4 max-w-[500px]">
                  <p className="text-[15px] leading-relaxed">{msg}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ff6b2b] flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-white" />
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Bottom input bar */}
          <div className="sticky bottom-0 bg-white border-t border-[#e5e7eb] px-5 py-5">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendBottom()}
                placeholder="Ask anything or say 'next step'"
                className="flex-1 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-2xl h-[56px] px-5 text-[16px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button
                onClick={handleSendBottom}
                className="w-[52px] h-[52px] bg-[#7c3aed] rounded-2xl flex items-center justify-center text-white hover:bg-[#6d28d9] transition-colors cursor-pointer flex-shrink-0"
              >
                <Send size={22} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Right Sidebar ─── */}
        <div className="w-full lg:w-[320px] bg-white border-t lg:border-t-0 lg:border-l border-[#e5e7eb] p-6 space-y-6 flex-shrink-0 overflow-y-auto">
          {/* Your revision note */}
          <div className="cm-fade cm-d1">
            <div className="flex items-center gap-2 mb-4">
              <NotebookPen size={18} className="text-[#0f172a]" />
              <span className="text-[14px] text-[#0f172a]" style={dFont}>
                Your revision note
              </span>
            </div>

            <div className="bg-[#fffbeb] border-2 border-[#fee685] rounded-2xl p-5">
              <h4
                className="text-[14px] text-[#0f172a] mb-4"
                style={dFont}
              >
                Why ice floats — Science
              </h4>

              {/* Key concept */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Target size={14} className="text-gray-400" />
                  <span className="text-[12px] text-gray-400" style={dFont}>
                    Key concept
                  </span>
                </div>
                <p className="text-[13px] text-[#374151] leading-relaxed">
                  Ice is less dense than water due to molecular structure
                </p>
              </div>

              {/* The analogy */}
              <div className="mb-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Lightbulb size={14} className="text-gray-400" />
                  <span className="text-[12px] text-gray-400" style={dFont}>
                    The analogy
                  </span>
                </div>
                <p className="text-[13px] text-[#374151] leading-relaxed">
                  Magic bag that gets lighter when packed
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 text-[14px] text-[#7c3aed] border-2 border-[#7c3aed] rounded-xl py-2.5 hover:bg-purple-50 transition-colors cursor-pointer"
                  style={dFont}
                >
                  <FileDown size={16} /> PDF
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 text-[14px] text-white bg-[#7c3aed] rounded-xl py-2.5 hover:bg-[#6d28d9] transition-colors cursor-pointer"
                  style={dFont}
                >
                  <Save size={16} /> Save
                </button>
              </div>
            </div>
          </div>

          {/* Test yourself */}
          <div className="cm-fade cm-d3">
            <div className="bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5] border-2 border-[#b9f8cf] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-[#22c55e]" />
                <span className="text-[14px] text-[#0f172a]" style={dFont}>
                  Test yourself
                </span>
              </div>

              <div className="text-center mb-4">
                <p className="text-[24px] text-[#22c55e]" style={dFont}>
                  5 MCQs
                </p>
                <p className="text-[14px] text-[#64748b] mt-1">
                  Auto-generated quiz ready
                </p>
              </div>

              <button
                className="w-full bg-[#22c55e] text-white text-[15px] rounded-xl py-3 hover:bg-[#16a34a] transition-colors cursor-pointer"
                style={dFont}
              >
                Start Quiz (+50 XP)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
