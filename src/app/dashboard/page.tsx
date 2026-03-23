"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  TrendingDown,
  Trophy,
  Bell,
  Settings,
  Clock,
  Calendar,
  Star,
  Lightbulb,
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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* TOP NAV BAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#f3f4f6] h-[78px] flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-black text-base leading-tight">PromptKids</span>
            <span className="text-[#9ca3af] text-xs leading-tight">AI Learning Platform</span>
          </div>
        </div>

        {/* Right: Bell + Settings */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-[#6b7280]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#f97316] rounded-full" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-[#6b7280]" />
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* LEFT MAIN AREA */}
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          {/* Welcome Banner */}
          <div className="relative bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-2xl h-auto min-h-[160px] p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

            {/* Left content */}
            <div className="relative z-10 flex flex-col gap-3">
              <h1 className="text-white font-bold text-2xl">Welcome back, Arjun! 👋</h1>
              <p className="text-white/90 text-sm">Ready to learn something new today?</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1.5 rounded-[14px]">
                  <Flame className="w-4 h-4" /> {streakDays} day streak
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1.5 rounded-[14px]">
                  <Target className="w-4 h-4" /> {goalsCompleted}/{goalTotal} goals today
                </span>
              </div>
            </div>

            {/* Right: Level + XP */}
            <div className="relative z-10 flex flex-col items-center mt-4 sm:mt-0">
              <span className="text-white/80 text-sm font-medium">Level {level}</span>
              <span className="text-white font-bold text-5xl leading-none mt-1">{xpPoints}</span>
              <span className="text-white/80 text-sm mt-1">XP Points</span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Homework Done */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl h-[100px] flex items-center gap-4 px-5">
              <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <p className="text-[#2563eb] font-bold text-2xl leading-none">5</p>
                <p className="text-[#9ca3af] text-xs mt-1">Homework Done</p>
              </div>
            </div>

            {/* Concepts Learned */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl h-[100px] flex items-center gap-4 px-5">
              <div className="w-11 h-11 rounded-xl bg-[#faf5ff] flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-[#7c3aed]" />
              </div>
              <div>
                <p className="text-[#7c3aed] font-bold text-2xl leading-none">12</p>
                <p className="text-[#9ca3af] text-xs mt-1">Concepts Learned</p>
              </div>
            </div>

            {/* AI Dependency */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl h-[100px] flex items-center gap-4 px-5">
              <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[#22c55e] font-bold text-2xl leading-none">28%</p>
                  <TrendingDown className="w-4 h-4 text-[#22c55e]" />
                </div>
                <p className="text-[#9ca3af] text-xs mt-1">AI Dependency</p>
              </div>
            </div>

            {/* Badges Earned */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl h-[100px] flex items-center gap-4 px-5">
              <div className="w-11 h-11 rounded-xl bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-[#f59e0b] font-bold text-2xl leading-none">8</p>
                <p className="text-[#9ca3af] text-xs mt-1">Badges Earned</p>
              </div>
            </div>
          </div>

          {/* Choose Your Learning Tool */}
          <div>
            <h2 className="font-bold text-xl text-[#111] mb-4">Choose Your Learning Tool</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Study Buddy */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#2563eb]/8 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="font-bold text-xl text-[#111]">Study Buddy</h3>
                <p className="text-[#6b7280] text-sm">Get guided help with homework</p>
                <Link href="#" className="text-[#2563eb] text-sm font-medium inline-flex items-center gap-1 mt-auto hover:underline">
                  Get started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Concept Master */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/8 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-[#7c3aed]" />
                </div>
                <h3 className="font-bold text-xl text-[#111]">Concept Master</h3>
                <p className="text-[#6b7280] text-sm">Learn new topics with AI tutor</p>
                <Link href="#" className="text-[#7c3aed] text-sm font-medium inline-flex items-center gap-1 mt-auto hover:underline">
                  Get started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Practice Arena */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/8 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-[#f59e0b]" />
                </div>
                <h3 className="font-bold text-xl text-[#111]">Practice Arena</h3>
                <p className="text-[#6b7280] text-sm">Practice with various question types</p>
                <Link href="#" className="text-[#f59e0b] text-sm font-medium inline-flex items-center gap-1 mt-auto hover:underline">
                  Get started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Study Hub */}
              <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/8 flex items-center justify-center">
                  <ClipboardList className="w-7 h-7 text-[#10b981]" />
                </div>
                <h3 className="font-bold text-xl text-[#111]">Study Hub</h3>
                <p className="text-[#6b7280] text-sm">Notes, PDFs &amp; previous year papers</p>
                <Link href="#" className="text-[#10b981] text-sm font-medium inline-flex items-center gap-1 mt-auto hover:underline">
                  Get started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-[360px] flex-shrink-0 bg-white border-t-2 lg:border-t-0 lg:border-l-2 border-[#f3f4f6] pt-6 pb-8 pl-6 pr-6 lg:pl-[26px] lg:pr-[39px] space-y-6">
          {/* Recent Activity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#6b7280]" />
              <h3 className="font-bold text-base text-[#111]">Recent Activity</h3>
            </div>
            <div className="flex flex-col gap-3">
              {/* Activity 1 - Blue */}
              <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#111]">Science homework</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">Completed 2 hours ago</p>
                </div>
              </div>

              {/* Activity 2 - Purple */}
              <div className="bg-[#faf5ff] border border-[#f3e8ff] rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#7c3aed] flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#111]">Mastered: Quadratic Equations</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">Yesterday at 4:30 PM</p>
                </div>
              </div>

              {/* Activity 3 - Amber */}
              <div className="bg-[#fffbeb] border border-[#fef3c6] rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#111]">Earned &quot;Quick Learner&quot; badge</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#6b7280]" />
              <h3 className="font-bold text-base text-[#111]">Upcoming Exams</h3>
            </div>

            {/* Red gradient card */}
            <div className="bg-gradient-to-r from-[#fef2f2] to-[#fff7ed] border border-[#ffc9c9] rounded-xl p-4 mb-3">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#ffe2e2] flex items-center justify-center flex-shrink-0">
                  <AlarmClock className="w-7 h-7 text-[#e7000b]" />
                </div>
                <div>
                  <p className="font-bold text-base text-[#111]">Science Mid-term</p>
                  <p className="text-[#e7000b] text-sm font-medium mt-0.5">&#x23F0; in 5 days</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">Chapters 1-4 &bull; 60 minutes</p>
                </div>
              </div>
              <button className="w-full bg-[#e7000b] text-white font-semibold text-sm py-2.5 rounded-[14px] hover:bg-[#cc0009] transition-colors">
                Start Practice Now
              </button>
            </div>

            {/* Small blue card */}
            <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-[#111]">Maths Quiz</p>
                <p className="text-[#2563eb] text-sm font-medium">in 12 days</p>
              </div>
              <p className="text-[#9ca3af] text-xs mt-1">Algebra &amp; Geometry</p>
            </div>
          </div>

          {/* Daily Challenge */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-[#6b7280]" />
              <h3 className="font-bold text-base text-[#111]">Daily Challenge</h3>
            </div>

            <div className="bg-gradient-to-b from-[#fefce8] to-[#fffbeb] border border-[#ffdf20] rounded-xl p-5 flex flex-col items-center">
              <p className="text-[#f59e0b] font-bold text-4xl">+100 XP</p>
              <p className="text-[#6b7280] text-sm mt-1">Complete 3 homework questions</p>

              {/* Progress inner card */}
              <div className="bg-white rounded-xl p-4 w-full mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#111] text-sm">Your Progress</span>
                  <span className="text-[#111] font-bold text-sm">{challengeProgress}/{challengeTotal}</span>
                </div>
                <div className="w-full h-3 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f97316] to-[#ef4444] rounded-full transition-all duration-500"
                    style={{ width: `${(challengeProgress / challengeTotal) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-[#f97316] text-sm mt-3">&#x2728; Just 1 more to go!</p>
              <Link href="#" className="text-[#f59e0b] text-sm font-medium underline mt-2 hover:text-[#d97706] transition-colors">
                View all challenges &rarr;
              </Link>
            </div>
          </div>

          {/* Learning Tip */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-[#6b7280]" />
              <h3 className="font-bold text-base text-[#111]">Learning Tip</h3>
            </div>

            <div className="bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5] border border-[#b9f8cf] rounded-xl p-5">
              <p className="text-[#4b5563] text-sm leading-relaxed">
                &ldquo;Try solving problems on your own first before using AI help. It builds stronger understanding!&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-[#008236] font-bold text-xs">AI Learning Coach</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
