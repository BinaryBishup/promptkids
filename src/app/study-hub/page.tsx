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

  /* ═══════════════════ STEP 4: Document Viewer ═══════════════════ */
  if (step === "viewer" && selectedSubject && selectedChapter && selectedMaterial) {
    const cc = categoryColors[selectedMaterial.category];
    return (
      <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back button */}
          <button
            onClick={() => setStep("materials")}
            className="inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 sh-fade cursor-pointer"
            style={dFont}
          >
            <ArrowLeft size={20} /> Back to materials
          </button>

          {/* Header */}
          <div className="sh-fade sh-d1 mb-2">
            <div className="flex items-center gap-3 mb-3">
              <span className={`${cc.bg} ${cc.text} text-[12px] px-3 py-1 rounded-full`} style={dFont}>
                {selectedMaterial.category}
              </span>
              <span className="text-[14px] text-[#9ca3af]" style={bFont}>
                {selectedSubject.name} / {selectedChapter.name}
              </span>
            </div>
            <h1 className="text-[28px] text-[#0f172a] mb-2" style={dFont}>
              {selectedMaterial.title}
            </h1>
            <p className="text-[16px] text-[#64748b] mb-8" style={bFont}>
              {selectedMaterial.description}
            </p>
          </div>

          {/* White content card */}
          <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-8 sh-fade sh-d2">
            {/* Document title */}
            <p className="text-[18px] text-[#9ca3af] italic mb-4" style={bFont}>
              Light &amp; Reflection - Complete Notes
            </p>
            <hr className="border-[#e5e7eb] mb-8" />

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                1. Introduction to Light
              </h2>
              <p className="text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                Light is a form of energy that enables us to see objects. It is an electromagnetic wave that
                travels in straight lines. The study of light and its interaction with matter is called optics.
                Light can travel through vacuum and does not require a material medium for propagation.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                2. Properties of Light
              </h2>
              <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                <p>
                  <span style={dFont}>Rectilinear Propagation:</span> Light travels in straight lines. This
                  property is responsible for the formation of shadows.
                </p>
                <p>
                  <span style={dFont}>Reflection:</span> When light bounces off a surface, it is called
                  reflection. The angle of incidence equals the angle of reflection.
                </p>
                <p>
                  <span style={dFont}>Refraction:</span> The bending of light when it passes from one medium
                  to another of different optical density.
                </p>
                <p>
                  <span style={dFont}>Speed:</span> Light travels at approximately 3 x 10&#8312; m/s in vacuum,
                  making it the fastest known entity in the universe.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                3. Laws of Reflection
              </h2>
              <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                <p>
                  <span style={dFont}>First Law:</span> The incident ray, the reflected ray, and the normal
                  to the mirror at the point of incidence all lie in the same plane.
                </p>
                <p>
                  <span style={dFont}>Second Law:</span> The angle of incidence is always equal to the angle
                  of reflection.
                </p>
              </div>
              {/* Formula block */}
              <div className="mt-4 border-l-4 border-blue-500 bg-[#eff6ff] rounded-xl py-3 px-6">
                <div className="bg-[#1e40af] text-white text-center py-2 px-4 rounded-lg text-[16px]" style={dFont}>
                  &ang;i = &ang;r
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                4. Types of Mirrors
              </h2>
              <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                <p>
                  <span style={dFont}>Plane Mirror:</span> A flat, smooth reflecting surface that forms
                  virtual, erect images of the same size as the object. The image is laterally inverted.
                </p>
                <p>
                  <span style={dFont}>Concave Mirror:</span> A spherical mirror whose reflecting surface is
                  curved inward. It converges light and can form both real and virtual images depending on
                  the object position.
                </p>
                <p>
                  <span style={dFont}>Convex Mirror:</span> A spherical mirror whose reflecting surface is
                  curved outward. It always forms virtual, erect, and diminished images. Used as rear-view
                  mirrors in vehicles.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                5. Mirror Formula
              </h2>
              {/* Formula block */}
              <div className="border-l-4 border-blue-500 bg-[#eff6ff] rounded-xl py-3 px-6 mb-4">
                <div className="bg-[#1e40af] text-white text-center py-2 px-4 rounded-lg text-[16px]" style={dFont}>
                  1/f = 1/v + 1/u
                </div>
              </div>
              <div className="text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                <p className="mb-1"><span style={dFont}>Where:</span></p>
                <p className="ml-4">f = focal length of the mirror</p>
                <p className="ml-4">v = image distance from the mirror</p>
                <p className="ml-4">u = object distance from the mirror</p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                6. Important Terms
              </h2>
              <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                <p>
                  <span style={dFont}>Principal Axis:</span> The straight line passing through the pole and
                  the centre of curvature of the mirror.
                </p>
                <p>
                  <span style={dFont}>Focal Point:</span> The point on the principal axis where parallel rays
                  of light converge (concave) or appear to diverge from (convex) after reflection.
                </p>
                <p>
                  <span style={dFont}>Focal Length:</span> The distance between the pole and the focal point
                  of the mirror.
                </p>
                <p>
                  <span style={dFont}>Center of Curvature:</span> The center of the sphere of which the mirror
                  is a part. The radius of curvature is twice the focal length (R = 2f).
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                7. Ray Diagrams
              </h2>
              <p className="text-[15px] text-[#374151] mb-3 leading-relaxed" style={bFont}>
                To construct ray diagrams for spherical mirrors, use these three rules:
              </p>
              <ul className="flex flex-col gap-2 text-[15px] text-[#374151] leading-relaxed ml-4" style={bFont}>
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">&rarr;</span>
                  A ray parallel to the principal axis passes through (or appears to pass through) the focal point after reflection.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">&rarr;</span>
                  A ray passing through the focal point becomes parallel to the principal axis after reflection.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">&rarr;</span>
                  A ray passing through the centre of curvature retraces its path after reflection.
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-[18px] text-[#0f172a] mb-3" style={dFont}>
                8. Applications
              </h2>
              <div className="flex flex-col gap-3 text-[15px] text-[#374151] leading-relaxed" style={bFont}>
                <p>
                  <span style={dFont}>Concave Mirrors:</span> Used in torches, headlights, and solar
                  concentrators. Dentists use small concave mirrors to see enlarged images of teeth.
                </p>
                <p>
                  <span style={dFont}>Convex Mirrors:</span> Used as rear-view mirrors in vehicles because
                  they provide a wider field of view, allowing drivers to see more of the road behind them.
                </p>
                <p>
                  <span style={dFont}>Plane Mirrors:</span> Used in periscopes, kaleidoscopes, and dressing
                  tables. They produce same-size, laterally inverted images.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Fallback ─── */
  return null;
}
