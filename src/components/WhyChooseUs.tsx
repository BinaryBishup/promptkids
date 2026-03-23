"use client";

import { Target, RefreshCw, BarChart3, School } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";

const features = [
  {
    icon: Target,
    title: "Small batches only",
    desc: "Max 15 students per batch. Every child gets personal attention, not a lecture hall experience.",
    iconBg: "bg-pk-orange/10 text-pk-orange",
  },
  {
    icon: RefreshCw,
    title: "Always updated curriculum",
    desc: "AI tools change every 3 months. Our content updates with them. No outdated material.",
    iconBg: "bg-pk-blue/10 text-pk-blue",
  },
  {
    icon: BarChart3,
    title: "Results parents can see",
    desc: "We show you exactly what your child built, learned, and improved every month.",
    iconBg: "bg-pk-green/10 text-pk-green",
  },
  {
    icon: School,
    title: "School-aligned learning",
    desc: "Our curriculum complements board syllabus. Better AI skills = better school performance.",
    iconBg: "bg-pk-purple/10 text-pk-purple",
  },
];

export default function WhyChooseUs() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={containerRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <span data-animate="fade-up" className="eyebrow mb-5 block">Why choose us</span>
            <h2 data-animate="fade-up" data-delay="0.1" className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-text leading-[1.12] tracking-[-0.02em] mb-6">
              We don&apos;t teach kids{" "}
              <span className="italic text-pk-gray font-normal">about</span> AI.
              <br />
              We teach them to{" "}
              <span className="text-pk-orange">use it.</span>
            </h2>
            <p data-animate="fade-up" data-delay="0.2" className="text-[15px] text-pk-text-secondary leading-[1.7] max-w-md">
              Every session is hands-on. Students work with real AI tools from day one —
              not theory slides. That&apos;s why parents see results within weeks.
            </p>
          </div>

          {/* Right - 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                data-animate="fade-up"
                data-delay={String(0.1 + i * 0.08)}
                className="bg-white rounded-2xl p-6 border border-pk-gray-border hover:shadow-md transition-all"
              >
                <div className={`inline-flex p-2.5 rounded-xl ${f.iconBg} mb-4`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[14px] font-bold text-pk-text mb-1.5">{f.title}</h3>
                <p className="text-[13px] text-pk-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
