"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Eye, TrendingUp, TrendingDown, Bell, BarChart3, Calendar, Clock, BookOpen,
  Star, AlertCircle, CheckCircle2, ArrowRight, Smartphone,
  MessageSquare, Award, Zap, Target, ShieldCheck, Brain,
  Bot, FileText, PenLine, HelpCircle, Flame, Lightbulb,
  CircleAlert, ThumbsUp, BookMarked, GraduationCap, Activity
} from "lucide-react";
import Link from "next/link";
import { useBookTrial } from "./BookTrialContext";

gsap.registerPlugin(ScrollTrigger);

const reportTabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "ai-usage", label: "AI Usage", icon: Bot },
  { id: "topics", label: "Topics", icon: Brain },
  { id: "homework", label: "Homework", icon: FileText },
];

/* ─── Topic understanding data ─── */
const topicData = [
  { topic: "Density & Buoyancy", subject: "Science", understanding: 92, sessions: 4, trend: "up" as const, status: "strong" as const },
  { topic: "Algebraic Expressions", subject: "Maths", understanding: 78, sessions: 6, trend: "up" as const, status: "good" as const },
  { topic: "French Revolution", subject: "History", understanding: 85, sessions: 3, trend: "up" as const, status: "strong" as const },
  { topic: "Photosynthesis", subject: "Biology", understanding: 65, sessions: 5, trend: "down" as const, status: "needs-work" as const },
  { topic: "Quadratic Equations", subject: "Maths", understanding: 52, sessions: 7, trend: "down" as const, status: "struggling" as const },
  { topic: "Tenses & Grammar", subject: "English", understanding: 88, sessions: 3, trend: "up" as const, status: "strong" as const },
];

/* ─── AI usage breakdown ─── */
const aiUsageData = {
  totalSessions: 42,
  totalQuestions: 187,
  avgPerSession: 4.5,
  weeklyTrend: [3, 5, 4, 6, 5, 7, 4],
  byMode: [
    { mode: "Doubt Solving", icon: HelpCircle, count: 78, pct: 42, color: "bg-pk-blue", textColor: "text-pk-blue" },
    { mode: "Note Creation", icon: PenLine, count: 45, pct: 24, color: "bg-pk-green", textColor: "text-pk-green" },
    { mode: "Mock Tests", icon: FileText, count: 38, pct: 20, color: "bg-pk-orange", textColor: "text-pk-orange" },
    { mode: "Past Papers", icon: BookOpen, count: 26, pct: 14, color: "bg-pk-purple", textColor: "text-pk-purple" },
  ],
  helpLevels: [
    { level: "Level 1 — Think First", count: 68, pct: 36, color: "bg-pk-green" },
    { level: "Level 2 — Concept Hint", count: 52, pct: 28, color: "bg-pk-blue" },
    { level: "Level 3 — Step-by-Step", count: 41, pct: 22, color: "bg-pk-orange" },
    { level: "Level 4 — Similar Example", count: 18, pct: 10, color: "bg-pk-purple" },
    { level: "Level 5 — Full Answer", count: 8, pct: 4, color: "bg-red-500" },
  ],
};

