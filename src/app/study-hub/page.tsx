"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  Calculator,
  BookOpen,
  PenTool,
  Leaf,
  Magnet,
  ChevronRight,
  Search,
  FileText,
  Clock,
  Download,
  Play,
  ClipboardList,
  Sparkles,
  Eye,
} from "lucide-react";

/* ─── Types ─── */
type Step = "subjects" | "topics" | "materials" | "viewer";

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

interface Chapter {
  name: string;
  materials: number;
  iconColor: string;
  iconBg: string;
}

type MaterialCategory = "Chapter Notes" | "PDF Document" | "Previous Year Questions" | "Quick Summary" | "Video Lecture";

interface Material {
  category: MaterialCategory;
  title: string;
  description: string;
  pages?: number;
  duration?: string;
  fileSize?: string;
  thumbType: "blue" | "photo" | "orange" | "green" | "video";
}

/* ─── Font helpers ─── */
const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ─── Data ─── */
const subjects: Subject[] = [
  { name: "Science",  icon: <Atom size={36} />,       color: "cyan",   bgLight: "bg-cyan-50",   bgMedium: "bg-cyan-100",   textColor: "text-cyan-600",   borderHover: "hover:border-cyan-300",   topics: 8  },
  { name: "Maths",    icon: <Calculator size={36} />,  color: "purple", bgLight: "bg-purple-50", bgMedium: "bg-purple-100", textColor: "text-purple-600", borderHover: "hover:border-purple-300", topics: 12 },
  { name: "History",  icon: <BookOpen size={36} />,    color: "orange", bgLight: "bg-orange-50", bgMedium: "bg-orange-100", textColor: "text-orange-600", borderHover: "hover:border-orange-300", topics: 6  },
  { name: "English",  icon: <PenTool size={36} />,     color: "green",  bgLight: "bg-green-50",  bgMedium: "bg-green-100",  textColor: "text-green-600",  borderHover: "hover:border-green-300",  topics: 10 },
  { name: "Biology",  icon: <Leaf size={36} />,        color: "pink",   bgLight: "bg-pink-50",   bgMedium: "bg-pink-100",   textColor: "text-pink-600",   borderHover: "hover:border-pink-300",   topics: 7  },
  { name: "Physics",  icon: <Magnet size={36} />,      color: "blue",   bgLight: "bg-blue-50",   bgMedium: "bg-blue-100",   textColor: "text-blue-600",   borderHover: "hover:border-blue-300",   topics: 9  },
];

