"use client";

import { useState } from "react";
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

const statCards = [
  {
    label: "THIS WEEK'S STUDY TIME",
    value: "3.2 hrs",
    change: "+18% vs last week",
    trend: "up" as const,
    icon: Clock,
    color: "text-pk-blue",
    bgColor: "bg-pk-blue/10",
  },
  {
    label: "AVERAGE MCQ SCORE",
    value: "76%",
    change: "Stable this week",
    trend: "neutral" as const,
    icon: Target,
    color: "text-pk-purple",
    bgColor: "bg-pk-purple/10",
  },
  {
    label: "AI DEPENDENCY SCORE",
    value: "32%",
    change: "Improving — lower is better",
    trend: "down" as const,
    icon: Brain,
    color: "text-pk-green",
    bgColor: "bg-pk-green/10",
  },
  {
    label: "STUDY STREAK",
    value: "12 days",
    emoji: true,
    change: "Best streak: 18 days",
    trend: "neutral" as const,
    icon: Flame,
    color: "text-pk-orange",
    bgColor: "bg-pk-orange/10",
  },
];

const subjects = [
  { name: "Science", score: 82, change: "+6%", color: "bg-pk-green" },
  { name: "Mathematics", score: 65, change: "+3%", color: "bg-pk-orange" },
  { name: "English", score: 90, change: "+2%", color: "bg-pk-blue" },
  { name: "History", score: 85, change: "+8%", color: "bg-pk-purple" },
  { name: "Biology", score: 68, change: "-2%", color: "bg-pk-yellow" },
];

