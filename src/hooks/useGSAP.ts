"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll("[data-animate]");

    const tweens: gsap.core.Tween[] = [];

    children.forEach((child) => {
      const el = child as HTMLElement;
      const type = el.dataset.animate || "fade-up";
      const delay = parseFloat(el.dataset.delay || "0");
      const duration = parseFloat(el.dataset.duration || "0.8");

      const from: gsap.TweenVars = { opacity: 0 };
      const to: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      };

      switch (type) {
        case "fade-up":
          from.y = 40;
          to.y = 0;
          break;
        case "fade-down":
          from.y = -40;
          to.y = 0;
          break;
        case "fade-left":
          from.x = 60;
          to.x = 0;
          break;
        case "fade-right":
          from.x = -60;
          to.x = 0;
          break;
        case "scale":
          from.y = 20;
          to.y = 0;
          break;
        case "blur":
          from.filter = "blur(10px)";
          to.filter = "blur(0px)";
          break;
        case "clip-up":
          from.clipPath = "inset(100% 0% 0% 0%)";
          to.clipPath = "inset(0% 0% 0% 0%)";
          break;
        case "clip-left":
          from.clipPath = "inset(0% 100% 0% 0%)";
          to.clipPath = "inset(0% 0% 0% 0%)";
          break;
      }

      tweens.push(gsap.fromTo(el, from, to));
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return ref;
}

export function useTextSplit() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const text = ref.current.textContent || "";
    const words = text.split(" ");
    ref.current.innerHTML = words
      .map(
        (word, i) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full" style="transition-delay: ${i * 0.04}s">${word}</span></span>`
      )
      .join(" ");

    const spans = ref.current.querySelectorAll("span > span");

    const tween = gsap.to(spans, {
      y: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return ref;
}

export function useMagneticHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
