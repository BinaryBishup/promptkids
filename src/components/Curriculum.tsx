"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useGSAP";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ToolIcon } from "./ToolLogos";

const programs = [
  {
    id: "explorer",
    name: "AI Explorer",
    age: "Class 6–8",
    color: "bg-pk-green",
    activeTab: "bg-pk-green/10 text-pk-green border-pk-green",
    modules: [
      {
        week: "Week 1–2",
        title: "Introduction to AI",
        topics: ["What is AI? (with fun demos)", "History of AI — from Siri to ChatGPT", "Types of AI — your first AI vocabulary", "Hands-on: Talk to ChatGPT for the first time"],
      },
      {
        week: "Week 3–4",
        title: "ChatGPT for Homework",
        topics: ["Writing better prompts (the right way)", "Summarising chapters & textbooks", "Getting explanations in simple language", "Practice: Summarise a full NCERT chapter"],
      },
      {
        week: "Week 5–6",
        title: "AI for Creative Projects",
        topics: ["Canva AI — design school posters & presentations", "Image generation with AI", "Making AI-powered comics & stories", "Project: Create an AI-illustrated story"],
      },
      {
        week: "Week 7–8",
        title: "Capstone Project",
        topics: ["Plan your own AI project", "Build & present to parents", "Peer review & feedback", "Certificate ceremony & showcase"],
      },
    ],
    tools: ["ChatGPT", "Canva AI", "Midjourney", "Google Bard", "Perplexity"],
  },
  {
    id: "achiever",
    name: "AI Achiever",
    age: "Class 9–10",
    color: "bg-pk-blue",
    activeTab: "bg-pk-blue/10 text-pk-blue border-pk-blue",
    modules: [
      {
        week: "Week 1–2",
        title: "Prompt Engineering Mastery",
        topics: ["Why prompts matter — 10x better answers", "Prompt structures & frameworks", "Chain-of-thought prompting", "Practice: Solve complex problems with AI"],
      },
      {
        week: "Week 3–4",
        title: "AI for Board Exam Prep",
        topics: ["Generating MCQs & practice tests", "Summarising entire chapters in minutes", "Creating mind maps & revision notes", "Building your personal study assistant"],
      },
      {
        week: "Week 5–6",
        title: "Research & Deep Learning",
        topics: ["Perplexity AI for research", "NotebookLM for organising knowledge", "Fact-checking & citation with AI", "Project: Build a research report with AI"],
      },
      {
        week: "Week 7–8",
        title: "Personal AI Toolkit + Capstone",
        topics: ["Customising ChatGPT with custom instructions", "Building a revision workflow", "Capstone: Your AI study assistant", "Presentation to parents + certificate"],
      },
    ],
    tools: ["ChatGPT", "Claude", "Perplexity", "NotebookLM", "Canva AI", "Gamma"],
  },
  {
    id: "launchpad",
    name: "AI Launchpad",
    age: "Class 11–12",
    color: "bg-pk-purple",
    activeTab: "bg-pk-purple/10 text-pk-purple border-pk-purple",
    modules: [
      {
        week: "Week 1–2",
        title: "Advanced AI for Academics",
        topics: ["AI for JEE/NEET problem solving", "Board exam acceleration strategies", "Advanced prompt engineering", "Building subject-specific AI tutors"],
      },
      {
        week: "Week 3–4",
        title: "AI for College Applications",
        topics: ["Essay writing & editing with AI", "SOP/personal statement crafting", "Building a standout portfolio", "LinkedIn profile optimisation"],
      },
      {
        week: "Week 5–6",
        title: "No-Code AI App Building",
        topics: ["What is no-code? Why it matters", "Building AI-powered web apps", "Automations with Zapier + AI", "Project: Build a functional AI tool"],
      },
      {
        week: "Week 7–8",
        title: "Portfolio & Capstone",
        topics: ["Packaging your projects for applications", "Creating a personal website/portfolio", "Capstone: AI project for college apps", "Final showcase + certificate + career guidance"],
      },
    ],
    tools: ["ChatGPT", "Claude", "Perplexity", "NotebookLM", "Bolt", "v0", "Zapier", "Gamma"],
  },
];

export default function Curriculum() {
  const [activeProgram, setActiveProgram] = useState("achiever");
  const containerRef = useScrollReveal<HTMLElement>();

  const program = programs.find((p) => p.id === activeProgram)!;

  return (
    <section ref={containerRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white" id="curriculum">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span data-animate="fade-up" className="eyebrow mb-4 block">What your child will learn</span>
          <h2 data-animate="fade-up" data-delay="0.1" className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-pk-navy tracking-[-0.02em] mb-4">
            8-Week Curriculum Breakdown
          </h2>
          <p data-animate="fade-up" data-delay="0.15" className="text-[15px] text-pk-gray max-w-lg mx-auto">
            Every module is hands-on. Students build real projects every 2 weeks — no boring theory slides.
          </p>
        </div>

        {/* Program tabs */}
        <div data-animate="fade-up" data-delay="0.2" className="flex items-center justify-center gap-2 mb-12">
          {programs.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProgram(p.id)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all border ${
                activeProgram === p.id
                  ? p.activeTab
                  : "bg-transparent text-pk-gray border-pk-gray-border hover:border-pk-gray"
              }`}
            >
              {p.name}
              <span className="text-[11px] ml-1.5 opacity-60">{p.age}</span>
            </button>
          ))}
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {program.modules.map((mod, i) => (
            <div
              key={mod.week}
              className="relative bg-pk-gray-light rounded-2xl border border-pk-gray-border p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
            >
              {/* Week badge */}
              <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded ${program.color} text-white mb-4`}>
                {mod.week}
              </span>

              <h3 className="text-[14px] font-bold text-pk-navy mb-3">{mod.title}</h3>

              <ul className="space-y-2">
                {mod.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-pk-green/60" />
                    <span className="text-[12px] text-pk-gray leading-snug">{topic}</span>
                  </li>
                ))}
              </ul>

              {/* Connection line to next */}
              {i < 3 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-pk-gray-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tools covered */}
        <div data-animate="fade-up" className="bg-pk-navy rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-[14px] font-bold text-white mb-1">Tools covered in {program.name}</h3>
              <p className="text-[12px] text-white/30">Students get hands-on practice with each tool every session</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {program.tools.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-[12px] text-white/60 font-medium">
                  <ToolIcon name={tool} className="w-4 h-4" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div data-animate="fade-up" className="text-center mt-10">
          <Link
            href="#book"
            className="inline-flex items-center gap-2 px-7 py-3 bg-pk-navy text-white text-[14px] font-semibold rounded-xl hover:bg-pk-navy-light transition-all active:scale-[0.98]"
          >
            Book Free Trial to See It in Action <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
