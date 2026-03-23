"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";

const articles = [
  {
    title: "5 AI tools every Class 10 student should be using right now",
    category: "AI Tools",
    categoryBg: "bg-pk-blue/8 text-pk-blue",
    desc: "From ChatGPT to Perplexity — the essential toolkit for smarter studying.",
    readTime: "5 min read",
  },
  {
    title: "How we helped a Class 8 student cut homework time by 40%",
    category: "Case Study",
    categoryBg: "bg-pk-green/8 text-pk-green",
    desc: "Riya used to spend 3 hours on homework. Here's what changed after 6 weeks.",
    readTime: "4 min read",
  },
  {
    title: "Is your child AI-ready? Take this 2-minute quiz",
    category: "Quiz",
    categoryBg: "bg-pk-orange/8 text-pk-orange",
    desc: "A quick assessment to understand where your child stands with AI literacy.",
    readTime: "2 min read",
  },
];

export default function Blog() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={containerRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-pk-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span data-animate="fade-up" className="eyebrow mb-4 block">Resources for parents</span>
            <h2 data-animate="fade-up" data-delay="0.1" className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em]">
              From the PromptKids blog
            </h2>
          </div>
          <Link
            href="#"
            data-animate="fade-up"
            data-delay="0.2"
            className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-pk-blue hover:text-pk-blue-dark transition-colors"
          >
            View all posts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <Link
              key={a.title}
              href="#"
              data-animate="fade-up"
              data-delay={String(i * 0.1)}
              className="group bg-white rounded-2xl border border-pk-gray-border overflow-hidden hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image area */}
              <div className="h-40 bg-pk-navy relative overflow-hidden">
                <div className="absolute inset-0 dot-grid-dark" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-white/[0.06] text-[80px] font-extrabold">{`>_`}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md ${a.categoryBg}`}>
                    {a.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[15px] font-bold text-pk-navy mb-2 group-hover:text-pk-blue transition-colors leading-snug">
                  {a.title}
                </h3>
                <p className="text-[13px] text-pk-gray leading-relaxed mb-4">{a.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-pk-gray/50 font-medium">{a.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-pk-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
