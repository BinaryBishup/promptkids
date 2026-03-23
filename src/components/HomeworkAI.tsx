"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Eye, Bell, Lock, HelpCircle, Lightbulb, GitBranch, ListChecks, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const supportLevels = [
  {
    id: "nudge",
    level: "Level 1",
    name: "Think First",
    icon: HelpCircle,
    color: "text-pk-green",
    bg: "bg-pk-green",
    bgLight: "bg-pk-green/10",
    desc: "AI asks the student to think before helping. No hints yet.",
    parentNote: null,
    duration: 5000,
    chat: [
      { role: "student" as const, text: "What's the area of a triangle with base 8cm and height 5cm?" },
      { role: "ai" as const, text: "Good question! Before I help — what do you already know about finding the area of shapes?" },
      { role: "student" as const, text: "Umm... something with base and height?" },
      { role: "ai" as const, text: "You're on the right track! Can you think about what operation you'd use with those two numbers?" },
    ],
  },
  {
    id: "hint",
    level: "Level 2",
    name: "Concept Hint",
    icon: Lightbulb,
    color: "text-pk-orange",
    bg: "bg-pk-orange",
    bgLight: "bg-pk-orange/10",
    desc: "AI reminds the student of the relevant concept. No direct answer.",
    parentNote: null,
    duration: 5000,
    chat: [
      { role: "student" as const, text: "I still can't figure out the triangle area..." },
      { role: "ai" as const, text: "Here's a nudge: The formula is ½ × base × height. You have both values — can you plug them in?" },
      { role: "student" as const, text: "So... ½ × 8 × 5 = 20 cm²?" },
      { role: "ai" as const, text: "That's exactly right! 20 cm². You solved it yourself with just a small hint!" },
    ],
  },
  {
    id: "walkthrough",
    level: "Level 3",
    name: "Step-by-Step",
    icon: ListChecks,
    color: "text-pk-blue",
    bg: "bg-pk-blue",
    bgLight: "bg-pk-blue/10",
    desc: "AI walks through the problem one step at a time.",
    parentNote: null,
    duration: 5000,
    chat: [
      { role: "student" as const, text: "Can you walk me through it step by step?" },
      { role: "ai" as const, text: "Sure! Step 1: Write down the formula.\nArea = ½ × base × height\n\nWhat's Step 2?" },
      { role: "student" as const, text: "Step 2: Area = ½ × 8 × 5" },
      { role: "ai" as const, text: "Perfect! Now Step 3: Calculate ½ × 8 first. What do you get?" },
    ],
  },
  {
    id: "similar",
    level: "Level 4",
    name: "Similar Example",
    icon: GitBranch,
    color: "text-pk-purple",
    bg: "bg-pk-purple",
    bgLight: "bg-pk-purple/10",
    desc: "AI solves a similar problem so the student can mirror the approach.",
    parentNote: "Parent notified: Student needed a worked example.",
    duration: 5000,
    chat: [
      { role: "student" as const, text: "I'm completely lost. Can you show me how?" },
      { role: "ai" as const, text: "Let me solve a similar one:\n\nBase 6cm, height 4cm\nArea = ½ × 6 × 4 = 12 cm²\n\nNow try yours (base 8, height 5)." },
      { role: "student" as const, text: "Area = ½ × 8 × 5 = 20 cm²!" },
      { role: "ai" as const, text: "Nailed it! You'll get a practice question tomorrow to reinforce this." },
    ],
  },
  {
    id: "full",
    level: "Level 5",
    name: "Full Answer",
    icon: CheckCircle2,
    color: "text-red-500",
    bg: "bg-red-500",
    bgLight: "bg-red-500/10",
    desc: "Complete solution given. Logged. Parent notified.",
    parentNote: "Parent notified: Full answer was given. Re-attempt scheduled in 48 hours.",
    duration: 5000,
    chat: [
      { role: "student" as const, text: "I really can't do this. Just tell me the answer please." },
      { role: "ai" as const, text: "Area = ½ × base × height\nArea = ½ × 8 × 5\nArea = 20 cm²" },
      { role: "system" as const, text: "⚠️ Maximum help used. Parent notified. Re-attempt scheduled in 48 hours." },
    ],
  },
];

