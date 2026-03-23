import Link from "next/link";
import { ArrowLeft, PenLine, Search, Code, Palette, BarChart3, Rocket } from "lucide-react";

const useCases = [
  { icon: PenLine, title: "Content Creation", desc: "Learn to create videos, blogs, social media posts, and presentations using AI tools like Canva AI, Gamma, and ChatGPT.", id: "content-creation", color: "text-pk-orange", bg: "bg-pk-orange/8" },
  { icon: Search, title: "Research & Writing", desc: "Master AI-powered research with Perplexity, write better essays with Claude, and create study materials with NotebookLM.", id: "research", color: "text-pk-blue", bg: "bg-pk-blue/8" },
  { icon: Code, title: "Coding & App Building", desc: "Build websites and apps using Bolt, v0, and AI coding assistants. No prior coding experience needed.", id: "coding", color: "text-pk-green", bg: "bg-pk-green/8" },
  { icon: Palette, title: "Design & Visual Arts", desc: "Create stunning graphics, logos, and visual content using Midjourney, Canva AI, and other design tools.", id: "design", color: "text-pk-purple", bg: "bg-pk-purple/8" },
  { icon: BarChart3, title: "Data & Analysis", desc: "Learn to analyze data, create charts, and extract insights using AI — skills that top companies look for.", id: "data", color: "text-pk-yellow", bg: "bg-pk-yellow/8" },
  { icon: Rocket, title: "Entrepreneurship", desc: "From business plans to marketing strategies — learn to use AI to build and grow real projects.", id: "entrepreneurship", color: "text-red-500", bg: "bg-red-50" },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-pk-gray-light pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-pk-text-secondary hover:text-pk-text mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-12">
          <span className="eyebrow mb-4 block">Use Cases</span>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-4">
            What can your child do with AI?
          </h1>
          <p className="text-pk-text-secondary max-w-xl mx-auto">
            AI isn&apos;t just chatbots. Here are the real-world skills your child will develop — skills that colleges and employers are already looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {useCases.map((uc) => (
            <div key={uc.id} id={uc.id} className="bg-white rounded-2xl border border-pk-gray-border p-6 hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-xl ${uc.bg} mb-4`}>
                <uc.icon className={`w-6 h-6 ${uc.color}`} />
              </div>
              <h2 className="text-lg font-bold text-pk-text mb-2">{uc.title}</h2>
              <p className="text-sm text-pk-text-secondary leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#book" className="inline-flex items-center gap-2 px-6 py-3 bg-pk-orange text-white text-sm font-semibold rounded-xl hover:bg-pk-orange-dark transition-colors">
            Book a Free Trial Class
          </Link>
        </div>
      </div>
    </div>
  );
}
