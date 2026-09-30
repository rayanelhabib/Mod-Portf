"use client";

import React from "react";
import { BounceLine } from "@/components/ui/bounce-line";
import { useLanguage } from "@/hooks/use-language";

export function DoubleBounceMarquee({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const topLabel = isDe 
    ? "// TECHNOLOGIE-STACK & SYSTEMARCHITEKTUR" 
    : "// TECH STACK & SYSTEM ARCHITECTURE";

  const row1Tech = [
    "RUST",
    "GO",
    "PYTHON",
    "C++",
    "EBPF",
    "LINUX KERNEL",
    "DISTRIBUTED SYSTEMS",
    "COMPUTER VISION",
  ];

  const row2Tech = [
    "PYTORCH",
    "NEXT.JS",
    "KUBERNETES",
    "DOCKER",
    "WIREGUARD",
    "WEBGL / GLSL",
    "FASTAPI",
    "ZERO-TRUST NETWORKS",
  ];

  return (
    <section className={"relative w-full py-12 sm:py-16 select-none overflow-hidden bg-white text-[#16181f] " + className}>
      {/* Top Read Title Indicator (Top Right - Style Hisami Kurita) */}
      <div className="w-full flex items-center justify-between px-6 sm:px-16 md:px-20 lg:pl-36 lg:pr-12 xl:pr-14 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#16181f]/70 font-semibold">
            {topLabel}
          </span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-[#16181f]/40 uppercase tracking-widest hidden sm:inline-block">
          CORE ARSENAL
        </span>
      </div>

      {/* Edge gradient mask overlays for seamless entry/exit */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* BounceLine 1 (Top) */}
      <div className="w-full relative z-20">
        <BounceLine strokeColor="#16181f" strokeWidth={1.5} className="opacity-25 hover:opacity-100 transition-opacity" />
      </div>

      {/* Row 1: Moving Right */}
      <div className="relative w-full overflow-hidden py-3 sm:py-4">
        <div className="flex w-max animate-loop-scroll items-center gap-6 sm:gap-8 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
          {/* Segment A */}
          <div className="flex items-center gap-6 sm:gap-8">
            {row1Tech.map((item, idx) => (
              <React.Fragment key={"r1-a-" + idx}>
                <span className="font-sixcaps text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-tight uppercase leading-none opacity-85 hover:opacity-100 hover:text-cyan-500 transition-colors">
                  {item}
                </span>
                <span className="text-cyan-400 font-bold text-xl sm:text-2xl opacity-80">•</span>
              </React.Fragment>
            ))}
          </div>

          {/* Segment B (for smooth infinite repeat) */}
          <div className="flex items-center gap-6 sm:gap-8" aria-hidden="true">
            {row1Tech.map((item, idx) => (
              <React.Fragment key={"r1-b-" + idx}>
                <span className="font-sixcaps text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-tight uppercase leading-none opacity-85 hover:opacity-100 hover:text-cyan-500 transition-colors">
                  {item}
                </span>
                <span className="text-cyan-400 font-bold text-xl sm:text-2xl opacity-80">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* BounceLine 2 (Middle) */}
      <div className="w-full relative z-20">
        <BounceLine strokeColor="#16181f" strokeWidth={1.5} className="opacity-25 hover:opacity-100 transition-opacity" />
      </div>

      {/* Row 2: Moving Left */}
      <div className="relative w-full overflow-hidden py-3 sm:py-4">
        <div className="flex w-max animate-loop-scroll-reverse items-center gap-6 sm:gap-8 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
          {/* Segment A */}
          <div className="flex items-center gap-6 sm:gap-8">
            {row2Tech.map((item, idx) => (
              <React.Fragment key={"r2-a-" + idx}>
                <span className="font-sixcaps text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-tight uppercase leading-none opacity-85 hover:opacity-100 hover:text-cyan-500 transition-colors">
                  {item}
                </span>
                <span className="text-cyan-400 font-bold text-xl sm:text-2xl opacity-80">•</span>
              </React.Fragment>
            ))}
          </div>

          {/* Segment B (for smooth infinite repeat) */}
          <div className="flex items-center gap-6 sm:gap-8" aria-hidden="true">
            {row2Tech.map((item, idx) => (
              <React.Fragment key={"r2-b-" + idx}>
                <span className="font-sixcaps text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-tight uppercase leading-none opacity-85 hover:opacity-100 hover:text-cyan-500 transition-colors">
                  {item}
                </span>
                <span className="text-cyan-400 font-bold text-xl sm:text-2xl opacity-80">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* BounceLine 3 (Bottom) */}
      <div className="w-full relative z-20">
        <BounceLine strokeColor="#16181f" strokeWidth={1.5} className="opacity-25 hover:opacity-100 transition-opacity" />
      </div>
    </section>
  );
}
