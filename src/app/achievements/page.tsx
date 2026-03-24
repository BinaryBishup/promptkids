"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Star,
  Lock,
  Crown,
  Zap,
  Award,
  Gift,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ── Badge Data ─────────────────────────────────────────────────── */

type Badge = {
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
  progress?: string;
};

const badges: Badge[] = [
  { emoji: "🔥", name: "First Streak", description: "Complete 3 days in a row", earned: true },
  { emoji: "📚", name: "Bookworm", description: "Read 10 study materials", earned: true },
  { emoji: "🧠", name: "Quick Learner", description: "Master a concept in under 5 min", earned: true },
  { emoji: "💡", name: "Problem Solver", description: "Solve 20 problems independently", earned: true },
  { emoji: "⭐", name: "Star Student", description: "Score 90%+ on 5 quizzes", earned: true },
  { emoji: "🏆", name: "Champion", description: "Win a weekly challenge", earned: true },
  { emoji: "🎯", name: "Sharpshooter", description: "Get 100% on any quiz", earned: true },
  { emoji: "🤝", name: "Team Player", description: "Help a classmate via study group", earned: true },
  { emoji: "🔬", name: "Science Whiz", description: "Complete all Science modules", earned: false, progress: "Complete 3 more modules" },
  { emoji: "📐", name: "Math Master", description: "Score 95%+ in all Math quizzes", earned: false, progress: "Complete 2 more quizzes" },
  { emoji: "🌍", name: "Explorer", description: "Study all 6 subjects", earned: false, progress: "Study 2 more subjects" },
  { emoji: "👑", name: "Legend", description: "Reach Level 10", earned: false, progress: "Reach 3 more levels" },
];

/* ── Leaderboard Data ───────────────────────────────────────────── */

type LeaderEntry = {
  rank: number;
  name: string;
  xp: number;
  badgeCount: number;
  isYou: boolean;
  avatar: string;
};

const leaderboard: LeaderEntry[] = [
  { rank: 1, name: "Riya Patel", xp: 3120, badgeCount: 10, isYou: false, avatar: "RP" },
  { rank: 2, name: "Arjun Sharma", xp: 2340, badgeCount: 8, isYou: true, avatar: "AS" },
  { rank: 3, name: "Vikram Singh", xp: 2100, badgeCount: 7, isYou: false, avatar: "VS" },
  { rank: 4, name: "Priya Desai", xp: 1890, badgeCount: 6, isYou: false, avatar: "PD" },
  { rank: 5, name: "Rahul Kumar", xp: 1650, badgeCount: 5, isYou: false, avatar: "RK" },
];

/* ── Recent Rewards ─────────────────────────────────────────────── */

type Reward = {
  emoji: string;
  title: string;
  xp: number;
  date: string;
};

const recentRewards: Reward[] = [
  { emoji: "🎯", title: "Perfect Quiz Score", xp: 150, date: "Today" },
  { emoji: "🔥", title: "7-Day Streak Bonus", xp: 200, date: "Yesterday" },
  { emoji: "📚", title: "Completed Chapter 8", xp: 100, date: "Mar 22" },
  { emoji: "🏆", title: "Weekly Challenge Winner", xp: 300, date: "Mar 20" },
];

/* ── Rank colors ────────────────────────────────────────────────── */

const rankColors: Record<number, string> = {
  1: "bg-yellow-400 text-yellow-900",
  2: "bg-orange-400 text-white",
  3: "bg-amber-600 text-white",
};

/* ── Avatar colors ──────────────────────────────────────────────── */

const avatarColors = [
  "bg-violet-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-rose-500",
];

/* ── Filter type ────────────────────────────────────────────────── */

type Filter = "all" | "earned" | "locked";

/* ── Page ───────────────────────────────────────────────────────── */

