"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";
import { useBookTrial } from "./BookTrialContext";
import { ToolIcon } from "./ToolLogos";

const programs = [
  {
    name: "AI Explorer",
    badge: "Starter",
    badgeClass: "bg-pk-green/8 text-pk-green border border-pk-green/20",
    age: "Class 6–8 · Age 11–14",
    price: "₹4,999",
    period: "/month",
    icon: Sparkles,
    accentLine: "bg-pk-green",
    features: [
      "What AI is + hands-on demos",
      "ChatGPT for homework (the right way)",
      "Canva AI for school projects",
      "AI image generation & comics",
      "Capstone: AI-powered story",
    ],
    tools: ["ChatGPT", "Canva AI", "Midjourney", "Gemini", "Perplexity"],
    featured: false,
  },
  {
    name: "AI Achiever",
    badge: "Most Popular",
    badgeClass: "bg-pk-blue text-white",
    age: "Class 9–10 · Age 14–16",
    price: "₹7,999",
    period: "/month",
    icon: Star,
    accentLine: "bg-pk-blue",
    features: [
      "Prompt engineering mastery",
      "AI for board exam prep",
      "Research with Perplexity + NotebookLM",
      "Personal AI study toolkit",
      "Capstone: AI study assistant",
    ],
    tools: ["ChatGPT", "Claude", "Perplexity", "NotebookLM", "Canva AI", "Gamma"],
    featured: true,
  },
  {
    name: "AI Launchpad",
    badge: "Advanced",
    badgeClass: "bg-pk-purple/8 text-pk-purple border border-pk-purple/20",
    age: "Class 11–12 · Age 16–18",
    price: "₹9,999",
    period: "/month",
    icon: Rocket,
    accentLine: "bg-pk-purple",
    features: [
      "AI for JEE / NEET / boards",
      "College essay writing with AI",
      "No-code AI app building",
      "LinkedIn + portfolio building",
      "Capstone: AI project for applications",
    ],
    tools: ["ChatGPT", "Claude", "Perplexity", "NotebookLM", "Bolt", "v0", "Zapier", "Gamma"],
    featured: false,
  },
];

export default function Programs() {
  const containerRef = useScrollReveal<HTMLElement>();
  const { open: openBookTrial } = useBookTrial();

  return (
    <section ref={containerRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light" id="programs">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span data-animate="fade-up" className="eyebrow mb-4 block">Our Programs</span>
          <h2 data-animate="fade-up" data-delay="0.1" className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em] mb-4">
            Find the Right Batch for Your Child
          </h2>
          <p data-animate="fade-up" data-delay="0.15" className="text-[15px] text-pk-gray max-w-lg mx-auto">
            8 sessions per month. Max 12 students. First class always free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <div
              key={p.name}
              data-animate="fade-up"
              data-delay={String(i * 0.1)}
              className={`relative group rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                p.featured
                  ? "bg-pk-navy text-white shadow-2xl shadow-pk-navy/20 ring-1 ring-white/10"
                  : "bg-white border border-pk-gray-border hover:shadow-xl hover:shadow-black/[0.04]"
              }`}
            >
              <div className={`h-1 ${p.accentLine}`} />

              <div className="p-7 flex flex-col flex-1">
                <span className={`inline-flex self-start px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md mb-5 ${p.badgeClass}`}>
                  {p.badge}
                </span>

                <div className="flex items-center gap-2.5 mb-1">
                  <p.icon className={`w-5 h-5 ${p.featured ? "text-pk-blue-light" : "text-pk-gray"}`} />
                  <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                </div>

                <p className={`text-[13px] mb-5 ${p.featured ? "text-white/40" : "text-pk-gray"}`}>
                  {p.age}
                </p>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold tracking-tight">{p.price}</span>
                  <span className={`text-[13px] ${p.featured ? "text-white/40" : "text-pk-gray"}`}>
                    {p.period}
                  </span>
                </div>

                {/* Tools covered */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                        p.featured
                          ? "bg-white/[0.06] text-white/50 border border-white/[0.08]"
                          : "bg-pk-gray-light text-pk-gray border border-pk-gray-border"
                      }`}
                    >
                      <ToolIcon name={tool} className="w-3 h-3 flex-shrink-0" />
                      {tool}
                    </span>
                  ))}
                </div>

                <div className={`h-px mb-5 ${p.featured ? "bg-white/10" : "bg-pk-gray-border"}`} />

                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.featured ? "text-pk-blue-light" : "text-pk-green"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-[13px] leading-snug ${p.featured ? "text-white/60" : "text-pk-gray"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openBookTrial}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-xl text-[13px] transition-all active:scale-[0.98] w-full ${
                    p.featured
                      ? "bg-white text-pk-navy hover:shadow-lg hover:shadow-white/10"
                      : "bg-pk-navy text-white hover:bg-pk-navy-light"
                  }`}
                >
                  Book Free Trial <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p data-animate="fade-up" className="text-center text-[13px] text-pk-gray mt-8">
          No registration fee. No hidden charges. First class always free. Full refund if not satisfied after month 1.
        </p>
      </div>
    </section>
  );
}
