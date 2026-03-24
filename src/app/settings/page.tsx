"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  ChevronRight,
  Bell,
  Settings,
  Shield,
  HelpCircle,
  Volume2,
  Globe,
  Lock,
  Users,
  FileText,
  Headphones,
  MessageCircle,
  Sparkles,
  LogOut,
} from "lucide-react";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

/* ── Toggle Switch ─────────────────────────────────────────────── */
function Toggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
        on ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out ${
          on ? "translate-x-[22px]" : "translate-x-[2px]"
        } mt-[2px]`}
      />
    </button>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function SettingsPage() {
  /* notification toggles */
  const [liveClass, setLiveClass] = useState(true);
  const [homework, setHomework] = useState(true);
  const [exams, setExams] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  /* app prefs */
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={bFont}>
      {/* ── Gradient Header ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] px-6 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-[14px] transition-colors duration-200 mb-6 group"
            style={bFont}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Dashboard
          </Link>

          <h1
            className="text-[32px] text-white leading-tight"
            style={dFont}
          >
            Settings
          </h1>
          <p className="text-white/80 text-[15px] mt-1" style={bFont}>
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto p-8 space-y-6 -mt-4">
        {/* ── Account Information ─────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <User className="w-5 h-5 text-[#7c3aed]" />
            <h2 className="text-[18px] text-[#0f172a]" style={dFont}>
              Account Information
            </h2>
          </div>

          <ul className="divide-y divide-gray-100">
            {[
              {
                icon: User,
                bg: "bg-purple-100",
                color: "text-purple-600",
                label: "Full Name",
                value: "Arjun Sharma",
              },
              {
                icon: Mail,
                bg: "bg-blue-100",
                color: "text-blue-600",
                label: "Email Address",
                value: "arjun.sharma@student.com",
              },
              {
                icon: Phone,
                bg: "bg-green-100",
                color: "text-green-600",
                label: "Phone Number",
                value: "+91 98765 43210",
              },
              {
                icon: GraduationCap,
                bg: "bg-orange-100",
                color: "text-orange-600",
                label: "Class & Section",
                value: "Class 10 - Section A",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${item.bg} shrink-0`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] text-[#94a3b8]"
                    style={bFont}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[15px] text-[#0f172a] truncate"
                    style={dFont}
                  >
                    {item.value}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors duration-200" />
              </li>
            ))}
          </ul>
        </section>

        {/* ── Notification Preferences ────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <Bell className="w-5 h-5 text-[#7c3aed]" />
            <h2 className="text-[18px] text-[#0f172a]" style={dFont}>
              Notification Preferences
            </h2>
          </div>

          <ul className="divide-y divide-gray-100">
            {([
              {
                label: "Live Class Reminders",
                desc: "Get notified 15 mins before class",
                state: liveClass,
                toggle: () => setLiveClass((p) => !p),
              },
              {
                label: "Homework Due Alerts",
                desc: "Reminders for pending homework",
                state: homework,
                toggle: () => setHomework((p) => !p),
              },
              {
                label: "Exam Notifications",
                desc: "Updates about upcoming exams",
                state: exams,
                toggle: () => setExams((p) => !p),
              },
              {
                label: "Achievement Unlocks",
                desc: "When you earn new badges",
                state: achievements,
                toggle: () => setAchievements((p) => !p),
              },
              {
                label: "Weekly Progress Report",
                desc: "Summary of your weekly performance",
                state: weeklyReport,
                toggle: () => setWeeklyReport((p) => !p),
              },
            ] as const).map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div>
                  <p
                    className="text-[15px] text-[#0f172a]"
                    style={dFont}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[13px] text-[#94a3b8] mt-0.5"
                    style={bFont}
                  >
                    {item.desc}
                  </p>
                </div>
                <Toggle on={item.state} onToggle={item.toggle} />
              </li>
            ))}
          </ul>
        </section>

        {/* ── Two-column row ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* App Preferences */}
          <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 px-6 pt-6 pb-4">
              <Settings className="w-5 h-5 text-[#7c3aed]" />
              <h2 className="text-[18px] text-[#0f172a]" style={dFont}>
                App Preferences
              </h2>
            </div>

            <ul className="divide-y divide-gray-100">
              <li className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-[#64748b]" />
                  <p
                    className="text-[15px] text-[#0f172a]"
                    style={dFont}
                  >
                    Sound Effects
                  </p>
                </div>
                <Toggle
                  on={soundEffects}
                  onToggle={() => setSoundEffects((p) => !p)}
                />
              </li>
              <li className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#64748b]" />
                  <p
                    className="text-[15px] text-[#0f172a]"
                    style={dFont}
                  >
                    Language
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] text-[#94a3b8]"
                    style={bFont}
                  >
                    English (US)
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors duration-200" />
                </div>
              </li>
            </ul>
          </section>

          {/* Privacy & Security */}
          <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 px-6 pt-6 pb-4">
              <Shield className="w-5 h-5 text-[#7c3aed]" />
              <h2 className="text-[18px] text-[#0f172a]" style={dFont}>
                Privacy &amp; Security
              </h2>
            </div>

            <ul className="divide-y divide-gray-100">
              {[
                { icon: Lock, label: "Change Password" },
                { icon: Users, label: "Parent Controls" },
                { icon: FileText, label: "Privacy Policy" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#64748b]" />
                    <p
                      className="text-[15px] text-[#0f172a]"
                      style={dFont}
                    >
                      {item.label}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors duration-200" />
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Support & About ─────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <HelpCircle className="w-5 h-5 text-[#7c3aed]" />
            <h2 className="text-[18px] text-[#0f172a]" style={dFont}>
              Support &amp; About
            </h2>
          </div>

          <div className="flex items-center justify-center gap-8 px-6 pb-6 pt-2">
            {[
              {
                icon: Headphones,
                label: "Help Center",
                bg: "bg-blue-100",
                color: "text-blue-600",
              },
              {
                icon: MessageCircle,
                label: "Contact Us",
                bg: "bg-green-100",
                color: "text-green-600",
              },
              {
                icon: Sparkles,
                label: "What's New",
                bg: "bg-purple-100",
                color: "text-purple-600",
              },
            ].map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${item.bg} group-hover:scale-110 transition-transform duration-200`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </span>
                <span
                  className="text-[13px] text-[#64748b] group-hover:text-[#0f172a] transition-colors duration-200"
                  style={bFont}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="text-center space-y-1 pt-2">
          <p className="text-[13px] text-[#94a3b8]" style={bFont}>
            PromptKids Version 2.4.0
          </p>
          <p className="text-[12px] text-[#cbd5e1]" style={bFont}>
            &copy; 2026 PromptKids. All rights reserved.
          </p>
        </div>

        {/* ── Log Out ─────────────────────────────────────────── */}
        <button
          className="w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 rounded-xl py-3.5 text-[16px] hover:bg-red-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          style={dFont}
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
