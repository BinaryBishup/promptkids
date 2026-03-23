import Link from "next/link";
import { ArrowLeft, Target, Heart, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-pk-text-secondary hover:text-pk-text mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <span className="eyebrow mb-4 block">About Us</span>
        <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-6">
          We&apos;re building India&apos;s smartest
          <br />AI learning program for kids.
        </h1>

        <div className="prose prose-sm max-w-none text-pk-text-secondary leading-relaxed space-y-4 mb-12">
          <p>
            PromptKids was born from a simple observation: AI is transforming every industry, yet no one is teaching the next generation how to use it responsibly and effectively.
          </p>
          <p>
            We started in Gurugram with a handful of curious students and a mission — give every child between Class 6 and 12 the skills to command AI, not just consume it. Today, over 200 students trust us to prepare them for an AI-first future.
          </p>
          <p>
            Our approach is different. We don&apos;t just teach tools — we teach thinking. Every session is hands-on, every AI interaction is supervised, and every parent gets full visibility into their child&apos;s progress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {[
            { icon: Target, title: "Our Mission", desc: "Make AI literacy as fundamental as computer literacy was in the 2000s — starting with Indian students.", color: "text-pk-orange", bg: "bg-pk-orange/8" },
            { icon: Heart, title: "Our Values", desc: "Learning over shortcuts. Understanding over copying. Curiosity over rote memorization.", color: "text-pk-green", bg: "bg-pk-green/8" },
            { icon: Lightbulb, title: "Our Method", desc: "Small batches, real projects, supervised AI use, and full parent transparency at every step.", color: "text-pk-blue", bg: "bg-pk-blue/8" },
            { icon: Users, title: "Our Community", desc: "200+ students, 15+ AI tools, weekend online batches, and a growing network of AI-ready kids.", color: "text-pk-purple", bg: "bg-pk-purple/8" },
          ].map((item) => (
            <div key={item.title} className="bg-pk-gray-light rounded-2xl border border-pk-gray-border p-6">
              <div className={`inline-flex p-2.5 rounded-xl ${item.bg} mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <h3 className="text-[15px] font-bold text-pk-text mb-2">{item.title}</h3>
              <p className="text-[13px] text-pk-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
