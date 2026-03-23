"use client";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs for subtle depth */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pk-blue/[0.06] blur-[120px] -top-[10%] -left-[10%]" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-pk-orange/[0.04] blur-[100px] top-[30%] -right-[5%]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pk-purple/[0.03] blur-[140px] -bottom-[15%] left-[20%]" />
    </div>
  );
}
