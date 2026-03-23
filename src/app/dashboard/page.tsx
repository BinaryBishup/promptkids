"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileBarChart,
  BrainCircuit,
  Bot,
  GraduationCap,
  Trophy,
  Settings,
  LogOut,
  ChevronDown,
  Clock,
  Bell,
  Menu,
  AlertTriangle,
  Calendar,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileBarChart, label: "Weekly Report", active: false },
  { icon: BrainCircuit, label: "HomeworkAI", active: false },
  { icon: Bot, label: "LearnBot", active: false },
  { icon: GraduationCap, label: "Exam Mode", active: false },
  { icon: Trophy, label: "Achievements", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const subjects = [
  { name: "Science", score: 82, change: +6, color: "bg-green-500" },
  { name: "Mathematics", score: 65, change: +3, color: "bg-orange-500" },
  { name: "English", score: 90, change: +2, color: "bg-blue-500" },
  { name: "History", score: 85, change: +8, color: "bg-green-500" },
  { name: "Biology", score: 68, change: -2, color: "bg-amber-500" },
];

const activities = [
  {
    color: "bg-green-500",
    text: "Completed Science Ch.1 homework \u2014 92% score, used AI for 2 doubts",
    time: "Today, 4:30 PM",
  },
  {
    color: "bg-orange-500",
    text: "12-day study streak achieved \u2014 longest this month",
    time: "Today, 3:00 PM",
  },
  {
    color: "bg-red-500",
    text: "Quadratic Equations \u2014 understanding dropped to 52%. Revision recommended",
    time: "Yesterday",
  },
  {
    color: "bg-blue-500",
    text: "Used LearnBot to create revision notes for French Revolution",
    time: "Yesterday",
  },
  {
    color: "bg-blue-500",
    text: "HomeworkAI session: History worksheet \u2014 Level 3 help used",
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

const sessions = [
  { date: "24 May", subject: "Science", topic: "Light Chapter", time: "22 min", level: 2, mcq: "3/4", highlight: false },
  { date: "23 May", subject: "Maths", topic: "Quadratic Eq.", time: "34 min", level: 4, mcq: "2/4", highlight: false },
  { date: "22 May", subject: "English", topic: "Essay Writing", time: "18 min", level: 1, mcq: "4/4", highlight: false },
  { date: "21 May", subject: "History", topic: "French Revolution", time: "41 min", level: 5, mcq: "1/4", highlight: true },
  { date: "20 May", subject: "Maths", topic: "Linear Equations", time: "25 min", level: 2, mcq: "4/4", highlight: false },
];

const attentionTopics = [
  { subject: "Mathematics", topic: "Quadratic Equations" },
  { subject: "Science", topic: "Light and Refraction" },
  { subject: "History", topic: "French Revolution" },
];

function getLevelBadgeColor(level: number) {
  if (level <= 2) return "bg-green-100 text-green-700";
  if (level <= 3) return "bg-yellow-100 text-yellow-700";
  if (level === 4) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f0]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[195px] flex-col bg-[#1a1a2e] text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 pt-5 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pk-blue text-sm font-bold text-white font-mono">
            {">_"}
          </div>
          <span className="text-base font-bold">
            <span className="text-white">Prompt</span>
            <span className="text-pk-orange">Kids</span>
          </span>
        </div>

        {/* Student selector */}
        <div className="mx-3 mb-4 rounded-lg bg-white/10 px-3 py-2.5 cursor-pointer hover:bg-white/15 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Arjun Sharma</p>
              <p className="text-xs text-white/50">Class 9</p>
            </div>
            <ChevronDown className="h-4 w-4 text-white/50" />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-0.5 px-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                item.active
                  ? "bg-pk-orange font-medium text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="border-t border-white/10 px-3 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pk-blue text-xs font-semibold text-white shrink-0">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Priya Sharma</p>
              <p className="text-xs text-white/50">Parent Account</p>
            </div>
            <LogOut className="h-4 w-4 text-white/40 hover:text-white cursor-pointer shrink-0" />
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-pk-gray-border bg-white px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1 -ml-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-pk-text" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-pk-text lg:text-xl">Dashboard</h1>
              <p className="text-xs text-pk-text-secondary">Last updated 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 border border-orange-200"
            >
              <Clock className="h-3 w-3" />
              Science exam in 6 days
            </Badge>
            <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-pk-text-secondary" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <Avatar size="default">
              <AvatarFallback className="bg-pk-purple text-white text-xs font-semibold">
                PS
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto pb-16">
          <div className="mx-auto max-w-7xl space-y-5 p-4 lg:p-6">
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Study Time */}
              <div className="rounded-xl border border-pk-gray-border bg-[#f0f7f0] p-4 border-t-[3px] border-t-green-500">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-pk-text-secondary">
                  This Week&apos;s Study Time
                </p>
                <p className="mt-1 text-2xl font-bold text-pk-text">3.2 hrs</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3" /> +18% vs last week
                </p>
              </div>
              {/* MCQ Score */}
              <div className="rounded-xl border border-pk-gray-border bg-[#fef9e7] p-4 border-t-[3px] border-t-yellow-500">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-pk-text-secondary">
                  Average MCQ Score
                </p>
                <p className="mt-1 text-2xl font-bold text-pk-text">76%</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-pk-text-secondary font-medium">
                  <Minus className="h-3 w-3" /> Stable this week
                </p>
              </div>
              {/* AI Dependency */}
              <div className="rounded-xl border border-pk-gray-border bg-[#f0f7f0] p-4 border-t-[3px] border-t-green-500">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-pk-text-secondary">
                  AI Dependency Score
                </p>
                <p className="mt-1 text-2xl font-bold text-pk-text">32%</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-green-600 font-medium">
                  <TrendingDown className="h-3 w-3" /> Improving — lower is better
                </p>
              </div>
              {/* Study Streak */}
              <div className="rounded-xl border border-pk-gray-border bg-[#fdf3e3] p-4 border-t-[3px] border-t-orange-500">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-pk-text-secondary">
                  Study Streak
                </p>
                <p className="mt-1 text-2xl font-bold text-pk-text">
                  12 days <span className="text-lg">&#x1F525;</span>
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-pk-text-secondary font-medium">
                  <Minus className="h-3 w-3" /> Best streak: 18 days
                </p>
              </div>
            </div>

            {/* SUBJECT UNDERSTANDING + TODAY'S ACTIVITY */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              {/* Subject Understanding */}
              <Card className="lg:col-span-3 border-pk-gray-border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    Subject Understanding <span>&#x1F9E0;</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3.5">
                  {subjects.map((s) => (
                    <div key={s.name} className="flex items-center gap-3">
                      <span className="w-24 text-sm text-pk-text-secondary shrink-0">
                        {s.name}
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.color} transition-all`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                      <span className="w-10 text-sm font-bold text-pk-text text-right tabular-nums">
                        {s.score}%
                      </span>
                      <span
                        className={`w-10 text-xs font-medium text-right ${
                          s.change > 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {s.change > 0 ? `+${s.change}%` : `${s.change}%`}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Today's Activity */}
              <Card className="lg:col-span-2 border-pk-gray-border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Clock className="h-4 w-4 text-pk-text-secondary" />
                    Today&apos;s Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  {activities.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center pt-1.5">
                        <div className={`h-2.5 w-2.5 rounded-full ${a.color} shrink-0`} />
                        {i < activities.length - 1 && (
                          <div className="w-px flex-1 bg-gray-200 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-pk-text leading-snug">{a.text}</p>
                        <p className="text-xs text-pk-text-secondary mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* HOMEWORK PERFORMANCE CHART */}
            <div className="relative">
              <Card className="border-pk-gray-border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="text-base font-bold">
                    Homework Performance — Last 7 Days <span>&#x1F4CA;</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Chart */}
                  <div className="relative">
                    {/* Y-axis labels + grid */}
                    <div className="flex">
                      <div className="flex flex-col justify-between w-8 text-xs text-pk-text-secondary pr-2 shrink-0" style={{ height: 200 }}>
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                      </div>
                      <div className="flex-1 relative" style={{ height: 200 }}>
                        {/* Grid lines */}
                        <div className="absolute inset-0">
                          <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-200" />
                          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-200" />
                          <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-gray-200" />
                        </div>
                        {/* Bars */}
                        <div className="relative flex items-end justify-around h-full px-2">
                          {weeklyScores.map((d) => (
                            <div key={d.day} className="flex flex-col items-center gap-1" style={{ width: "12%" }}>
                              <span className="text-xs font-semibold text-pk-text tabular-nums">{d.score}</span>
                              <div
                                className={`w-full rounded-t-md ${
                                  d.score >= 65 ? "bg-[#8bc34a]" : "bg-pk-blue"
                                }`}
                                style={{ height: `${(d.score / 100) * 180}px` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* X-axis labels */}
                    <div className="flex mt-2">
                      <div className="w-8 shrink-0">
                        <span className="text-xs text-pk-text-secondary">0</span>
                      </div>
                      <div className="flex-1 flex justify-around px-2">
                        {weeklyScores.map((d) => (
                          <span key={d.day} className="text-xs text-pk-text-secondary text-center" style={{ width: "12%" }}>
                            {d.day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-pk-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#8bc34a]" />
                      Solved independently
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-pk-blue" />
                      AI help used
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-pk-text-secondary">
                    Arjun solved 71% of this week&apos;s homework without AI help — up from 58% last week
                  </p>
                </CardContent>
              </Card>

              {/* WHATSAPP NOTIFICATION - floating over bottom-right */}
              <div className="absolute -bottom-4 right-4 z-10 w-72 hidden xl:block">
                <p className="text-[11px] text-pk-text-secondary text-center mb-1.5 font-medium">
                  Parents receive this every evening on WhatsApp
                </p>
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2.5 bg-[#075e54] px-3 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">PromptKids Bot</p>
                    </div>
                    <span className="text-xs text-white/70">6:00 PM</span>
                  </div>
                  {/* WhatsApp body */}
                  <div className="bg-[#e5ddd5] p-3">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm font-bold text-pk-text">Daily Student Report</p>
                      <p className="mt-1 text-xs text-pk-text-secondary leading-relaxed">
                        Arjun completed Science homework today with 92% score. AI dependency is improving at 32%.
                        Study streak: 12 days.
                      </p>
                      <p className="mt-2 text-xs font-medium text-blue-600 cursor-pointer">
                        View full report &rarr;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer for WhatsApp notification overlap */}
            <div className="hidden xl:block h-8" />

            {/* NEEDS ATTENTION + UPCOMING EXAM */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Needs Attention */}
              <Card className="border-pk-gray-border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Needs Attention This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {attentionTopics.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-pk-gray-border p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-pk-text">{t.subject}</p>
                        <p className="text-xs text-pk-text-secondary">{t.topic}</p>
                      </div>
                      <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 transition-colors shrink-0">
                        Start LearnBot &rarr;
                      </button>
                    </div>
                  ))}
                  <p className="text-xs text-pk-text-secondary pt-1">
                    These topics had below 60% MCQ scores in the last 3 sessions.
                  </p>
                </CardContent>
              </Card>

              {/* Upcoming Exam */}
              <Card className="border-pk-gray-border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Calendar className="h-4 w-4 text-pk-blue" />
                    Upcoming Exam
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <p className="text-2xl font-bold text-pk-text">Science</p>
                  <p className="text-sm text-pk-text-secondary mt-1">6 days remaining</p>

                  {/* Circular progress ring */}
                  <div className="relative my-5">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.64)}`}
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-pk-text">64%</span>
                    </div>
                  </div>
                  <p className="text-sm text-pk-text-secondary">Preparation score</p>
                  <button className="mt-4 w-full rounded-lg bg-pk-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-pk-blue-dark transition-colors">
                    Go to Exam Mode &rarr;
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* RECENT HOMEWORKAI SESSIONS TABLE */}
            <Card className="border-pk-gray-border bg-white shadow-none">
              <CardHeader>
                <CardTitle className="text-base font-bold">
                  Recent HomeworkAI Sessions <span>&#x270F;&#xFE0F;</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm min-w-[640px]">
                    <thead>
                      <tr className="border-b border-pk-gray-border text-left">
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          Date
                        </th>
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          Subject
                        </th>
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          Topic
                        </th>
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          Time Spent
                        </th>
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          Help Level
                        </th>
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          MCQ Score
                        </th>
                        <th className="pb-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-pk-text-secondary">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((s, i) => (
                        <tr
                          key={i}
                          className={`border-b border-pk-gray-border last:border-b-0 ${
                            s.highlight ? "border-l-[3px] border-l-red-500 bg-red-50/50" : ""
                          }`}
                        >
                          <td className="py-2.5 px-3 text-pk-text-secondary whitespace-nowrap">
                            {s.date}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-pk-text">{s.subject}</td>
                          <td className="py-2.5 px-3 text-pk-text-secondary">{s.topic}</td>
                          <td className="py-2.5 px-3 text-pk-text-secondary tabular-nums">{s.time}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getLevelBadgeColor(
                                s.level
                              )}`}
                            >
                              Level {s.level}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-medium text-pk-text tabular-nums">{s.mcq}</td>
                          <td className="py-2.5 px-3">
                            <button className="text-xs font-medium text-pk-blue hover:underline">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* BOTTOM ALERT BAR */}
        <div className="sticky bottom-0 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-300 bg-amber-50 px-4 py-3 lg:px-6">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 leading-snug">
              Arjun needed maximum AI help with History for 3 sessions in a row — his MCQ score was 1/4. Tap to assign a LearnBot session now.
            </p>
          </div>
          <button className="shrink-0 rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5558e6] transition-colors whitespace-nowrap">
            Assign LearnBot Session &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
