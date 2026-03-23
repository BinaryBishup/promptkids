"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ChevronDown, Sparkles, Code, Palette, BarChart3, PenLine, Search, Lightbulb, Rocket, User } from "lucide-react";
import gsap from "gsap";
import { useBookTrial } from "./BookTrialContext";

const navLinks = [
  { label: "Programs", href: "/#programs" },
  { label: "Platform", href: "/#platform" },
  {
    label: "Use Cases",
    href: "/use-cases",
    dropdown: true,
    items: [
      { icon: PenLine, label: "Content Creation", desc: "Videos, blogs, social media & more", href: "/use-cases#content-creation" },
      { icon: Search, label: "Research & Writing", desc: "Academic research, essays, reports", href: "/use-cases#research" },
      { icon: Code, label: "Coding & App Building", desc: "Websites, apps, automation scripts", href: "/use-cases#coding" },
      { icon: Palette, label: "Design & Visual Arts", desc: "Graphics, presentations, branding", href: "/use-cases#design" },
      { icon: BarChart3, label: "Data & Analysis", desc: "Spreadsheets, charts, insights", href: "/use-cases#data" },
      { icon: Rocket, label: "Entrepreneurship", desc: "Business plans, marketing, pitching", href: "/use-cases#entrepreneurship" },
    ],
  },
  { label: "Pricing", href: "/#programs" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileUseCasesOpen, setMobileUseCasesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: openBookTrial } = useBookTrial();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm shadow-black/[0.03] border-b border-black/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 lg:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
          <span className="font-mono text-xs sm:text-sm font-bold text-pk-blue bg-pk-blue/8 group-hover:bg-pk-blue/15 px-1.5 py-0.5 rounded transition-colors">{`>_`}</span>
          <span className={`text-sm sm:text-[15px] font-bold transition-colors ${scrolled ? "text-pk-navy" : "text-white"}`}>
            Prompt<span className="text-pk-orange">Kids</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                    scrolled
                      ? "text-pk-gray hover:text-pk-text hover:bg-pk-gray-light"
                      : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </Link>

                {/* Mega dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="w-[480px] bg-white rounded-2xl shadow-xl shadow-black/[0.08] border border-pk-gray-border p-2 grid grid-cols-2 gap-1">
                      {item.items!.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-pk-gray-light transition-colors group/item"
                        >
                          <div className="p-2 rounded-lg bg-pk-orange/8 group-hover/item:bg-pk-orange/15 transition-colors flex-shrink-0">
                            <sub.icon className="w-4 h-4 text-pk-orange" />
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-pk-text">{sub.label}</div>
                            <div className="text-[11px] text-pk-text-secondary leading-snug">{sub.desc}</div>
                          </div>
                        </Link>
                      ))}

                      {/* Bottom CTA in dropdown */}
                      <div className="col-span-2 border-t border-pk-gray-border mt-1 pt-2 px-3 pb-2">
                        <Link
                          href="/use-cases"
                          className="flex items-center justify-between text-[12px] font-semibold text-pk-blue hover:text-pk-blue-dark transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> View all use cases & skill paths
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                  scrolled
                    ? "text-pk-gray hover:text-pk-text hover:bg-pk-gray-light"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/login"
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${
              scrolled
                ? "text-pk-text-secondary hover:text-pk-text hover:bg-pk-gray-light"
                : "text-white/60 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Login
          </Link>
          <button
            onClick={openBookTrial}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pk-orange text-white text-[13px] font-semibold rounded-lg hover:bg-pk-orange-dark transition-all hover:shadow-lg hover:shadow-pk-orange/20 active:scale-[0.97]"
          >
            Book Free Class <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-1.5 rounded-lg active:bg-white/10 ${scrolled ? "text-pk-navy" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-14 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileUseCasesOpen(!mobileUseCasesOpen)}
                    className="w-full flex items-center justify-between text-sm text-pk-text font-medium py-3 px-3 rounded-lg active:bg-pk-gray-light"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 text-pk-gray transition-transform ${mobileUseCasesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileUseCasesOpen && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.items!.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg active:bg-pk-gray-light"
                          onClick={() => setMobileOpen(false)}
                        >
                          <sub.icon className="w-4 h-4 text-pk-orange flex-shrink-0" />
                          <div>
                            <div className="text-[13px] font-medium text-pk-text">{sub.label}</div>
                            <div className="text-[11px] text-pk-text-secondary">{sub.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-pk-text font-medium py-3 px-3 rounded-lg active:bg-pk-gray-light"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="border-t border-pk-gray-border pt-4 mt-4 space-y-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-pk-text-secondary text-sm font-medium rounded-xl border border-pk-gray-border active:bg-pk-gray-light"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4" /> Login
              </Link>
              <button
                className="block w-full text-center px-4 py-2.5 bg-pk-orange text-white text-sm font-semibold rounded-xl active:scale-[0.97]"
                onClick={() => { setMobileOpen(false); openBookTrial(); }}
              >
                Book Free Class
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
