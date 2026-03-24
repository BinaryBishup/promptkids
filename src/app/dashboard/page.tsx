"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  TrendingDown,
  Trophy,
  Clock,
  Calendar,
  Star,
  Lightbulb,
  Video,
  Sparkles as SparklesIcon,
  Flame,
  Target,
  AlarmClock,
  ChevronRight,
  Sparkles,
  ClipboardList,
  CalendarDays,
  Award,
  Library,
  Settings,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import SubjectPickerModal from "@/components/SubjectPicker";

export default function DashboardPage() {
  const [streakDays] = useState(7);
  const [goalsCompleted] = useState(3);
  const [goalTotal] = useState(5);
  const [xpPoints] = useState(340);
  const [level] = useState(7);
  const [challengeProgress] = useState(2);
  const [challengeTotal] = useState(3);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTool, setPickerTool] = useState({ name: "", emoji: "", path: "" });

  const openPicker = (name: string, emoji: string, path: string) => {
    setPickerTool({ name, emoji, path });
    setPickerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
      {/* Entrance animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 255, 0.2); }
          50% { box-shadow: 0 0 0 8px rgba(37, 99, 255, 0); }
        }
        .anim-fade-up { animation: fadeInUp 0.6s ease-out both; }
        .anim-fade-right { animation: fadeInRight 0.5s ease-out both; }
        .anim-scale { animation: scaleIn 0.5s ease-out both; }
        .anim-slide-down { animation: slideDown 0.4s ease-out both; }
        .anim-count { animation: countUp 0.5s ease-out both; }
      `}</style>

      {/* TOP NAV BAR */}
      <AppHeader />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* LEFT MAIN AREA */}
        <main className="flex-1 p-6 lg:p-10 space-y-8 lg:space-y-10">
          {/* Welcome Banner */}
          <div className="anim-fade-up relative bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-2xl h-auto min-h-[180px] p-7 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-hidden">
            <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-3">
              <h1 className="text-white font-extrabold text-[26px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Welcome back, Arjun! 👋</h1>
              <p className="text-white/90 text-[15px] font-medium" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Ready to learn something new today?</p>
              <div className="flex flex-wrap gap-2.5 mt-1">
                <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-[14px] cursor-pointer hover:bg-white/30 transition-colors duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  <Flame className="w-[18px] h-[18px]" /> {streakDays} day streak
                </span>
                <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-[14px] cursor-pointer hover:bg-white/30 transition-colors duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  <Target className="w-[18px] h-[18px]" /> {goalsCompleted}/{goalTotal} goals today
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center mt-4 sm:mt-0">
              <span className="text-white/80 text-sm font-semibold" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Level <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>{level}</span></span>
              <span className="text-white font-black text-[52px] leading-none mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>{xpPoints}</span>
              <span className="text-white/80 text-sm font-medium mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>XP Points</span>
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 anim-fade-up" style={{ animationDelay: "0.1s" }}>
            {[
              { icon: CalendarDays, label: "My Schedule", color: "text-[#2563eb]", bg: "bg-[#eff6ff]", borderHover: "hover:border-[#2563eb]/40", shadowHover: "hover:shadow-blue-100", href: "/schedule" },
              { icon: Award, label: "Achievements", color: "text-[#7c3aed]", bg: "bg-[#faf5ff]", borderHover: "hover:border-[#7c3aed]/40", shadowHover: "hover:shadow-purple-100", href: "/achievements" },
              { icon: Library, label: "My Library", color: "text-[#10b981]", bg: "bg-[#ecfdf5]", borderHover: "hover:border-[#10b981]/40", shadowHover: "hover:shadow-emerald-100", href: "/study-hub" },
              { icon: Settings, label: "Settings", color: "text-[#6b7280]", bg: "bg-gray-50", borderHover: "hover:border-gray-300", shadowHover: "hover:shadow-gray-100", href: "/settings" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className={`flex items-center gap-3 bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl px-5 py-4 ${item.borderHover} hover:shadow-lg ${item.shadowHover} hover:-translate-y-0.5 transition-all duration-200 no-underline cursor-pointer`}>
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-[14px] text-[#374151]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Today's Events */}
          <div className="anim-fade-up" style={{ animationDelay: "0.15s" }}>
            <h3 className="text-[16px] text-[#0f172a] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
              <span className="text-[18px]">📋</span> Today&apos;s Events
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {/* Live Class */}
              <div className="flex items-center gap-3 bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#0f172a] truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Physics Class</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                  </div>
                  <span className="text-[11px] text-red-600" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Live now • 2:00 PM</span>
                </div>
              </div>

              {/* Due Homework */}
              <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-3.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-[#0f172a] block truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Science HW Due</span>
                  <span className="text-[11px] text-amber-600" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Due in 2 hours</span>
                </div>
              </div>

              {/* Today's Homework */}
              <div className="flex items-center gap-3 bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-3.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-[#0f172a] block truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Maths Assignment</span>
                  <span className="text-[11px] text-blue-600" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>New • Assigned today</span>
                </div>
              </div>

              {/* Upcoming Test */}
              <div className="flex items-center gap-3 bg-purple-50 border-2 border-purple-200 rounded-2xl px-4 py-3.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-[#0f172a] block truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Science Mid-term</span>
                  <span className="text-[11px] text-purple-600" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>In 5 days • Mar 28</span>
                </div>
              </div>
            </div>
          </div>

          {/* Choose Your Learning Tool */}
          <div>
            <h2 className="font-extrabold text-[22px] text-[#0f172a] mb-6 anim-fade-up" style={{ animationDelay: "0.25s", fontFamily: 'var(--font-display)', fontWeight: 900 }}>Choose Your Learning Tool</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { name: "Live Classes", emoji: "🎥", path: "/live-classes", icon: Video, color: "#ef4444", bg: "bg-red-50", bgHover: "group-hover:bg-red-100", borderHover: "hover:border-[#ef4444]/40", shadowHover: "hover:shadow-red-100/60", delay: "0.3s", desc: "Join live sessions & watch recordings" },
                { name: "Study Buddy", emoji: "📚", path: "/study-buddy", icon: BookOpen, color: "#2563eb", bg: "bg-[#eff6ff]", bgHover: "group-hover:bg-[#dbeafe]", borderHover: "hover:border-[#2563eb]/40", shadowHover: "hover:shadow-blue-100/60", delay: "0.35s", desc: "Get guided help with homework" },
                { name: "Concept Master", emoji: "🧠", path: "/concept-master", icon: Brain, color: "#7c3aed", bg: "bg-[#faf5ff]", bgHover: "group-hover:bg-[#f3e8ff]", borderHover: "hover:border-[#7c3aed]/40", shadowHover: "hover:shadow-purple-100/60", delay: "0.4s", desc: "Learn new topics with AI tutor" },
                { name: "Practice Arena", emoji: "🏆", path: "/practice-arena", icon: Trophy, color: "#f59e0b", bg: "bg-[#fffbeb]", bgHover: "group-hover:bg-[#fef3c6]", borderHover: "hover:border-[#f59e0b]/40", shadowHover: "hover:shadow-amber-100/60", delay: "0.45s", desc: "Practice with various question types" },
                { name: "Study Hub", emoji: "📖", path: "/study-hub", icon: ClipboardList, color: "#10b981", bg: "bg-[#ecfdf5]", bgHover: "group-hover:bg-[#d1fae5]", borderHover: "hover:border-[#10b981]/40", shadowHover: "hover:shadow-emerald-100/60", delay: "0.5s", desc: "Notes, PDFs & previous year papers" },
                { name: "Explore Lab", emoji: "✨", path: "#", icon: SparklesIcon, color: "#ec4899", bg: "bg-pink-50", bgHover: "group-hover:bg-pink-100", borderHover: "hover:border-[#ec4899]/40", shadowHover: "hover:shadow-pink-100/60", delay: "0.55s", desc: "Interactive gamified learning" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  onClick={() => openPicker(tool.name, tool.emoji, tool.path)}
                  className={`anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-8 flex flex-col gap-4 cursor-pointer ${tool.borderHover} hover:shadow-xl ${tool.shadowHover} hover:-translate-y-1.5 transition-all duration-250`}
                  style={{ animationDelay: tool.delay }}
                >
                  <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.bgHover} group-hover:scale-110 transition-all duration-200`}>
                    <tool.icon className="w-8 h-8" style={{ color: tool.color }} />
                  </div>
                  <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>{tool.name}</h3>
                  <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{tool.desc}</p>
                  <span className="text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: tool.color }}>
                    Get started <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-[370px] flex-shrink-0 bg-white border-t-[2.5px] lg:border-t-0 lg:border-l-[2.5px] border-[#eef0f4] pt-8 pb-10 pl-6 pr-6 lg:pl-[28px] lg:pr-[32px] space-y-8">
          {/* Recent Activity */}
          <div className="anim-fade-right" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Clock className="w-[20px] h-[20px] text-[#6b7280]" />
              <h3 className="font-extrabold text-[17px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Recent Activity</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-[#eff6ff] border-[2px] border-[#dbeafe] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#dbeafe] hover:border-[#93c5fd] hover:scale-[1.02] transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Science homework</p>
                  <p className="text-[#9ca3af] text-[12px] font-medium mt-0.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Completed 2 hours ago</p>
                </div>
              </div>

              <div className="bg-[#faf5ff] border-[2px] border-[#f3e8ff] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#f3e8ff] hover:border-[#d8b4fe] hover:scale-[1.02] transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Mastered: Quadratic Equations</p>
                  <p className="text-[#9ca3af] text-[12px] font-medium mt-0.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Yesterday at 4:30 PM</p>
                </div>
              </div>

              <div className="bg-[#fffbeb] border-[2px] border-[#fef3c6] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#fef3c6] hover:border-[#fde68a] hover:scale-[1.02] transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Earned &quot;Quick Learner&quot; badge</p>
                  <p className="text-[#9ca3af] text-[12px] font-medium mt-0.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="anim-fade-right" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Calendar className="w-[20px] h-[20px] text-[#6b7280]" />
              <h3 className="font-extrabold text-[17px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Upcoming Exams</h3>
            </div>

            <div className="bg-gradient-to-r from-[#fef2f2] to-[#fff7ed] border-[2px] border-[#ffc9c9] rounded-2xl p-5 mb-3 hover:shadow-lg hover:shadow-red-100 hover:border-[#f87171] transition-all duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ffe2e2] flex items-center justify-center flex-shrink-0">
                  <AlarmClock className="w-7 h-7 text-[#e7000b]" />
                </div>
                <div>
                  <p className="font-extrabold text-[16px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Science Mid-term</p>
                  <p className="text-[#e7000b] text-[14px] font-bold mt-0.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>&#x23F0; in 5 days</p>
                  <p className="text-[#9ca3af] text-[12px] font-medium mt-0.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Chapters 1-4 &bull; 60 minutes</p>
                </div>
              </div>
              <button className="w-full bg-[#e7000b] text-white font-bold text-[14px] py-3 rounded-[14px] hover:bg-[#cc0009] hover:shadow-lg hover:shadow-red-200 active:scale-[0.97] transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                Start Practice Now
              </button>
            </div>

            <div className="bg-[#eff6ff] border-[2px] border-[#dbeafe] rounded-xl p-4 cursor-pointer hover:bg-[#dbeafe] hover:border-[#93c5fd] hover:scale-[1.02] transition-all duration-200">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[14px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Maths Quiz</p>
                <p className="text-[#2563eb] text-[14px] font-bold" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>in 12 days</p>
              </div>
              <p className="text-[#9ca3af] text-[12px] font-medium mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Algebra &amp; Geometry</p>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="anim-fade-right" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Star className="w-[20px] h-[20px] text-[#6b7280]" />
              <h3 className="font-extrabold text-[17px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Daily Challenge</h3>
            </div>

            <div className="bg-gradient-to-b from-[#fefce8] to-[#fffbeb] border-[2px] border-[#ffdf20] rounded-2xl p-6 flex flex-col items-center hover:shadow-lg hover:shadow-amber-100 hover:border-[#f59e0b] transition-all duration-200">
              <p className="text-[#f59e0b] font-black text-[40px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>+100 XP</p>
              <p className="text-[#6b7280] text-[14px] font-medium mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Complete 3 homework questions</p>

              <div className="bg-white rounded-xl p-4 w-full mt-4 border border-[#f3f4f6]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[#4b5563] text-[14px] font-medium" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Your Progress</span>
                  <span className="text-[#0f172a] font-extrabold text-[14px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>{challengeProgress}/{challengeTotal}</span>
                </div>
                <div className="w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f97316] to-[#ef4444] rounded-full transition-all duration-500"
                    style={{ width: `${(challengeProgress / challengeTotal) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-[#f97316] text-[14px] font-bold mt-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>&#x2728; Just 1 more to go!</p>
              <Link href="#" className="text-[#f59e0b] text-[13px] font-bold underline mt-2 hover:text-[#d97706] transition-colors" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                View all challenges &rarr;
              </Link>
            </div>
          </div>

          {/* Learning Tip */}
          <div className="anim-fade-right" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Lightbulb className="w-[20px] h-[20px] text-[#6b7280]" />
              <h3 className="font-extrabold text-[17px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Learning Tip</h3>
            </div>

            <div className="bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5] border-[2px] border-[#b9f8cf] rounded-2xl p-5 hover:shadow-lg hover:shadow-green-100 hover:border-[#86efac] transition-all duration-200">
              <p className="text-[#4b5563] text-[14px] font-medium leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                &ldquo;Try solving problems on your own first before using AI help. It builds stronger understanding!&rdquo;
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-7 h-7 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[#008236] font-bold text-[13px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>AI Learning Coach</span>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* Subject Picker Modal */}
      <SubjectPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        toolName={pickerTool.name}
        toolEmoji={pickerTool.emoji}
        toolPath={pickerTool.path}
      />
    </div>
  );
}
