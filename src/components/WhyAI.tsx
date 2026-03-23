"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, BookCheck, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated counter hook ─── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: start,
    });

    return () => trigger.kill();
  }, [start]);

  return { count, ref };
}

const pillars = [
  {
    icon: Bot,
    label: "LearnBot AI",
    oneLiner: "AI tutor that teaches, not tells",
    desc: "Explains doubts with analogies, creates revision notes, generates MCQs & pulls previous year papers — all adapting to your child's level.",
    textColor: "text-pk-blue",
    lightBg: "bg-pk-blue/8",
    anchor: "#platform",
  },
  {
    icon: BookCheck,
    label: "HomeworkAI",
    oneLiner: "Guides. Never spoon-feeds.",
    desc: "5-level scaffolded help that starts by making your child think. Only escalates if truly stuck — and you get notified at every step.",
    textColor: "text-pk-orange",
    lightBg: "bg-pk-orange/8",
    anchor: "#homework-ai",
  },
  {
    icon: BarChart3,
    label: "Parent Dashboard",
    oneLiner: "You see everything. Always.",
    desc: "Track AI usage, topic understanding, homework completion and get daily WhatsApp reports — so you never have to guess what they learned.",
    textColor: "text-pk-green",
    lightBg: "bg-pk-green/8",
    anchor: "#parent-dashboard",
  },
];

export default function WhyAI() {
  const sectionRef = useRef<HTMLElement>(null);

  const stat1 = useCounter(85, 2000);
  const stat2 = useCounter(40, 1800);
  const stat3 = useCounter(60, 1800);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".why-headline", ".why-bridge", ".pillar-card"], { opacity: 0 });
      gsap.fromTo(".why-headline",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".why-headline", start: "top 85%" } }
      );
      gsap.fromTo(".why-bridge",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".why-bridge", start: "top 85%" } }
      );
      gsap.fromTo(".pillar-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".pillar-cards", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-white" id="about">
      <div className="max-w-5xl mx-auto">

        {/* Headline */}
        <div className="why-headline text-center mb-16 sm:mb-20">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-pk-navy leading-[1.1] tracking-[-0.02em]">
            AI is no longer optional.
          </h2>
          <p className="text-[clamp(1.1rem,2.5vw,1.4rem)] text-pk-text-secondary mt-2 font-medium">
            The question is — will your child lead or follow?
          </p>
        </div>

        {/* Animated counters */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-20 sm:mb-24 max-w-3xl mx-auto">
          {[
            { counter: stat1, suffix: "M", label: "jobs need AI reskilling", sub: "World Economic Forum" },
            { counter: stat2, suffix: "%", label: "faster study with AI tools", sub: "Stanford Research" },
            { counter: stat3, suffix: "%", label: "companies require AI skills", sub: "McKinsey 2024" },
          ].map((s) => (
            <div key={s.label} ref={s.counter.ref} className="text-center">
              <div className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-pk-navy tracking-tight leading-none tabular-nums">
                {s.counter.count}{s.suffix}
              </div>
              <p className="text-[12px] sm:text-[13px] text-pk-text-secondary mt-1 leading-snug">{s.label}</p>
              <span className="text-[10px] text-pk-gray">— {s.sub}</span>
            </div>
          ))}
        </div>

        {/* Bridge */}
        <div className="why-bridge text-center mb-14 sm:mb-16">
          <p className="text-[15px] sm:text-[17px] text-pk-text-secondary max-w-lg mx-auto leading-[1.7] mb-6">
            But giving kids AI without guardrails is risky.
            <br />
            <span className="text-pk-navy font-semibold">That&apos;s why we built three systems</span> — so they learn with AI, not depend on it.
          </p>
          <div className="w-12 h-px bg-pk-orange/40 mx-auto" />
        </div>

        {/* Three pillars */}
        <div className="pillar-cards grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((p) => (
            <Link
              key={p.label}
              href={p.anchor}
              className="pillar-card group block rounded-2xl border border-pk-gray-border bg-pk-gray-light p-6 sm:p-7 hover:border-pk-gray hover:shadow-lg hover:shadow-black/[0.04] transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${p.lightBg} flex items-center justify-center mb-4`}>
                <p.icon className={`w-5 h-5 ${p.textColor}`} />
              </div>
              <div className={`text-[11px] font-bold uppercase tracking-wider ${p.textColor} mb-2`}>{p.label}</div>
              <h3 className="text-[16px] sm:text-[17px] font-bold text-pk-text leading-snug mb-2">{p.oneLiner}</h3>
              <p className="text-[12px] sm:text-[13px] text-pk-text-secondary leading-relaxed mb-4">{p.desc}</p>
              <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${p.textColor} group-hover:gap-2.5 transition-all`}>
                See how <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
