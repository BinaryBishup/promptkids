"use client";

import { CalendarCheck, ListChecks, Laptop, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a free class",
    desc: "No commitment, no payment. Just show up and see what your child learns in 90 minutes.",
    color: "text-pk-blue",
    bg: "bg-pk-blue/8",
    num: "01",
  },
  {
    icon: ListChecks,
    title: "Choose your program",
    desc: "Pick the right tier for your child's age and goals. Weekend or weekday batches available.",
    color: "text-pk-orange",
    bg: "bg-pk-orange/8",
    num: "02",
  },
  {
    icon: Laptop,
    title: "Learn by doing",
    desc: "Small batches of 12 kids. Hands-on every session. Real tools, real results from day one.",
    color: "text-pk-green",
    bg: "bg-pk-green/8",
    num: "03",
  },
  {
    icon: TrendingUp,
    title: "Watch them grow",
    desc: "Monthly progress updates for parents. Certificate on completion. Skills that last a lifetime.",
    color: "text-pk-purple",
    bg: "bg-pk-purple/8",
    num: "04",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".step-card", { opacity: 0 });
      // Animate the connecting line
      gsap.fromTo(
        ".progress-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Stagger step cards
      gsap.fromTo(
        ".step-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">It&apos;s simple</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em]">
            From curious to capable in 4 steps
          </h2>
        </div>

        {/* Steps */}
        <div className="steps-container relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-pk-gray-border">
            <div className="progress-line-fill absolute inset-0 bg-pk-blue origin-left" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step) => (
              <div key={step.title} className="step-card relative text-center">
                {/* Number + icon */}
                <div className="relative inline-flex mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center relative z-10`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <span className="absolute -top-2 -right-3 text-[11px] font-bold text-pk-gray/30 bg-white px-1">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-pk-navy mb-2">{step.title}</h3>
                <p className="text-[13px] text-pk-gray leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
