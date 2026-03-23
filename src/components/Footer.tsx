"use client";

import Link from "next/link";
import { MapPin, Clock, Monitor, Mail, Phone, ArrowRight, Check } from "lucide-react";
import { useBookTrial } from "./BookTrialContext";

export default function Footer() {
  const { open: openBookTrial } = useBookTrial();

  return (
    <footer className="bg-pk-navy relative overflow-hidden" id="book">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pk-blue/[0.05] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pk-orange/[0.03] rounded-full blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        {/* ── CTA Section ── */}
        <div className="pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-5">
              Your child&apos;s AI journey
              <br />
              starts with{" "}
              <span className="text-pk-orange">one free class.</span>
            </h2>
            <p className="text-[15px] sm:text-base text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
              No commitment. No payment. Just 90 minutes that could change how your child studies, creates, and thinks.
            </p>

            {/* CTA button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={openBookTrial}
                className="group inline-flex items-center gap-2.5 px-10 py-4 bg-pk-orange text-white font-bold text-[15px] rounded-xl hover:bg-pk-orange-dark transition-all shadow-xl shadow-pk-orange/20 active:scale-[0.98]"
              >
                Book Free Trial Class
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {[
                "First class completely free",
                "Batches starting every month",
                "Gurugram\u2019s only AI program for kids",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pk-green/60" />
                  <span className="text-[12px] text-white/40 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer Content ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Logo + tagline + newsletter */}
            <div className="sm:col-span-2 lg:col-span-4">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="font-mono text-sm font-bold text-pk-blue bg-pk-blue/10 px-1.5 py-0.5 rounded">{`>_`}</span>
                <span className="text-base font-bold text-white">
                  Prompt<span className="text-pk-orange">Kids</span>
                </span>
              </Link>
              <p className="text-sm text-white/40 mb-6 leading-relaxed max-w-xs">
                Where curious kids become AI-ready kids. India&apos;s first dedicated AI learning program for Class 6–12.
              </p>

              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                Weekly AI tips for your child
              </p>
              <form className="flex max-w-xs" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="parent@email.com"
                  aria-label="Email address for newsletter"
                  className="flex-1 min-w-0 px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-l-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-pk-blue/40 transition-colors"
                />
                <button type="submit" className="px-4 py-2.5 bg-pk-blue text-white text-[11px] font-bold rounded-r-xl hover:bg-pk-blue-dark transition-colors uppercase tracking-wider">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Programs */}
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-5">Programs</h4>
              <ul className="space-y-3">
                {[
                  { label: "AI Explorer", href: "/#programs" },
                  { label: "AI Achiever", href: "/#programs" },
                  { label: "AI Launchpad", href: "/#programs" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-white/35 hover:text-white/70 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-5">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Use Cases", href: "/use-cases" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-white/35 hover:text-white/70 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-5">Get in Touch</h4>
              <ul className="space-y-3.5">
                <li className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-pk-blue/60 flex-shrink-0" />
                  <span className="text-[13px] text-white/40">100% Online classes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-pk-orange/60 flex-shrink-0" />
                  <span className="text-[13px] text-white/40">Saturdays & Sundays only</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-pk-green/60 flex-shrink-0" />
                  <span className="text-[13px] text-white/40">hello@promptkids.in</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-pk-purple/60 flex-shrink-0" />
                  <span className="text-[13px] text-white/40">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-pk-green/60 flex-shrink-0" />
                  <span className="text-[13px] text-white/40">Based in Gurugram, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/25">
              &copy; 2025 PromptKids
            </p>
            <p className="text-[11px] text-white/25">
              Made with &hearts; in Gurugram
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
