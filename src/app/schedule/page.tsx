"use client";

import React from "react";
import {
  Bell,
  CalendarDays,
  BookOpen,
  FlaskConical,
  Atom,
  Leaf,
  Globe,
  ScrollText,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";

/* ── font helpers ─────────────────────────────────────────── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ── animation helper ─────────────────────────────────────── */
const anim = (i: number) =>
  `animate-[fadeSlideUp_0.5s_ease_both] [animation-delay:${i * 80}ms]`;

/* ── types ────────────────────────────────────────────────── */
type EventType = "class" | "homework" | "exam" | "goal";

interface WeekEvent {
  title: string;
  time: string;
  type: EventType;
  subject: string;
}

/* ── colour maps ──────────────────────────────────────────── */
const pillBg: Record<EventType, string> = {
  class: "bg-blue-100 text-blue-700 border-blue-200",
  homework: "bg-orange-100 text-orange-700 border-orange-200",
  exam: "bg-red-100 text-red-700 border-red-200",
  goal: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const dotColor: Record<EventType, string> = {
  class: "bg-blue-500",
  homework: "bg-orange-400",
  exam: "bg-red-500",
  goal: "bg-emerald-500",
};

const iconBg: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
  green: "bg-emerald-50 text-emerald-600",
};

const borderColor: Record<string, string> = {
  blue: "border-l-blue-500",
  orange: "border-l-orange-400",
  red: "border-l-red-500",
  green: "border-l-emerald-500",
};

/* ── weekly calendar data ─────────────────────────────────── */
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekDates = [24, 25, 26, 27, 28, 29, 30];
const today = 28;

const weekEvents: Record<number, WeekEvent[]> = {
  24: [{ title: "Physics Class", time: "10:00 AM", type: "class", subject: "Physics" }],
  25: [
    { title: "Maths Homework", time: "Due 5 PM", type: "homework", subject: "Maths" },
    { title: "Science Class", time: "2:00 PM", type: "class", subject: "Science" },
  ],
  26: [],
  27: [{ title: "English Essay", time: "Due 3 PM", type: "homework", subject: "English" }],
  28: [
    { title: "Physics Class", time: "10:00 AM", type: "class", subject: "Physics" },
    { title: "Chemistry HW", time: "Due 2 PM", type: "homework", subject: "Chemistry" },
  ],
  29: [{ title: "Mock Test", time: "11:00 AM", type: "exam", subject: "Science" }],
  30: [{ title: "Study Goal", time: "2 hrs", type: "goal", subject: "All" }],
};

/* ── upcoming events (sidebar) ────────────────────────────── */
const upcomingEvents = [
  {
    title: "Physics - Newton's Laws",
    subject: "Physics",
    time: "Today, 10:00 AM",
    color: "blue" as const,
    urgent: true,
    icon: <Atom size={18} />,
  },
  {
    title: "Chemistry Homework Due",
    subject: "Chemistry",
    time: "Today, 02:00 PM",
    color: "orange" as const,
    urgent: true,
    icon: <FlaskConical size={18} />,
  },
  {
    title: "Maths - Quadratic Equations",
    subject: "Maths",
    time: "Tomorrow, 11:00 AM",
    color: "blue" as const,
    icon: <BookOpen size={18} />,
  },
  {
    title: "Biology - Cell Division",
    subject: "Biology",
    time: "Mar 25, 09:30 AM",
    color: "green" as const,
    icon: <Leaf size={18} />,
  },
  {
    title: "Science Mid-term Exam",
    subject: "Science",
    time: "Mar 28",
    color: "red" as const,
    urgent: true,
    icon: <ScrollText size={18} />,
  },
  {
    title: "History - Ancient India",
    subject: "History",
    time: "Mar 30, 10:00 AM",
    color: "blue" as const,
    icon: <Globe size={18} />,
  },
];

/* ── exam schedule data ───────────────────────────────────── */
const upcomingExams = [
  {
    subject: "Science",
    title: "Science Mid-term",
    date: "Mar 28",
    daysLeft: 5,
    chapters: ["Newton's Laws", "Chemical Reactions", "Cell Division"],
    color: "red",
  },
  {
    subject: "Maths",
    title: "Maths Quiz",
    date: "Apr 5",
    daysLeft: 12,
    chapters: ["Quadratic Equations", "Trigonometry"],
    color: "blue",
  },
  {
    subject: "English",
    title: "English Test",
    date: "Apr 10",
    daysLeft: 17,
    chapters: ["Essay Writing", "Grammar", "Comprehension"],
    color: "green",
  },
];

const examSubjectBg: Record<string, string> = {
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
};

const examCountdownBg: Record<string, string> = {
  red: "bg-red-50 border-red-200 text-red-600",
  blue: "bg-blue-50 border-blue-200 text-blue-600",
  green: "bg-emerald-50 border-emerald-200 text-emerald-600",
};

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      {/* keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─── HEADER ───────────────────────────────────────── */}
      <AppHeader breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Schedule" }]} />

      {/* ─── PAGE TITLE + STATS ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className={`text-[28px] text-[#0f172a] leading-tight mb-1 ${anim(1)}`} style={dFont}>
              My Schedule
            </h1>
            <p className={`text-[15px] text-[#64748b] max-w-md ${anim(2)}`} style={bFont}>
              Stay organized with your classes, homework &amp; exams
            </p>
          </div>

          {/* stat cards */}
          <div className={`flex gap-4 ${anim(3)}`}>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 min-w-[150px]">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays size={16} className="text-blue-500" />
                <span className="text-[13px] text-[#64748b]" style={bFont}>This Week</span>
              </div>
              <span className="text-[22px] text-[#0f172a] leading-none" style={dFont}>
                8 <span className="text-[13px] font-normal text-[#94a3b8]">Events</span>
              </span>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 min-w-[150px]">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="text-[13px] text-[#64748b]" style={bFont}>Upcoming</span>
              </div>
              <span className="text-[22px] text-[#0f172a] leading-none" style={dFont}>
                3 <span className="text-[13px] font-normal text-[#94a3b8]">Exams</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT COLUMN ────────────────────────────────── */}
          <div className="lg:w-[60%] flex flex-col gap-8">
            {/* ── WEEKLY CALENDAR ──────────────────────────── */}
            <section
              className={`bg-white border border-gray-200 rounded-2xl p-6 ${anim(4)}`}
            >
              {/* week header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[22px] text-[#0f172a]" style={dFont}>
                  This Week
                </h2>
                <span className="text-[14px] text-[#64748b]" style={bFont}>
                  March 24 - 30, 2025
                </span>
              </div>

              {/* weekly grid */}
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, idx) => {
                  const date = weekDates[idx];
                  const isToday = date === today;
                  const events = weekEvents[date] || [];

                  return (
                    <div
                      key={day}
                      className={`flex flex-col rounded-xl border p-3 min-h-[160px] transition-all ${
                        isToday
                          ? "border-blue-300 bg-blue-50/60 ring-2 ring-blue-500/30"
                          : "border-gray-100 bg-gray-50/40 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {/* day name */}
                      <span
                        className={`text-[11px] uppercase tracking-wider text-center mb-1 ${
                          isToday ? "text-blue-600" : "text-gray-400"
                        }`}
                        style={dFont}
                      >
                        {day}
                      </span>

                      {/* date number */}
                      <div className="flex justify-center mb-3">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[15px] ${
                            isToday
                              ? "bg-blue-600 text-white"
                              : "text-gray-700"
                          }`}
                          style={dFont}
                        >
                          {date}
                        </span>
                      </div>

                      {/* events as pills */}
                      <div className="flex flex-col gap-1.5 flex-1">
                        {events.map((ev, i) => (
                          <div
                            key={i}
                            className={`rounded-lg border px-2 py-1.5 text-center ${pillBg[ev.type]}`}
                          >
                            <div className="flex items-center gap-1 justify-center mb-0.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${dotColor[ev.type]}`} />
                              <span className="text-[10px] truncate leading-tight" style={dFont}>
                                {ev.title}
                              </span>
                            </div>
                            <span className="text-[9px] opacity-75 block" style={bFont}>
                              {ev.time}
                            </span>
                          </div>
                        ))}
                        {events.length === 0 && (
                          <div className="flex-1 flex items-center justify-center">
                            <span className="text-[11px] text-gray-300" style={bFont}>
                              No events
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* legend */}
              <div className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-gray-100">
                {(
                  [
                    ["class", "Live Class"],
                    ["homework", "Homework"],
                    ["exam", "Exam"],
                    ["goal", "Study Goal"],
                  ] as const
                ).map(([type, label]) => (
                  <div key={type} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${dotColor[type]}`} />
                    <span className="text-[13px] text-gray-500" style={bFont}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── EXAM SCHEDULE ────────────────────────────── */}
            <section
              className={`bg-white border border-gray-200 rounded-2xl p-6 ${anim(5)}`}
            >
              <div className="flex items-center gap-2 mb-5">
                <ScrollText size={20} className="text-red-500" />
                <h2 className="text-[22px] text-[#0f172a]" style={dFont}>
                  Upcoming Exams
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {upcomingExams.map((exam, i) => (
                  <div
                    key={exam.title}
                    className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/40 p-4 transition-all hover:shadow-sm ${anim(6 + i)}`}
                  >
                    {/* countdown */}
                    <div
                      className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] h-[72px] rounded-xl border ${examCountdownBg[exam.color]}`}
                    >
                      <span className="text-[22px] leading-none" style={dFont}>
                        {exam.daysLeft}
                      </span>
                      <span className="text-[10px] mt-0.5" style={bFont}>
                        days left
                      </span>
                    </div>

                    {/* details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[15px] text-[#0f172a]" style={dFont}>
                          {exam.title}
                        </h3>
                        <span
                          className={`text-[11px] px-2.5 py-0.5 rounded-full ${examSubjectBg[exam.color]}`}
                          style={dFont}
                        >
                          {exam.subject}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#64748b] mb-2" style={bFont}>
                        <Clock size={12} className="inline mr-1 -translate-y-px" />
                        {exam.date}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exam.chapters.map((ch) => (
                          <span
                            key={ch}
                            className="text-[11px] bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg"
                            style={bFont}
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── SIDEBAR ───────────────────────────────────── */}
          <aside className="lg:w-[40%] flex flex-col gap-6">
            {/* upcoming events */}
            <div
              className={`bg-white border border-gray-200 rounded-2xl p-6 ${anim(5)}`}
            >
              <div className="flex items-center gap-2 mb-5">
                <Bell size={18} className="text-blue-600" />
                <h2 className="text-[20px] text-[#0f172a]" style={dFont}>
                  Upcoming Events
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {upcomingEvents.map((ev, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 border-l-[3px] ${borderColor[ev.color]} rounded-lg bg-gray-50/60 px-4 py-3 transition-all hover:shadow-sm ${anim(6 + i)}`}
                  >
                    {/* icon */}
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${iconBg[ev.color]}`}
                    >
                      {ev.icon}
                    </div>

                    {/* text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[14px] text-[#0f172a] truncate"
                          style={dFont}
                        >
                          {ev.title}
                        </span>
                        {ev.urgent && (
                          <span
                            className="flex-shrink-0 text-[10px] text-red-600 bg-red-50 border border-red-200 px-2 py-[1px] rounded-full"
                            style={dFont}
                          >
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[12px] text-gray-400">
                        <span style={bFont}>{ev.subject}</span>
                        <span className="flex items-center gap-1" style={bFont}>
                          <Clock size={11} />
                          {ev.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* today's summary */}
            <div
              className={`bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 ${anim(12)}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <h2 className="text-[20px] text-[#0f172a]" style={dFont}>
                  Today&apos;s Summary
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {/* Classes */}
                <div className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-3">
                  <span className="text-[14px] text-gray-600" style={bFont}>
                    Classes
                  </span>
                  <span className="text-[18px] text-[#0f172a]" style={dFont}>
                    1
                  </span>
                </div>

                {/* Homework Due */}
                <div className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-3">
                  <span className="text-[14px] text-gray-600" style={bFont}>
                    Homework Due
                  </span>
                  <span className="text-[18px] text-red-500" style={dFont}>
                    1
                  </span>
                </div>

                {/* Study Goals */}
                <div className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-3">
                  <span className="text-[14px] text-gray-600" style={bFont}>
                    Study Goals
                  </span>
                  <span className="text-[18px] text-emerald-600" style={dFont}>
                    3/5
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
