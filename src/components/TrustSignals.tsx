"use client";

import { useScrollReveal } from "@/hooks/useGSAP";
import { Star, Shield, Users, GraduationCap, BadgeCheck } from "lucide-react";

export default function TrustSignals() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={containerRef} className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white border-y border-pk-gray-border">
      <div className="max-w-6xl mx-auto">
        {/* Trust row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4 items-center">
          {/* Google Reviews */}
          <div data-animate="fade-up" className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="ml-1">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 text-pk-yellow fill-pk-yellow" />
                  ))}
                </div>
                <span className="text-[11px] text-pk-gray font-medium">4.9/5 on Google (47 reviews)</span>
              </div>
            </div>
          </div>


          {/* Verified */}
          <div data-animate="fade-up" data-delay="0.1" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-pk-green" />
            <div>
              <span className="text-[12px] font-bold text-pk-navy block">Verified & Safe</span>
              <span className="text-[10px] text-pk-gray">Background-checked trainers</span>
            </div>
          </div>


          {/* School partnerships */}
          <div data-animate="fade-up" data-delay="0.2" className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-pk-blue" />
            <div>
              <span className="text-[12px] font-bold text-pk-navy block">6 School Partners</span>
              <span className="text-[10px] text-pk-gray">DPS, Shri Ram, Pathways & more</span>
            </div>
          </div>


          {/* Parent community */}
          <div data-animate="fade-up" data-delay="0.3" className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pk-orange" />
            <div>
              <span className="text-[12px] font-bold text-pk-navy block">200+ Parents Trust Us</span>
              <span className="text-[10px] text-pk-gray">Active WhatsApp community</span>
            </div>
          </div>


          {/* Certified */}
          <div data-animate="fade-up" data-delay="0.4" className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-pk-purple" />
            <div>
              <span className="text-[12px] font-bold text-pk-navy block">Certified Program</span>
              <span className="text-[10px] text-pk-gray">Recognized AI curriculum</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
