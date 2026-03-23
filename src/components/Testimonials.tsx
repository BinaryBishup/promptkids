"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "My daughter in Class 9 finished her entire history project in one evening using tools she learned at PromptKids. I couldn't believe the quality.",
    name: "Priya Sharma",
    location: "DLF Phase 3 · Class 9 parent",
    initials: "PS",
    gradient: "from-pk-blue to-blue-400",
    rating: 5,
  },
  {
    quote:
      "My son was spending 3 hours on homework daily. After 6 weeks with PromptKids, he's done in 90 minutes and the work is better. Game-changer.",
    name: "Rahul Mehta",
    location: "Sohna Road · Class 10 parent",
    initials: "RM",
    gradient: "from-pk-orange to-amber-400",
    rating: 5,
  },
  {
    quote:
      "She built an AI quiz game for her school science fair and won first prize. I was sceptical at first — now I'm the biggest advocate.",
    name: "Anita Kapoor",
    location: "South City · Class 7 parent",
    initials: "AK",
    gradient: "from-pk-green to-emerald-400",
    rating: 5,
  },
  {
    quote:
      "The trainers make it so fun that my son asks to go. He's never asked to go to tuition in his life. That alone tells you everything.",
    name: "Vikram Singh",
    location: "Nirvana Country · Class 8 parent",
    initials: "VS",
    gradient: "from-pk-purple to-violet-400",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".testimonial-card", { opacity: 0 });
      gsap.fromTo(
        ".testimonial-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".testimonials-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white" id="reviews">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Parent reviews</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em]">
            What Gurugram parents are saying
          </h2>
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card bg-pk-gray-light rounded-2xl p-7 border border-pk-gray-border relative group hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-pk-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-[14px] text-pk-navy leading-[1.7] mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-pk-navy">{t.name}</div>
                  <div className="text-[11px] text-pk-gray">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
