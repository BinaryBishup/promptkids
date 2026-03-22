"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Trial Class", href: "#" },
  { label: "Degrees", href: "#", hasDropdown: true },
  { label: "Fees", href: "#" },
  { label: "About", href: "#", hasDropdown: true },
  { label: "Join Us", href: "#", hasDropdown: true },
  { label: "Blog", href: "#" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-purple rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" rx="1" fill="#7c5cfc" />
              <rect x="11" y="3" width="6" height="6" rx="1" fill="#7c5cfc" />
              <rect x="3" y="11" width="6" height="6" rx="1" fill="#7c5cfc" />
              <rect x="11" y="11" width="6" height="6" rx="1" fill="#7c5cfc" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-wide">
            kidocode
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {item.label}
              {item.hasDropdown && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="mt-0.5"
                >
                  <path
                    d="M3 5L6 8L9 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="#"
          className="hidden lg:inline-flex px-6 py-3 border-2 border-purple text-white text-sm font-semibold rounded-full hover:bg-purple transition-colors"
        >
          Apply for Trial Class
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden px-6 pb-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#"
            className="inline-flex justify-center px-6 py-3 border-2 border-purple text-white text-sm font-semibold rounded-full hover:bg-purple transition-colors"
          >
            Apply for Trial Class
          </Link>
        </nav>
      )}
    </header>
  );
}
