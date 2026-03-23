"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Clock, Presentation, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    name: "Aarav, Class 9",
    school: "DPS Gurugram",
    photo: "/images/student-1.jpg",
    icon: Award,
    iconBg: "bg-pk-orange/10 text-pk-orange",
    achievement: "Won 1st Prize at School Science Fair",
    detail: "Built an AI-powered quiz generator for his school science fair using ChatGPT and Canva. Judges invited him to present at the district level.",
    stat: "1st Place",
    statLabel: "District Science Fair",
  },
  {
    name: "Meera, Class 7",
    school: "The Shri Ram School",
    photo: "/images/student-3.jpg",
    icon: Clock,
    iconBg: "bg-pk-green/10 text-pk-green",
    achievement: "Cut homework time by 40%",
    detail: "Was spending 3+ hours daily on homework. After learning prompt engineering and AI research tools, she finishes in under 90 minutes — with better quality.",
    stat: "40%",
    statLabel: "Less homework time",
  },
  {
    name: "Rohan, Class 11",
    school: "Pathways School",
    photo: "/images/student-2.jpg",
    icon: Presentation,
    iconBg: "bg-pk-blue/10 text-pk-blue",
    achievement: "Built his college application portfolio",
    detail: "Created a no-code AI app that summarises NCERT chapters. Added it to his college applications. Got early acceptance at a UK university.",
    stat: "Early admit",
    statLabel: "UK university",
  },
  {
    name: "Ananya, Class 8",
    school: "GD Goenka",
    photo: "/images/student-4.jpg",
    icon: Lightbulb,
    iconBg: "bg-pk-purple/10 text-pk-purple",
    achievement: "Created an AI comic book series",
    detail: "Combined ChatGPT storytelling with Midjourney illustrations to create a 12-page comic about Indian mythology. Teacher shared it school-wide.",
    stat: "12 pages",
    statLabel: "AI-generated comic",
  },
];

export default function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".story-card", { opacity: 0 });
      gsap.fromTo(".story-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".stories-grid", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow mb-4 block">Real results from real kids</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-4">
            What our students have built
          </h2>
          <p className="text-[15px] text-pk-text-secondary max-w-lg mx-auto">
            These are real projects by real Gurugram kids after just 4–8 weeks at PromptKids.
          </p>
        </div>

        <div className="stories-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {stories.map((s) => (
            <div
              key={s.name}
              className="story-card bg-white rounded-2xl border border-pk-gray-border p-6 sm:p-7 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden relative flex-shrink-0">
                    <Image
                      src={s.photo}
                      alt={s.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-pk-text">{s.name}</div>
                    <div className="text-[11px] text-pk-gray">{s.school}</div>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${s.iconBg}`}>
                  <s.icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-pk-orange mb-2">{s.achievement}</h3>
              <p className="text-[13px] text-pk-text-secondary leading-[1.7] mb-5">{s.detail}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-pk-gray-border">
                <span className="text-2xl font-extrabold text-pk-text">{s.stat}</span>
                <span className="text-[11px] text-pk-gray uppercase tracking-wider font-medium">{s.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
