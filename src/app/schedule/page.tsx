"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
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

/* ── font helpers ─────────────────────────────────────────── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ── animation helper ─────────────────────────────────────── */
const anim = (i: number) =>
  `animate-[fadeSlideUp_0.5s_ease_both] [animation-delay:${i * 80}ms]`;

/* ── types ────────────────────────────────────────────────── */
type EventColor = "blue" | "orange" | "red" | "green";

interface CalendarEvent {
  day: number;
  month: number;
  year: number;
  color: EventColor;
  label: string;
}

interface UpcomingEvent {
  title: string;
  subject: string;
  time: string;
  color: EventColor;
  urgent?: boolean;
  icon: React.ReactNode;
}

/* ── colour maps ──────────────────────────────────────────── */
const dotColor: Record<EventColor, string> = {
  blue: "bg-blue-500",
  orange: "bg-orange-400",
  red: "bg-red-500",
  green: "bg-emerald-500",
};

const barColor: Record<EventColor, string> = {
  blue: "bg-blue-500",
  orange: "bg-orange-400",
  red: "bg-red-500",
  green: "bg-emerald-500",
};

const borderColor: Record<EventColor, string> = {
  blue: "border-l-blue-500",
  orange: "border-l-orange-400",
  red: "border-l-red-500",
  green: "border-l-emerald-500",
};

const iconBg: Record<EventColor, string> = {
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
  green: "bg-emerald-50 text-emerald-600",
};

/* ── static data ──────────────────────────────────────────── */
const calendarEvents: CalendarEvent[] = [
  { day: 23, month: 2, year: 2025, color: "blue", label: "Live Class" },
  { day: 24, month: 2, year: 2025, color: "orange", label: "Homework" },
  { day: 24, month: 2, year: 2025, color: "green", label: "Study Goal" },
  { day: 25, month: 2, year: 2025, color: "red", label: "Exam" },
  { day: 25, month: 2, year: 2025, color: "blue", label: "Live Class" },
  { day: 28, month: 2, year: 2025, color: "red", label: "Exam" },
  { day: 28, month: 2, year: 2025, color: "blue", label: "Live Class" },
  { day: 28, month: 2, year: 2025, color: "orange", label: "Homework" },
  { day: 30, month: 2, year: 2025, color: "green", label: "Study Goal" },
  { day: 30, month: 2, year: 2025, color: "blue", label: "Live Class" },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Physics - Newton's Laws",
    subject: "Physics",
    time: "Today, 10:00 AM",
    color: "blue",
    urgent: true,
    icon: <Atom size={18} />,
  },
  {
    title: "Chemistry Homework Due",
    subject: "Chemistry",
    time: "Today, 02:00 PM",
    color: "orange",
    urgent: true,
    icon: <FlaskConical size={18} />,
  },
  {
    title: "Maths - Quadratic Equations",
    subject: "Maths",
    time: "Tomorrow, 11:00 AM",
    color: "blue",
    icon: <BookOpen size={18} />,
  },
  {
    title: "Biology - Cell Division",
    subject: "Biology",
    time: "Mar 25, 09:30 AM",
    color: "green",
    icon: <Leaf size={18} />,
  },
  {
    title: "Science Mid-term Exam",
    subject: "Science",
    time: "Mar 28",
    color: "red",
    urgent: true,
    icon: <ScrollText size={18} />,
  },
  {
    title: "History - Ancient India",
    subject: "History",
    time: "Mar 30, 10:00 AM",
    color: "blue",
    icon: <Globe size={18} />,
  },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* ── calendar helpers ─────────────────────────────────────── */
function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const totalDays = useMemo(
    () => daysInMonth(currentMonth, currentYear),
    [currentMonth, currentYear]
  );
  const startDay = useMemo(
    () => firstDayOfMonth(currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  /* events for the visible month */
  const eventsForDay = (day: number) =>
    calendarEvents.filter(
      (e) => e.day === day && e.month === currentMonth && e.year === currentYear
    );

  const isToday = (day: number) =>
    currentMonth === 2 && currentYear === 2025 && day === 28;

  /* build grid cells */
  const blanks = Array.from({ length: startDay }, (_, i) => (
    <div key={`b-${i}`} />
  ));

  const days = Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1;
    const events = eventsForDay(day);
    const today = isToday(day);
    return (
      <div
        key={day}
        className={`relative flex flex-col items-center justify-start pt-2 h-[72px] rounded-xl transition-all ${
          today
            ? "ring-2 ring-blue-500 bg-blue-50/60"
            : "hover:bg-gray-50"
        }`}
      >
        <span
          className={`text-[14px] leading-none ${
            today ? "text-blue-600 font-bold" : "text-gray-700"
          }`}
          style={bFont}
        >
          {day}
        </span>
        {events.length > 0 && (
          <div className="flex gap-[3px] mt-auto mb-2">
            {events.map((ev, idx) => (
              <span
                key={idx}
                className={`w-[18px] h-[4px] rounded-full ${barColor[ev.color]}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  });

  /* ── RENDER ──────────────────────────────────────────────── */
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
      <header className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          {/* back link */}
          <Link
            href="/platform"
            className={`inline-flex items-center gap-2 text-white/70 hover:text-white text-[14px] transition-colors mb-6 ${anim(0)}`}
            style={bFont}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1
                className={`text-[32px] text-white leading-tight mb-2 ${anim(1)}`}
                style={dFont}
              >
                My Schedule
              </h1>
              <p
                className={`text-[16px] text-white/80 max-w-md ${anim(2)}`}
                style={bFont}
              >
                Stay organized with your classes, homework &amp; exams
              </p>
            </div>

            {/* stat cards */}
            <div className={`flex gap-4 ${anim(3)}`}>
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white min-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays size={16} className="text-white/70" />
                  <span className="text-[13px] text-white/70" style={bFont}>
                    This Week
                  </span>
                </div>
                <span className="text-[24px] leading-none" style={dFont}>
                  12{" "}
                  <span className="text-[14px] font-normal text-white/70">
                    Events
                  </span>
                </span>
              </div>

              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white min-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={16} className="text-white/70" />
                  <span className="text-[13px] text-white/70" style={bFont}>
                    Upcoming
                  </span>
                </div>
                <span className="text-[24px] leading-none" style={dFont}>
                  2{" "}
                  <span className="text-[14px] font-normal text-white/70">
                    Exams
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── CONTENT ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── CALENDAR ──────────────────────────────────── */}
          <section
            className={`lg:w-[60%] bg-white border border-gray-200 rounded-2xl p-6 ${anim(4)}`}
          >
            {/* month header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] text-[#0f172a]" style={dFont}>
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-center text-[12px] text-gray-400 uppercase tracking-wider py-2"
                  style={dFont}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* day grid */}
            <div className="grid grid-cols-7 gap-[2px]">
              {blanks}
              {days}
            </div>

            {/* legend */}
            <div className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-gray-100">
              {(
                [
                  ["blue", "Live Class"],
                  ["orange", "Homework"],
                  ["red", "Exam"],
                  ["green", "Study Goal"],
                ] as const
              ).map(([color, label]) => (
                <div key={color} className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${dotColor[color]}`}
                  />
                  <span className="text-[13px] text-gray-500" style={bFont}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

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
