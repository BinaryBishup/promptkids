"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  TrendingDown,
  Trophy,
  Bell,
  Clock,
  Calendar,
  Star,
  Lightbulb,
  Video,
  Sparkles as SparklesIcon,
  User,
  CalendarDays,
  Award,
  Library,
  Settings,
  LogOut,
  Flame,
  Target,
  AlarmClock,
  ChevronRight,
  Sparkles,
  ClipboardList,
} from "lucide-react";

export default function DashboardPage() {
  const [streakDays] = useState(7);
  const [goalsCompleted] = useState(3);
  const [goalTotal] = useState(5);
  const [xpPoints] = useState(340);
  const [level] = useState(7);
  const [challengeProgress] = useState(2);
  const [challengeTotal] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);

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
      <nav className="sticky top-0 z-50 bg-white border-b-[2.5px] border-[#eef0f4] h-[78px] flex items-center justify-between px-6 anim-slide-down">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center flex-shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 cursor-pointer" style={{ animation: "pulseGlow 3s ease-in-out infinite" }}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[#0f172a] text-lg leading-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>PromptKids</span>
            <span className="text-[#9ca3af] text-xs leading-tight font-medium" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>AI Learning Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
            <Bell className="w-[22px] h-[22px] text-[#6b7280]" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#f97316] rounded-full border-2 border-white" />
          </button>

          {/* User Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-gray-100 border-2 border-[#e5e7eb] flex items-center justify-center hover:border-[#7c3aed]/40 transition-all duration-200 cursor-pointer"
            >
              <User className="w-5 h-5 text-[#6b7280]" />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-14 w-[280px] bg-white rounded-2xl shadow-2xl border-2 border-[#e5e7eb] z-50 overflow-hidden">
                  {/* Profile header */}
                  <div className="px-6 pt-6 pb-4 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center mb-3">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-[16px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Arjun Sharma</p>
                    <p className="text-[13px] text-[#94a3b8]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Class 10 - Section A</p>
                  </div>

                  {/* Level + Badges */}
                  <div className="px-6 pb-4 flex gap-3">
                    <div className="flex-1 bg-[#2563eb]/8 rounded-xl px-3 py-2.5">
                      <p className="text-[16px] text-[#2563eb]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Level 7</p>
                      <p className="text-[12px] text-[#94a3b8]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>340 XP</p>
                    </div>
                    <div className="flex-1 bg-[#f59e0b]/8 rounded-xl px-3 py-2.5">
                      <p className="text-[16px] text-[#f59e0b]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>8</p>
                      <p className="text-[12px] text-[#94a3b8]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Badges</p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="border-t border-[#e5e7eb]">
                    {[
                      { icon: User, label: "My Profile" },
                      { icon: CalendarDays, label: "My Schedule" },
                      { icon: Award, label: "Achievements" },
                      { icon: Library, label: "My Library" },
                      { icon: Settings, label: "Settings" },
                    ].map((item) => (
                      <button key={item.label} className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-[18px] h-[18px] text-[#6b7280]" />
                          </div>
                          <span className="text-[14px] text-[#374151]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#d1d5db]" />
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-[#e5e7eb] p-4">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                      <LogOut className="w-4 h-4" />
                      <span className="text-[14px]">Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* LEFT MAIN AREA */}
        <main className="flex-1 p-6 lg:p-8 space-y-7">
          {/* Welcome Banner */}
          <div className="anim-fade-up relative bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-2xl h-auto min-h-[168px] p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-hidden">
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

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="anim-fade-up bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl h-[108px] flex items-center gap-4 px-5 cursor-pointer hover:border-[#2563eb]/40 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-200" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <p className="text-[#2563eb] font-black text-[28px] leading-none anim-count" style={{ animationDelay: "0.4s", fontFamily: 'var(--font-display)', fontWeight: 900 }}>5</p>
                <p className="text-[#6b7280] text-[13px] font-semibold mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Homework Done</p>
              </div>
            </div>

            <div className="anim-fade-up bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl h-[108px] flex items-center gap-4 px-5 cursor-pointer hover:border-[#7c3aed]/40 hover:shadow-lg hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-200" style={{ animationDelay: "0.15s" }}>
              <div className="w-12 h-12 rounded-xl bg-[#faf5ff] flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[#7c3aed]" />
              </div>
              <div>
                <p className="text-[#7c3aed] font-black text-[28px] leading-none anim-count" style={{ animationDelay: "0.45s", fontFamily: 'var(--font-display)', fontWeight: 900 }}>12</p>
                <p className="text-[#6b7280] text-[13px] font-semibold mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Concepts Learned</p>
              </div>
            </div>

            <div className="anim-fade-up bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl h-[108px] flex items-center gap-4 px-5 cursor-pointer hover:border-[#22c55e]/40 hover:shadow-lg hover:shadow-green-100 hover:-translate-y-1 transition-all duration-200" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-[#22c55e]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[#22c55e] font-black text-[28px] leading-none anim-count" style={{ animationDelay: "0.5s", fontFamily: 'var(--font-display)', fontWeight: 900 }}>28%</p>
                  <TrendingDown className="w-4 h-4 text-[#22c55e]" />
                </div>
                <p className="text-[#6b7280] text-[13px] font-semibold mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>AI Dependency</p>
              </div>
            </div>

            <div className="anim-fade-up bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl h-[108px] flex items-center gap-4 px-5 cursor-pointer hover:border-[#f59e0b]/40 hover:shadow-lg hover:shadow-amber-100 hover:-translate-y-1 transition-all duration-200" style={{ animationDelay: "0.25s" }}>
              <div className="w-12 h-12 rounded-xl bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-[#f59e0b] font-black text-[28px] leading-none anim-count" style={{ animationDelay: "0.55s", fontFamily: 'var(--font-display)', fontWeight: 900 }}>8</p>
                <p className="text-[#6b7280] text-[13px] font-semibold mt-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Badges Earned</p>
              </div>
            </div>
          </div>

          {/* Choose Your Learning Tool */}
          <div>
            <h2 className="font-extrabold text-[22px] text-[#0f172a] mb-5 anim-fade-up" style={{ animationDelay: "0.3s", fontFamily: 'var(--font-display)', fontWeight: 900 }}>Choose Your Learning Tool</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {/* Live Classes */}
              <div className="anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-7 flex flex-col gap-4 cursor-pointer hover:border-[#ef4444]/40 hover:shadow-xl hover:shadow-red-100/60 hover:-translate-y-1.5 transition-all duration-250" style={{ animationDelay: "0.35s" }}>
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 group-hover:scale-110 transition-all duration-200">
                  <Video className="w-8 h-8 text-[#ef4444]" />
                </div>
                <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Live Classes</h3>
                <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Join live sessions &amp; watch recordings</p>
                <Link href="#" className="text-[#ef4444] text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  Get started <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Study Buddy */}
              <div className="anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-7 flex flex-col gap-4 cursor-pointer hover:border-[#2563eb]/40 hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1.5 transition-all duration-250" style={{ animationDelay: "0.4s" }}>
                <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] flex items-center justify-center group-hover:bg-[#dbeafe] group-hover:scale-110 transition-all duration-200">
                  <BookOpen className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Study Buddy</h3>
                <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Get guided help with homework</p>
                <Link href="/studyhub" className="text-[#2563eb] text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  Get started <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Concept Master */}
              <div className="anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-7 flex flex-col gap-4 cursor-pointer hover:border-[#7c3aed]/40 hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1.5 transition-all duration-250" style={{ animationDelay: "0.45s" }}>
                <div className="w-14 h-14 rounded-2xl bg-[#faf5ff] flex items-center justify-center group-hover:bg-[#f3e8ff] group-hover:scale-110 transition-all duration-200">
                  <Brain className="w-8 h-8 text-[#7c3aed]" />
                </div>
                <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Concept Master</h3>
                <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Learn new topics with AI tutor</p>
                <Link href="/concept-master" className="text-[#7c3aed] text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  Get started <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Practice Arena */}
              <div className="anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-7 flex flex-col gap-4 cursor-pointer hover:border-[#f59e0b]/40 hover:shadow-xl hover:shadow-amber-100/60 hover:-translate-y-1.5 transition-all duration-250" style={{ animationDelay: "0.5s" }}>
                <div className="w-14 h-14 rounded-2xl bg-[#fffbeb] flex items-center justify-center group-hover:bg-[#fef3c6] group-hover:scale-110 transition-all duration-200">
                  <Trophy className="w-8 h-8 text-[#f59e0b]" />
                </div>
                <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Practice Arena</h3>
                <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Practice with various question types</p>
                <Link href="/practice-arena" className="text-[#f59e0b] text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  Get started <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Study Hub */}
              <div className="anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-7 flex flex-col gap-4 cursor-pointer hover:border-[#10b981]/40 hover:shadow-xl hover:shadow-emerald-100/60 hover:-translate-y-1.5 transition-all duration-250" style={{ animationDelay: "0.55s" }}>
                <div className="w-14 h-14 rounded-2xl bg-[#ecfdf5] flex items-center justify-center group-hover:bg-[#d1fae5] group-hover:scale-110 transition-all duration-200">
                  <ClipboardList className="w-8 h-8 text-[#10b981]" />
                </div>
                <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Study Hub</h3>
                <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Notes, PDFs &amp; previous year papers</p>
                <Link href="/studyhub" className="text-[#10b981] text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  Get started <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Explore Lab */}
              <div className="anim-fade-up group bg-white border-[2.5px] border-[#e5e7eb] rounded-2xl p-7 flex flex-col gap-4 cursor-pointer hover:border-[#ec4899]/40 hover:shadow-xl hover:shadow-pink-100/60 hover:-translate-y-1.5 transition-all duration-250" style={{ animationDelay: "0.6s" }}>
                <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 group-hover:scale-110 transition-all duration-200">
                  <SparklesIcon className="w-8 h-8 text-[#ec4899]" />
                </div>
                <h3 className="font-extrabold text-[18px] text-[#0f172a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Explore Lab</h3>
                <p className="text-[14px] text-[#4a5565]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Interactive gamified learning</p>
                <Link href="#" className="text-[#ec4899] text-[14px] inline-flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                  Get started <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-[370px] flex-shrink-0 bg-white border-t-[2.5px] lg:border-t-0 lg:border-l-[2.5px] border-[#eef0f4] pt-6 pb-8 pl-6 pr-6 lg:pl-[26px] lg:pr-[39px] space-y-7">
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

          {/* Quick Access */}
          <div className="anim-fade-right" style={{ animationDelay: "0.7s" }}>
            <h3 className="font-extrabold text-[17px] text-[#0f172a] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>Quick Access</h3>
            <div className="flex flex-col gap-1">
              {[
                { icon: CalendarDays, label: "My Schedule", color: "text-[#2563eb]" },
                { icon: Award, label: "Achievements", color: "text-[#7c3aed]" },
                { icon: Library, label: "My Library", color: "text-[#10b981]" },
                { icon: Settings, label: "Settings", color: "text-[#6b7280]" },
              ].map((item) => (
                <button key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer w-full text-left" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-[15px] text-[#374151]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
