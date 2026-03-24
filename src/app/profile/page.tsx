"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Zap,
  Trophy,
  Award,
  Flame,
  Pencil,
  User,
  School,
  BookOpen,
  Globe,
  Clock,
  Target,
  CheckCircle,
  Star,
  FileText,
  MessageSquare,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ---------- data ---------- */

const stats = [
  { label: "Level", value: "7", color: "#2563eb", bg: "#eff6ff", icon: Zap },
  { label: "XP", value: "340", color: "#7c3aed", bg: "#f5f3ff", icon: Trophy },
  { label: "Badges", value: "8", color: "#f59e0b", bg: "#fffbeb", icon: Award },
  { label: "Day Streak", value: "7", color: "#22c55e", bg: "#f0fdf4", icon: Flame },
];

const subjects = [
  { name: "Science", pct: 72, from: "#2563eb", to: "#60a5fa" },
  { name: "Maths", pct: 45, from: "#7c3aed", to: "#a78bfa" },
  { name: "English", pct: 88, from: "#22c55e", to: "#4ade80" },
  { name: "History", pct: 60, from: "#f59e0b", to: "#fbbf24" },
  { name: "Biology", pct: 30, from: "#ec4899", to: "#f472b6" },
  { name: "Physics", pct: 55, from: "#06b6d4", to: "#22d3ee" },
];

const activities = [
  { dot: "#22c55e", text: "Completed Science Chapter 4 Quiz", time: "2 hours ago", icon: CheckCircle },
  { dot: "#7c3aed", text: "Earned 'Quick Learner' badge", time: "5 hours ago", icon: Star },
  { dot: "#2563eb", text: "Submitted Maths homework", time: "Yesterday, 4:30 PM", icon: FileText },
  { dot: "#f59e0b", text: "Watched Physics video lecture", time: "Yesterday, 2:15 PM", icon: BookOpen },
  { dot: "#ec4899", text: "Started Biology practice test", time: "2 days ago", icon: MessageSquare },
];

const accountDetails = [
  { label: "Full Name", value: "Arjun Sharma", icon: User },
  { label: "Email", value: "arjun.sharma@student.com", icon: Mail },
  { label: "Phone", value: "+91 98765 43210", icon: Phone },
  { label: "Class & Section", value: "Class 10 - Section A", icon: BookOpen },
  { label: "School", value: "Delhi Public School, Gurugram", icon: School },
  { label: "Parent Contact", value: "priya.sharma@parent.com", icon: Mail },
];

