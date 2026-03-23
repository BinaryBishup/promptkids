"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "My child has no tech background. Is this still okay?",
    a: "Absolutely. We start from zero. No coding knowledge, no prior AI exposure needed. We've taught complete beginners from Class 6 successfully.",
  },
  {
    q: "Will this distract from board exam preparation?",
    a: "The opposite. Students learn to use AI to study faster — summarising chapters, generating practice MCQs, organising notes. Most parents report improvement in school grades within 8 weeks.",
  },
  {
    q: "Are the classes online or offline?",
    a: "All classes are conducted online on Saturdays and Sundays. This means your child can learn from anywhere — all they need is a laptop and an internet connection.",
  },
  {
    q: "How long is each session?",
    a: "90 minutes, twice a week. That's 3 hours of learning per week — enough to build real skills without overwhelming school schedules.",
  },
  {
    q: "What happens after the course ends?",
    a: "Students receive a PromptKids certificate and access to our private alumni community where we share new tools and prompt packs every month.",
  },
  {
    q: "What's the refund policy?",
    a: "If after the first paid month you feel it isn't working, we'll refund in full. No questions asked.",
  },
];

function FAQItem({ faq, index, open, setOpen }: {
  faq: (typeof faqs)[0]; index: number; open: number | null; setOpen: (v: number | null) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = open === index;

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      gsap.fromTo(contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-pk-gray-border last:border-0">
      <button
        onClick={() => setOpen(isOpen ? null : index)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[14px] font-semibold text-pk-navy pr-6 group-hover:text-pk-blue transition-colors">
          {faq.q}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isOpen ? "bg-pk-navy text-white" : "bg-pk-gray-light text-pk-gray"}`}>
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="text-[14px] text-pk-gray leading-[1.7] pb-5 pr-12">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-col",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".faq-grid", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const mid = Math.ceil(faqs.length / 2);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow mb-4 block">Got questions?</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em]">
            Everything parents ask us
          </h2>
        </div>

        <div className="faq-grid grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div className="faq-col opacity-0">
            {faqs.slice(0, mid).map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} open={open} setOpen={setOpen} />
            ))}
          </div>
          <div className="faq-col opacity-0">
            {faqs.slice(mid).map((faq, i) => (
              <FAQItem key={i + mid} faq={faq} index={i + mid} open={open} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
