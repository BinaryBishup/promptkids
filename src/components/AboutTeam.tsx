"use client";

import { useScrollReveal } from "@/hooks/useGSAP";

export default function AboutTeam() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={containerRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - terminal */}
          <div data-animate="fade-right">
            <div className="bg-pk-navy rounded-2xl overflow-hidden shadow-2xl shadow-pk-navy/30">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="text-[11px] text-white/20 ml-2 font-mono">promptkids — about</span>
              </div>
              {/* Terminal content */}
              <div className="p-6 font-mono text-[13px] leading-[1.9] space-y-4">
                <div>
                  <span className="text-pk-green">$</span>
                  <span className="text-white/70"> whoami</span>
                </div>
                <div className="text-white/40">
                  <span className="text-pk-blue">educators</span>
                  {" + "}
                  <span className="text-pk-orange">AI practitioners</span>
                </div>
                <div>
                  <span className="text-pk-green">$</span>
                  <span className="text-white/70"> cat mission.txt</span>
                </div>
                <div className="text-white/30 border-l-2 border-pk-blue/30 pl-4 italic">
                  &quot;We saw parents spending lakhs on coaching<br />
                  that teaches the same syllabus — while the<br />
                  world was being transformed by AI.&quot;
                </div>
                <div>
                  <span className="text-pk-green">$</span>
                  <span className="text-white/70"> echo $EXPERIENCE</span>
                </div>
                <div className="text-white/40">10+ years in AI &amp; education</div>
                <div>
                  <span className="text-pk-green">$</span>
                  <span className="text-white/30 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <span data-animate="fade-up" className="eyebrow mb-5 block">Who we are</span>
            <h2 data-animate="fade-up" data-delay="0.1" className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-pk-navy leading-[1.15] tracking-[-0.02em] mb-6">
              Built by educators and AI practitioners — for Gurugram&apos;s next generation
            </h2>
            <p data-animate="fade-up" data-delay="0.2" className="text-[14px] text-pk-gray leading-[1.7] mb-8">
              PromptKids was started by a team that has worked in AI and education for over a
              decade. We built the program we wished existed when we were students.
            </p>

            <div className="space-y-3">
              {[
                {
                  name: "Aashish Soni",
                  role: "Lead Trainer — 8 yrs in EdTech",
                  initials: "AS",
                  gradient: "from-pk-blue to-blue-400",
                },
                {
                  name: "Neha Verma",
                  role: "AI Curriculum Designer — ex-Google",
                  initials: "NV",
                  gradient: "from-pk-orange to-amber-400",
                },
              ].map((person, i) => (
                <div
                  key={person.name}
                  data-animate="fade-up"
                  data-delay={String(0.3 + i * 0.1)}
                  className="flex items-center gap-4 p-4 bg-pk-gray-light rounded-xl border border-pk-gray-border"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${person.gradient} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0`}>
                    {person.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-pk-navy">{person.name}</div>
                    <div className="text-[12px] text-pk-gray">{person.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
