import Link from "next/link";
import Image from "next/image";

const stats = [
  {
    label: "Join",
    value: "8,000",
    sublabel: "students",
    arrow: true,
  },
  {
    label: "Rated",
    value: "4.7",
    sublabel: "on Google",
    hasStar: true,
    arrow: true,
  },
  {
    label: "Voted as KL & Selangor's 2022",
    value: "#1 Coding Class for Kids",
    sublabel: "on TallyPress.com",
    arrow: true,
    isWide: true,
  },
];

export default function Hero() {
  return (
    <section className="w-full bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-start gap-12 lg:gap-8">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Get your child
            <br />
            educated for{" "}
            <span className="text-purple-light">the</span>
            <br />
            <span className="text-purple-light">digital era</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            Kidocode is a hybrid technology and entrepreneurship school for kids
            aged 5–18, offering both online and on-campus education.
          </p>

          {/* Stats Cards */}
          <div className="flex flex-wrap gap-0 mb-10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`border border-dark-border rounded-lg p-4 ${
                  stat.isWide ? "min-w-[220px]" : "min-w-[140px]"
                } ${i > 0 ? "border-l border-l-dark-border" : ""}`}
              >
                <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                <p className="text-white font-bold text-xl flex items-center gap-1">
                  {stat.value}
                  {stat.hasStar && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#facc15"
                    >
                      <path d="M8 0l2.5 5 5.5.8-4 3.9 1 5.3L8 12.5 2.9 15l1-5.3-4-3.9L5.5 5z" />
                    </svg>
                  )}
                </p>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  {stat.sublabel}
                  {stat.arrow && <span className="text-white ml-1">&rarr;</span>}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="#"
            className="inline-flex px-8 py-4 bg-purple hover:bg-purple-dark text-white font-semibold rounded-lg text-base transition-colors"
          >
            Join our Trial Class
          </Link>
        </div>

        {/* Right Image Collage */}
        <div className="flex-1 relative hidden lg:block min-h-[500px]">
          {/* Decorative color blocks - behind images */}
          <div className="absolute top-0 right-[220px] w-[80px] h-[120px] rounded-2xl bg-purple opacity-80 z-0" />
          <div className="absolute top-[20px] right-[120px] w-[70px] h-[100px] rounded-2xl bg-[#d946ef] z-0" />
          <div className="absolute top-[10px] right-[60px] w-[60px] h-[90px] rounded-2xl bg-[#22c55e] z-0" />
          <div className="absolute top-[40px] right-[-10px] w-[55px] h-[220px] rounded-2xl bg-[#6366f1] opacity-80 z-0" />

          {/* Main image */}
          <div className="absolute top-[40px] right-[120px] w-[280px] h-[360px] rounded-2xl overflow-hidden z-10 shadow-2xl border-2 border-white/10">
            <Image
              src="/images/hero-1.jpg"
              alt="Kids learning robotics"
              fill
              sizes="280px"
              className="object-cover"
              priority
            />
          </div>

          {/* Second image */}
          <div className="absolute top-[80px] right-[-20px] w-[200px] h-[280px] rounded-2xl overflow-hidden z-20 shadow-2xl border-2 border-white/10">
            <Image
              src="/images/hero-2.jpg"
              alt="Kids coding"
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
          </div>

          {/* Bottom decorative blocks */}
          <div className="absolute bottom-[40px] right-[60px] w-[60px] h-[60px] rounded-xl bg-[#d946ef] z-30" />
          <div className="absolute bottom-[20px] right-[-20px] w-[50px] h-[180px] rounded-2xl bg-[#6366f1] opacity-70 z-0" />
        </div>
      </div>
    </section>
  );
}
