"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  BarChart3,
  Bot,
  GraduationCap,
  Trophy,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  Clock,
  Target,
  Brain,
  Flame,
  AlertTriangle,
  ArrowRight,
  Menu,
  X,
  BookOpen,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

/* ──────────────────────────── DATA ──────────────────────────── */

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Weekly Report", active: false },
  { icon: BookOpen, label: "HomeworkAI", active: false },
  { icon: Bot, label: "LearnBot", active: false },
  { icon: GraduationCap, label: "Exam Mode", active: false },
  { icon: Trophy, label: "Achievements", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const subjects = [
  { name: "Science", score: 82, change: "+6%", color: "bg-pk-green" },
  { name: "Mathematics", score: 65, change: "+3%", color: "bg-pk-orange" },
  { name: "English", score: 90, change: "+2%", color: "bg-pk-blue" },
  { name: "History", score: 85, change: "+8%", color: "bg-pk-green" },
  { name: "Biology", score: 68, change: "-2%", color: "bg-yellow-500" },
];

const activities = [
  {
    color: "bg-pk-green",
    text: "Completed Science Ch.1 homework — 92% score, used AI for 2 doubts",
    time: "Today, 4:30 PM",
  },
  {
    color: "bg-pk-orange",
    text: "12-day study streak achieved — longest this month",
    time: "Today, 3:00 PM",
  },
  {
    color: "bg-red-500",
    text: "Quadratic Equations — understanding dropped to 52%. Revision recommended",
    time: "Yesterday",
  },
  {
    color: "bg-pk-blue",
    text: "Used LearnBot to create revision notes for French Revolution",
    time: "Yesterday",
  },
  {
    color: "bg-pk-blue",
    text: "HomeworkAI session: History worksheet — Level 3 help used",
    time: "2 days ago",
  },
];

const weeklyScores = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 85 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 91 },
  { day: "Fri", score: 78 },
  { day: "Sat", score: 82 },
  { day: "Sun", score: 76 },
];

