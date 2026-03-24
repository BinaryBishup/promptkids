"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wifi,
  Clock,
  Play,
  Calendar,
  ChevronLeft,
  User,
} from "lucide-react";

/* ─── Font helpers ─── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ─── Types ─── */
type Tab = "live" | "past";
type View = "list" | "player";

interface LiveClass {
  subject: string;
  title: string;
  description: string;
  teacher: string;
  role: string;
  tags: string[];
  time: string;
  status: "live";
}

interface PastClass {
  subject: string;
  title: string;
  description: string;
  teacher: string;
  role: string;
  tags: string[];
  date: string;
  time: string;
}

/* ─── Data ─── */
const liveClass: LiveClass = {
  subject: "Science",
  title: "Chemical Bonding - Ionic & Covalent",
  description:
    "Understanding different types of chemical bonds with examples",
  teacher: "Dr. Priya Sharma",
  role: "Chemistry Expert",
  tags: ["Ionic Bonds", "Covalent Bonds", "Electronegativity"],
  time: "02:00 PM",
  status: "live",
};

const pastClasses: PastClass[] = [
  {
    subject: "Physics",
    title: "Thermodynamics - First Law Applications",
    description:
      "Understanding the first law of thermodynamics with practical examples",
    teacher: "Dr. Priya Sharma",
    role: "Physics Expert",
    tags: ["Internal Energy", "Work and Heat", "Problem Solving"],
    date: "2026-03-22",
    time: "02:00 PM - 03:00 PM",
  },
  {
    subject: "Physics",
    title: "Optics - Refraction and Lenses",
    description: "Understanding light refraction and lens behavior",
    teacher: "Dr. Priya Sharma",
    role: "Physics Expert",
    tags: ["Snell's Law", "Lens Formula", "Ray Diagrams"],
    date: "2026-03-20",
    time: "02:00 PM - 03:00 PM",
  },
  {
    subject: "Science",
    title: "Periodic Table - Trends & Patterns",
    description:
      "Exploring periodic trends across groups and periods",
    teacher: "Ms. Anita Desai",
    role: "Science Expert",
    tags: ["Atomic Radius", "Electronegativity", "Ionization"],
    date: "2026-03-18",
    time: "10:00 AM - 11:00 AM",
  },
  {
    subject: "Maths",
    title: "Quadratic Equations - Advanced",
    description:
      "Solving complex quadratic equations using multiple methods",
    teacher: "Mr. Rajesh Kumar",
    role: "Mathematics Expert",
    tags: ["Discriminant", "Completing Square", "Graphical Method"],
    date: "2026-03-16",
    time: "04:00 PM - 05:00 PM",
  },
  {
    subject: "English",
    title: "Essay Writing - Persuasive Techniques",
    description:
      "Master the art of persuasive writing with real examples",
    teacher: "Ms. Sarah Johnson",
    role: "English Expert",
    tags: ["Thesis Statement", "Arguments", "Counter-arguments"],
    date: "2026-03-14",
    time: "11:00 AM - 12:00 PM",
  },
  {
    subject: "History",
    title: "World War II - Causes & Effects",
    description:
      "Comprehensive overview of WWII origins and aftermath",
    teacher: "Mr. Vikram Singh",
    role: "History Expert",
    tags: ["Treaty of Versailles", "Allied Powers", "Aftermath"],
    date: "2026-03-12",
    time: "03:00 PM - 04:00 PM",
  },
];

const subjectFilters = ["All", "Science", "Maths", "Physics", "English", "History"];

