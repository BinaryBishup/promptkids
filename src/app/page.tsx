import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyAI from "@/components/WhyAI";
import Platform from "@/components/Platform";
import HomeworkAI from "@/components/HomeworkAI";
import ParentDashboard from "@/components/ParentDashboard";
import Transformation from "@/components/Transformation";

import Programs from "@/components/Programs";
import Curriculum from "@/components/Curriculum";
import Testimonials from "@/components/Testimonials";
import SuccessStories from "@/components/SuccessStories";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustSignals from "@/components/TrustSignals";
import FAQ from "@/components/FAQ";

import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Header />
      <main className="flex-1">
        {/* ACT 1: Hook */}
        <Hero />
        <Marquee />

        {/* ACT 2: Preview the 3 pillars — the key differentiators */}
        <WhyAI />

        {/* ACT 3: Deep dive into each pillar */}
        <Platform />
        <HomeworkAI />
        <ParentDashboard />

        {/* ACT 4: Before/After */}
        <Transformation />

        {/* ACT 5: Proof */}
        <Testimonials />
        <SuccessStories />
        <WhyChooseUs />

        {/* ACT 6: Details & Pricing */}
        <Curriculum />
        <Programs />

        {/* ACT 7: Resolve & Close */}
        <TrustSignals />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