export default function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredBadges =
    filter === "all"
      ? badges
      : filter === "earned"
        ? badges.filter((b) => b.earned)
        : badges.filter((b) => !b.earned);

  const currentXP = 2340;
  const nextLevelXP = 3000;
  const xpPercent = Math.round((currentXP / nextLevelXP) * 100);

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      {/* ── Orange gradient header ──────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#f97316] to-[#ea580c]">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-5xl px-6 py-10 sm:px-8">
          {/* back link */}
          <Link
            href="/platform"
            className="group mb-6 inline-flex items-center gap-2 text-[14px] text-white/80 transition-colors hover:text-white"
            style={bFont}
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* left text */}
            <div>
              <h1
                className="text-[32px] leading-tight text-white"
                style={dFont}
              >
                Achievements &amp; Rewards
              </h1>
              <p className="mt-2 text-[16px] text-white/80" style={bFont}>
                Celebrate your learning milestones!
              </p>
            </div>

            {/* right stat cards */}
            <div className="flex gap-4">
              {/* badges stat */}
              <div className="flex items-center gap-3 rounded-2xl bg-white/20 px-5 py-3 backdrop-blur-sm transition-transform hover:scale-105">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/30">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[20px] leading-none text-white" style={dFont}>
                    8/12
                  </p>
                  <p className="text-[13px] text-white/80" style={bFont}>
                    Badges Earned
                  </p>
                </div>
              </div>

              {/* xp stat */}
              <div className="flex items-center gap-3 rounded-2xl bg-white/20 px-5 py-3 backdrop-blur-sm transition-transform hover:scale-105">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/30">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[20px] leading-none text-white" style={dFont}>
                    2,340
                  </p>
                  <p className="text-[13px] text-white/80" style={bFont}>
                    Total XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8 sm:px-8">
        {/* ── XP Progress Card ──────────────────────────────────── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-500" />
            <h2 className="text-[20px] text-[#0f172a]" style={dFont}>
              Your XP Journey
            </h2>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[14px] text-[#64748b]" style={bFont}>
                Level 7 &rarr; Level 8
              </p>
            </div>
            <p className="text-[14px] text-[#64748b]" style={bFont}>
              <span className="text-[#0f172a]" style={dFont}>
                {currentXP.toLocaleString()}
              </span>{" "}
              / {nextLevelXP.toLocaleString()} XP
            </p>
          </div>

          {/* bar */}
          <div className="mt-3 h-5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <p className="mt-2 text-[13px] text-emerald-600" style={bFont}>
            <Zap size={14} className="mr-1 inline -translate-y-px" />
            660 XP to next level
          </p>
        </section>

        {/* ── Badges Section ────────────────────────────────────── */}
        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[22px] text-[#0f172a]" style={dFont}>
                Your Badges
              </h2>
              <p className="text-[14px] text-[#64748b]" style={bFont}>
                8 of 12 earned
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2">
              {(["all", "earned", "locked"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-[13px] capitalize transition-all ${
                    filter === f
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white text-[#64748b] border border-gray-200 hover:border-orange-300 hover:text-orange-600"
                  }`}
                  style={dFont}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Badge grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBadges.map((badge) => (
              <div
                key={badge.name}
                className={`group relative rounded-2xl border bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  badge.earned
                    ? "border-gray-200"
                    : "border-dashed border-gray-300 opacity-75"
                }`}
              >
                {/* emoji */}
                <div
                  className={`mx-auto mb-3 flex h-[60px] w-[60px] items-center justify-center rounded-2xl text-[32px] transition-transform duration-300 group-hover:scale-110 ${
                    badge.earned
                      ? "bg-orange-50"
                      : "bg-gray-100 grayscale"
                  }`}
                >
                  {badge.emoji}
                </div>

                {/* name */}
                <h3
                  className="mb-1 text-[15px] text-[#0f172a]"
                  style={dFont}
                >
                  {badge.name}
                </h3>

                {/* description */}
                <p
                  className="mb-3 text-[12px] text-[#94a3b8]"
                  style={bFont}
                >
                  {badge.description}
                </p>

                {/* status badge */}
                {badge.earned ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[12px] text-emerald-600"
                    style={dFont}
                  >
                    <Star size={12} className="fill-emerald-500" />
                    Earned
                  </span>
                ) : (
                  <div className="space-y-1.5">
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-[12px] text-gray-500"
                      style={dFont}
                    >
                      <Lock size={12} />
                      Locked
                    </span>
                    {badge.progress && (
                      <p
                        className="text-[11px] text-orange-500"
                        style={bFont}
                      >
                        {badge.progress}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom two-column row ─────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ── Leaderboard Card ──────────────────────────────────── */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <Trophy size={20} className="text-yellow-500" />
              <h2 className="text-[20px] text-[#0f172a]" style={dFont}>
                Class Leaderboard
              </h2>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry, idx) => (
                <div
                  key={entry.name}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-gray-50 ${
                    entry.isYou
                      ? "border border-orange-200 bg-orange-50/60"
                      : ""
                  }`}
                >
                  {/* rank */}
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[13px] ${
                      rankColors[entry.rank] || "bg-gray-200 text-gray-600"
                    }`}
                    style={dFont}
                  >
                    {entry.rank}
                  </div>

                  {/* avatar */}
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[12px] text-white ${avatarColors[idx]}`}
                    style={dFont}
                  >
                    {entry.avatar}
                  </div>

                  {/* name */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[14px] text-[#0f172a]"
                      style={dFont}
                    >
                      {entry.name}
                      {entry.isYou && (
                        <span
                          className="ml-2 text-[11px] text-orange-500"
                          style={bFont}
                        >
                          (You)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* stats */}
                  <div className="flex flex-shrink-0 items-center gap-3 text-right">
                    <span
                      className="text-[13px] text-[#64748b]"
                      style={bFont}
                    >
                      {entry.xp.toLocaleString()} XP
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-[#94a3b8]" style={bFont}>
                      <Award size={12} />
                      {entry.badgeCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Recent Rewards Card ──────────────────────────────── */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <Gift size={20} className="text-purple-500" />
              <h2 className="text-[20px] text-[#0f172a]" style={dFont}>
                Recent Rewards
              </h2>
            </div>

            <div className="space-y-3">
              {recentRewards.map((reward) => (
                <div
                  key={reward.title}
                  className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-gray-50"
                >
                  {/* emoji */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[22px] transition-transform duration-300 group-hover:scale-110">
                    {reward.emoji}
                  </div>

                  {/* text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[14px] text-[#0f172a]"
                      style={dFont}
                    >
                      {reward.title}
                    </p>
                    <p
                      className="text-[12px] text-[#94a3b8]"
                      style={bFont}
                    >
                      {reward.date}
                    </p>
                  </div>

                  {/* xp earned */}
                  <span
                    className="flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[13px] text-emerald-600"
                    style={dFont}
                  >
                    +{reward.xp} XP
                  </span>

                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-500"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
