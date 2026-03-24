"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  Calculator,
  BookOpen,
  PenTool,
  Leaf,
  Magnet,
  TrendingUp,
  Clock,
  Flame,
} from "lucide-react";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

const subjectData = [
  { name: "Science", icon: Atom, color: "text-cyan-600", bg: "bg-cyan-50", bgMedium: "bg-cyan-100", border: "border-cyan-200", borderHover: "hover:border-cyan-400", gradient: "from-cyan-500 to-teal-500", progress: 72, streak: 5, lastActive: "Today", topics: 12 },
  { name: "Maths", icon: Calculator, color: "text-purple-600", bg: "bg-purple-50", bgMedium: "bg-purple-100", border: "border-purple-200", borderHover: "hover:border-purple-400", gradient: "from-purple-500 to-violet-500", progress: 45, streak: 3, lastActive: "Yesterday", topics: 15 },
  { name: "History", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50", bgMedium: "bg-orange-100", border: "border-orange-200", borderHover: "hover:border-orange-400", gradient: "from-orange-500 to-amber-500", progress: 60, streak: 2, lastActive: "2 days ago", topics: 8 },
  { name: "English", icon: PenTool, color: "text-green-600", bg: "bg-green-50", bgMedium: "bg-green-100", border: "border-green-200", borderHover: "hover:border-green-400", gradient: "from-green-500 to-emerald-500", progress: 88, streak: 7, lastActive: "Today", topics: 10 },
  { name: "Biology", icon: Leaf, color: "text-pink-600", bg: "bg-pink-50", bgMedium: "bg-pink-100", border: "border-pink-200", borderHover: "hover:border-pink-400", gradient: "from-pink-500 to-rose-500", progress: 30, streak: 0, lastActive: "3 days ago", topics: 9 },
  { name: "Physics", icon: Magnet, color: "text-blue-600", bg: "bg-blue-50", bgMedium: "bg-blue-100", border: "border-blue-200", borderHover: "hover:border-blue-400", gradient: "from-blue-500 to-indigo-500", progress: 55, streak: 4, lastActive: "Yesterday", topics: 11 },
];

interface SubjectPickerProps {
  toolName: string;
  toolEmoji: string;
  subtitle: string;
  onSelect: (subject: typeof subjectData[0]) => void;
  animClass?: string;
}

export default function SubjectPicker({ toolName, toolEmoji, subtitle, onSelect, animClass = "sh-fade" }: SubjectPickerProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/dashboard" className={`inline-flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 transition-colors mb-10 ${animClass}`} style={dFont}>
          <ArrowLeft size={20} /> Back to home
        </Link>

        <div className={`flex items-center gap-4 mb-3 ${animClass}`}>
          <span className="text-[36px]">{toolEmoji}</span>
          <h1 className="text-[36px] text-[#0f172a]" style={dFont}>{toolName}</h1>
        </div>
        <p className={`text-[18px] text-[#64748b] mb-10 ${animClass}`} style={bFont}>{subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjectData.map((subject, i) => {
            const Icon = subject.icon;
            return (
              <button
                key={subject.name}
                onClick={() => onSelect(subject)}
                className={`group bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 text-left transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 ${subject.borderHover} cursor-pointer ${animClass}`}
                style={{ animationDelay: `${0.05 * (i + 3)}s` }}
              >
                {/* Top: icon + name + streak */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${subject.bgMedium} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
                    <Icon size={28} className={subject.color} />
                  </div>
                  {subject.streak > 0 && (
                    <span className="inline-flex items-center gap-1 text-[12px] text-orange-600 bg-orange-50 px-2 py-1 rounded-full" style={dFont}>
                      <Flame size={12} /> {subject.streak} day
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-[18px] text-[#0f172a] mb-1" style={dFont}>{subject.name}</h3>

                {/* Meta row */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[13px] text-[#94a3b8]" style={bFont}>{subject.topics} topics</span>
                  <span className="w-1 h-1 rounded-full bg-[#d1d5db]" />
                  <span className="flex items-center gap-1 text-[13px] text-[#94a3b8]" style={bFont}>
                    <Clock size={12} /> {subject.lastActive}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] text-[#94a3b8]" style={bFont}>Progress</span>
                    <span className="text-[12px] text-[#0f172a]" style={dFont}>{subject.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-700`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>

                {/* CTA hint */}
                <div className="flex items-center gap-1 mt-3 text-[13px] group-hover:gap-2 transition-all duration-200" style={dFont}>
                  <TrendingUp size={14} className={subject.color} />
                  <span className={subject.color}>Continue learning</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { subjectData };
export type { SubjectPickerProps };
