"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface CardWorksProps {
  shadowColor?: string;
  externalLink?: string;
  projectName?: string;
  isDe?: boolean;
}

export function CardWorks({
  shadowColor = "#00e5ff",
  externalLink = "https://github.com/rayanelhabib",
  projectName = "PROJECT",
  isDe = false,
}: CardWorksProps) {
  return (
    <div className="relative w-[260px] sm:w-[280px] h-[360px] sm:h-[380px] p-6 bg-white text-[#16181f] rounded-2xl border border-[#16181f]/10 shadow-[0_25px_60px_-15px_rgba(22,24,31,0.2)] flex flex-col justify-between select-none">
      {/* Colored dynamic ambient shadow like Hisami Kurita */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none -z-10 blur-2xl opacity-40 transition-opacity"
        style={{ backgroundColor: shadowColor }}
      />

      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full text-left group"
      >
        <div className="flex flex-col justify-between h-full">
          {/* Top Line: Iconic Japanese Bullet dot + LIVE */}
          <div className="mb-2">
            <span className="block text-4xl leading-none text-[#16181f] -ml-1">
              ・
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#16181f] flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE SYSTEM</span>
            </span>
          </div>

          {/* Description Block */}
          <div className="w-[85%]">
            <p className="font-sans text-xs text-[#16181f]/75 leading-relaxed tracking-wide">
              {isDe
                ? `SIE KÖNNEN SEHEN, DASS ${projectName} LIVE LÄUFT. ENTWICKELT FÜR HÖCHSTE SYSTEMPERFORMANZ.`
                : `YOU CAN SEE ${projectName} IS LIVE. ARCHITECTED FOR LOW-LATENCY DETERMINISM.`}
            </p>
          </div>

          {/* Bottom Monumental Six Caps VISIT SITE CTA */}
          <div className="relative pt-4 border-t border-[#16181f]/10 flex items-end justify-between">
            <span className="font-sixcaps text-6xl sm:text-7xl leading-[0.8] text-[#16181f] group-hover:text-cyan-600 transition-colors uppercase whitespace-nowrap">
              {isDe ? "ZUR LIVE DEMO" : "VISIT SITE"}
            </span>
            <div className="w-8 h-8 rounded-full bg-[#16181f] group-hover:bg-cyan-500 text-white group-hover:text-black flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
