export default function Marquee() {
  const items = [
    "Build apps with AI — no coding needed",
    "Create stunning presentations in minutes",
    "Research like a pro with Perplexity",
    "Write better essays with Claude",
    "Generate study notes automatically",
    "Ace exams with AI mock tests",
    "Design logos & graphics using Canva AI",
    "Learn prompt engineering from Day 1",
    "Trusted by 200+ parents in Gurugram",
    "First class is free — no commitment",
  ];

  return (
    <section className="bg-pk-orange/5 border-y border-pk-orange/10 py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center gap-8 px-4">
            {items.map((item, i) => (
              <span key={`${set}-${i}`} className="flex items-center gap-8">
                <span className="text-[13px] font-medium text-pk-text/60">{item}</span>
                <span className="text-pk-orange/40 text-[6px]">&#11044;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
