"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot,
  BookOpen,
  PenLine,
  Brain,
  FileText,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  StickyNote,
  ClipboardList,
  ScrollText,
  FolderOpen,
  CheckCircle2,
  Clock,
  Star,
  BookMarked,
  FileSearch,
  NotebookPen,
  Upload,
  Search,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Stage definitions ─── */
const stages = [
  {
    id: "tutor",
    label: "AI Tutoring",
    icon: MessageSquare,
    color: "pk-blue",
    bgColor: "bg-pk-blue",
    textColor: "text-pk-blue",
    bgLight: "bg-pk-blue/10",
    duration: 6000,
  },
  {
    id: "notes",
    label: "Note Creation",
    icon: PenLine,
    color: "pk-green",
    bgColor: "bg-pk-green",
    textColor: "text-pk-green",
    bgLight: "bg-pk-green/10",
    duration: 5000,
  },
  {
    id: "test",
    label: "Mock Test",
    icon: ClipboardList,
    color: "pk-orange",
    bgColor: "bg-pk-orange",
    textColor: "text-pk-orange",
    bgLight: "bg-pk-orange/10",
    duration: 5000,
  },
  {
    id: "papers",
    label: "Past Papers",
    icon: ScrollText,
    color: "pk-purple",
    bgColor: "bg-pk-purple",
    textColor: "text-pk-purple",
    bgLight: "bg-pk-purple/10",
    duration: 4000,
  },
  {
    id: "vault",
    label: "Study Vault",
    icon: FolderOpen,
    color: "pk-yellow",
    bgColor: "bg-pk-yellow",
    textColor: "text-pk-yellow",
    bgLight: "bg-pk-yellow/10",
    duration: 4000,
  },
];

/* ─── Chat messages for tutor stage ─── */
const tutorMessages = [
  { role: "student" as const, text: "Why does ice float on water? Solid things should sink right?", delay: 0 },
  {
    role: "ai" as const,
    text: "Great thinking! Most solids do sink. But water is special.\n\nWhen water freezes, molecules form a crystal pattern that takes up MORE space. More space = less dense = floats!",
    delay: 1200,
  },
  { role: "student" as const, text: "Oh so ice molecules are spread out more?", delay: 2800 },
  {
    role: "ai" as const,
    text: "Exactly! Ice is ~9% less dense than liquid water. Fun fact: if ice sank, lakes would freeze bottom-up and fish wouldn't survive winter!",
    delay: 4200,
  },
];

/* ─── Notes content ─── */
const notesContent = {
  title: "Density & Buoyancy",
  subject: "Science — Class 8",
  sections: [
    {
      heading: "Key Concepts",
      items: [
        "Density = Mass / Volume",
        "Objects less dense than water float",
        "Ice is ~9% less dense than liquid water",
        "Hydrogen bonding creates crystal lattice in ice",
      ],
    },
    {
      heading: "Important Facts",
      items: [
        "Water is densest at 4°C",
        "Ice expands when frozen (anomalous expansion)",
        "This property is essential for aquatic life survival",
      ],
    },
    {
      heading: "Exam Tips",
      items: [
        "Always mention hydrogen bonding in answers",
        "Draw diagram of water molecules in ice vs liquid",
        "Common 3-mark question in boards",
      ],
    },
  ],
};

/* ─── MCQ content ─── */
const mcqContent = {
  topic: "Density & Buoyancy — Mock Test",
  questions: [
    {
      q: "Why does ice float on water?",
      type: "MCQ",
      options: [
        { letter: "A", text: "Ice is heavier than water", correct: false },
        { letter: "B", text: "Ice is less dense than water", correct: true },
        { letter: "C", text: "Water pushes ice up", correct: false },
        { letter: "D", text: "Ice has no mass", correct: false },
      ],
    },
    {
      q: "At what temperature is water densest?",
      type: "MCQ",
      options: [
        { letter: "A", text: "0°C", correct: false },
        { letter: "B", text: "4°C", correct: true },
        { letter: "C", text: "100°C", correct: false },
        { letter: "D", text: "-4°C", correct: false },
      ],
    },
    {
      q: "Explain the anomalous expansion of water and its significance for aquatic life. (5 marks)",
      type: "Long Answer",
      options: null,
    },
  ],
};

