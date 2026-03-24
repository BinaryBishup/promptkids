"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  User,
  ChevronRight,
  CalendarDays,
  Award,
  Library,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const dFont = { fontFamily: "var(--font-display)", fontWeight: 900 } as const;
const bFont = { fontFamily: "var(--font-body)", fontWeight: 500 } as const;

interface Breadcrumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface AppHeaderProps {
  breadcrumbs?: Breadcrumb[];
  /** Optional right-side content (e.g. XP badge, submit button) */
  rightContent?: React.ReactNode;
  /** Optional context info shown next to breadcrumbs (e.g. "Attempts: 2") */
  contextInfo?: React.ReactNode;
}

export default function AppHeader({ breadcrumbs, rightContent, contextInfo }: AppHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-[2.5px] border-[#eef0f4] h-[64px] flex items-center justify-between px-5 gap-4">
      {/* Left: Back + Logo + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Back button (if breadcrumbs exist) */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <>
            {breadcrumbs[0].href ? (
              <Link href={breadcrumbs[0].href} className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 no-underline">
                <ArrowLeft size={18} className="text-[#6b7280]" />
              </Link>
            ) : breadcrumbs[0].onClick ? (
              <button onClick={breadcrumbs[0].onClick} className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer">
                <ArrowLeft size={18} className="text-[#6b7280]" />
              </button>
            ) : null}
            <div className="w-px h-5 bg-[#e5e7eb] flex-shrink-0" />
          </>
        )}

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0 no-underline">
          <span className="font-mono text-xs font-bold text-[#2563eb] bg-[#2563eb]/10 px-1.5 py-0.5 rounded">{`>_`}</span>
          <span className="text-[15px] text-[#0f172a] hidden sm:inline" style={dFont}>
            Prompt<span className="text-[#f97316]">Kids</span>
          </span>
        </Link>

        {/* Breadcrumb labels */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <>
            <div className="w-px h-5 bg-[#e5e7eb] flex-shrink-0" />
            <div className="flex items-center gap-1.5 min-w-0">
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-1.5 min-w-0">
                  {i > 0 && <ChevronRight size={14} className="text-[#d1d5db] flex-shrink-0" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className={`text-[13px] truncate no-underline ${i === breadcrumbs.length - 1 ? "text-[#0f172a]" : "text-[#94a3b8] hover:text-[#6b7280]"}`} style={i === breadcrumbs.length - 1 ? dFont : bFont}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={`text-[13px] truncate ${i === breadcrumbs.length - 1 ? "text-[#0f172a]" : "text-[#94a3b8]"}`} style={i === breadcrumbs.length - 1 ? dFont : bFont}>
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Context info */}
        {contextInfo && (
          <>
            <div className="w-px h-5 bg-[#e5e7eb] flex-shrink-0 hidden md:block" />
            <div className="hidden md:flex items-center gap-3">
              {contextInfo}
            </div>
          </>
        )}
      </div>

      {/* Right: custom content + bell + user */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {rightContent}

        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
          <Bell className="w-5 h-5 text-[#6b7280]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f97316] rounded-full border-2 border-white" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full bg-gray-100 border-2 border-[#e5e7eb] flex items-center justify-center hover:border-[#7c3aed]/40 transition-all duration-200 cursor-pointer"
          >
            <User className="w-4 h-4 text-[#6b7280]" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-12 w-[260px] bg-white rounded-2xl shadow-2xl border-2 border-[#e5e7eb] z-50 overflow-hidden">
                <div className="px-5 pt-5 pb-3 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center mb-2">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[15px] text-[#0f172a]" style={dFont}>Arjun Sharma</p>
                  <p className="text-[12px] text-[#94a3b8]" style={bFont}>Class 10 - Section A</p>
                </div>

                <div className="px-5 pb-3 flex gap-2">
                  <div className="flex-1 bg-[#2563eb]/8 rounded-lg px-2.5 py-2">
                    <p className="text-[14px] text-[#2563eb]" style={dFont}>Level 7</p>
                    <p className="text-[11px] text-[#94a3b8]" style={bFont}>340 XP</p>
                  </div>
                  <div className="flex-1 bg-[#f59e0b]/8 rounded-lg px-2.5 py-2">
                    <p className="text-[14px] text-[#f59e0b]" style={dFont}>8</p>
                    <p className="text-[11px] text-[#94a3b8]" style={bFont}>Badges</p>
                  </div>
                </div>

                <div className="border-t border-[#e5e7eb]">
                  {[
                    { icon: User, label: "My Profile", href: "/profile" },
                    { icon: CalendarDays, label: "My Schedule", href: "/schedule" },
                    { icon: Award, label: "Achievements", href: "/achievements" },
                    { icon: Library, label: "My Library", href: "/study-hub" },
                    { icon: Settings, label: "Settings", href: "/settings" },
                  ].map((item) => (
                    <Link key={item.label} href={item.href} className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors no-underline">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-[#6b7280]" />
                        </div>
                        <span className="text-[13px] text-[#374151]" style={bFont}>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#d1d5db]" />
                    </Link>
                  ))}
                </div>

                <div className="border-t border-[#e5e7eb] p-3">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer" style={dFont}>
                    <LogOut className="w-4 h-4" />
                    <span className="text-[13px]">Log Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
