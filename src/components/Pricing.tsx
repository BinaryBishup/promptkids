"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";

const plans = [
  {
    name: "AI Explorer",
    age: "Class 6–8",
    price: "₹3,500",
    priceSuffix: "–5,000/mo",
    accent: "bg-pk-green",
    features: [
      "8 sessions/month (2x/week)",
      "Max 12 students per batch",
      "All materials included",
      "Monthly progress report",
      "Completion certificate",
    ],
    featured: false,
  },
  {
    name: "AI Achiever",
    age: "Class 9–10",
    price: "₹6,000",
    priceSuffix: "–8,000/mo",
    accent: "bg-pk-blue",
    features: [
      "8 sessions/month (2x/week)",
      "Max 12 students per batch",
      "All materials included",
      "Monthly progress report",
      "Completion certificate",
      "Personal AI study toolkit",
    ],
    featured: true,
  },
  {
    name: "AI Launchpad",
    age: "Class 11–12",
    price: "₹8,000",
    priceSuffix: "–12,000/mo",
    accent: "bg-pk-purple",
    features: [
      "8 sessions/month (2x/week)",
      "Max 12 students per batch",
      "All materials included",
      "Monthly progress report",
      "Completion certificate",
      "Portfolio + LinkedIn review",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={containerRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span data-animate="fade-up" className="eyebrow mb-4 block">Transparent pricing</span>
          <h2 data-animate="fade-up" data-delay="0.1" className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em]">
            Simple, honest fees
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              data-animate="fade-up"
              data-delay={String(i * 0.1)}
              className={`relative rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "bg-pk-navy text-white shadow-2xl shadow-pk-navy/20 ring-1 ring-white/10"
                  : "bg-pk-gray-light border border-pk-gray-border hover:shadow-xl hover:shadow-black/[0.04]"
              }`}
            >
              <div className={`h-1 ${plan.accent}`} />
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-base font-bold mb-0.5">{plan.name}</h3>
                <p className={`text-[13px] mb-5 ${plan.featured ? "text-white/40" : "text-pk-gray"}`}>
                  {plan.age}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={`text-[13px] ${plan.featured ? "text-white/40" : "text-pk-gray"}`}>
                    {plan.priceSuffix}
                  </span>
                </div>

                <div className={`h-px mb-6 ${plan.featured ? "bg-white/10" : "bg-pk-gray-border"}`} />

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.featured ? "text-pk-blue-light" : "text-pk-green"}`} />
                      <span className={`text-[13px] ${plan.featured ? "text-white/60" : "text-pk-gray"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#book"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-xl text-[13px] transition-all active:scale-[0.98] ${
                    plan.featured
                      ? "bg-white text-pk-navy hover:shadow-lg"
                      : "bg-pk-navy text-white hover:bg-pk-navy-light"
                  }`}
                >
                  Book Free Trial <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p data-animate="fade-up" className="text-center text-[13px] text-pk-gray">
          No registration fee. No hidden charges. First class always free.
        </p>
      </div>
    </section>
  );
}