/* ─── Past papers ─── */
const pastPapers = [
  { year: "2024", board: "CBSE", chapter: "Matter in Our Surroundings", marks: "3 marks", qNo: "Q.14" },
  { year: "2023", board: "CBSE", chapter: "Matter in Our Surroundings", marks: "5 marks", qNo: "Q.28" },
  { year: "2023", board: "ICSE", chapter: "Physical & Chemical Changes", marks: "3 marks", qNo: "Q.11" },
  { year: "2022", board: "CBSE", chapter: "Matter in Our Surroundings", marks: "2 marks", qNo: "Q.7" },
  { year: "2022", board: "ICSE", chapter: "States of Matter", marks: "5 marks", qNo: "Q.22" },
];

/* ─── Study vault items ─── */
const vaultItems = [
  { name: "Science Ch.1 Notes", type: "Notes", icon: StickyNote, color: "text-pk-green", date: "Today" },
  { name: "Density MCQ Set", type: "Quiz", icon: ClipboardList, color: "text-pk-orange", date: "Today" },
  { name: "French Revolution Summary", type: "Notes", icon: StickyNote, color: "text-pk-green", date: "Yesterday" },
  { name: "Algebra Formulas", type: "Quick Note", icon: NotebookPen, color: "text-pk-blue", date: "Yesterday" },
  { name: "Physics PYQ Collection", type: "Papers", icon: ScrollText, color: "text-pk-purple", date: "2 days ago" },
  { name: "Bio Diagrams", type: "Upload", icon: Upload, color: "text-pk-gray", date: "3 days ago" },
];