/* ---------- component ---------- */

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      <style>{`
        @keyframes pfFadeUp {
          from { opacity: 0; transform: translateY(24px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes pfScaleIn {
          from { opacity: 0; transform: scale(0.92) }
          to   { opacity: 1; transform: scale(1) }
        }
        @keyframes pfSlideRight {
          from { opacity: 0; transform: translateX(-20px) }
          to   { opacity: 1; transform: translateX(0) }
        }
        @keyframes pfBarGrow {
          from { width: 0% }
        }
        @keyframes pfPulse {
          0%, 100% { transform: scale(1) }
          50% { transform: scale(1.05) }
        }
        .pf-fade-up {
          animation: pfFadeUp 0.6s ease-out both;
        }
        .pf-scale-in {
          animation: pfScaleIn 0.5s ease-out both;
        }
        .pf-slide-right {
          animation: pfSlideRight 0.5s ease-out both;
        }
        .pf-card {
          animation: pfFadeUp 0.6s ease-out both;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pf-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .pf-stat-card {
          animation: pfScaleIn 0.5s ease-out both;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-stat-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }
        .pf-edit-btn {
          transition: all 0.2s ease;
        }
        .pf-edit-btn:hover {
          background: #eff6ff;
          color: #2563eb;
          transform: scale(1.1);
        }
        .pf-activity-row {
          animation: pfSlideRight 0.5s ease-out both;
          transition: background 0.2s ease;
        }
        .pf-activity-row:hover {
          background: #f8fafc;
        }
        .pf-avatar {
          animation: pfScaleIn 0.6s ease-out both;
        }
        .pf-avatar:hover {
          animation: pfPulse 0.6s ease-in-out;
        }
        .pf-tag {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-tag:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37,99,235,0.15);
        }
      `}</style>

      {/* ========== APP HEADER ========== */}
      <AppHeader breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Profile" }]} />

      {/* ========== PROFILE CARD ========== */}
      <div className="max-w-4xl mx-auto px-8 pt-8">
        <div className="pf-card bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6" style={{ animationDelay: "0.05s" }}>
          {/* avatar */}
          <div className="pf-avatar shrink-0 w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-br from-[#60a5fa] to-[#2563eb]" style={{ animationDelay: "0.1s" }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#60a5fa] to-[#2563eb] flex items-center justify-center">
              <span className="text-white text-[28px]" style={dFont}>A</span>
            </div>
          </div>

          {/* name + info */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="pf-fade-up text-[24px] text-[#0f172a] leading-tight" style={{ ...dFont, animationDelay: "0.15s" }}>
              Arjun Sharma
            </h1>
            <p className="pf-fade-up text-[15px] text-[#64748b] mt-1" style={{ ...bFont, animationDelay: "0.2s" }}>
              Class 10 - Section A
            </p>
            <div className="pf-fade-up flex flex-wrap justify-center sm:justify-start gap-4 mt-3" style={{ animationDelay: "0.25s" }}>
              <span className="inline-flex items-center gap-1.5 text-[#64748b] text-[13px]" style={bFont}>
                <Mail size={14} className="text-[#94a3b8]" />
                arjun.sharma@student.com
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#64748b] text-[13px]" style={bFont}>
                <Phone size={14} className="text-[#94a3b8]" />
                +91 98765 43210
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="max-w-4xl mx-auto px-8 py-8 space-y-8">
        {/* ---- Stats Row ---- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="pf-stat-card bg-white border border-gray-100 rounded-2xl p-5 text-center"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div
                  className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: s.bg }}
                >
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <p className="text-[28px] leading-none" style={{ ...dFont, color: s.color }}>
                  {s.value}
                </p>
                <p className="text-[13px] text-[#94a3b8] mt-1" style={bFont}>
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* ---- Learning Progress ---- */}
        <div className="pf-card bg-white border border-gray-100 rounded-2xl p-6" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-[20px] text-[#0f172a] mb-6" style={dFont}>
            Learning Progress
          </h2>
          <div className="space-y-5">
            {subjects.map((subj, i) => (
              <div key={subj.name} className="pf-fade-up" style={{ animationDelay: `${0.35 + i * 0.06}s` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[14px] text-[#374151]" style={bFont}>
                    {subj.name}
                  </span>
                  <span className="text-[13px]" style={{ ...dFont, color: subj.from }}>
                    {subj.pct}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${subj.pct}%`,
                      background: `linear-gradient(90deg, ${subj.from}, ${subj.to})`,
                      animation: `pfBarGrow 1s ease-out ${0.4 + i * 0.08}s both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Recent Activity ---- */}
        <div className="pf-card bg-white border border-gray-100 rounded-2xl p-6" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-[20px] text-[#0f172a] mb-5" style={dFont}>
            Recent Activity
          </h2>
          <div className="divide-y divide-gray-50">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="pf-activity-row flex items-center gap-4 py-3.5 px-2 rounded-xl"
                  style={{ animationDelay: `${0.45 + i * 0.07}s` }}
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${a.dot}15` }}
                  >
                    <Icon size={16} style={{ color: a.dot }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#0f172a] truncate" style={dFont}>
                      {a.text}
                    </p>
                    <p className="text-[12px] text-[#94a3b8] mt-0.5" style={bFont}>
                      {a.time}
                    </p>
                  </div>
                  <div className="shrink-0 w-2.5 h-2.5 rounded-full" style={{ background: a.dot }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Account Details ---- */}
        <div className="pf-card bg-white border border-gray-100 rounded-2xl p-6" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-[20px] text-[#0f172a] mb-5" style={dFont}>
            Account Details
          </h2>
          <div className="divide-y divide-gray-50">
            {accountDetails.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="pf-slide-right flex items-center gap-4 py-4"
                  style={{ animationDelay: `${0.55 + i * 0.06}s` }}
                >
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
                    <Icon size={16} className="text-[#64748b]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#94a3b8] uppercase tracking-wide" style={bFont}>
                      {d.label}
                    </p>
                    <p className="text-[15px] text-[#0f172a] mt-0.5 truncate" style={dFont}>
                      {d.value}
                    </p>
                  </div>
                  <button className="pf-edit-btn shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] cursor-pointer">
                    <Pencil size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Preferences ---- */}
        <div className="pf-card bg-white border border-gray-100 rounded-2xl p-6 mb-8" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-[20px] text-[#0f172a] mb-5" style={dFont}>
            Preferences
          </h2>
          <div className="space-y-5">
            {/* Learning Style */}
            <div className="pf-slide-right flex items-center gap-4" style={{ animationDelay: "0.65s" }}>
              <div className="shrink-0 w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center">
                <Target size={16} className="text-[#2563eb]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#94a3b8] uppercase tracking-wide" style={bFont}>
                  Learning Style
                </p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span
                    className="pf-tag inline-flex items-center gap-1 text-[13px] text-[#2563eb] bg-[#eff6ff] px-3 py-1 rounded-full cursor-default"
                    style={dFont}
                  >
                    Visual
                  </span>
                  <span
                    className="pf-tag inline-flex items-center gap-1 text-[13px] text-[#7c3aed] bg-[#f5f3ff] px-3 py-1 rounded-full cursor-default"
                    style={dFont}
                  >
                    Interactive
                  </span>
                </div>
              </div>
              <button className="pf-edit-btn shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] cursor-pointer">
                <Pencil size={14} />
              </button>
            </div>

            {/* Preferred Language */}
            <div className="pf-slide-right flex items-center gap-4" style={{ animationDelay: "0.7s" }}>
              <div className="shrink-0 w-9 h-9 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
                <Globe size={16} className="text-[#22c55e]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#94a3b8] uppercase tracking-wide" style={bFont}>
                  Preferred Language
                </p>
                <p className="text-[15px] text-[#0f172a] mt-0.5" style={dFont}>
                  English
                </p>
              </div>
              <button className="pf-edit-btn shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] cursor-pointer">
                <Pencil size={14} />
              </button>
            </div>

            {/* Daily Goal */}
            <div className="pf-slide-right flex items-center gap-4" style={{ animationDelay: "0.75s" }}>
              <div className="shrink-0 w-9 h-9 rounded-xl bg-[#fffbeb] flex items-center justify-center">
                <Clock size={16} className="text-[#f59e0b]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#94a3b8] uppercase tracking-wide" style={bFont}>
                  Daily Goal
                </p>
                <p className="text-[15px] text-[#0f172a] mt-0.5" style={dFont}>
                  2 hours
                </p>
              </div>
              <button className="pf-edit-btn shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] cursor-pointer">
                <Pencil size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
