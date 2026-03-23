"use client";

import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import HeroBackground from "./HeroBackground";
import { ToolIcon } from "./ToolLogos";
import { useBookTrial } from "./BookTrialContext";

const topTools = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Canva AI", "Midjourney"];

const rotatingWords = ["Command AI.", "Think Smarter.", "Build the Future."];

const studentImages = [
  { src: "/images/student-1.jpg", alt: "Indian boy learning with laptop" },
  { src: "/images/student-3.jpg", alt: "Indian girl in online class" },
  { src: "/images/student-4.jpg", alt: "Indian student smiling with laptop" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const { open: openBookTrial } = useBookTrial();

  // Typing animation — ref-based, no re-renders
  useEffect(() => {
    const el = typingRef.current;
    if (!el) return;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let rafId: number;
    let lastTime = 0;

    const tick = (time: number) => {
      const speed = deleting ? 35 : 70;
      if (time - lastTime < speed) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      const word = rotatingWords[wordIdx];

      if (!deleting) {
        charIdx++;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          // Pause at full word
          setTimeout(() => { rafId = requestAnimationFrame(tick); }, 2000);
          return;
        }
      } else {
        charIdx--;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % rotatingWords.length;
          // Brief pause before next word
          setTimeout(() => { rafId = requestAnimationFrame(tick); }, 300);
          return;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-headline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.4 })
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-cta", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-proof", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-tools", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] bg-pk-navy overflow-hidden flex items-center rounded-b-[2rem] sm:rounded-b-[3rem]" id="hero">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-pk-navy/50 via-pk-navy/30 to-pk-navy/70 z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full">

        {/* Headline with typing animation */}
        <div className="hero-headline text-center mb-5 sm:mb-6 opacity-0">
          <h1 className="text-[clamp(2.4rem,5.8vw,4.8rem)] font-extrabold text-white leading-[1.12] tracking-[-0.02em]">
            <span className="block">Give&nbsp;Your&nbsp;Child a&nbsp;Head&nbsp;Start.</span>
            <span className="block">
              Teach&nbsp;Them to{" "}
              <span className="text-pk-orange inline-block min-w-[3ch]">
                <span ref={typingRef} />
                <span className="inline-block w-[3px] h-[0.85em] bg-pk-orange ml-0.5 align-middle animate-[blink_0.8s_step-end_infinite]" />
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-sub text-center text-[15px] sm:text-[17px] text-white/55 max-w-lg mx-auto mb-8 sm:mb-10 leading-[1.7] opacity-0">
          India&apos;s smartest extra class for <span className="text-white/80 font-medium">Class 6&ndash;12</span>.{" "}
          Master <span className="text-white/80 font-medium">15+ AI tools</span> to study smarter &amp; think&nbsp;bigger.
        </p>

        {/* CTA */}
        <div className="hero-cta opacity-0 flex justify-center mb-10 sm:mb-12 px-4 sm:px-0">
          <button
            onClick={openBookTrial}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-pk-orange text-white text-[15px] font-semibold rounded-xl hover:bg-pk-orange-dark hover:shadow-xl hover:shadow-pk-orange/20 transition-all active:scale-[0.97]"
          >
            Book Free Trial Class <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Social proof */}
        <div className="hero-proof flex items-center justify-center gap-3 mb-12 sm:mb-16 opacity-0">
          <div className="flex -space-x-2.5">
            {studentImages.map((img, i) => (
              <div
                key={i}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-pk-navy overflow-hidden relative bg-white/10 flex-shrink-0"
                style={{ zIndex: studentImages.length - i }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="44px" />
              </div>
            ))}
          </div>
          <span className="text-[12px] sm:text-[13px] text-white/40">
            Join <span className="text-white/70 font-semibold">200+ kids</span> learning AI in Gurugram
          </span>
        </div>

        {/* Tool logos */}
        <div className="hero-tools opacity-0">
          <p className="text-center text-[10px] sm:text-[11px] text-white/25 uppercase tracking-[0.15em] font-medium mb-4">
            Tools they&apos;ll master
          </p>
          <div className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap">
            {topTools.map((name) => (
              <div key={name} className="flex items-center gap-2 sm:gap-2.5 group">
                <ToolIcon name={name} className="w-7 h-7 sm:w-8 sm:h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-[13px] sm:text-[14px] text-white/40 font-medium group-hover:text-white/70 transition-colors">{name}</span>
              </div>
            ))}
            <span className="text-[13px] sm:text-[14px] text-white/25 font-medium">+9 more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
