"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users, IndianRupee } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";

export default function SummerCamp() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={containerRef} className="py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          data-animate="scale"
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-pk-orange via-pk-orange to-pk-orange-dark p-px"
        >
          <div className="relative rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-pk-orange via-pk-orange to-pk-orange-dark px-8 py-12 md:px-14 md:py-14 overflow-hidden">
            {/* Noise grain */}
            <div className="grain absolute inset-0" />

            {/* Geometric decorations */}
            <div className="absolute top-6 right-6 w-20 h-20 border border-white/10 rounded-full" />
            <div className="absolute top-10 right-10 w-12 h-12 border border-white/10 rounded-full" />
            <div className="absolute bottom-8 right-1/3 w-16 h-16 border border-white/10 rounded-2xl rotate-12" />

            <div className="relative z-10">
              <div data-animate="fade-up" className="max-w-xl mb-8">
                <span className="inline-flex items-center px-3 py-1 bg-white/15 text-white text-[11px] font-bold tracking-wider uppercase rounded-md mb-5">
                  Limited Seats
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-[-0.02em] mb-3">
                  AI Summer Camp 2025
                </h2>
                <p className="text-lg text-white/70 font-medium">
                  10 Days. Real Skills. Unforgettable.
                </p>
                <p data-animate="fade-up" data-delay="0.1" className="text-[14px] text-white/50 leading-relaxed mt-3">
                  A hands-on AI intensive for Class 6–12 students. Limited to 20 seats.
                </p>
              </div>

              <div data-animate="fade-up" data-delay="0.2" className="flex flex-wrap gap-5 mb-8">
                {[
                  { icon: Calendar, text: "May 19–30, 2025" },
                  { icon: MapPin, text: "DLF Phase 2, Gurugram" },
                  { icon: Users, text: "Class 6–12" },
                  { icon: IndianRupee, text: "₹6,000 Early Bird" },
                ].map((d) => (
                  <div key={d.text} className="flex items-center gap-2">
                    <d.icon className="w-3.5 h-3.5 text-white/50" />
                    <span className="text-[13px] font-medium text-white/80">{d.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#book"
                data-animate="fade-up"
                data-delay="0.3"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-pk-orange font-bold text-[14px] rounded-xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-[0.98]"
              >
                Reserve Your Seat <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