const activities = [
  {
    color: "bg-pk-green",
    text: "Completed Science Ch.1 homework — 92% score, used AI for 2 doubts",
    time: "Today, 4:30 PM",
  },
  {
    color: "bg-pk-blue",
    text: "LearnBot session: Revised Photosynthesis for 18 min",
    time: "Today, 3:15 PM",
  },
  {
    color: "bg-pk-purple",
    text: "Exam Mode: Scored 78% in Math mock test",
    time: "Today, 1:00 PM",
  },
  {
    color: "bg-pk-orange",
    text: "HomeworkAI flagged: English essay needs revision",
    time: "Yesterday, 8:45 PM",
  },
  {
    color: "bg-pk-green",
    text: "Completed History Ch.3 — 88% score, zero AI dependency",
    time: "Yesterday, 5:20 PM",
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
    <div className="flex h-screen bg-pk-gray-light overflow-hidden">
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
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-pk-navy text-white
          transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 pt-6 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pk-orange font-bold text-sm text-white">
            PK
          </div>
          <span className="text-lg font-bold tracking-tight">PromptKids</span>
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Student selector */}
        <button className="mx-4 mb-4 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-left hover:bg-white/10 transition-colors">
          <Avatar className="h-9 w-9 bg-pk-blue text-white">
            <AvatarFallback className="bg-pk-blue text-white text-sm font-semibold">
              AS
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Arjun Sharma</p>
            <p className="text-xs text-white/50">Class 9</p>
          </div>
          <ChevronDown className="h-4 w-4 text-white/40 shrink-0" />
        </button>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${
                  item.active
                    ? "bg-pk-orange text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 bg-pk-purple text-white">
              <AvatarFallback className="bg-pk-purple text-white text-sm font-semibold">
                PS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Priya Sharma</p>
              <p className="text-xs text-white/50">Parent Account</p>
            </div>
            <button className="text-white/40 hover:text-white transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-pk-gray-border bg-white px-4 py-3 sm:px-6">
          <button
            className="lg:hidden text-pk-text hover:text-pk-navy"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-pk-text sm:text-xl">Dashboard</h1>
            <p className="text-xs text-pk-text-secondary hidden sm:block">
              Last updated 2 minutes ago
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Exam reminder */}
            <Badge className="hidden sm:inline-flex bg-pk-orange/10 text-pk-orange border-pk-orange/20 text-xs font-medium">
              <GraduationCap className="h-3 w-3 mr-1" />
              Science exam in 6 days
            </Badge>

            {/* Notification bell */}
            <button className="relative p-2 rounded-lg hover:bg-pk-gray-light transition-colors">
              <Bell className="h-5 w-5 text-pk-text-secondary" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pk-orange text-[10px] font-bold text-white">
                3
              </span>
            </button>

            {/* User avatar */}
            <Avatar className="h-8 w-8 hidden sm:flex">
              <AvatarFallback className="bg-pk-purple text-white text-xs font-semibold">
                PS
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-28">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 space-y-6">
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                  <CardContent className="pt-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-[10px] font-semibold tracking-wider text-pk-text-secondary uppercase">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-pk-text tabular-nums">
                          {stat.value}
                          {stat.emoji && (
                            <span className="ml-1 text-xl" role="img" aria-label="fire">
                              🔥
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-1">
                          {stat.trend === "up" && (
                            <TrendingUp className="h-3 w-3 text-pk-green" />
                          )}
                          {stat.trend === "down" && (
                            <TrendingDown className="h-3 w-3 text-pk-green" />
                          )}
                          {stat.trend === "neutral" && (
                            <Minus className="h-3 w-3 text-pk-text-secondary" />
                          )}
                          <span
                            className={`text-xs ${
                              stat.trend === "up" || stat.trend === "down"
                                ? "text-pk-green"
                                : "text-pk-text-secondary"
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}
                      >
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ── Subject Understanding + Today's Activity ── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Subject Understanding */}
              <Card className="border-0 shadow-sm lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-pk-text">
                    Subject Understanding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-pk-text">
                          {subject.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-pk-text tabular-nums">
                            {subject.score}%
                          </span>
                          <span
                            className={`text-xs font-medium tabular-nums ${
                              subject.change.startsWith("+")
                                ? "text-pk-green"
                                : "text-red-500"
                            }`}
                          >
                            ({subject.change})
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${subject.color}`}
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Today's Activity */}
              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-pk-text">
                    Today&apos;s Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, i) => (
                      <div key={i} className="flex gap-3">
                        {/* Timeline dot + line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`mt-1.5 h-2.5 w-2.5 rounded-full ${activity.color} shrink-0`}
                          />
                          {i < activities.length - 1 && (
                            <div className="w-px flex-1 bg-pk-gray-border mt-1" />
                          )}
                        </div>
                        <div className="pb-4 min-w-0">
                          <p className="text-sm text-pk-text leading-snug">
                            {activity.text}
                          </p>
                          <p className="mt-1 text-xs text-pk-text-secondary">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Homework Performance chart ── */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold text-pk-text">
                  Homework Performance — Last 7 Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 sm:gap-4">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between text-xs text-pk-text-secondary tabular-nums h-48 pb-7 pr-1">
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                  </div>

                  {/* Bars */}
                  <div className="flex flex-1 items-end justify-between gap-1 sm:gap-3">
                    {weeklyScores.map((d) => {
                      const height = ((d.score - 40) / 60) * 100;
                      const barColor =
                        d.score >= 85
                          ? "bg-pk-green"
                          : d.score >= 70
                          ? "bg-pk-blue"
                          : "bg-pk-orange";
                      return (
                        <div
                          key={d.day}
                          className="flex flex-1 max-w-20 flex-col items-center gap-1.5"
                        >
                          <span className="text-xs font-semibold text-pk-text tabular-nums">
                            {d.score}%
                          </span>
                          <div className="w-full rounded-t-md bg-gray-100 relative" style={{ height: "180px" }}>
                            <div
                              className={`absolute bottom-0 w-full rounded-t-md ${barColor} transition-all duration-500`}
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-pk-text-secondary">
                            {d.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── WhatsApp notification mockup ── */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm">
                <p className="mb-2 text-center text-xs font-medium text-pk-text-secondary">
                  Parents receive this every evening on WhatsApp
                </p>
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-pk-text">
                          PromptKids Bot
                        </p>
                        <p className="text-[10px] text-pk-text-secondary">
                          Today, 7:00 PM
                        </p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#dcf8c6] p-3 text-sm leading-relaxed text-pk-text">
                      <p className="font-semibold mb-1">
                        Daily Report — Arjun Sharma
                      </p>
                      <p className="text-xs leading-relaxed text-pk-text/80">
                        Study time: 3.2 hrs (+18%)
                        <br />
                        Homework: Science Ch.1 done (92%)
                        <br />
                        AI dependency: 32% (improving!)
                        <br />
                        Streak: 12 days 🔥
                        <br />
                        <br />
                        <span className="font-medium text-pk-text/90">
                          Needs help: Mathematics — Ch.4 Quadratic Equations
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        {/* ── Bottom alert bar ── */}
        <div className="sticky bottom-0 z-30 border-t border-pk-orange/20 bg-pk-orange/5 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pk-orange/10 shrink-0">
              <AlertTriangle className="h-4 w-4 text-pk-orange" />
            </div>
            <p className="flex-1 text-sm text-pk-text min-w-0">
              <span className="font-semibold">Arjun needs help</span>{" "}
              <span className="hidden sm:inline text-pk-text-secondary">
                — struggling with Mathematics Ch.4: Quadratic Equations. AI
                dependency is rising for this topic.
              </span>
            </p>
            <button className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-pk-orange px-4 py-2 text-sm font-semibold text-white hover:bg-pk-orange-dark transition-colors">
              Assign LearnBot Session
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
