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
  NotebookPen,
  FileDown,
  Save,
  User,
  Upload,
  Youtube,
  FileText,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Zap,
  Globe,
  Play,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

import AppHeader from "@/components/AppHeader";

/* ─── Types ─── */
type Step = "subjects" | "topics" | "learn";

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
  const [quizGenerating, setQuizGenerating] = useState(false);
  const [quizProgress, setQuizProgress] = useState(0);
  const [quizReady, setQuizReady] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const subjectParam = new URLSearchParams(window.location.search).get("subject");
    if (subjectParam && step === "subjects") {
      const match = subjects.find(s => s.name === subjectParam);
      if (match) {
        handleSubjectClick(match);
      }
    }
  }, []); // eslint-disable-line

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
    setStep("topics");
  };

  const [selectedTopic, setSelectedTopic] = useState("");

  const topicsBySubject: Record<string, { name: string; desc: string }[]> = {
    Science: [
      { name: "Light & Reflection", desc: "Laws of reflection, mirrors, and light behavior" },
      { name: "Chemical Reactions", desc: "Types of reactions and chemical equations" },
      { name: "Force & Motion", desc: "Newton's laws and motion principles" },
      { name: "Sound", desc: "Sound waves, frequency, and propagation" },
      { name: "Electricity", desc: "Electric current, circuits, and Ohm's law" },
    ],
    Maths: [
      { name: "Quadratic Equations", desc: "Solving and graphing quadratic equations" },
      { name: "Trigonometry", desc: "Ratios, identities, and applications" },
      { name: "Statistics", desc: "Mean, median, mode, and probability" },
    ],
    History: [
      { name: "French Revolution", desc: "Causes, events, and aftermath" },
      { name: "World War II", desc: "Timeline, causes, and global impact" },
    ],
    English: [
      { name: "Essay Writing", desc: "Structure, arguments, and persuasion" },
      { name: "Grammar", desc: "Tenses, voice, and sentence structure" },
    ],
    Biology: [
      { name: "Cell Structure", desc: "Cell organelles and their functions" },
      { name: "Photosynthesis", desc: "Process, factors, and importance" },
    ],
    Physics: [
      { name: "Waves", desc: "Types, properties, and behavior" },
      { name: "Thermodynamics", desc: "Heat, energy, and laws" },
    ],
  };

  const handleTopicClick = (topicName: string) => {
    setSelectedTopic(topicName);
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
        <AppHeader breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Concept Master" }]} />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-[36px] text-[#0f172a] mb-3" style={dFont}>Concept Master</h1>
          <p className="text-[18px] text-[#64748b] mb-10" style={bFont}>Choose the subject you want to learn</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <button
                key={subject.name}
                onClick={() => handleSubjectClick(subject)}
                className={`group flex flex-col items-center justify-center h-[180px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 ${subject.borderHover} cursor-pointer`}
              >
                <div className={`w-16 h-16 rounded-2xl ${subject.bgMedium} flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110`}>
                  <span className={subject.textColor}>{subject.icon}</span>
                </div>
                <span className="text-[18px] text-[#0f172a]" style={dFont}>{subject.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 2: Topic Selector ─── */
  if (step === "topics" && selectedSubject) {
    const topics = topicsBySubject[selectedSubject.name] || [];
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <AppHeader breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Concept Master", onClick: () => setStep("subjects") }, { label: selectedSubject.name }]} />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-3 cm-fade">
            <div className={`w-12 h-12 rounded-xl ${selectedSubject.bgMedium} flex items-center justify-center`}>
              <span className={selectedSubject.textColor}>{selectedSubject.icon}</span>
            </div>
            <h1 className="text-[32px] text-[#0f172a]" style={dFont}>{selectedSubject.name} — Topics</h1>
          </div>
          <p className="text-[18px] text-[#64748b] mb-10 cm-fade" style={bFont}>Pick a topic to start learning with AI</p>

          <div className="flex flex-col gap-4">
            {topics.map((topic, i) => (
              <button
                key={topic.name}
                onClick={() => handleTopicClick(topic.name)}
                className={`group flex items-center justify-between bg-white border-2 border-[#e5e7eb] rounded-2xl px-8 py-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${selectedSubject.borderHover} cursor-pointer text-left cm-fade`}
                style={{ animationDelay: `${0.05 * (i + 1)}s` }}
              >
                <div>
                  <span className="block text-[18px] text-[#0f172a] mb-1" style={dFont}>{topic.name}</span>
                  <span className="text-[14px] text-[#94a3b8]" style={bFont}>{topic.desc}</span>
                </div>
                <ChevronRight size={22} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 3: Learn Interface ─── */
  if (step === "learn" && selectedSubject) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col" style={bFont}>
        <AppHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Concept Master", onClick: () => setStep("subjects") },
            { label: selectedSubject.name },
          ]}
        />

        <div className="flex-1 flex flex-col lg:flex-row">
        {/* ─── Left Column ─── */}
        <div className="flex-1 flex flex-col">
          {/* Header area */}
          <div className="bg-white border-b border-[#e5e7eb] px-8 lg:px-12 py-6 cm-fade">
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

          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-purple-50/30 px-8 lg:px-16 xl:px-24 py-8 space-y-6">
            {/* Message 1: User */}
            <div className="flex justify-end gap-3 cm-msg" style={{ animationDelay: "0.1s" }}>
              <div className="bg-[#7c3aed] text-white rounded-2xl rounded-tr-lg px-5 py-4 max-w-[500px]">
                <p className="text-[15px] leading-relaxed" style={bFont}>
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
                <p className="text-[15px] text-[#374151] leading-relaxed mb-4" style={bFont}>
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
                <p className="text-[15px] leading-relaxed" style={bFont}>
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
                <p className="text-[15px] text-[#374151] leading-relaxed" style={bFont}>
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
                <p className="text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                  Imagine you have a schoolbag. Normally, when you pack more things in, it gets heavier and smaller (denser). But what if you had a magic bag that, when you packed it, actually puffed up and became lighter? That&apos;s what water does when it freezes — it expands and becomes lighter, so it floats on top of the liquid water!
                </p>
              </div>
            </div>

            {/* Message 6: AI-generated diagram */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.85s" }}>
              <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                <ImageIcon size={20} className="text-white" />
              </div>
              <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden max-w-[600px]">
                <div className="h-[180px] bg-gradient-to-br from-[#1e3a5f] via-[#2d5f8a] to-[#1a2d4a] relative flex items-center justify-center">
                  <div className="absolute w-px h-full bg-white/30 left-1/2" />
                  <div className="absolute w-32 h-px bg-yellow-300/50 rotate-[30deg] top-1/3 left-1/4" />
                  <div className="absolute w-32 h-px bg-cyan-300/50 -rotate-[20deg] bottom-1/3 right-1/4" />
                  <div className="absolute w-20 h-20 border border-white/20 rounded-full top-1/4 right-1/3" />
                  <span className="text-white/30 text-[11px] absolute bottom-2 right-3" style={bFont}>AI Generated</span>
                </div>
                <div className="px-5 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon size={14} className="text-blue-500" />
                    <span className="text-[12px] text-blue-600 uppercase tracking-wide" style={dFont}>Generated Diagram</span>
                  </div>
                  <p className="text-[14px] text-[#374151]" style={bFont}>
                    Water molecules in liquid vs ice — showing how the crystal lattice structure makes ice less dense
                  </p>
                </div>
              </div>
            </div>

            {/* Message 7: YouTube recommendation */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.95s" }}>
              <div className="w-10 h-10 rounded-full bg-[#ef4444] flex items-center justify-center flex-shrink-0">
                <Youtube size={20} className="text-white" />
              </div>
              <div className="bg-white border-2 border-red-200 rounded-2xl overflow-hidden max-w-[500px]">
                <div className="h-[140px] bg-gradient-to-br from-red-900 to-red-800 relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Play size={28} className="text-white ml-1" />
                  </div>
                  <span className="absolute bottom-2 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded" style={bFont}>3:42</span>
                </div>
                <div className="px-5 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={14} className="text-red-500" />
                    <span className="text-[12px] text-red-500 uppercase tracking-wide" style={dFont}>Found on the Internet</span>
                  </div>
                  <p className="text-[14px] text-[#0f172a] mb-1" style={dFont}>
                    Why Does Ice Float? — Science Explained
                  </p>
                  <p className="text-[12px] text-[#94a3b8] mb-3" style={bFont}>
                    A short animated video that explains density and molecular structure in a fun way.
                  </p>
                  <button className="inline-flex items-center gap-1.5 text-[13px] text-[#ef4444] hover:text-red-700 transition-colors cursor-pointer" style={dFont}>
                    <ExternalLink size={14} /> Watch Video
                  </button>
                </div>
              </div>
            </div>

            {/* Message 8: AI follow-up with input */}
            <div className="flex justify-start gap-3 cm-msg" style={{ animationDelay: "0.85s" }}>
              <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
                <Brain size={20} className="text-white" />
              </div>
              <div className="bg-[#f3e8ff] border-2 border-purple-300/30 rounded-2xl px-5 py-4 max-w-[700px]">
                <p className="text-[15px] text-[#374151] leading-relaxed mb-4" style={bFont}>
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
                  <p className="text-[15px] leading-relaxed" style={bFont}>{msg}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ff6b2b] flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-white" />
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Bottom input bar with context upload buttons */}
          <div className="sticky bottom-0 bg-white border-t border-[#e5e7eb] px-8 lg:px-16 xl:px-24 py-4">
            {/* Context upload row */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] text-[#94a3b8] mr-1" style={bFont}>Add:</span>
              {[
                { icon: Upload, label: "PDF", color: "text-[#2563eb]", bg: "hover:bg-blue-50", border: "border-blue-200" },
                { icon: Youtube, label: "YouTube", color: "text-[#ef4444]", bg: "hover:bg-red-50", border: "border-red-200" },
                { icon: FileText, label: "Document", color: "text-[#10b981]", bg: "hover:bg-green-50", border: "border-green-200" },
                { icon: ImageIcon, label: "Picture", color: "text-[#f59e0b]", bg: "hover:bg-amber-50", border: "border-amber-200" },
                { icon: Globe, label: "Web Link", color: "text-[#7c3aed]", bg: "hover:bg-purple-50", border: "border-purple-200" },
                { icon: NotebookPen, label: "Notes", color: "text-[#6366f1]", bg: "hover:bg-indigo-50", border: "border-indigo-200" },
              ].map((a) => (
                <button
                  key={a.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${a.border} ${a.bg} transition-all duration-150 cursor-pointer`}
                >
                  <a.icon size={14} className={a.color} />
                  <span className="text-[12px] text-[#374151]" style={dFont}>{a.label}</span>
                </button>
              ))}
            </div>
            {/* Input */}
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
        <div className="w-full lg:w-[340px] bg-white border-t lg:border-t-0 lg:border-l border-[#e5e7eb] flex-shrink-0 flex flex-col">
          {/* Scrollable top section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Revision Note */}
          <div className="cm-fade cm-d1">
            <div className="bg-[#fffbeb] border-2 border-[#fee685] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[13px] text-[#0f172a]" style={dFont}>
                  Revision Note
                </h4>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg border border-[#7c3aed] flex items-center justify-center hover:bg-purple-50 transition-colors cursor-pointer">
                    <FileDown size={14} className="text-[#7c3aed]" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center hover:bg-[#6d28d9] transition-colors cursor-pointer">
                    <Save size={14} className="text-white" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Zap size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-[#374151] leading-relaxed" style={bFont}>Ice is less dense than water due to molecular structure</p>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-[#374151] leading-relaxed" style={bFont}>Magic bag analogy — gets lighter when packed tightly</p>
                </div>
              </div>
            </div>
          </div>

          </div>
          {/* End scrollable section */}

          {/* Test Yourself — sticky at bottom */}
          <div className="sticky bottom-0 border-t border-[#e5e7eb] p-5 bg-white z-10">
            <div className="bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5] border-2 border-[#b9f8cf] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-[#22c55e]" />
                <span className="text-[15px] text-[#0f172a]" style={dFont}>
                  Test Yourself
                </span>
              </div>

              {!quizGenerating && !quizReady && (
                <>
                  <p className="text-[13px] text-[#64748b] mb-4 leading-relaxed" style={bFont}>
                    AI will generate a personalized quiz based on what you&apos;ve learned in this session.
                  </p>
                  <button
                    onClick={() => {
                      setQuizGenerating(true);
                      setQuizProgress(0);
                      const interval = setInterval(() => {
                        setQuizProgress((prev) => {
                          if (prev >= 100) {
                            clearInterval(interval);
                            setQuizGenerating(false);
                            setQuizReady(true);
                            return 100;
                          }
                          return prev + Math.random() * 15 + 5;
                        });
                      }, 400);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#22c55e] text-white text-[14px] rounded-xl py-3 hover:bg-[#16a34a] transition-colors cursor-pointer"
                    style={dFont}
                  >
                    <Zap size={16} /> Generate Quiz with AI
                  </button>
                </>
              )}

              {quizGenerating && (
                <div className="text-center">
                  <Loader2 size={28} className="text-[#22c55e] animate-spin mx-auto mb-3" />
                  <p className="text-[14px] text-[#0f172a] mb-1" style={dFont}>
                    Creating your quiz...
                  </p>
                  <p className="text-[12px] text-[#64748b] mb-4" style={bFont}>
                    Analyzing your conversation to build questions
                  </p>
                  <div className="w-full h-3 bg-white rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-[#22c55e] to-[#10b981] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(quizProgress, 100)}%` }}
                    />
                  </div>
                  <p className="text-[12px] text-[#22c55e]" style={dFont}>
                    {Math.min(Math.round(quizProgress), 100)}%
                  </p>
                </div>
              )}

              {quizReady && (
                <div className="text-center">
                  <CheckCircle2 size={28} className="text-[#22c55e] mx-auto mb-3" />
                  <p className="text-[14px] text-[#0f172a] mb-1" style={dFont}>
                    5 Questions Ready!
                  </p>
                  <p className="text-[12px] text-[#64748b] mb-4" style={bFont}>
                    Based on: Density, Ice, Molecular Structure
                  </p>
                  <Link
                    href="/practice-arena"
                    className="w-full flex items-center justify-center gap-2 bg-[#22c55e] text-white text-[14px] rounded-xl py-3 hover:bg-[#16a34a] transition-colors cursor-pointer no-underline"
                    style={dFont}
                  >
                    <Sparkles size={16} /> Start Quiz (+50 XP)
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return null;
}