/* ─── Component ─── */
export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("live");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [view, setView] = useState<View>("list");
  const [selectedRecording, setSelectedRecording] = useState<PastClass | null>(null);

  /* ─── Animations ─── */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("lc-anim")) return;
    const s = document.createElement("style");
    s.id = "lc-anim";
    s.textContent = `
      @keyframes lcFadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      .lc-fade { animation: lcFadeUp .5s ease-out both }
      .lc-d1 { animation-delay:.05s } .lc-d2 { animation-delay:.1s } .lc-d3 { animation-delay:.15s }
      .lc-d4 { animation-delay:.2s } .lc-d5 { animation-delay:.25s } .lc-d6 { animation-delay:.3s }
      .lc-d7 { animation-delay:.35s } .lc-d8 { animation-delay:.4s } .lc-d9 { animation-delay:.45s }
      .lc-d10 { animation-delay:.5s } .lc-d11 { animation-delay:.55s } .lc-d12 { animation-delay:.6s }
      @keyframes lcPulse { 0%,100% { opacity:1 } 50% { opacity:.4 } }
      .lc-pulse { animation: lcPulse 1.5s ease-in-out infinite }
    `;
    document.head.appendChild(s);
  }, []);

  const filteredPast =
    subjectFilter === "All"
      ? pastClasses
      : pastClasses.filter((c) => c.subject === subjectFilter);

  const relatedRecordings = selectedRecording
    ? pastClasses.filter((c) => c.title !== selectedRecording.title).slice(0, 3)
    : [];

  /* ═══════════════════ RECORDING VIEWER ═══════════════════ */
  if (view === "player" && selectedRecording) {
    const chapters = [
      { time: "0:00", title: "Introduction", active: true },
      { time: "3:20", title: "Core Concepts" },
      { time: "8:45", title: "Worked Examples" },
      { time: "18:00", title: "Practice Problems" },
      { time: "28:30", title: "Summary & Key Takeaways" },
      { time: "32:00", title: "Q&A Session" },
    ];

    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back button */}
          <button
            onClick={() => {
              setView("list");
              setSelectedRecording(null);
            }}
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 lc-fade cursor-pointer"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to recordings
          </button>

          {/* Video player placeholder */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative mb-8 lc-fade lc-d1">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 hover:bg-white/30 transition-colors cursor-pointer hover:scale-110">
                <Play size={36} className="text-white ml-1" />
              </div>
              <p className="text-white/60 text-[14px]" style={bFont}>
                {selectedRecording.title}
              </p>
              <p className="text-white/40 text-[12px] mt-1" style={bFont}>
                Duration: 45:00
              </p>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-[#2563eb] w-[0%]" />
            </div>
          </div>

          {/* Title & description */}
          <div className="lc-fade lc-d2 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="bg-blue-100 text-blue-700 text-[12px] px-3 py-1 rounded-full"
                style={dFont}
              >
                {selectedRecording.subject}
              </span>
              <span
                className="bg-green-100 text-green-700 text-[12px] px-3 py-1 rounded-full"
                style={dFont}
              >
                RECORDED
              </span>
            </div>
            <h1 className="text-[28px] text-[#0f172a] mb-2" style={dFont}>
              {selectedRecording.title}
            </h1>
            <p className="text-[16px] text-[#64748b] mb-4" style={bFont}>
              {selectedRecording.description}
            </p>
            {/* Teacher info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} className="text-gray-500" />
              </div>
              <div>
                <p className="text-[14px] text-[#0f172a]" style={dFont}>
                  {selectedRecording.teacher}
                </p>
                <p className="text-[13px] text-[#94a3b8]" style={bFont}>
                  {selectedRecording.role}
                </p>
              </div>
            </div>
          </div>

          {/* Chapter timestamps */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 mb-8 lc-fade lc-d3">
            <h4 className="text-[15px] text-[#0f172a] mb-4" style={dFont}>
              Chapters
            </h4>
            {chapters.map((ch) => (
              <button
                key={ch.time}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                  ch.active
                    ? "bg-[#2563eb]/10 border border-[#2563eb]/30"
                    : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-[13px] tabular-nums flex-shrink-0 ${
                    ch.active ? "text-[#2563eb]" : "text-[#94a3b8]"
                  }`}
                  style={dFont}
                >
                  {ch.time}
                </span>
                <span
                  className={`text-[14px] ${
                    ch.active ? "text-[#2563eb]" : "text-[#374151]"
                  }`}
                  style={bFont}
                >
                  {ch.title}
                </span>
                {ch.active && (
                  <span
                    className="ml-auto text-[11px] text-[#2563eb]"
                    style={dFont}
                  >
                    Now Playing
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Related recordings */}
          {relatedRecordings.length > 0 && (
            <div className="lc-fade lc-d4">
              <h4 className="text-[18px] text-[#0f172a] mb-4" style={dFont}>
                Related Recordings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedRecordings.map((rec, i) => (
                  <button
                    key={rec.title}
                    onClick={() => setSelectedRecording(rec)}
                    className={`bg-white border-2 border-[#e5e7eb] rounded-2xl p-4 text-left hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-200 cursor-pointer lc-fade lc-d${
                      i + 5
                    }`}
                  >
                    <span
                      className="bg-blue-100 text-blue-700 text-[11px] px-2.5 py-0.5 rounded-full"
                      style={dFont}
                    >
                      {rec.subject}
                    </span>
                    <h5
                      className="text-[14px] text-[#0f172a] mt-2 mb-1 line-clamp-2"
                      style={dFont}
                    >
                      {rec.title}
                    </h5>
                    <p
                      className="text-[12px] text-[#94a3b8]"
                      style={bFont}
                    >
                      {rec.teacher}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ═══════════════════ MAIN LIST VIEW ═══════════════════ */
  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      {/* ─── Blue gradient header (sticky) ─── */}
      <div
        className="sticky top-0 z-50"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[14px] text-white/80 hover:text-white transition-colors mb-4 no-underline"
            style={bFont}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="lc-fade">
              <h1
                className="text-[32px] text-white mb-1"
                style={dFont}
              >
                Live Classes
              </h1>
              <p className="text-[16px] text-white/80" style={bFont}>
                Join live sessions or watch recorded classes anytime
              </p>
            </div>

            {/* Stat cards */}
            <div className="flex items-center gap-3 lc-fade lc-d1">
              <div className="bg-white/10 rounded-xl py-3 px-5 flex items-center gap-3">
                <Wifi size={20} className="text-white/70" />
                <div>
                  <p className="text-[28px] text-white leading-none" style={dFont}>
                    1
                  </p>
                  <p className="text-[12px] text-white/70" style={bFont}>
                    Live Now
                  </p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl py-3 px-5 flex items-center gap-3">
                <Clock size={20} className="text-white/70" />
                <div>
                  <p className="text-[28px] text-white leading-none" style={dFont}>
                    {pastClasses.length}
                  </p>
                  <p className="text-[12px] text-white/70" style={bFont}>
                    Past Sessions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tab bar ─── */}
      <div className="bg-white border-b-2 border-[#e5e7eb] lc-fade lc-d2">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => setActiveTab("live")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] border-2 transition-all duration-200 cursor-pointer ${
              activeTab === "live"
                ? "bg-[#2563eb] text-white border-[#2563eb]"
                : "bg-white text-[#374151] border-[#e5e7eb] hover:border-gray-300"
            }`}
            style={dFont}
          >
            <Wifi size={16} />
            Live Now
            <span
              className={`text-[12px] px-1.5 py-0.5 rounded-full ${
                activeTab === "live"
                  ? "bg-white/20 text-white"
                  : "bg-red-100 text-red-600"
              }`}
            >
              1
            </span>
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] border-2 transition-all duration-200 cursor-pointer ${
              activeTab === "past"
                ? "bg-[#2563eb] text-white border-[#2563eb]"
                : "bg-white text-[#374151] border-[#e5e7eb] hover:border-gray-300"
            }`}
            style={dFont}
          >
            <Play size={16} />
            Past Sessions
          </button>
        </div>
      </div>

      {/* ─── Content area ─── */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* ═══ LIVE TAB ═══ */}
        {activeTab === "live" && (
          <div>
            <h2 className="text-[22px] text-[#0f172a] mb-6 lc-fade lc-d3" style={dFont}>
              Live Now
            </h2>

            <div className="max-w-2xl lc-fade lc-d4">
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-200">
                {/* Top row: live badge + subject */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[12px] px-3 py-1 rounded-full" style={dFont}>
                      <span className="w-2 h-2 rounded-full bg-green-500 lc-pulse" />
                      LIVE
                    </span>
                    <span className="bg-blue-100 text-blue-700 text-[12px] px-3 py-1 rounded-full" style={dFont}>
                      {liveClass.subject}
                    </span>
                  </div>
                </div>

                {/* Title & description */}
                <h3 className="text-[18px] text-[#0f172a] mb-2" style={dFont}>
                  {liveClass.title}
                </h3>
                <p className="text-[14px] text-[#6b7280] mb-4" style={bFont}>
                  {liveClass.description}
                </p>

                {/* Teacher */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0f172a]" style={dFont}>
                      {liveClass.teacher}
                    </p>
                    <p className="text-[13px] text-[#94a3b8]" style={bFont}>
                      {liveClass.role}
                    </p>
                  </div>
                </div>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {liveClass.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-2 border-[#e5e7eb] text-[#6b7280] text-[12px] px-3 py-1 rounded-full"
                      style={bFont}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-[13px] text-[#94a3b8] mb-5" style={bFont}>
                  <Clock size={14} />
                  <span>Started 15 min ago &middot; Starting at {liveClass.time}</span>
                </div>

                {/* Join button */}
                <button
                  className="w-full bg-[#16a34a] text-white text-[15px] py-3.5 rounded-xl hover:bg-[#15803d] active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                  style={dFont}
                >
                  <Wifi size={18} />
                  Join Live Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ PAST TAB ═══ */}
        {activeTab === "past" && (
          <div>
            {/* Subject filter row */}
            <div className="flex flex-wrap items-center gap-2 mb-6 lc-fade lc-d3">
              {subjectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSubjectFilter(filter)}
                  className={`px-4 py-2 rounded-full text-[13px] border-2 transition-all duration-200 cursor-pointer ${
                    subjectFilter === filter
                      ? "bg-[#2563eb] text-white border-[#2563eb]"
                      : "bg-white text-[#374151] border-[#e5e7eb] hover:border-gray-300"
                  }`}
                  style={dFont}
                >
                  {filter}
                </button>
              ))}

              {subjectFilter !== "All" && (
                <button
                  onClick={() => setSubjectFilter("All")}
                  className="inline-flex items-center gap-1 px-3 py-2 text-[13px] text-[#6b7280] hover:text-[#0f172a] transition-colors cursor-pointer"
                  style={bFont}
                >
                  <ChevronLeft size={14} />
                  Back to Subjects
                </button>
              )}
            </div>

            {/* Past classes grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPast.map((rec, i) => (
                <div
                  key={rec.title}
                  className={`bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-200 lc-fade lc-d${
                    Math.min(i + 4, 12)
                  }`}
                >
                  {/* Top row: subject + recorded badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="bg-blue-100 text-blue-700 text-[12px] px-3 py-1 rounded-full"
                      style={dFont}
                    >
                      {rec.subject}
                    </span>
                    <span
                      className="bg-green-100 text-green-700 text-[12px] px-3 py-1 rounded-full"
                      style={dFont}
                    >
                      RECORDED
                    </span>
                  </div>

                  {/* Title & description */}
                  <h3 className="text-[18px] text-[#0f172a] mb-2" style={dFont}>
                    {rec.title}
                  </h3>
                  <p className="text-[14px] text-[#6b7280] mb-4" style={bFont}>
                    {rec.description}
                  </p>

                  {/* Teacher */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-[14px] text-[#0f172a]" style={dFont}>
                        {rec.teacher}
                      </p>
                      <p className="text-[12px] text-[#94a3b8]" style={bFont}>
                        {rec.role}
                      </p>
                    </div>
                  </div>

                  {/* Topic tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rec.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-2 border-[#e5e7eb] text-[#6b7280] text-[12px] px-3 py-1 rounded-full"
                        style={bFont}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date & time row */}
                  <div className="flex items-center gap-4 text-[13px] text-[#94a3b8] mb-5" style={bFont}>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {rec.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      {rec.time}
                    </span>
                  </div>

                  {/* Watch button */}
                  <button
                    onClick={() => {
                      setSelectedRecording(rec);
                      setView("player");
                    }}
                    className="w-full bg-[#2563eb] text-white text-[14px] py-3 rounded-xl hover:bg-[#1d4ed8] active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                    style={dFont}
                  >
                    <Play size={16} />
                    Watch Recording
                  </button>
                </div>
              ))}
            </div>

            {filteredPast.length === 0 && (
              <div className="text-center py-16 lc-fade lc-d4">
                <Clock size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-[18px] text-[#374151] mb-1" style={dFont}>
                  No recordings found
                </p>
                <p className="text-[14px] text-[#94a3b8]" style={bFont}>
                  Try selecting a different subject filter
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