export default function Platform() {
  const [activeStage, setActiveStage] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
  const [noteSections, setNoteSections] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isInView = useRef(false);

  const stage = stages[activeStage];

  const clearAllTimers = useCallback(() => {
    if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
    messageTimerRef.current.forEach(clearTimeout);
    messageTimerRef.current = [];
  }, []);

  /* Advance to next stage */
  const goToStage = useCallback(
    (index: number) => {
      clearAllTimers();
      setActiveStage(index);
      setProgress(0);
      setVisibleMessages(0);
      setSelectedMcq(null);
      setNoteSections(0);
    },
    [clearAllTimers]
  );

  /* Start progress bar (CSS-driven) and stage timer */
  useEffect(() => {
    if (!isPlaying) return;

    const duration = stages[activeStage].duration;

    // Kick progress to 100% after a tiny delay so CSS transition picks it up
    const kickTimer = requestAnimationFrame(() => {
      setProgress(100);
    });

    stageTimerRef.current = setTimeout(() => {
      const nextStage = (activeStage + 1) % stages.length;
      goToStage(nextStage);
    }, duration);

    return () => {
      cancelAnimationFrame(kickTimer);
      if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
    };
  }, [activeStage, isPlaying, goToStage]);

  /* Animate chat messages for tutor stage */
  useEffect(() => {
    if (activeStage !== 0) return;
    messageTimerRef.current.forEach(clearTimeout);
    messageTimerRef.current = [];

    tutorMessages.forEach((msg, i) => {
      const timer = setTimeout(() => {
        setVisibleMessages(i + 1);
      }, msg.delay);
      messageTimerRef.current.push(timer);
    });

    return () => {
      messageTimerRef.current.forEach(clearTimeout);
      messageTimerRef.current = [];
    };
  }, [activeStage]);

  /* Animate notes appearing for notes stage */
  useEffect(() => {
    if (activeStage !== 1) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    notesContent.sections.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setNoteSections(i + 1);
        }, 600 + i * 800)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [activeStage]);

  /* Animate MCQ selection */
  useEffect(() => {
    if (activeStage !== 2) return;
    const timer = setTimeout(() => setSelectedMcq(1), 2000);
    return () => clearTimeout(timer);
  }, [activeStage]);

  /* Scroll trigger + entry animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!isInView.current) {
            isInView.current = true;
            setIsPlaying(true);
          }
        },
      });

      gsap.set([".lb-heading", ".lb-app-window", ".lb-badge"], { opacity: 0 });
      gsap.fromTo(
        ".lb-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".lb-heading", start: "top 85%" } }
      );
      gsap.fromTo(
        ".lb-app-window",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lb-app-window", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".lb-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power3.out", scrollTrigger: { trigger: ".lb-badge", start: "top 90%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Animate content transition */
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [activeStage]);

  const handleStageClick = (index: number) => {
    setIsPlaying(true);
    goToStage(index);
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light" id="platform">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="lb-heading text-center mb-12">
          <span className="eyebrow mb-4 block">LearnBot — AI Tutor</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-4">
            Like having a private tutor
            <br />
            <span className="text-pk-text-secondary font-normal">for every subject, anytime</span>
          </h2>
          <p className="text-[15px] text-pk-text-secondary max-w-xl mx-auto leading-relaxed">
            Watch how LearnBot takes a student from doubt to mastery — tutoring, notes, tests, and revision — all in one seamless flow.
          </p>
        </div>

        {/* App window */}
        <div className="lb-app-window">
          <div className="bg-white rounded-2xl border border-pk-gray-border shadow-xl shadow-black/[0.06] overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-pk-gray-light border-b border-pk-gray-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-[11px] text-pk-text-secondary font-medium ml-2">LearnBot — PromptKids</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-pk-green" />
                <span className="text-[10px] text-pk-green font-semibold">Teacher Supervised</span>
              </div>
            </div>

            {/* Animated progress stages bar */}
            <div className="px-4 sm:px-6 py-4 border-b border-pk-gray-border bg-white">
              <div className="flex items-center gap-1 sm:gap-2">
                {stages.map((s, i) => {
                  const isActive = i === activeStage;
                  const isComplete = i < activeStage;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleStageClick(i)}
                      className="flex-1 group relative"
                    >
                      {/* Stage label */}
                      <div className={`flex items-center justify-center gap-1 sm:gap-1.5 mb-2 transition-all duration-300 ${
                        isActive ? s.textColor : isComplete ? "text-pk-green" : "text-pk-gray"
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <s.icon className="w-3.5 h-3.5" />
                        )}
                        <span className={`text-[10px] sm:text-[11px] font-semibold hidden sm:inline ${
                          isActive ? "" : ""
                        }`}>
                          {s.label}
                        </span>
                      </div>

                      {/* Progress track */}
                      <div className="h-1.5 rounded-full bg-pk-gray-border/60 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isComplete
                              ? "bg-pk-green w-full"
                              : isActive
                              ? `${s.bgColor}`
                              : "w-0"
                          }`}
                          style={
                            isActive
                              ? { width: `${progress}%`, transition: `width ${stages[activeStage].duration}ms linear` }
                              : isComplete
                              ? { width: "100%", transition: "none" }
                              : { width: "0%", transition: "none" }
                          }
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main content area — fixed height prevents layout shift on tab change */}
            <div className="h-[440px] sm:h-[480px] overflow-hidden" ref={contentRef}>
              {/* Stage: AI Tutoring */}
              {activeStage === 0 && (
                <div className="flex flex-col h-full">
                  {/* Topic bar */}
                  <div className="px-5 py-3 border-b border-pk-gray-border flex items-center justify-between bg-white">
                    <div>
                      <div className="text-[11px] text-pk-text-secondary">Science — Class 8</div>
                      <div className="text-[13px] font-bold text-pk-text">Why does ice float on water?</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-pk-green animate-pulse" />
                      <span className="text-[10px] text-pk-green font-medium">Live Session</span>
                    </div>
                  </div>

                  {/* Chat messages with typing animation */}
                  <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                    {tutorMessages.slice(0, visibleMessages).map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"} animate-[fadeSlideUp_0.3s_ease-out]`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-[1.7] ${
                            msg.role === "student"
                              ? "bg-pk-orange/10 text-pk-text rounded-br-md"
                              : "bg-pk-gray-light text-pk-text-secondary rounded-bl-md"
                          }`}
                        >
                          {msg.role === "ai" && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-pk-gray uppercase tracking-wider mb-1.5">
                              <Bot className="w-3 h-3" /> LearnBot
                            </span>
                          )}
                          <span className="whitespace-pre-line">{msg.text}</span>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {visibleMessages < tutorMessages.length && visibleMessages > 0 && (
                      <div className="flex justify-start">
                        <div className="bg-pk-gray-light rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-pk-gray uppercase tracking-wider">
                            <Bot className="w-3 h-3" /> LearnBot
                          </span>
                          <div className="flex gap-1 ml-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-pk-gray animate-bounce [animation-delay:0ms]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-pk-gray animate-bounce [animation-delay:150ms]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-pk-gray animate-bounce [animation-delay:300ms]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input bar */}
                  <div className="px-4 py-3 border-t border-pk-gray-border bg-white">
                    <div className="flex items-center gap-2 bg-pk-gray-light rounded-xl px-4 py-2.5 border border-pk-gray-border">
                      <span className="text-[13px] text-pk-gray flex-1">Ask LearnBot anything...</span>
                      <Sparkles className="w-4 h-4 text-pk-orange" />
                    </div>
                  </div>
                </div>
              )}

              {/* Stage: Note Creation */}
              {activeStage === 1 && (
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-pk-green" />
                    <span className="text-[11px] font-bold text-pk-green uppercase tracking-wider">
                      LearnBot switched to Note Creation mode
                    </span>
                  </div>
                  <p className="text-[12px] text-pk-text-secondary mb-5">
                    Based on your tutoring session, here are auto-generated revision notes:
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Notes card */}
                    <div className="lg:col-span-2">
                      <div className="bg-pk-green/[0.04] border border-pk-green/15 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-[14px] font-bold text-pk-text">{notesContent.title}</h4>
                            <span className="text-[11px] text-pk-text-secondary">{notesContent.subject}</span>
                          </div>
                          <span className="text-[9px] font-bold text-pk-green bg-pk-green/10 px-2 py-0.5 rounded uppercase tracking-wider">
                            Auto-generated
                          </span>
                        </div>

                        <div className="space-y-4">
                          {notesContent.sections.slice(0, noteSections).map((sec, i) => (
                            <div key={i} className="animate-[fadeSlideUp_0.4s_ease-out]">
                              <div className="text-[11px] font-bold text-pk-green uppercase tracking-wider mb-1.5">
                                {sec.heading}
                              </div>
                              <ul className="space-y-1">
                                {sec.items.map((item, j) => (
                                  <li key={j} className="text-[12px] text-pk-text-secondary leading-snug flex items-start gap-1.5">
                                    <span className="text-pk-green mt-0.5">&#8226;</span> {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {noteSections < notesContent.sections.length && (
                            <div className="flex items-center gap-2 text-pk-green">
                              <div className="w-4 h-4 border-2 border-pk-green border-t-transparent rounded-full animate-spin" />
                              <span className="text-[11px] font-medium">Generating notes...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Side: Note actions */}
                    <div className="space-y-3">
                      <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                        <h4 className="text-[11px] font-bold text-pk-text mb-3 flex items-center gap-1.5">
                          <BookMarked className="w-3.5 h-3.5 text-pk-green" /> Note Actions
                        </h4>
                        <div className="space-y-2">
                          {["Save to Study Vault", "Download as PDF", "Share with teacher", "Add to flashcards"].map((action) => (
                            <div key={action} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-pk-gray-border text-[11px] text-pk-text-secondary cursor-pointer hover:border-pk-green/30 transition-colors">
                              <CheckCircle2 className="w-3 h-3 text-pk-green/50" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-pk-green/5 rounded-xl border border-pk-green/15 p-4 text-center">
                        <Star className="w-5 h-5 text-pk-green mx-auto mb-1" />
                        <div className="text-[11px] font-bold text-pk-text">Exam-ready notes</div>
                        <div className="text-[10px] text-pk-text-secondary">Aligned with CBSE syllabus</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage: Mock Test */}
              {activeStage === 2 && (
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-pk-orange" />
                    <span className="text-[11px] font-bold text-pk-orange uppercase tracking-wider">
                      LearnBot switched to Mock Test mode
                    </span>
                  </div>
                  <p className="text-[12px] text-pk-text-secondary mb-5">
                    Test your understanding with MCQs and long-answer questions:
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                      {/* MCQ Question */}
                      <div className="bg-pk-orange/[0.04] border border-pk-orange/15 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-[10px] font-bold text-pk-orange uppercase tracking-wider">
                            Question 1 — MCQ
                          </div>
                          <span className="text-[9px] font-semibold text-pk-text-secondary bg-pk-gray-light px-2 py-0.5 rounded">
                            1 mark
                          </span>
                        </div>
                        <p className="text-[13px] text-pk-text font-medium mb-4 leading-snug">
                          {mcqContent.questions[0].q}
                        </p>
                        <div className="space-y-2">
                          {mcqContent.questions[0].options?.map((opt, i) => (
                            <div
                              key={opt.letter}
                              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-[12px] transition-all duration-300 ${
                                selectedMcq !== null && opt.correct
                                  ? "border-pk-green bg-pk-green/[0.06] text-pk-green font-semibold"
                                  : selectedMcq !== null && i === 0
                                  ? "border-red-300 bg-red-50/50 text-red-400 line-through"
                                  : "border-pk-gray-border text-pk-text-secondary"
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  selectedMcq !== null && opt.correct
                                    ? "bg-pk-green text-white"
                                    : "bg-pk-gray-light text-pk-text-secondary"
                                }`}
                              >
                                {opt.letter}
                              </span>
                              {opt.text}
                              {selectedMcq !== null && opt.correct && (
                                <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-pk-green" />
                              )}
                            </div>
                          ))}
                        </div>

                        {selectedMcq !== null && (
                          <div className="mt-3 bg-pk-green/5 border border-pk-green/15 rounded-lg p-3 animate-[fadeSlideUp_0.3s_ease-out]">
                            <div className="text-[10px] font-bold text-pk-green mb-1">Explanation</div>
                            <p className="text-[11px] text-pk-text-secondary leading-relaxed">
                              Ice is less dense than water because water molecules form a crystalline structure with more space between them when frozen.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Long Answer Question */}
                      <div className="bg-pk-blue/[0.04] border border-pk-blue/15 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-[10px] font-bold text-pk-blue uppercase tracking-wider">
                            Question 3 — Long Answer
                          </div>
                          <span className="text-[9px] font-semibold text-pk-text-secondary bg-pk-gray-light px-2 py-0.5 rounded">
                            5 marks
                          </span>
                        </div>
                        <p className="text-[13px] text-pk-text font-medium leading-snug">
                          {mcqContent.questions[2].q}
                        </p>
                        <div className="mt-3 bg-pk-gray-light rounded-lg p-3 border border-pk-gray-border">
                          <span className="text-[11px] text-pk-gray">Start typing your answer here...</span>
                          <div className="w-0.5 h-4 bg-pk-blue animate-pulse inline-block ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Test sidebar */}
                    <div className="space-y-3">
                      <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                        <h4 className="text-[11px] font-bold text-pk-text mb-3 flex items-center gap-1.5">
                          <ClipboardList className="w-3.5 h-3.5 text-pk-orange" /> Test Summary
                        </h4>
                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between text-pk-text-secondary">
                            <span>Total Questions</span>
                            <span className="font-semibold text-pk-text">3</span>
                          </div>
                          <div className="flex justify-between text-pk-text-secondary">
                            <span>MCQ</span>
                            <span className="font-semibold text-pk-text">2</span>
                          </div>
                          <div className="flex justify-between text-pk-text-secondary">
                            <span>Long Answer</span>
                            <span className="font-semibold text-pk-text">1</span>
                          </div>
                          <div className="flex justify-between text-pk-text-secondary pt-2 border-t border-pk-gray-border">
                            <span>Total Marks</span>
                            <span className="font-bold text-pk-orange">7</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                        <h4 className="text-[11px] font-bold text-pk-text mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-pk-blue" /> Timer
                        </h4>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pk-text tabular-nums">04:32</div>
                          <div className="text-[10px] text-pk-text-secondary">Time remaining</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage: Past Papers */}
              {activeStage === 3 && (
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-pk-purple" />
                    <span className="text-[11px] font-bold text-pk-purple uppercase tracking-wider">
                      Previous Year Papers — Density & Buoyancy
                    </span>
                  </div>
                  <p className="text-[12px] text-pk-text-secondary mb-5">
                    Questions from CBSE & ICSE board exams on this topic:
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-2.5">
                      {pastPapers.map((paper, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 px-4 py-3.5 bg-pk-gray-light rounded-xl border border-pk-gray-border hover:border-pk-purple/30 transition-colors group"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pk-purple/10 text-pk-purple flex-shrink-0">
                            <FileSearch className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-semibold text-pk-text">{paper.qNo} — {paper.chapter}</div>
                            <div className="text-[10px] text-pk-text-secondary">{paper.board} {paper.year}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] font-semibold text-pk-purple bg-pk-purple/10 px-2 py-0.5 rounded">
                              {paper.marks}
                            </span>
                            <span className="text-[10px] text-pk-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              Solve
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Papers sidebar */}
                    <div className="space-y-3">
                      <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                        <h4 className="text-[11px] font-bold text-pk-text mb-3 flex items-center gap-1.5">
                          <ScrollText className="w-3.5 h-3.5 text-pk-purple" /> Paper Stats
                        </h4>
                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between text-pk-text-secondary">
                            <span>Years covered</span>
                            <span className="font-semibold text-pk-text">2020–2024</span>
                          </div>
                          <div className="flex justify-between text-pk-text-secondary">
                            <span>CBSE questions</span>
                            <span className="font-semibold text-pk-text">12</span>
                          </div>
                          <div className="flex justify-between text-pk-text-secondary">
                            <span>ICSE questions</span>
                            <span className="font-semibold text-pk-text">8</span>
                          </div>
                          <div className="flex justify-between text-pk-text-secondary pt-2 border-t border-pk-gray-border">
                            <span>Topic frequency</span>
                            <span className="font-bold text-pk-purple">High</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-pk-purple/5 rounded-xl border border-pk-purple/15 p-4 text-center">
                        <FileText className="w-5 h-5 text-pk-purple mx-auto mb-1" />
                        <div className="text-[11px] font-bold text-pk-text">Board exam ready</div>
                        <div className="text-[10px] text-pk-text-secondary">Practice with real questions</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage: Study Vault */}
              {activeStage === 4 && (
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FolderOpen className="w-4 h-4 text-pk-yellow" />
                        <span className="text-[11px] font-bold text-pk-yellow uppercase tracking-wider">
                          Study Vault
                        </span>
                      </div>
                      <p className="text-[12px] text-pk-text-secondary">
                        All your study materials, notes & saved resources in one place.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-pk-gray-light rounded-lg border border-pk-gray-border px-3 py-1.5">
                        <Search className="w-3 h-3 text-pk-gray" />
                        <span className="text-[11px] text-pk-gray">Search notes...</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-2">
                      {vaultItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3.5 px-4 py-3 bg-pk-gray-light rounded-xl border border-pk-gray-border hover:border-pk-yellow/30 transition-colors"
                        >
                          <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-pk-gray-border ${item.color}`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-semibold text-pk-text">{item.name}</div>
                            <div className="text-[10px] text-pk-text-secondary">{item.type}</div>
                          </div>
                          <span className="text-[10px] text-pk-gray flex-shrink-0">{item.date}</span>
                        </div>
                      ))}
                    </div>

                    {/* Vault sidebar */}
                    <div className="space-y-3">
                      <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                        <h4 className="text-[11px] font-bold text-pk-text mb-3 flex items-center gap-1.5">
                          <NotebookPen className="w-3.5 h-3.5 text-pk-blue" /> Quick Note
                        </h4>
                        <div className="bg-white rounded-lg border border-pk-gray-border p-3 min-h-[80px]">
                          <span className="text-[11px] text-pk-gray">Jot something down...</span>
                          <div className="w-0.5 h-3.5 bg-pk-blue animate-pulse inline-block ml-0.5" />
                        </div>
                        <button className="w-full mt-2 text-[11px] font-semibold text-pk-blue bg-pk-blue/10 rounded-lg py-2 hover:bg-pk-blue/15 transition-colors">
                          Save Quick Note
                        </button>
                      </div>

                      <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                        <h4 className="text-[11px] font-bold text-pk-text mb-3">Collections</h4>
                        <div className="space-y-1.5">
                          {[
                            { name: "Science Notes", count: 12, color: "bg-pk-green" },
                            { name: "Maths Formulas", count: 8, color: "bg-pk-blue" },
                            { name: "History Summaries", count: 5, color: "bg-pk-purple" },
                            { name: "English Vocab", count: 15, color: "bg-pk-orange" },
                          ].map((col) => (
                            <div key={col.name} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors cursor-pointer">
                              <div className={`w-2 h-2 rounded-full ${col.color}`} />
                              <span className="text-[11px] text-pk-text-secondary flex-1">{col.name}</span>
                              <span className="text-[10px] text-pk-gray">{col.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {[
            { icon: ShieldCheck, text: "Every response teacher-reviewed", color: "text-pk-green" },
            { icon: BookOpen, text: "Class 6–12 CBSE & ICSE", color: "text-pk-blue" },
            { icon: Brain, text: "Adapts to your child's level", color: "text-pk-purple" },
          ].map((b, i) => (
            <div key={i} className="lb-badge flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pk-gray-border shadow-sm">
              <b.icon className={`w-4 h-4 ${b.color}`} />
              <span className="text-[12px] font-medium text-pk-text-secondary">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
