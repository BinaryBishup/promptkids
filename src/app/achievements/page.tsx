"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Star, Lock, Crown, Zap, ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

const leaderboard = [
  { rank: 1, name: "Riya Patel", xp: 3120, medal: "🥇" },
  { rank: 2, name: "Arjun Sharma", xp: 2340, medal: "🥈", isYou: true },
  { rank: 3, name: "Vikram Singh", xp: 2100, medal: "🥉" },
  { rank: 4, name: "Priya Desai", xp: 1890 },
  { rank: 5, name: "Rahul Kumar", xp: 1650 },
  { rank: 6, name: "Sneha Gupta", xp: 1520 },
  { rank: 7, name: "Aditya Rao", xp: 1380 },
  { rank: 8, name: "Meera Joshi", xp: 1200 },
];

const badges = [
  { emoji: "🔥", name: "First Streak", desc: "3-day streak", earned: true },
  { emoji: "📚", name: "Bookworm", desc: "Read 10 materials", earned: true },
  { emoji: "🧠", name: "Quick Learner", desc: "Master in <5 min", earned: true },
  { emoji: "💡", name: "Problem Solver", desc: "20 problems solo", earned: true },
  { emoji: "⭐", name: "Star Student", desc: "90%+ on 5 quizzes", earned: true },
  { emoji: "🏆", name: "Champion", desc: "Win weekly challenge", earned: true },
  { emoji: "🎯", name: "Sharpshooter", desc: "100% on any quiz", earned: true },
  { emoji: "🤝", name: "Team Player", desc: "Help a classmate", earned: true },
  { emoji: "🔬", name: "Science Whiz", desc: "All Science modules", earned: false, progress: "3 more" },
  { emoji: "📐", name: "Math Master", desc: "95%+ all Math quizzes", earned: false, progress: "2 more" },
  { emoji: "🌍", name: "Explorer", desc: "Study all 6 subjects", earned: false, progress: "2 subjects" },
  { emoji: "👑", name: "Legend", desc: "Reach Level 10", earned: false, progress: "3 levels" },
];

