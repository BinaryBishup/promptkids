"use client";

import { useRouter } from "next/navigation";
import {
  Atom,
  Calculator,
  BookOpen,
  PenTool,
  Leaf,
  Magnet,
  X,
} from "lucide-react";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

const subjectData = [
  { name: "Science", icon: Atom, color: "text-cyan-600", bgMedium: "bg-cyan-100", borderHover: "hover:border-cyan-400" },
  { name: "Maths", icon: Calculator, color: "text-purple-600", bgMedium: "bg-purple-100", borderHover: "hover:border-purple-400" },
  { name: "History", icon: BookOpen, color: "text-orange-600", bgMedium: "bg-orange-100", borderHover: "hover:border-orange-400" },
  { name: "English", icon: PenTool, color: "text-green-600", bgMedium: "bg-green-100", borderHover: "hover:border-green-400" },
  { name: "Biology", icon: Leaf, color: "text-pink-600", bgMedium: "bg-pink-100", borderHover: "hover:border-pink-400" },
  { name: "Physics", icon: Magnet, color: "text-blue-600", bgMedium: "bg-blue-100", borderHover: "hover:border-blue-400" },
];

interface SubjectPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolEmoji: string;
  /** URL pattern: /tool-name?subject=Science or custom handler */
  toolPath: string;
  /** If true, navigates to toolPath?subject=name. If false, calls onSelect */
  onSelect?: (subject: typeof subjectData[0]) => void;
}

export default function SubjectPickerModal({ isOpen, onClose, toolName, toolEmoji, toolPath, onSelect }: SubjectPickerModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelect = (subject: typeof subjectData[0]) => {
    if (onSelect) {
      onSelect(subject);
    } else {
      router.push(`${toolPath}?subject=${encodeURIComponent(subject.name)}`);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
          style={{ animation: "shFadeUp 0.3s ease-out", fontFamily: "var(--font-body)", fontWeight: 500 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-7 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-[28px]">{toolEmoji}</span>
              <div>
                <h2 className="text-[22px] text-[#0f172a]" style={dFont}>{toolName}</h2>
                <p className="text-[14px] text-[#94a3b8]" style={bFont}>Select a subject to continue</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <X size={18} className="text-[#6b7280]" />
            </button>
          </div>

          {/* Subject grid */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {subjectData.map((subject) => {
                const Icon = subject.icon;
                return (
                  <button
                    key={subject.name}
                    onClick={() => handleSelect(subject)}
                    className={`group flex flex-col items-center justify-center h-[140px] bg-white border-2 border-[#e5e7eb] rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${subject.borderHover} cursor-pointer`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${subject.bgMedium} flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110`}>
                      <Icon size={28} className={subject.color} />
                    </div>
                    <span className="text-[16px] text-[#0f172a]" style={dFont}>{subject.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframe (injected inline) */}
      <style>{`
        @keyframes shFadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </>
  );
}

export { subjectData };