/* ─── Homework data ─── */
const homeworkData = [
  { title: "Science Ch.1 — Density Questions", subject: "Science", assigned: "Mar 20", due: "Mar 22", status: "completed" as const, score: 92, aiHelp: 2 },
  { title: "Algebra Practice Set B", subject: "Maths", assigned: "Mar 19", due: "Mar 21", status: "completed" as const, score: 78, aiHelp: 5 },
  { title: "French Revolution Essay", subject: "History", assigned: "Mar 21", due: "Mar 23", status: "in-progress" as const, score: null, aiHelp: 1 },
  { title: "Photosynthesis MCQ Sheet", subject: "Biology", assigned: "Mar 18", due: "Mar 20", status: "completed" as const, score: 65, aiHelp: 4 },
  { title: "Quadratic Equations HW", subject: "Maths", assigned: "Mar 22", due: "Mar 24", status: "pending" as const, score: null, aiHelp: 0 },
  { title: "Grammar Worksheet Unit 5", subject: "English", assigned: "Mar 17", due: "Mar 19", status: "completed" as const, score: 95, aiHelp: 0 },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRef = useRef<HTMLElement>(null);
  const { open: openBookTrial } = useBookTrial();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".pd-header", ".pd-feature", ".pd-panel", ".pd-whatsapp"], { opacity: 0 });
      gsap.fromTo(".pd-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-header", start: "top 85%" }
      });
      gsap.fromTo(".pd-feature", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-features", start: "top 85%" }
      });
      gsap.fromTo(".pd-panel", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-panel", start: "top 85%" }
      });
      gsap.fromTo(".pd-whatsapp", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-whatsapp", start: "top 90%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light" id="parent-dashboard">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pd-header text-center mb-14">
          <span className="eyebrow mb-4 block">Parent Panel</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-4">
            Every question. Every topic.
            <br />
            <span className="text-pk-text-secondary font-normal">Complete visibility for parents.</span>
          </h2>
          <p className="text-[15px] text-pk-text-secondary max-w-xl mx-auto">
            Track your child&apos;s AI usage, homework completion, topic understanding, and learning progress — all in real time.
          </p>
        </div>

        {/* Feature strip */}
        <div className="pd-features grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {[
            { icon: Bot, title: "AI usage reports", desc: "See how & when AI is being used", color: "text-pk-blue", bg: "bg-pk-blue/8" },
            { icon: Brain, title: "Topic understanding", desc: "Which topics need more practice", color: "text-pk-green", bg: "bg-pk-green/8" },
            { icon: FileText, title: "Homework tracking", desc: "Completion rates & AI help used", color: "text-pk-orange", bg: "bg-pk-orange/8" },
            { icon: Activity, title: "Learning analytics", desc: "Strengths, weaknesses & trends", color: "text-pk-purple", bg: "bg-pk-purple/8" },
          ].map((card) => (
            <div key={card.title} className="pd-feature bg-white rounded-xl p-5 border border-pk-gray-border">
              <div className={`inline-flex p-2 rounded-lg ${card.bg} mb-3`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <h3 className="text-[13px] font-bold text-pk-text mb-1">{card.title}</h3>
              <p className="text-[11px] text-pk-text-secondary leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="pd-panel grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Left panel (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-pk-gray-border overflow-hidden shadow-sm">
              {/* Student header */}
              <div className="px-5 sm:px-6 py-4 border-b border-pk-gray-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pk-orange to-amber-400 flex items-center justify-center text-white text-xs font-bold">AS</div>
                  <div>
                    <div className="text-sm font-bold text-pk-text">Arjun Sharma</div>
                    <div className="text-[11px] text-pk-text-secondary">Class 8A &middot; CBSE &middot; Week 6</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-[10px] text-pk-text-secondary">Understanding</div>
                    <div className="text-lg font-extrabold text-pk-green">78<span className="text-xs">%</span></div>
                  </div>
                  <div className="w-px h-8 bg-pk-gray-border" />
                  <div className="text-center">
                    <div className="text-[10px] text-pk-text-secondary">AI Sessions</div>
                    <div className="text-lg font-extrabold text-pk-blue">42</div>
                  </div>
                  <div className="w-px h-8 bg-pk-gray-border" />
                  <div className="text-center">
                    <div className="text-[10px] text-pk-text-secondary">HW Done</div>
                    <div className="text-lg font-extrabold text-pk-orange">91<span className="text-xs">%</span></div>
                  </div>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex border-b border-pk-gray-border">
                {reportTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold transition-all border-b-2 ${
                      activeTab === tab.id
                        ? "text-pk-orange border-pk-orange bg-pk-orange/[0.03]"
                        : "text-pk-text-secondary border-transparent hover:bg-pk-gray-light/50"
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div ref={contentRef} className="p-5 sm:p-6">

                {/* ═══ OVERVIEW TAB ═══ */}
                {activeTab === "overview" && (
                  <div>
                    {/* Quick stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        { label: "Questions asked", value: "187", icon: MessageSquare, color: "text-pk-blue", bg: "bg-pk-blue/8", change: "+23 this week" },
                        { label: "Topics covered", value: "14", icon: BookOpen, color: "text-pk-green", bg: "bg-pk-green/8", change: "+2 new" },
                        { label: "Avg. score", value: "82%", icon: Target, color: "text-pk-orange", bg: "bg-pk-orange/8", change: "+5% vs last week" },
                        { label: "Study streak", value: "12 days", icon: Flame, color: "text-pk-purple", bg: "bg-pk-purple/8", change: "Best: 18 days" },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-pk-gray-light rounded-xl p-3.5 border border-pk-gray-border">
                          <div className={`inline-flex p-1.5 rounded-lg ${stat.bg} mb-2`}>
                            <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                          </div>
                          <div className="text-lg font-extrabold text-pk-text">{stat.value}</div>
                          <div className="text-[10px] text-pk-text-secondary">{stat.label}</div>
                          <div className="text-[9px] text-pk-green mt-1 font-medium">{stat.change}</div>
                        </div>
                      ))}
                    </div>

                    {/* Subject-wise understanding bars */}
                    <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-3">Subject Understanding</h4>
                    <div className="space-y-3 mb-6">
                      {[
                        { subject: "Science", score: 82, color: "bg-pk-green", trend: "+6%" },
                        { subject: "Mathematics", score: 65, color: "bg-pk-blue", trend: "+3%" },
                        { subject: "English", score: 90, color: "bg-pk-purple", trend: "+2%" },
                        { subject: "History", score: 85, color: "bg-pk-orange", trend: "+8%" },
                        { subject: "Biology", score: 68, color: "bg-pk-yellow", trend: "-2%" },
                      ].map((s) => (
                        <div key={s.subject}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-semibold text-pk-text">{s.subject}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-medium ${s.trend.startsWith("+") ? "text-pk-green" : "text-red-500"}`}>{s.trend}</span>
                              <span className="text-[12px] font-bold text-pk-text">{s.score}%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-pk-gray-border rounded-full overflow-hidden">
                            <div className={`h-full ${s.color} rounded-full transition-all duration-700`} style={{ width: `${s.score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent activity */}
                    <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-3">Recent Activity</h4>
                    <div className="space-y-2.5">
                      {[
                        { icon: CheckCircle2, color: "text-pk-green bg-pk-green/8", text: "Completed Science Ch.1 homework — 92% score, used AI for 2 doubts", time: "Today, 4:30 PM" },
                        { icon: Award, color: "text-pk-yellow bg-pk-yellow/8", text: "12-day study streak achieved! Longest streak this month", time: "Today, 3:00 PM" },
                        { icon: CircleAlert, color: "text-pk-orange bg-pk-orange/8", text: "Quadratic Equations — understanding dropped to 52%. Revision recommended", time: "Yesterday" },
                        { icon: Bot, color: "text-pk-blue bg-pk-blue/8", text: "Used LearnBot to create revision notes for French Revolution", time: "Yesterday" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-pk-gray-light transition-colors">
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${item.color}`}>
                            <item.icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-pk-text leading-relaxed">{item.text}</p>
                            <span className="text-[10px] text-pk-text-secondary">{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ═══ AI USAGE TAB ═══ */}
                {activeTab === "ai-usage" && (
                  <div>
                    {/* AI stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-pk-blue/[0.04] border border-pk-blue/15 rounded-xl p-4 text-center">
                        <Bot className="w-5 h-5 text-pk-blue mx-auto mb-1" />
                        <div className="text-xl font-extrabold text-pk-text">{aiUsageData.totalSessions}</div>
                        <div className="text-[10px] text-pk-text-secondary">Total AI sessions</div>
                      </div>
                      <div className="bg-pk-green/[0.04] border border-pk-green/15 rounded-xl p-4 text-center">
                        <MessageSquare className="w-5 h-5 text-pk-green mx-auto mb-1" />
                        <div className="text-xl font-extrabold text-pk-text">{aiUsageData.totalQuestions}</div>
                        <div className="text-[10px] text-pk-text-secondary">Questions asked</div>
                      </div>
                      <div className="bg-pk-orange/[0.04] border border-pk-orange/15 rounded-xl p-4 text-center">
                        <Zap className="w-5 h-5 text-pk-orange mx-auto mb-1" />
                        <div className="text-xl font-extrabold text-pk-text">{aiUsageData.avgPerSession}</div>
                        <div className="text-[10px] text-pk-text-secondary">Avg. per session</div>
                      </div>
                    </div>

                    {/* Usage by mode */}
                    <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-3">How AI Is Being Used</h4>
                    <div className="space-y-2.5 mb-6">
                      {aiUsageData.byMode.map((mode) => (
                        <div key={mode.mode} className="flex items-center gap-3 p-3 bg-pk-gray-light rounded-xl border border-pk-gray-border">
                          <div className={`p-2 rounded-lg ${mode.color}/10`}>
                            <mode.icon className={`w-4 h-4 ${mode.textColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[12px] font-semibold text-pk-text">{mode.mode}</span>
                              <span className="text-[12px] font-bold text-pk-text">{mode.count} <span className="text-[10px] text-pk-text-secondary font-normal">({mode.pct}%)</span></span>
                            </div>
                            <div className="h-1.5 bg-pk-gray-border rounded-full overflow-hidden">
                              <div className={`h-full ${mode.color} rounded-full`} style={{ width: `${mode.pct}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Help level distribution */}
                    <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-3">HomeworkAI Help Levels Used</h4>
                    <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4">
                      {/* Stacked bar */}
                      <div className="flex h-6 rounded-full overflow-hidden mb-3">
                        {aiUsageData.helpLevels.map((hl) => (
                          <div
                            key={hl.level}
                            className={`${hl.color} transition-all`}
                            style={{ width: `${hl.pct}%` }}
                            title={`${hl.level}: ${hl.pct}%`}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {aiUsageData.helpLevels.map((hl) => (
                          <div key={hl.level} className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${hl.color} flex-shrink-0`} />
                            <div>
                              <div className="text-[10px] text-pk-text-secondary leading-tight">{hl.level}</div>
                              <div className="text-[11px] font-bold text-pk-text">{hl.count} times ({hl.pct}%)</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-pk-gray-border">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-3.5 h-3.5 text-pk-green flex-shrink-0 mt-0.5" />
                          <p className="text-[11px] text-pk-text-secondary leading-relaxed">
                            <span className="font-semibold text-pk-green">Good sign:</span> 64% of AI interactions resolved at Level 1–2, meaning Arjun is learning to think independently before asking for help.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Weekly usage chart (simple text-based) */}
                    <div className="mt-5">
                      <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-3">This Week&apos;s Daily Usage</h4>
                      <div className="flex items-end gap-2 h-24">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                          const val = aiUsageData.weeklyTrend[i];
                          const maxVal = Math.max(...aiUsageData.weeklyTrend);
                          const height = (val / maxVal) * 100;
                          const isToday = i === 6;
                          return (
                            <div key={day} className="flex-1 flex flex-col items-center gap-1">
                              <span className="text-[10px] font-bold text-pk-text">{val}</span>
                              <div className="w-full flex justify-center">
                                <div
                                  className={`w-full max-w-[28px] rounded-t-md transition-all ${isToday ? "bg-pk-orange" : "bg-pk-blue/20"}`}
                                  style={{ height: `${height}%`, minHeight: "8px" }}
                                />
                              </div>
                              <span className={`text-[9px] ${isToday ? "font-bold text-pk-orange" : "text-pk-text-secondary"}`}>{day}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══ TOPICS TAB ═══ */}
                {activeTab === "topics" && (
                  <div>
                    <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-4">Topic-wise Understanding</h4>

                    <div className="space-y-3 mb-6">
                      {topicData.map((t) => {
                        const statusColors = {
                          strong: { bg: "bg-pk-green/8", text: "text-pk-green", label: "Strong" },
                          good: { bg: "bg-pk-blue/8", text: "text-pk-blue", label: "Good" },
                          "needs-work": { bg: "bg-pk-orange/8", text: "text-pk-orange", label: "Needs Work" },
                          struggling: { bg: "bg-red-50", text: "text-red-500", label: "Struggling" },
                        };
                        const sc = statusColors[t.status];
                        const barColor = t.status === "strong" ? "bg-pk-green" : t.status === "good" ? "bg-pk-blue" : t.status === "needs-work" ? "bg-pk-orange" : "bg-red-500";

                        return (
                          <div key={t.topic} className={`p-4 rounded-xl border transition-colors ${
                            t.status === "struggling" ? "bg-red-50/50 border-red-200/50" : "bg-pk-gray-light border-pk-gray-border"
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[12px] font-bold text-pk-text">{t.topic}</span>
                                <span className="text-[10px] text-pk-text-secondary bg-white px-1.5 py-0.5 rounded border border-pk-gray-border">{t.subject}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {t.trend === "up" ? (
                                  <TrendingUp className="w-3 h-3 text-pk-green" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 text-red-500" />
                                )}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="h-2 bg-white rounded-full overflow-hidden border border-pk-gray-border/50">
                                  <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${t.understanding}%` }} />
                                </div>
                              </div>
                              <span className="text-[13px] font-extrabold text-pk-text w-10 text-right">{t.understanding}%</span>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-[10px] text-pk-text-secondary">{t.sessions} sessions spent</span>
                              {t.status === "struggling" && (
                                <span className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> Revision auto-scheduled
                                </span>
                              )}
                              {t.status === "strong" && (
                                <span className="text-[10px] text-pk-green font-medium flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Exam ready
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Insight box */}
                    <div className="bg-pk-blue/[0.04] border border-pk-blue/15 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-pk-blue" />
                        <span className="text-[11px] font-bold text-pk-blue">AI Insight</span>
                      </div>
                      <p className="text-[12px] text-pk-text-secondary leading-relaxed">
                        Arjun struggles most with <span className="font-semibold text-pk-text">Quadratic Equations</span> — he&apos;s used Level 4–5 help 6 times on this topic alone.
                        The system has auto-scheduled 3 revision sessions and generated a targeted practice set. Consider extra support here.
                      </p>
                    </div>
                  </div>
                )}

                {/* ═══ HOMEWORK TAB ═══ */}
                {activeTab === "homework" && (
                  <div>
                    {/* Homework summary stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-pk-green/[0.04] border border-pk-green/15 rounded-xl p-3 text-center">
                        <div className="text-xl font-extrabold text-pk-green">91%</div>
                        <div className="text-[10px] text-pk-text-secondary">Completion rate</div>
                      </div>
                      <div className="bg-pk-orange/[0.04] border border-pk-orange/15 rounded-xl p-3 text-center">
                        <div className="text-xl font-extrabold text-pk-orange">82%</div>
                        <div className="text-[10px] text-pk-text-secondary">Avg. score</div>
                      </div>
                      <div className="bg-pk-blue/[0.04] border border-pk-blue/15 rounded-xl p-3 text-center">
                        <div className="text-xl font-extrabold text-pk-blue">2.1</div>
                        <div className="text-[10px] text-pk-text-secondary">Avg AI help/HW</div>
                      </div>
                    </div>

                    {/* Homework list */}
                    <h4 className="text-xs font-bold text-pk-text-secondary uppercase tracking-wider mb-3">Recent Homework</h4>
                    <div className="space-y-2.5">
                      {homeworkData.map((hw, i) => {
                        const statusConfig = {
                          completed: { color: "text-pk-green", bg: "bg-pk-green/8", label: "Completed", icon: CheckCircle2 },
                          "in-progress": { color: "text-pk-orange", bg: "bg-pk-orange/8", label: "In Progress", icon: Clock },
                          pending: { color: "text-pk-text-secondary", bg: "bg-pk-gray-light", label: "Pending", icon: Calendar },
                        };
                        const sc = statusConfig[hw.status];

                        return (
                          <div key={i} className="flex items-center gap-3 p-3.5 bg-pk-gray-light rounded-xl border border-pk-gray-border">
                            <div className={`p-2 rounded-lg ${sc.bg} flex-shrink-0`}>
                              <sc.icon className={`w-4 h-4 ${sc.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[12px] font-semibold text-pk-text">{hw.title}</div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-pk-text-secondary">{hw.subject}</span>
                                <span className="text-[10px] text-pk-text-secondary">&middot;</span>
                                <span className="text-[10px] text-pk-text-secondary">Due: {hw.due}</span>
                                {hw.aiHelp > 0 && (
                                  <>
                                    <span className="text-[10px] text-pk-text-secondary">&middot;</span>
                                    <span className="text-[10px] text-pk-blue font-medium flex items-center gap-0.5">
                                      <Bot className="w-2.5 h-2.5" /> {hw.aiHelp} AI helps
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              {hw.score !== null ? (
                                <div className={`text-[14px] font-extrabold ${hw.score >= 80 ? "text-pk-green" : hw.score >= 60 ? "text-pk-orange" : "text-red-500"}`}>
                                  {hw.score}%
                                </div>
                              ) : (
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.color}`}>
                                  {sc.label}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* AI dependency alert */}
                    <div className="mt-5 bg-pk-orange/[0.04] border border-pk-orange/15 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-pk-orange flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-bold text-pk-orange block mb-0.5">AI Dependency Check</span>
                          <p className="text-[11px] text-pk-text-secondary leading-relaxed">
                            Arjun used <span className="font-semibold text-pk-text">5 AI helps</span> on Algebra Practice Set B — higher than his average of 2.1.
                            His score was also below average (78%). This suggests he may need extra practice on algebraic expressions before moving on.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* WhatsApp updates card */}
            <div className="pd-whatsapp bg-white rounded-2xl border border-pk-gray-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-4 h-4 text-pk-green" />
                <h3 className="text-sm font-bold text-pk-text">WhatsApp Updates</h3>
              </div>
              <p className="text-[12px] text-pk-text-secondary leading-relaxed mb-4">
                Get daily reports on WhatsApp — AI usage, homework completion, and areas that need attention.
              </p>
              <div className="bg-pk-gray-light rounded-xl p-4 border border-pk-gray-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-pk-text">PromptKids Bot</span>
                  <span className="text-[9px] text-pk-text-secondary">6:00 PM</span>
                </div>
                <div className="bg-white rounded-lg p-3 border border-pk-gray-border text-[11px] text-pk-text-secondary leading-relaxed">
                  <p className="font-semibold text-pk-text mb-1">Daily Student Report</p>
                  <p>Arjun completed 2 homework assignments today (avg score: 85%).</p>
                  <p className="mt-1">AI used 4 times — mostly for doubt solving.</p>
                  <p className="mt-1 text-pk-orange font-medium">Needs attention: Quadratic Equations</p>
                  <p className="text-pk-blue font-medium mt-2">View full report &rarr;</p>
                </div>
              </div>
            </div>

            {/* Learning streaks & badges */}
            <div className="bg-white rounded-2xl border border-pk-gray-border p-5">
              <h3 className="text-sm font-bold text-pk-text mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-pk-purple" /> Milestones
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Flame, label: "12-day study streak", sublabel: "Current streak", color: "text-pk-orange", bg: "bg-pk-orange/8" },
                  { icon: Star, label: "Science Master", sublabel: "3 topics at 85%+", color: "text-pk-yellow", bg: "bg-pk-yellow/8" },
                  { icon: BookMarked, label: "Note Collector", sublabel: "15 notes created", color: "text-pk-green", bg: "bg-pk-green/8" },
                  { icon: Target, label: "Test Taker", sublabel: "20 mock tests completed", color: "text-pk-blue", bg: "bg-pk-blue/8" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${badge.bg}`}>
                      <badge.icon className={`w-4 h-4 ${badge.color}`} />
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-pk-text">{badge.label}</div>
                      <div className="text-[10px] text-pk-text-secondary">{badge.sublabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-pk-navy rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-white mb-2">See this for your child</p>
              <p className="text-[11px] text-white/50 mb-4">Full parent dashboard included in every plan</p>
              <button onClick={openBookTrial} className="inline-flex items-center gap-2 px-5 py-2.5 bg-pk-orange text-white text-[12px] font-bold rounded-xl hover:bg-pk-orange-dark transition-colors">
                Book Free Class <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
