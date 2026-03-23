"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, Brain, Rocket, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    icon: BookOpen,
    stage: "Before PromptKids",
    items: [
      "Spends 3+ hours on homework daily",
      "Copies answers from Google",
      "Struggles with research projects",
      "No idea how to use AI properly",
    ],
    color: "text-pk-gray",
    bg: "bg-pk-gray-light",
    border: "border-pk-gray-border",
  },
  {
    icon: Brain,
    stage: "After 4 Weeks",
    items: [
      "Finishes homework in 90 minutes",
      "Uses AI to understand, not just copy",
      "Creates study notes automatically",
      "Confident with ChatGPT & Perplexity",
    ],
    color: "text-pk-blue",
    bg: "bg-pk-blue/[0.03]",
    border: "border-pk-blue/20",
  },
  {
    icon: Rocket,
    stage: "After 8 Weeks",
    items: [
      "Builds AI-powered projects independently",
      "Teaches friends and family AI tools",
      "Grades improve noticeably",
      "Has a portfolio of AI projects",
    ],
    color: "text-pk-orange",
    bg: "bg-pk-orange/[0.03]",
    border: "border-pk-orange/20",
  },
  {
    icon: Trophy,
    stage: "After 6 Months",
    items: [
      "AI-fluent — uses 10+ tools confidently",
      "Wins competitions with AI projects",
      "Ready for college/career AI demands",
      "Thinks in systems, not just answers",
    ],
    color: "text-pk-green",
    bg: "bg-pk-green/[0.03]",
    border: "border-pk-green/20",
  },
];

export default function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".transform-card", { opacity: 0 });
      // Animate progress bar
      gsap.fromTo(".transform-progress",
        { scaleX: 0 },
        {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: ".transform-grid", start: "top 70%", end: "bottom 60%", scrub: 1 },
        }
      );

      // Stagger cards
      gsap.fromTo(".transform-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".transform-grid", start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">The journey</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em] mb-4">
            Your child&apos;s transformation roadmap
          </h2>
          <p className="text-[15px] text-pk-gray max-w-lg mx-auto">
            Here&apos;s exactly what happens when your child joins PromptKids. Real milestones, not vague promises.
          </p>
        </div>

        {/* Progress bar */}
        <div className="hidden lg:block relative mb-8 max-w-4xl mx-auto">
          <div className="h-1 bg-pk-gray-border rounded-full">
            <div className="transform-progress h-full bg-gradient-to-r from-pk-gray via-pk-blue via-pk-orange to-pk-green rounded-full origin-left" />
          </div>
        </div>

        <div className="transform-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stages.map((s, i) => (
            <div key={s.stage} className="relative">
              <div className={`transform-card ${s.bg} rounded-2xl border ${s.border} p-6 h-full`}>
                <div className={`inline-flex p-2.5 rounded-xl bg-white mb-4 shadow-sm`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>

                <h3 className={`text-[14px] font-bold ${s.color} mb-4`}>{s.stage}</h3>

                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${s.color === "text-pk-gray" ? "bg-pk-gray/30" : s.color.replace("text-", "bg-")}`} />
                      <span className="text-[12px] text-pk-navy/70 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow connector */}
              {i < 3 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-pk-gray-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