export default function AchievementsPage() {
  const [badgeFilter, setBadgeFilter] = useState<"all" | "earned" | "locked">("all");

  const filtered = badgeFilter === "all" ? badges : badgeFilter === "earned" ? badges.filter(b => b.earned) : badges.filter(b => !b.earned);

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      <AppHeader breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Achievements" }]} />

      {/* Page title + XP bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <h1 className="text-[28px] text-[#0f172a] mb-2" style={dFont}>Achievements &amp; Rewards</h1>
        <p className="text-[15px] text-[#64748b] mb-6" style={bFont}>Celebrate your learning milestones!</p>

        {/* XP Progress */}
        <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center flex-shrink-0">
              <span className="text-[28px]">⭐</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[15px] text-[#0f172a]" style={dFont}>2,340 / 3,000 XP</span>
                <span className="text-[13px] text-[#22c55e]" style={dFont}>Level 7 → 8</span>
              </div>
              <div className="w-full h-3 bg-[#f1f5f9] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#10b981]" style={{ width: "78%" }} />
              </div>
              <p className="text-[12px] text-[#94a3b8] mt-1" style={bFont}>660 XP to next level</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-center">
              <p className="text-[20px] text-[#f59e0b]" style={dFont}>8/12</p>
              <p className="text-[11px] text-[#94a3b8]" style={bFont}>Badges</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-center">
              <p className="text-[20px] text-[#7c3aed]" style={dFont}>#2</p>
              <p className="text-[11px] text-[#94a3b8]" style={bFont}>Class Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: Leaderboard left, Badges right */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT — Class Leaderboard */}
          <div className="lg:w-[40%] flex-shrink-0">
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Crown size={20} className="text-amber-500" />
                <h2 className="text-[18px] text-[#0f172a]" style={dFont}>Class Rank</h2>
              </div>

              <div className="flex flex-col gap-2">
                {leaderboard.map((student) => (
                  <div
                    key={student.rank}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      student.isYou
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-[#2563eb]/30"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Rank */}
                    <span className="w-8 text-center flex-shrink-0">
                      {student.medal ? (
                        <span className="text-[20px]">{student.medal}</span>
                      ) : (
                        <span className="text-[14px] text-[#94a3b8]" style={dFont}>#{student.rank}</span>
                      )}
                    </span>

                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] text-white ${
                      student.isYou ? "bg-gradient-to-br from-[#2563eb] to-[#7c3aed]" : "bg-gray-300"
                    }`} style={dFont}>
                      {student.name.split(" ").map(n => n[0]).join("")}
                    </div>

                    {/* Name + XP */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-[14px] block truncate ${student.isYou ? "text-[#2563eb]" : "text-[#0f172a]"}`} style={dFont}>
                        {student.name} {student.isYou && <span className="text-[11px] text-[#7c3aed] bg-purple-100 px-1.5 py-0.5 rounded-full ml-1">You</span>}
                      </span>
                    </div>

                    {/* XP */}
                    <span className="text-[13px] text-[#64748b] flex-shrink-0" style={dFont}>{student.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Badges */}
          <div className="flex-1">
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-amber-500" />
                  <h2 className="text-[18px] text-[#0f172a]" style={dFont}>Badges</h2>
                  <span className="text-[13px] text-[#94a3b8] ml-1" style={bFont}>8 of 12</span>
                </div>
                <div className="flex gap-1.5">
                  {(["all", "earned", "locked"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setBadgeFilter(f)}
                      className={`px-3 py-1.5 rounded-full text-[12px] transition-all cursor-pointer ${
                        badgeFilter === f ? "bg-[#2563eb] text-white" : "bg-gray-100 text-[#6b7280] hover:bg-gray-200"
                      }`}
                      style={dFont}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filtered.map((badge) => (
                  <div
                    key={badge.name}
                    className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                      badge.earned
                        ? "border-[#e5e7eb] bg-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                        : "border-dashed border-gray-200 bg-gray-50/50 opacity-60"
                    }`}
                  >
                    <span className="text-[36px] mb-2">{badge.emoji}</span>
                    <span className="text-[13px] text-[#0f172a] mb-0.5" style={dFont}>{badge.name}</span>
                    <span className="text-[11px] text-[#94a3b8]" style={bFont}>{badge.desc}</span>
                    {badge.earned ? (
                      <span className="mt-2 text-[10px] text-[#22c55e] bg-green-50 px-2 py-0.5 rounded-full" style={dFont}>Earned ✓</span>
                    ) : (
                      <span className="mt-2 text-[10px] text-[#94a3b8] flex items-center gap-1" style={bFont}>
                        <Lock size={10} /> {badge.progress}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Rewards */}
            <div className="bg-white border-2 border-[#e5e7eb] rounded-2xl p-6 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-amber-500" />
                <h2 className="text-[16px] text-[#0f172a]" style={dFont}>Recent Rewards</h2>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { emoji: "🎯", title: "Perfect Score — Science Quiz", xp: "+50 XP", time: "Today" },
                  { emoji: "🔥", title: "7-Day Study Streak", xp: "+30 XP", time: "Today" },
                  { emoji: "📚", title: "Completed Light & Reflection", xp: "+75 XP", time: "Yesterday" },
                  { emoji: "🧠", title: "Mastered Quadratic Equations", xp: "+60 XP", time: "2 days ago" },
                ].map((reward) => (
                  <div key={reward.title} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="text-[22px]">{reward.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] text-[#0f172a] block truncate" style={dFont}>{reward.title}</span>
                      <span className="text-[11px] text-[#94a3b8]" style={bFont}>{reward.time}</span>
                    </div>
                    <span className="text-[13px] text-[#22c55e] flex-shrink-0" style={dFont}>{reward.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
