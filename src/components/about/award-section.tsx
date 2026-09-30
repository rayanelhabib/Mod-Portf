"use client";

import React, { useRef, useState, useEffect } from "react";
import { CardAward, AwardItem } from "./card-award";
import { BounceLine } from "@/components/ui/bounce-line";
import { AppReadTitle } from "@/components/ui/app-read-title";
import { useLanguage } from "@/hooks/use-language";
import gsap from "gsap";

const AWARDS_DATA: AwardItem[] = [
  {
    id: "ebpf-telemetry-perf",
    group: "LINUX FOUNDATION",
    title: "KernelFlow Sub-Microsecond Socket Telemetry",
    rank: "BEST RUNTIME BENCHMARK",
    shortCode: "KRNL",
    date: "2024",
    bgColor: "#9dd5d6",
    textColor: "#ffffff",
    accentColor: "#1b5a5c",
    logo: "/images/awwwards.webp",
  },
  {
    id: "rust-kv-engine",
    group: "RUST SYSTEMS",
    title: "Nexus High-Throughput LSM Storage Engine",
    rank: "SYSTEMS INNOVATION AWARD",
    shortCode: "RUST",
    date: "2024",
    bgColor: "#ec732e",
    textColor: "#ffffff",
    accentColor: "#7e160a",
    logo: "/images/cssda.webp",
  },
  {
    id: "p2p-mesh-traversal",
    group: "IEEE NETWORKING",
    title: "NetMesh Zero-Trust Hole-Punching Protocol",
    rank: "FIRST PLACE IN PROTOCOLS",
    shortCode: "MESH",
    date: "2023",
    bgColor: "#fab740",
    textColor: "#ffffff",
    accentColor: "#613f00",
    logo: "/images/csswinner.webp",
  },
  {
    id: "rayocr-simd-inference",
    group: "AI SYSTEMS LAB",
    title: "RayOCR AVX-512 SIMD Neural Engine",
    rank: "PERFORMANCE EXCELLENCE",
    shortCode: "SIMD",
    date: "2023",
    bgColor: "#7aa0d0",
    textColor: "#ffffff",
    accentColor: "#1e375a",
    logo: "/images/cssda.webp",
  },
  {
    id: "open-source-fellow",
    group: "CONSENSUS LAB",
    title: "Raft Quorum Verification & Formal Proofs",
    rank: "HONORABLE MENTION",
    shortCode: "HM",
    date: "2022",
    bgColor: "#df6588",
    textColor: "#ffffff",
    accentColor: "#630e25",
    logo: "/images/awwwards.webp",
  },
];

export function AwardSection() {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardFollowerRef = useRef<HTMLDivElement>(null);
  const [activeAward, setActiveAward] = useState<AwardItem>(AWARDS_DATA[0]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Smooth mouse tracking at 60 FPS
  useEffect(() => {
    if (!cardFollowerRef.current) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Clamped coordinates ensuring card stays 100% inside viewport, clear of left nav
      const x = Math.max(130, Math.min(window.innerWidth - 275, e.clientX + 28));
      const y = Math.max(25, Math.min(window.innerHeight - 365, e.clientY - 165));

      gsap.to(cardFollowerRef.current, {
        x,
        y,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const isHovering = hoveredIdx !== null;

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#000000] text-white py-32 sm:py-44 px-6 sm:px-14 lg:px-24 select-none"
    >
      {/* Floating Cursor Follower CardAward (Exact Hisami Kurita fixed award-card-area) */}
      <div
        ref={cardFollowerRef}
        style={{
          width: "244px",
          height: "330px",
          opacity: isHovering ? 1 : 0,
          transform: isHovering ? "scale(1)" : "scale(0.92)",
          pointerEvents: "none",
          transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.44, 0.05, 0.17, 1)",
        }}
        className="fixed top-0 left-0 z-[999] hidden lg:block will-change-transform shrink-0"
      >
        <CardAward award={activeAward} />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Header Read Tag & Counters */}
        <div className="flex items-center justify-between mb-16">
          <AppReadTitle
            text={["・", isDe ? "AUSZEICHNUNGEN" : "AWARDS"]}
            className="text-white"
            dotColor="#ffffff"
          />

          <div className="hidden sm:flex items-center gap-6 font-sans text-xs tracking-wider text-[#828282]">
            <span>AWWWARDS*02</span>
            <span>CSSDA*02</span>
            <span>IEEE*01</span>
          </div>
        </div>

        {/* Interactive Award Rows List (Hisami Kurita award-list) */}
        <div
          ref={listRef}
          onMouseLeave={() => setHoveredIdx(null)}
          className="relative w-full flex flex-col cursor-pointer"
        >
          {/* Rows */}
          {AWARDS_DATA.map((award, idx) => {
            const isCurrent = hoveredIdx === idx;
            const isDimmed = isHovering && !isCurrent;

            return (
              <div
                key={award.id}
                onMouseEnter={() => {
                  setActiveAward(award);
                  setHoveredIdx(idx);
                }}
                className="relative w-full py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300"
                style={{
                  color: isCurrent ? "#ffffff" : isDimmed ? "#444444" : "#828282",
                }}
              >
                {/* BounceLine divider at top of each item */}
                <div className="absolute top-0 inset-x-0 pointer-events-none">
                  <BounceLine
                    strokeColor={isCurrent ? "#ffffff" : "#333333"}
                    strokeWidth={1}
                    className="transition-colors duration-300"
                  />
                </div>

                {/* Left: Group (mono 14px) */}
                <div className="w-full md:w-[220px] shrink-0 font-sans text-xs tracking-wider uppercase font-medium mb-1 md:mb-0">
                  {award.group}
                </div>

                {/* Middle: Title in Monumental Six Caps 60px */}
                <div className="flex-1 md:px-6">
                  <h3 className="font-sixcaps text-4xl sm:text-5xl lg:text-[62px] leading-[0.85] tracking-wide uppercase transition-colors duration-300">
                    {award.title}
                  </h3>
                </div>

                {/* Right: Rank in Monumental Six Caps 60px */}
                <div className="shrink-0 text-left md:text-right mt-1 md:mt-0">
                  <span className="font-sixcaps text-4xl sm:text-5xl lg:text-[62px] leading-[0.85] tracking-wide uppercase transition-colors duration-300">
                    {award.rank}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom BounceLine cable */}
          <div className="w-full relative mt-2 pointer-events-none">
            <BounceLine strokeColor="#333333" strokeWidth={1} />
          </div>
        </div>

        {/* Mobile Total counters */}
        <div className="flex sm:hidden items-center justify-between mt-10 font-sans text-xs text-[#828282]">
          <span>AWWWARDS*02</span>
          <span>CSSDA*02</span>
          <span>IEEE*01</span>
        </div>
      </div>
    </div>
  );
}