const scienceChapters: Chapter[] = [
  { name: "Light & Reflection",  materials: 12, iconColor: "text-amber-500",   iconBg: "bg-amber-50"   },
  { name: "Chemical Reactions",   materials: 8,  iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
  { name: "Force & Motion",      materials: 10, iconColor: "text-blue-500",    iconBg: "bg-blue-50"    },
  { name: "Sound",               materials: 6,  iconColor: "text-violet-500",  iconBg: "bg-violet-50"  },
  { name: "Electricity",         materials: 9,  iconColor: "text-rose-500",    iconBg: "bg-rose-50"    },
];

const chapterMaterials: Material[] = [
  { category: "Chapter Notes",           title: "Complete Chapter Notes",               description: "Detailed notes covering all concepts",      pages: 12,              thumbType: "blue"   },
  { category: "PDF Document",            title: "NCERT Solutions - Light & Reflection",  description: "All exercise questions solved",              pages: 18, fileSize: "2.4 MB", thumbType: "photo" },
  { category: "Previous Year Questions", title: "Previous Year Questions (2020-2024)",   description: "Solved PYQs from board exams",               pages: 8,               thumbType: "orange" },
  { category: "Quick Summary",           title: "Quick Revision Summary",               description: "One-page concept summary",                   pages: 1,               thumbType: "green"  },
  { category: "Video Lecture",           title: "Video Lecture - Laws of Reflection",   description: "Animated explanation with examples",         duration: "12:45",      thumbType: "video"  },
];

const filterOptions = ["All", "Chapter", "PDF", "Previous", "Video", "Quick"];

const categoryColors: Record<MaterialCategory, { bg: string; text: string }> = {
  "Chapter Notes":           { bg: "bg-blue-100",   text: "text-blue-700"   },
  "PDF Document":            { bg: "bg-red-100",    text: "text-red-700"    },
  "Previous Year Questions": { bg: "bg-orange-100",  text: "text-orange-700" },
  "Quick Summary":           { bg: "bg-green-100",  text: "text-green-700"  },
  "Video Lecture":           { bg: "bg-purple-100",  text: "text-purple-700" },
};

/* ─── Component ─── */
export default function StudyHubPage() {
  const [step, setStep] = useState<Step>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  /* ─── Animations ─── */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("sh-anim")) return;
    const s = document.createElement("style");
    s.id = "sh-anim";
    s.textContent = `
      @keyframes shFadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      .sh-fade { animation: shFadeUp .5s ease-out both }
      .sh-d1 { animation-delay:.05s } .sh-d2 { animation-delay:.1s } .sh-d3 { animation-delay:.15s }
      .sh-d4 { animation-delay:.2s } .sh-d5 { animation-delay:.25s } .sh-d6 { animation-delay:.3s }
      .sh-d7 { animation-delay:.35s } .sh-d8 { animation-delay:.4s } .sh-d9 { animation-delay:.45s }
      .sh-d10 { animation-delay:.5s } .sh-d11 { animation-delay:.55s } .sh-d12 { animation-delay:.6s }
    `;
    document.head.appendChild(s);
  }, []);

  /* ─── Filtering ─── */
  const filteredMaterials = chapterMaterials.filter((m) => {
    const matchesSearch =
      searchQuery === "" ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Chapter" && m.category === "Chapter Notes") ||
      (activeFilter === "PDF" && m.category === "PDF Document") ||
      (activeFilter === "Previous" && m.category === "Previous Year Questions") ||
      (activeFilter === "Video" && m.category === "Video Lecture") ||
      (activeFilter === "Quick" && m.category === "Quick Summary");

    return matchesSearch && matchesFilter;
  });

  /* ─── Thumbnail renderer ─── */
  const renderThumb = (m: Material) => {
    switch (m.thumbType) {
      case "blue":
        return (
          <div className="h-[160px] rounded-xl bg-[#eff6ff] flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-blue-400" />
          </div>
        );
      case "photo":
        return (
          <div className="h-[160px] rounded-xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
        );
      case "orange":
        return (
          <div className="h-[160px] rounded-xl bg-[#fff7ed] flex items-center justify-center">
            <ClipboardList className="w-12 h-12 text-orange-400" />
          </div>
        );
      case "green":
        return (
          <div className="h-[160px] rounded-xl bg-[#ecfdf5] flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-green-400" />
          </div>
        );
      case "video":
        return (
          <div className="h-[160px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Play className="w-7 h-7 text-white fill-white" />
            </div>
            <span
              className="absolute bottom-3 right-3 bg-black/70 text-white text-[12px] px-2 py-0.5 rounded-md"
              style={bFont}
            >
              {m.duration}
            </span>
          </div>
        );
    }
  };

  /* ═══════════════════ STEP 1: Subject Selector ═══════════════════ */
  if (step === "subjects") {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to home
          </Link>

          <h1 className="text-[36px] text-[#0f172a] mb-3 sh-fade sh-d1" style={dFont}>
            Study Hub — Select Subject
          </h1>
          <p className="text-[18px] text-[#64748b] mb-10 sh-fade sh-d2" style={bFont}>
            Access notes, PDFs, and study materials
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <button
                key={subject.name}
                onClick={() => {
                  setSelectedSubject(subject);
                  setStep("topics");
                }}
                className={`group flex flex-col items-center justify-center h-[220px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 ${subject.borderHover} cursor-pointer sh-fade sh-d${i + 3}`}
              >
                <div
                  className={`w-[72px] h-[72px] rounded-2xl ${subject.bgMedium} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}
                >
                  <span className={subject.textColor}>{subject.icon}</span>
                </div>
                <span className="text-[20px] text-[#0f172a]" style={dFont}>
                  {subject.name}
                </span>
                <span className="text-[15px] text-[#94a3b8] mt-1" style={bFont}>
                  {subject.topics} topics
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════ STEP 2: Topic/Chapter Selector ═══════════════════ */
  if (step === "topics" && selectedSubject) {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <button
            onClick={() => setStep("subjects")}
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade cursor-pointer"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to subjects
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-3 sh-fade sh-d1">
            <div className={`w-14 h-14 rounded-2xl ${selectedSubject.bgMedium} flex items-center justify-center`}>
              <span className={selectedSubject.textColor}>{selectedSubject.icon}</span>
            </div>
            <h1 className="text-[32px] text-[#0f172a]" style={dFont}>
              {selectedSubject.name}
            </h1>
          </div>
          <p className="text-[18px] text-[#64748b] mb-10 sh-fade sh-d2" style={bFont}>
            Pick a chapter to explore materials
          </p>

          {/* Chapter cards */}
          <div className="flex flex-col gap-4">
            {scienceChapters.map((chapter, i) => (
              <button
                key={chapter.name}
                onClick={() => {
                  setSelectedChapter(chapter);
                  setActiveFilter("All");
                  setSearchQuery("");
                  setStep("materials");
                }}
                className={`group flex items-center justify-between bg-white border-2 border-[#e5e7eb] rounded-2xl px-6 py-5 hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-200 cursor-pointer text-left sh-fade sh-d${i + 3}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${chapter.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Atom className={`w-6 h-6 ${chapter.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-[18px] text-[#0f172a] mb-0.5" style={dFont}>
                      {chapter.name}
                    </h3>
                    <span className="text-[14px] text-[#94a3b8]" style={bFont}>
                      {chapter.materials} materials
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════ STEP 3: Materials Library ═══════════════════ */
  if (step === "materials" && selectedSubject && selectedChapter) {
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Back button */}
          <button
            onClick={() => setStep("topics")}
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade cursor-pointer"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to chapters
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-2 sh-fade sh-d1">
            <div className={`w-12 h-12 rounded-2xl ${selectedSubject.bgMedium} flex items-center justify-center`}>
              <span className={selectedSubject.textColor}>
                <Atom size={24} />
              </span>
            </div>
            <div>
              <span className="text-[14px] text-[#64748b] block" style={bFont}>
                {selectedSubject.name}
              </span>
              <h1 className="text-[28px] text-[#0f172a] leading-tight" style={dFont}>
                {selectedChapter.name}
              </h1>
            </div>
          </div>
          <p className="text-[16px] text-[#64748b] mb-8 sh-fade sh-d2" style={bFont}>
            Laws of reflection, mirrors, and light behavior
          </p>

          {/* Search bar */}
          <div className="relative mb-5 sh-fade sh-d3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials..."
              className="w-full bg-white border border-[#e5e7eb] rounded-xl h-12 pl-12 pr-4 text-[15px] focus:border-[#10b981] focus:outline-none transition-colors"
              style={bFont}
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8 sh-fade sh-d4">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-[14px] border transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-[#10b981] text-white border-[#10b981]"
                    : "bg-white text-[#374151] border-[#e5e7eb] hover:border-gray-300"
                }`}
                style={dFont}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Material cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMaterials.map((material, i) => {
              const cc = categoryColors[material.category];
              return (
                <div
                  key={material.title}
                  className={`bg-white border-2 border-[#e5e7eb] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-200 sh-fade sh-d${i + 5}`}
                >
                  {/* Thumbnail */}
                  <div className="p-3 pb-0">
                    {renderThumb(material)}
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-3">
                    {/* Category badge */}
                    <span
                      className={`inline-block ${cc.bg} ${cc.text} text-[12px] px-3 py-1 rounded-full mb-3`}
                      style={dFont}
                    >
                      {material.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-[16px] text-[#0f172a] mb-1" style={dFont}>
                      {material.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] text-[#6b7280] mb-3" style={bFont}>
                      {material.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-[13px] text-[#9ca3af] mb-4" style={bFont}>
                      {material.pages !== undefined && (
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {material.pages} {material.pages === 1 ? "page" : "pages"}
                        </span>
                      )}
                      {material.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {material.duration}
                        </span>
                      )}
                      {material.fileSize && (
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {material.fileSize}
                        </span>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedMaterial(material);
                          setStep("viewer");
                        }}
                        className="flex-1 bg-[#10b981] text-white text-[14px] py-3 rounded-xl hover:bg-[#059669] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        style={dFont}
                      >
                        {material.category === "Video Lecture" ? "Watch" : "View"}
                      </button>
                      <button
                        className="w-12 h-12 flex items-center justify-center border-2 border-[#e5e7eb] rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                      >
                        <Download className="w-5 h-5 text-[#6b7280]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════ STEP 4: Viewer (dynamic by type) ═══════════════════ */
  if (step === "viewer" && selectedSubject && selectedChapter && selectedMaterial) {
    const cc = categoryColors[selectedMaterial.category];
    const cat = selectedMaterial.category;

    const renderContent = () => {
      /* ── Chapter Notes ── */
      if (cat === "Chapter Notes") return (
        <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 sh-fade sh-d2">
          <p className="text-[18px] text-[#9ca3af] italic mb-4" style={bFont}>Light &amp; Reflection - Complete Notes</p>
          <hr className="border-[#e5e7eb] mb-8" />
          {[
            { title: "1. Introduction to Light", body: "Light is a form of energy that enables us to see objects around us. It travels in straight lines and exhibits both wave and particle properties." },
            { title: "2. Properties of Light", terms: [["Rectilinear Propagation", "Light travels in straight lines"], ["Reflection", "Bouncing back of light when it strikes a surface"], ["Refraction", "Bending of light when it passes from one medium to another"], ["Speed", "Light travels at 3 \u00d7 10\u2078 m/s in vacuum"]] },
          ].map((s, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>{s.title}</h2>
              {s.body && <p className="text-[15px] text-[#374151] leading-relaxed" style={bFont}>{s.body}</p>}
              {s.terms && <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>{s.terms.map(([t, d]) => <p key={t}><span style={dFont}>{t}:</span> {d}</p>)}</div>}
            </div>
          ))}
          <div className="mb-8">
            <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>3. Laws of Reflection</h2>
            <p className="text-[15px] text-[#374151] leading-relaxed mb-3" style={bFont}><span style={dFont}>First Law:</span> The incident ray, reflected ray, and normal all lie in the same plane.</p>
            <p className="text-[15px] text-[#374151] leading-relaxed mb-4" style={bFont}><span style={dFont}>Second Law:</span> The angle of incidence equals the angle of reflection.</p>
            <div className="border-l-4 border-blue-500 bg-[#eff6ff] rounded-xl py-3 px-6"><div className="bg-[#1e40af] text-white text-center py-2 px-4 rounded-lg text-[16px]" style={dFont}>&ang;i = &ang;r</div></div>
          </div>
          <div className="mb-8">
            <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>4. Mirror Formula</h2>
            <div className="border-l-4 border-blue-500 bg-[#eff6ff] rounded-xl py-3 px-6 mb-4"><div className="bg-[#1e40af] text-white text-center py-2 px-4 rounded-lg text-[16px]" style={dFont}>1/f = 1/v + 1/u</div></div>
            <div className="text-[15px] text-[#374151] leading-relaxed ml-4" style={bFont}><p>f = focal length</p><p>v = image distance</p><p>u = object distance</p></div>
          </div>
          <div>
            <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>5. Types of Mirrors</h2>
            <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>
              <p><span style={dFont}>Plane Mirror:</span> Flat reflecting surface, produces virtual, erect, same-size images.</p>
              <p><span style={dFont}>Concave Mirror:</span> Curved inward, converges light. Used in torches, headlights.</p>
              <p><span style={dFont}>Convex Mirror:</span> Curved outward, diverges light. Used as rear-view mirrors.</p>
            </div>
          </div>
        </div>
      );

      /* ── PDF Document (NCERT Solutions) ── */
      if (cat === "PDF Document") return (
        <div className="sh-fade sh-d2 space-y-6">
          {/* PDF toolbar */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-[#374151]" style={bFont}>Page 1 of 18</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 cursor-pointer text-[#6b7280]" style={dFont}>&larr;</button>
                <button className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 cursor-pointer text-[#6b7280]" style={dFont}>&rarr;</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-[13px] text-[#6b7280] hover:bg-gray-50 cursor-pointer" style={dFont}>100%</button>
              <button className="px-3 py-1.5 rounded-lg bg-[#10b981] text-white text-[13px] hover:bg-[#059669] cursor-pointer flex items-center gap-1.5" style={dFont}><Download size={14} /> Download</button>
            </div>
          </div>
          {/* PDF pages */}
          {[1, 2, 3].map(pg => (
            <div key={pg} className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-10 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-[11px] text-[#94a3b8] uppercase tracking-wider mb-2" style={bFont}>NCERT Solutions — Light &amp; Reflection</p>
                <h3 className="text-[16px] text-[#0f172a] mb-1" style={dFont}>Exercise {pg}.{pg}</h3>
              </div>
              {[1, 2, 3].map(q => (
                <div key={q} className="mb-6 last:mb-0">
                  <p className="text-[14px] text-[#0f172a] mb-2" style={dFont}>Q{(pg - 1) * 3 + q}. {["Define the term reflection of light.", "State the laws of reflection.", "What is the difference between regular and diffuse reflection?", "A concave mirror produces three times magnified real image. If the object distance is 20 cm, find the image distance.", "Draw a ray diagram to show image formation by a convex mirror.", "What is the focal length of a plane mirror?", "Explain why a convex mirror is used as a rear-view mirror.", "Name the type of mirror used in solar furnaces.", "An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. Find the position of the image."][((pg - 1) * 3 + q - 1) % 9]}</p>
                  <div className="border-l-3 border-[#10b981] bg-[#f0fdf4] rounded-lg p-4 ml-4">
                    <p className="text-[11px] text-[#10b981] uppercase tracking-wider mb-1" style={dFont}>Answer</p>
                    <p className="text-[13px] text-[#374151] leading-relaxed" style={bFont}>
                      {["Reflection is the phenomenon of bouncing back of light when it strikes a polished surface. The light ray that falls on the surface is called the incident ray, and the ray that bounces back is called the reflected ray.", "The two laws of reflection are: (i) The angle of incidence is equal to the angle of reflection. (ii) The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane.", "Regular reflection occurs when light reflects off a smooth, polished surface like a mirror — all reflected rays are parallel. Diffuse reflection occurs on rough surfaces where reflected rays scatter in different directions.", "Given: m = -3, u = -20 cm. Using m = -v/u, we get -3 = -v/(-20), so v = -60 cm. The image is formed at 60 cm in front of the mirror.", "For a convex mirror, the image is always virtual, erect, and smaller than the object regardless of the object position. Ray diagrams show parallel rays diverging after reflection, appearing to come from behind the mirror.", "A plane mirror has a focal length of infinity (\u221e) because its radius of curvature is infinite. Parallel rays remain parallel after reflection.", "A convex mirror always forms a virtual, erect, and diminished image. It provides a wider field of view compared to a plane mirror of the same size, allowing drivers to see a larger area behind them.", "Concave mirrors are used in solar furnaces because they converge sunlight to a single point (focus), generating very high temperatures that can be used to heat substances.", "Given: u = -10 cm, f = +15 cm. Using 1/v = 1/f - 1/u = 1/15 - 1/(-10) = 1/15 + 1/10 = 5/30 = 1/6. So v = +6 cm. The image is virtual and formed 6 cm behind the mirror."][((pg - 1) * 3 + q - 1) % 9]}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center mt-6"><span className="text-[12px] text-[#94a3b8]" style={bFont}>Page {pg}</span></div>
            </div>
          ))}
        </div>
      );

      /* ── Previous Year Questions (Solved) ── */
      if (cat === "Previous Year Questions") return (
        <div className="sh-fade sh-d2 space-y-6">
          {["2024", "2023", "2022", "2021"].map((year, yi) => (
            <div key={year} className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[13px]" style={dFont}>{year} Board Exam</span>
                <span className="text-[13px] text-[#94a3b8]" style={bFont}>CBSE Class 10 — Science</span>
              </div>
              {[
                { q: "What is meant by the power of a lens? Define its SI unit.", marks: 2 },
                { q: "Draw a ray diagram to show the formation of image by a concave mirror when the object is placed between the pole and focus.", marks: 3 },
                { q: "A student performs an experiment with a concave mirror. The focal length is 15 cm. Where should the object be placed to get a real, inverted image of the same size?", marks: 3 },
              ].map((item, qi) => (
                <div key={qi} className="mb-6 last:mb-0">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[14px] text-[#0f172a] flex-1" style={dFont}>Q{yi * 3 + qi + 1}. {item.q}</p>
                    <span className="text-[12px] text-[#94a3b8] bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0 ml-3" style={bFont}>{item.marks} marks</span>
                  </div>
                  <div className="border-l-3 border-orange-400 bg-[#fff7ed] rounded-lg p-4 ml-4">
                    <p className="text-[11px] text-orange-600 uppercase tracking-wider mb-1" style={dFont}>Model Answer</p>
                    <p className="text-[13px] text-[#374151] leading-relaxed" style={bFont}>
                      {["The power of a lens is the degree of convergence or divergence of light rays achieved by a lens. It is defined as the reciprocal of the focal length in metres. SI unit: Dioptre (D). P = 1/f.", "When an object is placed between the pole (P) and focus (F) of a concave mirror, a virtual, erect, and magnified image is formed behind the mirror. The ray parallel to principal axis reflects through F, and the ray directed towards C reflects back along the same path.", "For a real, inverted image of the same size, the object must be placed at the center of curvature (C). Since f = 15 cm, R = 2f = 30 cm. The object should be placed at 30 cm from the mirror."][qi]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );

      /* ── Quick Summary ── */
      if (cat === "Quick Summary") return (
        <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 sh-fade sh-d2">
          <div className="text-center mb-8">
            <span className="text-[40px]">⚡</span>
            <h3 className="text-[20px] text-[#0f172a] mt-2 mb-1" style={dFont}>Quick Revision — Light &amp; Reflection</h3>
            <p className="text-[14px] text-[#94a3b8]" style={bFont}>One-page summary for last-minute revision</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Key Formulas", icon: "📐", items: ["\u2220i = \u2220r (Law of Reflection)", "1/f = 1/v + 1/u (Mirror Formula)", "m = -v/u (Magnification)", "R = 2f (Radius = 2 \u00d7 Focal Length)"], color: "border-blue-200 bg-blue-50/50" },
              { title: "Mirror Types", icon: "🪞", items: ["Plane → Virtual, same size, laterally inverted", "Concave → Real/Virtual, converging", "Convex → Virtual, erect, diminished"], color: "border-purple-200 bg-purple-50/50" },
              { title: "Sign Convention", icon: "±", items: ["Distances measured from pole", "Along incident light → positive", "Against incident light → negative", "Above principal axis → positive"], color: "border-green-200 bg-green-50/50" },
              { title: "Applications", icon: "💡", items: ["Concave → Torches, headlights, solar furnace", "Convex → Rear-view mirrors, ATM security", "Plane → Periscopes, kaleidoscopes"], color: "border-amber-200 bg-amber-50/50" },
            ].map((card) => (
              <div key={card.title} className={`border-2 ${card.color} rounded-xl p-5`}>
                <h4 className="text-[15px] text-[#0f172a] mb-3 flex items-center gap-2" style={dFont}><span>{card.icon}</span> {card.title}</h4>
                <ul className="flex flex-col gap-2">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#374151] leading-relaxed" style={bFont}>
                      <span className="text-[#10b981] mt-0.5 flex-shrink-0">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

      /* ── Video Lecture ── */
      if (cat === "Video Lecture") return (
        <div className="sh-fade sh-d2 space-y-6">
          {/* Video player */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 hover:bg-white/30 transition-colors cursor-pointer hover:scale-110">
                <Play size={36} className="text-white ml-1" />
              </div>
              <p className="text-white/60 text-[14px]" style={bFont}>Laws of Reflection — Animated Explanation</p>
              <p className="text-white/40 text-[12px] mt-1" style={bFont}>Duration: 12:45</p>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"><div className="h-full bg-[#10b981] w-[35%]" /></div>
          </div>
          {/* Video info */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6">
            <h3 className="text-[18px] text-[#0f172a] mb-2" style={dFont}>Video Lecture — Laws of Reflection</h3>
            <p className="text-[14px] text-[#64748b] mb-4" style={bFont}>Animated explanation with real-world examples. Covers all key concepts for board exam preparation.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Laws of Reflection", "Mirror Types", "Ray Diagrams", "Applications"].map(tag => (
                <span key={tag} className="bg-purple-50 text-purple-600 text-[12px] px-3 py-1 rounded-full" style={bFont}>{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[13px] text-[#94a3b8]" style={bFont}>
              <span className="flex items-center gap-1"><Clock size={14} /> 12:45 mins</span>
              <span className="flex items-center gap-1"><Eye size={14} /> 2.3k views</span>
            </div>
          </div>
          {/* Chapters/timestamps */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6">
            <h4 className="text-[15px] text-[#0f172a] mb-4" style={dFont}>Chapters</h4>
            {[
              { time: "0:00", title: "Introduction", active: true },
              { time: "1:30", title: "What is Reflection?" },
              { time: "3:45", title: "Laws of Reflection" },
              { time: "6:10", title: "Types of Mirrors" },
              { time: "8:30", title: "Ray Diagrams" },
              { time: "10:50", title: "Applications & Summary" },
            ].map((ch) => (
              <button key={ch.time} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${ch.active ? "bg-[#10b981]/10 border border-[#10b981]/30" : "hover:bg-gray-50"}`}>
                <span className={`text-[13px] tabular-nums flex-shrink-0 ${ch.active ? "text-[#10b981]" : "text-[#94a3b8]"}`} style={dFont}>{ch.time}</span>
                <span className={`text-[14px] ${ch.active ? "text-[#10b981]" : "text-[#374151]"}`} style={bFont}>{ch.title}</span>
                {ch.active && <span className="ml-auto text-[11px] text-[#10b981]" style={dFont}>Now Playing</span>}
              </button>
            ))}
          </div>
        </div>
      );

      return null;
    };

    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button onClick={() => setStep("materials")} className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade cursor-pointer" style={dFont}>
            <ArrowLeft size={20} /> Back to materials
          </button>

          <div className="sh-fade sh-d1 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={`${cc.bg} ${cc.text} text-[12px] px-3 py-1 rounded-full`} style={dFont}>{selectedMaterial.category}</span>
              <span className="text-[14px] text-[#9ca3af]" style={bFont}>{selectedSubject.name} / {selectedChapter.name}</span>
            </div>
            <h1 className="text-[28px] text-[#0f172a] mb-2" style={dFont}>{selectedMaterial.title}</h1>
            <p className="text-[16px] text-[#64748b]" style={bFont}>{selectedMaterial.description}</p>
          </div>

          {renderContent()}
        </div>
      </div>
    );
  }

  /* ─── Fallback ─── */
  return null;
}
