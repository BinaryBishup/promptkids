"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".cta-heading", ".cta-sub", ".cta-button", ".cta-trust"], { opacity: 0 });
      gsap.fromTo(".cta-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-heading", start: "top 85%" } }
      );
      gsap.fromTo(".cta-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-sub", start: "top 85%" } }
      );
      gsap.fromTo(".cta-button",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".cta-button", start: "top 90%" } }
      );
      gsap.fromTo(".cta-trust",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.4, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-trust", start: "top 90%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-pk-navy overflow-hidden dot-grid-dark grain" id="book">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pk-blue/[0.06] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pk-orange/[0.04] rounded-full blur-[120px]" />

      {/* Grid lines */}
      <div className="absolute inset-0">
        <div className="absolute left-[25%] top-0 bottom-0 w-px bg-white/[0.02]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/[0.02]" />
        <div className="absolute left-[75%] top-0 bottom-0 w-px bg-white/[0.02]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="cta-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-6">
          Your child&apos;s AI journey
          <br />
          starts with{" "}
          <span className="text-pk-orange">one free class.</span>
        </h2>
        <p className="cta-sub text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
          No commitment. No payment. Just 90 minutes that could change how your child
          studies, creates, and thinks — forever.
        </p>

        <Link
          href="#"
          className="cta-button group inline-flex items-center gap-2.5 px-10 py-4 bg-pk-orange text-white font-bold text-[15px] rounded-xl hover:bg-pk-orange-dark transition-all shadow-xl shadow-pk-orange/20 active:scale-[0.98]"
        >
          Book Free Trial Class
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          {[
            "First class completely free",
            "Batches starting every month",
            "Gurugram's only AI program for kids",
          ].map((item) => (
            <div key={item} className="cta-trust flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-pk-green/60" />
              <span className="text-[12px] text-white/40 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