export default function HomeworkAI() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const stageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useRef(false);

  const level = supportLevels[activeIdx];

  const goToLevel = useCallback((idx: number) => {
    if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
    setActiveIdx(idx);
    setProgress(0);
  }, []);

  // Auto-advance with CSS-driven progress
  useEffect(() => {
    if (!isPlaying) return;

    const duration = supportLevels[activeIdx].duration;

    const kick = requestAnimationFrame(() => setProgress(100));

    stageTimerRef.current = setTimeout(() => {
      const next = (activeIdx + 1) % supportLevels.length;
      goToLevel(next);
    }, duration);

    return () => {
      cancelAnimationFrame(kick);
      if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
    };
  }, [activeIdx, isPlaying, goToLevel]);

  // Animate chat messages
  useEffect(() => {
    if (!chatRef.current) return;
    const messages = chatRef.current.querySelectorAll(".chat-msg");
    gsap.fromTo(messages,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.1, ease: "power2.out" }
    );
  }, [activeIdx]);

  // Scroll trigger to start
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

      gsap.fromTo(".hw-heading", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".hw-heading", start: "top 85%" }
      });
      gsap.fromTo(".hw-content", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".hw-content", start: "top 85%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleLevelClick = (idx: number) => {
    setIsPlaying(true);
    goToLevel(idx);
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white" id="homework-ai">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="hw-heading text-center mb-12 opacity-0">
          <span className="eyebrow mb-4 block">HomeworkAI</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-4">
            Never gives the answer.
            <br />
            <span className="text-pk-text-secondary font-normal">Teaches them to find it.</span>
          </h2>
          <p className="text-[15px] text-pk-text-secondary max-w-xl mx-auto leading-relaxed">
            5 support levels that escalate only when needed. Watch how HomeworkAI guides a student through a maths problem.
          </p>
        </div>

        <div className="hw-content opacity-0">
          {/* Progress bar levels */}
          <div className="px-0 sm:px-6 mb-8">
            <div className="flex items-center gap-1 sm:gap-2">
              {supportLevels.map((l, i) => {
                const isActive = i === activeIdx;
                const isComplete = i < activeIdx;
                return (
                  <button key={l.id} onClick={() => handleLevelClick(i)} className="flex-1 group relative">
                    {/* Label */}
                    <div className={`flex items-center justify-center gap-1 sm:gap-1.5 mb-2 transition-all duration-300 ${
                      isActive ? l.color : isComplete ? "text-pk-green" : "text-pk-gray"
                    }`}>
                      {isComplete ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <l.icon className="w-3.5 h-3.5" />
                      )}
                      <span className={`text-[10px] sm:text-[11px] font-semibold hidden sm:inline`}>
                        {l.name}
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="h-1.5 rounded-full bg-pk-gray-border/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isComplete ? "bg-pk-green" : isActive ? l.bg : ""
                        }`}
                        style={
                          isActive
                            ? { width: `${progress}%`, transition: `width ${supportLevels[activeIdx].duration}ms linear` }
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

            {/* Level description */}
            <p className="mt-4 text-sm text-pk-text-secondary text-center">
              <span className={`font-semibold ${level.color}`}>{level.level}</span> — {level.desc}
            </p>
          </div>

          {/* Main content: Chat + Side */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Chat — 3 cols */}
            <div className="lg:col-span-3">
              <div className="bg-pk-gray-light rounded-2xl border border-pk-gray-border overflow-hidden">
                {/* Chat header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-pk-gray-border">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${level.bg}`} />
                    <span className="text-xs font-semibold text-pk-text-secondary">
                      HomeworkAI — {level.name} Mode
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${level.bgLight} ${level.color}`}>
                    {level.level}
                  </span>
                </div>

                {/* Chat messages */}
                <div ref={chatRef} className="p-5 space-y-4 min-h-[300px]">
                  {level.chat.map((msg, i) => (
                    <div
                      key={`${activeIdx}-${i}`}
                      className={`chat-msg flex ${
                        msg.role === "student" ? "justify-end" :
                        msg.role === "system" ? "justify-center" : "justify-start"
                      }`}
                    >
                      {msg.role === "system" ? (
                        <div className="max-w-[90%] px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 leading-relaxed text-center">
                          {msg.text}
                        </div>
                      ) : (
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "student"
                            ? "bg-pk-orange/10 text-pk-text rounded-br-md"
                            : "bg-white border border-pk-gray-border text-pk-text-secondary rounded-bl-md shadow-sm"
                        }`}>
                          {msg.role === "ai" && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-pk-gray uppercase tracking-wider mb-1.5">
                              <Bot className="w-3 h-3" /> HomeworkAI
                            </span>
                          )}
                          <span className="whitespace-pre-line">{msg.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side — 2 cols */}
            <div className="lg:col-span-2 space-y-5">
              {/* Parental controls */}
              <div className="bg-pk-gray-light rounded-2xl border border-pk-gray-border p-6">
                <h3 className="text-sm font-bold text-pk-text mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-pk-orange" />
                  Parental Controls
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: Eye, text: "See every question your child asks", color: "text-pk-blue" },
                    { icon: Bell, text: "Get notified when Level 4+ help is used", color: "text-pk-orange" },
                    { icon: Lock, text: "Set daily homework session time limits", color: "text-pk-purple" },
                    { icon: CheckCircle2, text: "Review AI responses anytime in parent panel", color: "text-pk-green" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <item.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${item.color}`} />
                      <span className="text-xs text-pk-text-secondary leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Parent notification */}
              {level.parentNote && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-[fadeSlideUp_0.3s_ease-out]">
                  <Bell className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-red-600 block mb-0.5">Parent Notification</span>
                    <span className="text-[11px] text-red-500/80 leading-relaxed">{level.parentNote}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