/* ──────────────────────────── COMPONENT ──────────────────────────── */

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f5f0] overflow-hidden">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[200px] flex flex-col bg-[#1a1a2e] text-white
          transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 pt-5 pb-5">
          <span className="font-mono text-sm font-bold text-pk-blue bg-pk-blue/15 px-1.5 py-0.5 rounded">{`>_`}</span>
          <span className="text-[15px] font-bold tracking-tight">
            Prompt <span className="text-pk-orange">Kids</span>
          </span>
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Student selector */}
        <button className="mx-3 mb-3 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-white/5 transition-colors">
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate">Arjun Sharma</p>
            <p className="text-[11px] text-white/40">Class 9</p>
          </div>
          <ChevronDown className="h-4 w-4 text-white/30 shrink-0" />
        </button>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors
                ${
                  item.active
                    ? "bg-pk-orange text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }
              `}
            >
              <item.icon className="h-[17px] w-[17px] shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="border-t border-white/[0.06] px-3 py-4">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-pk-blue text-white text-[11px] font-semibold">
                PS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate">Priya Sharma</p>
              <p className="text-[11px] text-white/40">Parent Account</p>
            </div>
            <button className="text-white/30 hover:text-white transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-pk-gray-border bg-white px-5 py-3 sm:px-6">
          <button
            className="lg:hidden text-pk-text hover:text-pk-navy"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-pk-text">Dashboard</h1>
            <p className="text-[11px] text-pk-text-secondary/60 hidden sm:block">
              Last updated 2 minutes ago
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="hidden sm:inline-flex bg-transparent text-pk-text-secondary border border-pk-gray-border text-[11px] font-medium gap-1.5 px-3 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              Science exam in 6 days
            </Badge>

            <button className="relative p-2 rounded-full hover:bg-pk-gray-light transition-colors">
              <Bell className="h-5 w-5 text-pk-text-secondary" />
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pk-orange text-[9px] font-bold text-white">
                3
              </span>
            </button>

            <Avatar className="h-8 w-8 hidden sm:flex">
              <AvatarFallback className="bg-pk-purple text-white text-[11px] font-semibold">
                PS
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="mx-auto max-w-[1200px] p-5 sm:p-6 space-y-5">

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Study Time */}
              <Card className="border border-pk-gray-border shadow-none bg-white">
                <CardContent className="pt-5 pb-5 px-5">
                  <p className="text-[10px] font-semibold tracking-widest text-pk-text-secondary/60 uppercase mb-2">
                    THIS WEEK&apos;S STUDY TIME
                  </p>
                  <p className="text-[28px] font-bold text-pk-text leading-none mb-2">
                    3.2 <span className="text-base font-semibold text-pk-text-secondary">hrs</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-pk-green" />
                    <span className="text-[11px] text-pk-green font-medium">+18% vs last week</span>
                  </div>
                </CardContent>
              </Card>

              {/* MCQ Score */}
              <Card className="border border-pk-gray-border shadow-none bg-white">
                <CardContent className="pt-5 pb-5 px-5">
                  <p className="text-[10px] font-semibold tracking-widest text-pk-text-secondary/60 uppercase mb-2">
                    AVERAGE MCQ SCORE
                  </p>
                  <p className="text-[28px] font-bold text-pk-text leading-none mb-2">
                    76<span className="text-base font-semibold text-pk-text-secondary">%</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <Minus className="h-3 w-3 text-pk-text-secondary/50" />
                    <span className="text-[11px] text-pk-text-secondary/60">Stable this week</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Dependency */}
              <Card className="border border-pk-gray-border shadow-none bg-white">
                <CardContent className="pt-5 pb-5 px-5">
                  <p className="text-[10px] font-semibold tracking-widest text-pk-text-secondary/60 uppercase mb-2">
                    AI DEPENDENCY SCORE
                  </p>
                  <p className="text-[28px] font-bold text-pk-text leading-none mb-2">
                    32<span className="text-base font-semibold text-pk-text-secondary">%</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-pk-green" />
                    <span className="text-[11px] text-pk-green font-medium">Improving — lower is better</span>
                  </div>
                </CardContent>
              </Card>

              {/* Study Streak */}
              <Card className="border border-pk-orange/20 shadow-none bg-gradient-to-br from-pk-orange/[0.04] to-yellow-50">
                <CardContent className="pt-5 pb-5 px-5">
                  <p className="text-[10px] font-semibold tracking-widest text-pk-text-secondary/60 uppercase mb-2">
                    STUDY STREAK
                  </p>
                  <p className="text-[28px] font-bold text-pk-text leading-none mb-2">
                    12 <span className="text-base font-semibold text-pk-text-secondary">days</span>
                    <span className="ml-1.5 text-xl">🔥</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <Minus className="h-3 w-3 text-pk-text-secondary/50" />
                    <span className="text-[11px] text-pk-text-secondary/60">Best streak: 18 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Subject Understanding + Today's Activity ── */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              {/* Subject Understanding */}
              <Card className="border border-pk-gray-border shadow-none bg-white lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[15px] font-bold text-pk-text flex items-center gap-2">
                    Subject Understanding <span className="text-base">🧠</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  {subjects.map((subject) => (
                    <div key={subject.name} className="flex items-center gap-4">
                      <span className="text-[13px] font-medium text-pk-text w-24 shrink-0">
                        {subject.name}
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${subject.color}`}
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                      <span className="text-[13px] font-bold text-pk-text tabular-nums w-9 text-right">
                        {subject.score}%
                      </span>
                      <span
                        className={`text-[11px] font-semibold tabular-nums w-8 ${
                          subject.change.startsWith("+")
                            ? "text-pk-green"
                            : "text-red-500"
                        }`}
                      >
                        {subject.change}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Today's Activity */}
              <Card className="border border-pk-gray-border shadow-none bg-white lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[15px] font-bold text-pk-text flex items-center gap-2">
                    Today&apos;s Activity <Clock className="h-4 w-4 text-pk-text-secondary/40" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-0">
                    {activities.map((activity, i) => (
                      <div key={i} className="flex gap-3 py-2.5">
                        <div className="flex flex-col items-center pt-1.5">
                          <div
                            className={`h-2 w-2 rounded-full ${activity.color} shrink-0`}
                          />
                          {i < activities.length - 1 && (
                            <div className="w-px flex-1 bg-pk-gray-border/60 mt-1.5" />
                          )}
                        </div>
                        <div className="min-w-0 pb-1">
                          <p className="text-[13px] text-pk-text leading-snug">
                            {activity.text}
                          </p>
                          <p className="mt-0.5 text-[11px] text-pk-text-secondary/50">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Homework Performance + WhatsApp ── */}
            <div className="relative">
              <Card className="border border-pk-gray-border shadow-none bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[15px] font-bold text-pk-text flex items-center gap-2">
                    Homework Performance — Last 7 Days <span className="text-base">📊</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 sm:gap-3">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between text-[11px] text-pk-text-secondary/50 tabular-nums h-44 pb-7 pr-1 w-8 text-right">
                      <span>100</span>
                      <span>75</span>
                      <span>50</span>
                    </div>

                    {/* Bars */}
                    <div className="flex flex-1 items-end justify-between gap-1 sm:gap-2 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 bottom-7 flex flex-col justify-between pointer-events-none">
                        <div className="border-b border-dashed border-pk-gray-border/40" />
                        <div className="border-b border-dashed border-pk-gray-border/40" />
                        <div className="border-b border-dashed border-pk-gray-border/40" />
                      </div>

                      {weeklyScores.map((d) => {
                        const height = ((d.score - 40) / 60) * 100;
                        return (
                          <div
                            key={d.day}
                            className="flex flex-1 max-w-24 flex-col items-center gap-1.5 relative z-10"
                          >
                            <span className="text-[11px] font-semibold text-pk-text-secondary tabular-nums">
                              {d.score}%
                            </span>
                            <div className="w-full relative" style={{ height: "150px" }}>
                              <div
                                className="absolute bottom-0 w-full rounded-t-md bg-pk-blue transition-all duration-500"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-medium text-pk-text-secondary/50">
                              {d.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp notification — floating */}
              <div className="absolute -bottom-4 right-0 w-[300px] hidden xl:block z-20">
                <p className="mb-2 text-right text-[11px] font-medium text-pk-text-secondary/50 pr-1">
                  Parents receive this every evening on WhatsApp
                </p>
                <div className="rounded-2xl overflow-hidden shadow-xl border border-pk-gray-border">
                  {/* Header */}
                  <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pk-green">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white">PromptKids Bot</p>
                      <p className="text-[10px] text-white/60">6:00 PM</p>
                    </div>
                  </div>
                  {/* Message */}
                  <div className="bg-[#e5ddd5] p-3">
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-[13px] font-bold text-pk-text mb-1.5">Daily Student Report</p>
                      <p className="text-[11px] leading-relaxed text-pk-text-secondary">
                        Arjun completed 2 homework assignments today (avg score: 85%). AI used 4 times — mostly for doubt solving. Needs attention: Quadratic Equations — <Link href="#" className="text-pk-blue font-semibold">View full report →</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── Bottom alert bar ── */}
        <div className="sticky bottom-0 z-30 border-t border-amber-200 bg-amber-50">
          <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-2.5 sm:px-6">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="flex-1 text-[13px] text-pk-text min-w-0">
              Arjun needed maximum AI help with History for 3 sessions in a row — his MCQ score was 1/4. Tap to assign a LearnBot session now.
            </p>
            <button className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-pk-blue px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-pk-blue/90 transition-colors">
              Assign LearnBot Session
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
